import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { verifySessionToken } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // 1. Auth check
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();

  if (!verifySessionToken(token)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const safeName = `devorah-cms/${Date.now()}-${cleanFileName}`;

    // 1. Production / Vercel Blob upload
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(safeName, buffer, {
        access: 'public',
        contentType: file.type || 'image/jpeg',
      });
      return NextResponse.json({ success: true, url: blob.url });
    }

    // 2. Local development fallback (writes to local filesystem only if running locally)
    if (process.env.NODE_ENV !== 'production') {
      const { writeFile, mkdir } = await import('fs/promises');
      const { join } = await import('path');
      const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const localFileName = `cms_upload_${Date.now()}_${cleanFileName}`;
      const filePath = join(uploadDir, localFileName);
      await writeFile(filePath, buffer);
      return NextResponse.json({ success: true, url: `/images/uploads/${localFileName}` });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'BLOB_READ_WRITE_TOKEN environment variable is not set. Please connect Vercel Blob in your Vercel project.',
      },
      { status: 500 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed. Please try again.';
    console.error('[UPLOAD] Error:', message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
