import { NextResponse } from 'next/server';
import { createHmac, randomBytes } from 'crypto';
import { activeSessions } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// Rate limiting store
const failedAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function getClientIP(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: Request) {
  const ip = getClientIP(req);
  const now = Date.now();

  // Rate limiting check
  const record = failedAttempts.get(ip);
  if (record) {
    if (now < record.resetAt && record.count >= MAX_ATTEMPTS) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      return NextResponse.json(
        { success: false, message: `Too many failed attempts. Try again in ${retryAfter} seconds.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }
    if (now >= record.resetAt) failedAttempts.delete(ip);
  }

  try {
    const body = await req.json();
    const { passkey } = body;

    const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY;
    if (!ADMIN_PASSKEY) {
      console.error('[AUTH] ADMIN_PASSKEY environment variable is not set.');
      return NextResponse.json({ success: false, message: 'Server misconfiguration' }, { status: 500 });
    }

    // Constant-time comparison to prevent timing attacks
    const expected = createHmac('sha256', 'devorah-compare-key').update(ADMIN_PASSKEY).digest('hex');
    const provided = createHmac('sha256', 'devorah-compare-key').update(String(passkey || '')).digest('hex');
    const isValid = expected === provided;

    if (isValid) {
      failedAttempts.delete(ip);
      const sessionToken = randomBytes(32).toString('hex');
      activeSessions.set(sessionToken, { createdAt: now, expiresAt: now + 8 * 60 * 60 * 1000 });

      const response = NextResponse.json({ success: true });
      response.cookies.set('devorah_admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 8 * 60 * 60,
        path: '/',
      });
      return response;
    }

    // Record failed attempt
    const existing = failedAttempts.get(ip) || { count: 0, resetAt: now + LOCKOUT_MS };
    existing.count += 1;
    failedAttempts.set(ip, existing);

    return NextResponse.json({ success: false, message: 'Invalid Admin Passkey' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1];
  if (token) activeSessions.delete(token);
  const response = NextResponse.json({ success: true });
  response.cookies.delete('devorah_admin_session');
  return response;
}
