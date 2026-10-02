import { NextResponse } from 'next/server';
import { activeSessions } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();

  if (!token) return NextResponse.json({ authenticated: false });

  const session = activeSessions.get(token);
  if (!session) return NextResponse.json({ authenticated: false });

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
}
