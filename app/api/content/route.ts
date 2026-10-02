import { NextResponse } from 'next/server';
import { activeSessions } from '@/lib/sessions';
import { ARTICLES, IMPACT_METRICS, PROGRAMS, GALLERY_ITEMS } from '@/lib/data';
import type { Article, ImpactMetric } from '@/lib/types';

export const dynamic = 'force-dynamic';

// ── Authentication guard ───────────────────────────────────────────────────
function isAuthenticated(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// ── Rate limiting for POST mutations ──────────────────────────────────────
const mutationAttempts = new Map<string, { count: number; resetAt: number }>();

function checkMutationRate(req: Request): boolean {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const now = Date.now();
  const record = mutationAttempts.get(ip);
  if (record && now < record.resetAt && record.count > 60) return false;
  if (!record || now >= record.resetAt) {
    mutationAttempts.set(ip, { count: 1, resetAt: now + 60_000 });
  } else {
    record.count += 1;
  }
  return true;
}

// ── Allowed article categories ─────────────────────────────────────────────
const ALLOWED_CATEGORIES = [
  'Foundation News',
  "Women's Issues",
  "Girls' Development",
  'Leadership',
  'Faith',
  'Empowerment',
  'Community Stories',
  'Event Updates & Announcements',
] as const;

type AllowedCategory = typeof ALLOWED_CATEGORIES[number];

function isAllowedCategory(val: unknown): val is AllowedCategory {
  return typeof val === 'string' && (ALLOWED_CATEGORIES as readonly string[]).includes(val);
}

// ── In-memory runtime cache ────────────────────────────────────────────────
let currentArticles: Article[] = [...ARTICLES];
let currentMetrics: ImpactMetric[] = [...IMPACT_METRICS];
const currentPrograms = [...PROGRAMS];
const currentGallery = [...GALLERY_ITEMS];

// ── Field sanitizer (prevent mass assignment) ──────────────────────────────
function sanitizeArticlePayload(payload: Record<string, unknown>) {
  return {
    title: String(payload.title ?? '').slice(0, 500),
    category: isAllowedCategory(payload.category) ? payload.category : ("Foundation News" as AllowedCategory),
    excerpt: String(payload.excerpt ?? '').slice(0, 1000),
    content: String(payload.content ?? '').slice(0, 50_000),
    readingTime: String(payload.readingTime ?? '4 min read').slice(0, 30),
    authorName: String(payload.authorName ?? '').slice(0, 200),
    authorRole: String(payload.authorRole ?? '').slice(0, 200),
    featuredImageUrl: String(payload.featuredImageUrl ?? '').slice(0, 500),
  };
}

// ── GET — public read ─────────────────────────────────────────────────────
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

// ── POST — authenticated mutations only ───────────────────────────────────
export async function POST(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  if (!checkMutationRate(req)) {
    return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!action || typeof action !== 'string') {
      return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
    }

    if (action === 'add_article') {
      const safe = sanitizeArticlePayload(payload || {});
      if (!safe.title) return NextResponse.json({ success: false, message: 'Title required' }, { status: 400 });

      const newArticle: Article = {
        id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        slug: safe.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: safe.title,
        category: safe.category,
        excerpt: safe.excerpt,
        content: safe.content,
        readingTime: safe.readingTime,
        author: {
          name: safe.authorName,
          role: safe.authorRole,
          avatarUrl: '/images/founder_portrait.png',
        },
        featuredImageUrl: safe.featuredImageUrl,
      };
      currentArticles.unshift(newArticle);
      return NextResponse.json({ success: true, article: newArticle });
    }

    if (action === 'update_article') {
      if (!payload?.id || typeof payload.id !== 'string') {
        return NextResponse.json({ success: false, message: 'Article ID required' }, { status: 400 });
      }
      const index = currentArticles.findIndex((a) => a.id === payload.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
      }
      const safe = sanitizeArticlePayload(payload);
      currentArticles[index] = {
        ...currentArticles[index],
        title: safe.title || currentArticles[index].title,
        category: safe.category,
        excerpt: safe.excerpt || currentArticles[index].excerpt,
        content: safe.content || currentArticles[index].content,
        readingTime: safe.readingTime,
        featuredImageUrl: safe.featuredImageUrl || currentArticles[index].featuredImageUrl,
        author: {
          ...currentArticles[index].author,
          name: safe.authorName || currentArticles[index].author.name,
          role: safe.authorRole || currentArticles[index].author.role,
        },
      };
      return NextResponse.json({ success: true, article: currentArticles[index] });
    }

    if (action === 'delete_article') {
      if (!payload?.id || typeof payload.id !== 'string') {
        return NextResponse.json({ success: false, message: 'Article ID required' }, { status: 400 });
      }
      currentArticles = currentArticles.filter((a) => a.id !== payload.id);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_metrics') {
      if (!Array.isArray(payload)) {
        return NextResponse.json({ success: false, message: 'Payload must be an array' }, { status: 400 });
      }
      currentMetrics = payload.slice(0, 20).map((m: Record<string, unknown>, i: number): ImpactMetric => ({
        id: String(m.id ?? `metric-${i}`),
        number: String(m.number ?? '').slice(0, 20),
        label: String(m.label ?? '').slice(0, 100),
        description: String(m.description ?? '').slice(0, 200),
      }));
      return NextResponse.json({ success: true, metrics: currentMetrics });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update content' }, { status: 500 });
  }
}
