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

    const record: DonationRecord = {
      reference,
      amount: Number(amount) || 0,
      currency: currency || 'NGN',
      donorName: donorName || 'Anonymous Donor',
      email,
      phone: phone || '',
      pillar: pillar || 'General Support',
      donationType: donationType || 'One-Time',
      isAnonymous: Boolean(isAnonymous),
      status: status || 'success',
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
