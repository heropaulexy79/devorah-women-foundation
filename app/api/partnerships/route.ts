import { NextResponse } from 'next/server';
import { sendPartnershipNotification } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, organization, email, phone, partnershipType, message } = body;

    if (!fullName || !organization || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your full name, organization, email, and message.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    try {
      await sendPartnershipNotification({
        fullName: String(fullName).trim(),
        organization: String(organization).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : undefined,
        partnershipType: String(partnershipType || 'General Institutional Partnership').trim(),
        message: String(message).trim(),
      });
    } catch (mailErr) {
      console.error('[API/PARTNERSHIPS] Mail sending error:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your institutional partnership inquiry has been received.',
    });
  } catch (err) {
    console.error('[API/PARTNERSHIPS] Error handling partnership submission:', err);
    return NextResponse.json(
      { success: false, message: 'Unable to submit your partnership inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

