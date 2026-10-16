import type { Metadata } from 'next';
import ImpactClient from './ImpactClient';

export const metadata: Metadata = {
  title: 'Our Impact',
  description: "Explore Devorah Women's Leadership & Empowerment Initiative's field impact portfolio documenting outreach missions, leadership summits, and community development projects across Lagos, Nigeria.",
  keywords: [
    'women empowerment impact Nigeria',
    'community outreach Nigeria',
    'community outreach Lagos',
    'girls leadership summit',
    'Devorah Initiative projects',
    'NGO impact report',
  ],
  alternates: { canonical: '/impact' },
  openGraph: {
    title: "Our Impact | Devorah Women's Leadership & Empowerment Initiative",
    description: 'See the work in action. Explore our project archive of outreach missions, summits, and field reports.',
    url: '/impact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Our Impact | Devorah Women's Leadership & Empowerment Initiative",
    description: 'Explore our project archive documenting outreach missions, leadership summits, and community development reports.',
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}
