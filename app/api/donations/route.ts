import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface DonationRecord {
  reference: string;
  amount: number;
  currency: string;
  donorName: string;
  email: string;
  phone?: string;
  pillar: string;
  donationType: string;
  isAnonymous: boolean;
  status: string;
  verified?: boolean;
  createdAt: string;
}

// In-memory donation storage for development / runtime tracking
const donations: DonationRecord[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, amount, currency, donorName, email, phone, pillar, donationType, isAnonymous, status } = body;

    if (!reference || !email) {
      return NextResponse.json({ error: 'Missing required donation fields' }, { status: 400 });
    }

    let isVerified = false;
    let finalAmount = Number(amount) || 0;
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    // If server secret key is configured and not a local simulation, verify directly with Paystack
    if (secretKey && !reference.startsWith('DWF-SIM-') && !reference.startsWith('DWF-TEST-')) {
      try {
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        });
        if (verifyRes.ok) {
          const verifyData = await verifyRes.json();
          if (verifyData?.status && verifyData?.data?.status === 'success') {
            isVerified = true;
            finalAmount = verifyData.data.amount / 100;
          }
        }
      } catch {
        // Fallback gracefully if network drops
      }
    }

    const record: DonationRecord = {
      reference,
      amount: finalAmount,
      currency: currency || 'NGN',
      donorName: donorName || 'Anonymous Donor',
      email,
      phone: phone || '',
      pillar: pillar || 'General Support',
      donationType: donationType || 'One-Time',
      isAnonymous: Boolean(isAnonymous),
      status: status || (isVerified ? 'verified_success' : 'success'),
      verified: isVerified,
      createdAt: new Date().toISOString(),
    };

    donations.unshift(record);

    return NextResponse.json({
      success: true,
      message: 'Donation recorded successfully. Thank you for your partnership!',
      donation: record,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    totalCount: donations.length,
    recent: donations.slice(0, 10),
  });
}
