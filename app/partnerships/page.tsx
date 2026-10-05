import type { Metadata } from 'next';
import PartnershipsClient from './PartnershipsClient';

export const metadata: Metadata = {
  title: 'Partnerships',
  description:
    'Partner with Devorah Women Foundation to co-sponsor programs, provide educational grants, and scale sustainable empowerment for women and girls across Ghana.',
  keywords: [
    'partnership NGO Ghana',
    'corporate social responsibility Africa',
    'women empowerment partnership',
    'sponsor girls education Ghana',
    'Devorah Foundation partner',
    'faith-based partnership',
  ],
  alternates: { canonical: '/partnerships' },
  openGraph: {
    title: 'Partnerships | Devorah Women Foundation',
    description:
      'Together, We Can Create Greater Impact. Explore partnership pathways with Devorah Women Foundation.',
    url: '/partnerships',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partnerships | Devorah Women Foundation',
    description: 'Co-sponsor programs, provide educational grants, and partner in transforming women\'s lives.',
  },
};

export default function PartnershipsPage() {
  return <PartnershipsClient />;
}
