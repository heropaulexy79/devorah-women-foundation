import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, message: 'File too large. Maximum size is 5MB.' }, { status: 400 });
    }

    // Generate a safe unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = `cms_upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Ensure the uploads directory exists inside public/images/uploads
    const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    // Return the public URL path
    const publicUrl = `/images/uploads/${safeName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
