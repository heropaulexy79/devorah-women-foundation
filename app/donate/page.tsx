import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Devorah Women Foundation by donating to fuel micro-grants, educational scholarships, leadership training, and holistic mentorship for women and girls across Lagos, Nigeria.',
  keywords: [
    'donate women foundation Nigeria',
    'support girls education Africa',
    'NGO donation Nigeria',
    'NGO donation Lagos',
    'women empowerment fund',
    'Paystack donation Nigeria',
    'sponsor girl-child',
  ],
  alternates: { canonical: '/donate' },
  openGraph: {
    title: 'Donate | Devorah Women Foundation',
    description:
      'Fuel the movement empowering women & girls. Your support unlocks micro-grants, scholarships, leadership training, and mentorship.',
    url: '/donate',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donate | Devorah Women Foundation',
    description: 'Support women and girls in Lagos, Nigeria — donate to Devorah Women Foundation today.',
  },
};

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] pt-24 text-center">Loading donation system...</div>}>
      <DonateClient />
    </Suspense>
  );
}
