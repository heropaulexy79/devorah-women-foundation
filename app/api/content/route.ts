import { NextResponse } from 'next/server';
import { ARTICLES, IMPACT_METRICS, PROGRAMS, GALLERY_ITEMS } from '@/lib/data';

export const dynamic = 'force-dynamic';

// In-memory runtime cache for demonstration & dynamic CMS updates
let currentArticles = [...ARTICLES];
let currentMetrics = [...IMPACT_METRICS];
let currentPrograms = [...PROGRAMS];
let currentGallery = [...GALLERY_ITEMS];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'articles') return NextResponse.json({ articles: currentArticles });
  if (type === 'metrics') return NextResponse.json({ metrics: currentMetrics });
  if (type === 'programs') return NextResponse.json({ programs: currentPrograms });
  if (type === 'gallery') return NextResponse.json({ gallery: currentGallery });

  return NextResponse.json({
    articles: currentArticles,
    metrics: currentMetrics,
    programs: currentPrograms,
    gallery: currentGallery,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === 'add_article') {
      const newArticle = {
        id: `art-${Date.now()}`,
        slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        ...payload,
      };
      currentArticles.unshift(newArticle);
      return NextResponse.json({ success: true, article: newArticle });
    }

    if (action === 'update_article') {
      const index = currentArticles.findIndex((a) => a.id === payload.id);
      if (index !== -1) {
        currentArticles[index] = { ...currentArticles[index], ...payload };
        return NextResponse.json({ success: true, article: currentArticles[index] });
      }
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    if (action === 'delete_article') {
      currentArticles = currentArticles.filter((a) => a.id !== payload.id);
      return NextResponse.json({ success: true, articles: currentArticles });
    }

    if (action === 'update_metrics') {
      currentMetrics = payload;
      return NextResponse.json({ success: true, metrics: currentMetrics });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update content' }, { status: 500 });
  }
}
