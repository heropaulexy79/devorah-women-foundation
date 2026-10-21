import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/sessions';
import { testDbConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();

  const authenticated = verifySessionToken(token);
  if (!authenticated) {
    return NextResponse.json({ authenticated: false });
  }

  const dbStatus = await testDbConnection();
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  return NextResponse.json({
    authenticated: true,
    db: dbStatus,
    blob: {
      configured: blobConfigured,
    },
  });
}

