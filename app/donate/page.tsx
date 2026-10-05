import type { Metadata } from 'next';
import DonateClient from './DonateClient';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Devorah Women Foundation by donating to fuel micro-grants, educational scholarships, leadership training, and holistic mentorship for women and girls across Ghana.',
  keywords: [
    'donate women foundation Ghana',
    'support girls education Africa',
    'NGO donation Ghana',
    'women empowerment fund',
    'Paystack donation Ghana',
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
    description: 'Support women and girls in Ghana — donate to Devorah Women Foundation today.',
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
