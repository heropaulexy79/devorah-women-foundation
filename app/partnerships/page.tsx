import type { Metadata } from 'next';
import PartnershipsClient from './PartnershipsClient';

export const metadata: Metadata = {
  title: 'Partnerships',
  description:
    'Partner with Devorah Women's Leadership & Empowerment Initiative to co-sponsor programs, provide educational grants, and scale sustainable empowerment for women and girls across Lagos, Nigeria.',
  keywords: [
    'partnership NGO Nigeria',
    'partnership NGO Lagos',
    'corporate social responsibility Africa',
    'women empowerment partnership',
    'sponsor girls education Nigeria',
    'Devorah Initiative partner',
    'faith-based partnership',
  ],
  alternates: { canonical: '/partnerships' },
  openGraph: {
    title: 'Partnerships | Devorah Women's Leadership & Empowerment Initiative',
    description:
      'Together, We Can Create Greater Impact. Explore partnership pathways with Devorah Women's Leadership & Empowerment Initiative.',
    url: '/partnerships',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partnerships | Devorah Women's Leadership & Empowerment Initiative',
    description: 'Co-sponsor programs, provide educational grants, and partner in transforming women\'s lives.',
  },
};

export default function PartnershipsPage() {
  return <PartnershipsClient />;
}
