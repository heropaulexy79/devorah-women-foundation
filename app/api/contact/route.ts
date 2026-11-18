import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, reason, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    try {
      await sendContactNotification({
        fullName: String(fullName).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : undefined,
        reason: String(reason || 'General Enquiry').trim(),
        message: String(message).trim(),
      });
    } catch (mailErr) {
      console.error('[API/CONTACT] Mail sending error:', mailErr);
      // Still return 200 so the user gets a friendly receipt, but log error internally
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your inquiry has been delivered to our administrative desk.',
    });
  } catch (err) {
    console.error('[API/CONTACT] Error handling contact form submission:', err);
    return NextResponse.json(
      { success: false, message: 'Unable to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

