import type { Metadata } from 'next';
import ImpactClient from './ImpactClient';

export const metadata: Metadata = {
  title: 'Our Impact',
  description: "Explore Devorah Women Foundation's field impact portfolio documenting outreach missions, leadership summits, and community development projects across Ghana.",
  keywords: [
    'women empowerment impact Ghana',
    'community outreach Ghana',
    'girls leadership summit',
    'Devorah Foundation projects',
    'NGO impact report',
  ],
  alternates: { canonical: '/impact' },
  openGraph: {
    title: 'Our Impact | Devorah Women Foundation',
    description: 'See the work in action. Explore our project archive of outreach missions, summits, and field reports.',
    url: '/impact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Impact | Devorah Women Foundation',
    description: 'Explore our project archive documenting outreach missions, leadership summits, and community development reports.',
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}
