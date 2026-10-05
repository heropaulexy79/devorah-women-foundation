import type { Metadata } from 'next';
import StoriesClient from './StoriesClient';

export const metadata: Metadata = {
  title: 'Stories & Insights',
  description:
    'Read perspectives on female leadership, girl-child advocacy, faith in action, and field stories of dignity and transformation from Devorah Women Foundation.',
  keywords: [
    'women leadership stories',
    'girl-child advocacy',
    'Christian women Ghana',
    'faith-based empowerment',
    'female leadership Africa',
    'Devorah Foundation journal',
  ],
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'Stories & Insights | Devorah Women Foundation',
    description:
      'Perspectives on female leadership, girl-child advocacy, faith in action, and field stories of dignity and transformation.',
    url: '/stories',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories & Insights | Devorah Women Foundation',
    description: 'Read thought leadership, advocacy, and community stories from Devorah Women Foundation.',
  },
};

export default function StoriesPage() {
  return <StoriesClient />;
}
