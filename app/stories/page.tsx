import type { Metadata } from 'next';
import StoriesClient from './StoriesClient';
import { getArticles } from '@/lib/db';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Stories & Insights',
  description:
    "Read perspectives on female leadership, girl-child advocacy, faith in action, and field stories of dignity and transformation from Devorah Women's Leadership & Empowerment Initiative.",
  keywords: [
    'women leadership stories',
    'girl-child advocacy',
    'Christian women Nigeria',
    'Christian women Lagos',
    'faith-based empowerment',
    'female leadership Africa',
    'Devorah Initiative journal',
  ],
  alternates: { canonical: '/stories' },
  openGraph: {
    title: "Stories & Insights | Devorah Women's Leadership & Empowerment Initiative",
    description:
      'Perspectives on female leadership, girl-child advocacy, faith in action, and field stories of dignity and transformation.',
    url: '/stories',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stories & Insights | Devorah Women's Leadership & Empowerment Initiative",
    description: "Read thought leadership, advocacy, and community stories from Devorah Women's Leadership & Empowerment Initiative.",
  },
};

export default async function StoriesPage() {
  const articles = await getArticles();
  return <StoriesClient initialArticles={articles} />;
}
