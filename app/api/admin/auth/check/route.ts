import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();

  const authenticated = verifySessionToken(token);
  return NextResponse.json({ authenticated });
}
