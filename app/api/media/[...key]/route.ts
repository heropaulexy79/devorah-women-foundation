import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, isR2Configured, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2';

export const dynamic = 'force-dynamic';

function getMimeTypeFromKey(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.svg')) return 'image/svg+xml';
  if (lower.endsWith('.avif')) return 'image/avif';
  return 'image/jpeg';
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const resolved = await params;
    const keyParts = resolved?.key || [];
    if (keyParts.length === 0) {
      return new NextResponse('Missing media key', { status: 400 });
    }

    const objectKey = keyParts.map((part) => decodeURIComponent(part)).join('/');

    // 1. Fetch directly from Cloudflare R2 via S3 API if configured
    if (isR2Configured()) {
      try {
        const command = new GetObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: objectKey,
        });
        const r2Res = await r2Client.send(command);
        if (r2Res.Body) {
          const byteArray = await r2Res.Body.transformToByteArray();
          const contentType = r2Res.ContentType || getMimeTypeFromKey(objectKey);
          return new NextResponse(Buffer.from(byteArray), {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
      } catch (r2Err) {
        console.warn(`[MEDIA PROXY] R2 S3 GetObject fallback for ${objectKey}:`, r2Err);
      }
    }

    // 2. Fallback: Fetch from Cloudflare R2 public URL from the server
    if (R2_PUBLIC_URL) {
      const publicBase = R2_PUBLIC_URL.replace(/\/+$/, '');
      const upstreamUrl = `${publicBase}/${objectKey}`;
      const upstreamRes = await fetch(upstreamUrl, { cache: 'force-cache' });
      if (upstreamRes.ok) {
        const arrayBuffer = await upstreamRes.arrayBuffer();
        const contentType =
          upstreamRes.headers.get('content-type') || getMimeTypeFromKey(objectKey);
        return new NextResponse(Buffer.from(arrayBuffer), {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    return new NextResponse('Media not found', { status: 404 });
  } catch (err) {
    console.error('[MEDIA PROXY] Error serving media:', err);
    return new NextResponse('Error loading media', { status: 500 });
  }
}

