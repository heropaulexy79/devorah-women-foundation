import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simple admin authentication verification
export async function POST(req: Request) {
  try {
    const { passkey } = await req.json();
    const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'devorah2026';

    if (passkey === ADMIN_PASSKEY) {
      return NextResponse.json({ success: true, token: 'devorah_admin_session_valid' });
    }

    return NextResponse.json({ success: false, message: 'Invalid Admin Passkey' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
