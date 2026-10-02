import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { activeSessions } from '@/lib/sessions';

export const dynamic = 'force-dynamic';

// ── Rate limiting for uploads ──────────────────────────────────────────────
const uploadAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_UPLOADS_PER_MINUTE = 10;

function checkUploadRate(req: Request): boolean {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const record = uploadAttempts.get(ip);
  if (record && now < record.resetAt && record.count >= MAX_UPLOADS_PER_MINUTE) return false;
  if (!record || now >= record.resetAt) {
    uploadAttempts.set(ip, { count: 1, resetAt: now + 60_000 });
  } else {
    record.count += 1;
  }
  return true;
}

// ── Auth guard ─────────────────────────────────────────────────────────────
function isAuthenticated(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// ── Magic byte signatures for real MIME detection ─────────────────────────
const MAGIC_BYTES: Array<{ mime: string; ext: string; signature: number[] }> = [
  { mime: 'image/jpeg', ext: 'jpg', signature: [0xFF, 0xD8, 0xFF] },
  { mime: 'image/png',  ext: 'png', signature: [0x89, 0x50, 0x4E, 0x47] },
  { mime: 'image/gif',  ext: 'gif', signature: [0x47, 0x49, 0x46, 0x38] },
  { mime: 'image/webp', ext: 'webp', signature: [0x52, 0x49, 0x46, 0x46] }, // RIFF header
];

function detectMimeFromBuffer(buf: Buffer): { mime: string; ext: string } | null {
  for (const entry of MAGIC_BYTES) {
    if (entry.signature.every((byte, i) => buf[i] === byte)) {
      return { mime: entry.mime, ext: entry.ext };
    }
  }
  return null;
}

export async function POST(req: Request) {
  // 1. Require admin auth
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  // 2. Rate limit uploads
  if (!checkUploadRate(req)) {
    return NextResponse.json({ success: false, message: 'Upload rate limit exceeded. Try again shortly.' }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // 3. Validate file size (max 5MB) — before reading full bytes
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, message: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // 4. Read bytes and detect REAL MIME from magic bytes (not client header)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const detected = detectMimeFromBuffer(buffer);

    if (!detected) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPG, PNG, WebP, and GIF images are allowed.' },
        { status: 400 }
      );
    }

    // 5. Generate safe filename using detected extension — never the original filename
    const safeName = `cms_upload_${Date.now()}_${Math.random().toString(36).slice(2, 10)}.${detected.ext}`;

    // 6. Write to disk
    const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    const publicUrl = `/images/uploads/${safeName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch {
    return NextResponse.json({ success: false, message: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
