import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/sessions';
import { r2Client, isR2Configured, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';

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
    const safeKey = `uploads/${Date.now()}-${cleanFileName}`;

    // 1. Cloudflare R2 Upload
    if (isR2Configured()) {
      try {
        const command = new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: safeKey,
          Body: buffer,
          ContentType: file.type || 'image/jpeg',
        });

        await r2Client.send(command);

        // Format the public URL
        const publicBase = R2_PUBLIC_URL.replace(/\/+$/, '');
        const fileUrl = publicBase 
          ? `${publicBase}/${safeKey}` 
          : `https://${R2_BUCKET_NAME}.r2.dev/${safeKey}`;

        return NextResponse.json({ success: true, url: fileUrl });
      } catch (r2Err) {
        console.error('[UPLOAD] Cloudflare R2 error:', r2Err);
        return NextResponse.json(
          {
            success: false,
            message: `Cloudflare R2 upload error: ${r2Err instanceof Error ? r2Err.message : String(r2Err)}`,
          },
          { status: 500 }
        );
      }
    }

    // 2. Local development fallback (writes to local filesystem if R2 credentials aren't supplied yet)
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
        message: 'Cloudflare R2 environment variables (CLOUDFLARE_R2_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, CLOUDFLARE_R2_BUCKET_NAME, CLOUDFLARE_R2_PUBLIC_URL) are not set.',
      },
      { status: 500 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed. Please try again.';
    console.error('[UPLOAD] Error:', message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
