import type { Metadata } from 'next';
import ResourcesClient from './ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    "Access Devorah Women Foundation's curated collection of editorial journals, devotional guides, leadership frameworks, and research publications for women and girls.",
  keywords: [
    'women leadership resources',
    'faith devotional guide',
    'girl-child education resources',
    'Devorah Foundation publications',
    'Christian women journal',
  ],
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Resources | Devorah Women Foundation',
    description:
      'Knowledge that empowers. Access our curated journals, devotionals, leadership frameworks, and research publications.',
    url: '/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | Devorah Women Foundation',
    description: 'Curated journals, devotional guides, and leadership publications from Devorah Women Foundation.',
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
