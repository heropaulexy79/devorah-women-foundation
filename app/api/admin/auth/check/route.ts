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
  const blobToken =
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.VERCEL_BLOB_READ_WRITE_TOKEN ||
    process.env.STORAGE_BLOB_READ_WRITE_TOKEN ||
    process.env.BLOB_TOKEN ||
    process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;
  const blobConfigured = Boolean(blobToken);

  return NextResponse.json({
    authenticated: true,
    db: dbStatus,
    blob: {
      configured: blobConfigured,
    },
  });
}

