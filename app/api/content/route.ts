import { NextResponse } from 'next/server';
import { activeSessions } from '@/lib/sessions';
import { ARTICLES, IMPACT_METRICS, PROGRAMS, GALLERY_ITEMS } from '@/lib/data';
import type { Article, ImpactMetric, GalleryItem } from '@/lib/types';
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';

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

// ── Allowed gallery categories ─────────────────────────────────────────────
const ALLOWED_GALLERY_CATEGORIES = [
  'Community Outreach',
  'Faith and Spiritual Development',
  'Leadership Development',
  'School Outreaches',
  'Women Empowerment',
] as const;

type AllowedGalleryCategory = typeof ALLOWED_GALLERY_CATEGORIES[number];

function isAllowedGalleryCategory(val: unknown): val is AllowedGalleryCategory {
  return typeof val === 'string' && (ALLOWED_GALLERY_CATEGORIES as readonly string[]).includes(val);
}

// ── File-system persistence (survives server restarts) ────────────────────
const DATA_DIR = join(process.cwd(), '.cms-data');
const STORE_PATH = join(DATA_DIR, 'store.json');

interface CmsStore {
  articles: Article[];
  metrics: ImpactMetric[];
  gallery: GalleryItem[];
}

function readStore(): CmsStore {
  try {
    if (existsSync(STORE_PATH)) {
      const raw = readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw) as CmsStore;
    }
  } catch {
    // fallback to static data if store is corrupt
  }
  return {
    articles: [...ARTICLES],
    metrics: [...IMPACT_METRICS],
    gallery: [...GALLERY_ITEMS],
  };
}

function writeStore(store: CmsStore): void {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    // Write to a temp file first, then rename atomically.
    // This avoids OneDrive / antivirus file-lock races on Windows that
    // would cause a direct writeFileSync to throw and lose data silently.
    const tmpPath = STORE_PATH + '.tmp';
    writeFileSync(tmpPath, JSON.stringify(store, null, 2), 'utf-8');
    // Clean up any stale final file before rename
    if (existsSync(STORE_PATH)) unlinkSync(STORE_PATH);
    renameSync(tmpPath, STORE_PATH);
  } catch (err) {
    // Surface the error in development so it's not invisible
    if (process.env.NODE_ENV !== 'production') {
      console.error('[CMS] writeStore failed:', err);
    }
    // non-fatal — in-memory values still work for the current session
  }
}

// ── In-memory cache (loaded from disk on first request) ───────────────────
const _store = readStore();
let currentArticles: Article[] = _store.articles;
let currentMetrics: ImpactMetric[] = _store.metrics;
const currentPrograms = [...PROGRAMS];  // programs are code-only, not CMS-managed
let currentGallery: GalleryItem[] = _store.gallery;

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

function sanitizeGalleryPayload(payload: Record<string, unknown>) {
  const rawPhotos = Array.isArray(payload.photos) ? payload.photos : [];
  const photos = rawPhotos.slice(0, 30).map((p: any, idx: number) => ({
    id: String(p?.id || `photo-${Date.now()}-${idx}`),
    url: String(p?.url || '').slice(0, 500),
    caption: p?.caption ? String(p.caption).slice(0, 300) : undefined,
  })).filter((p: any) => p.url.trim().length > 0);

  return {
    title: String(payload.title ?? '').slice(0, 300),
    category: isAllowedGalleryCategory(payload.category)
      ? (payload.category as AllowedGalleryCategory)
      : ('Community Outreach' as AllowedGalleryCategory),
    date: String(payload.date ?? '').slice(0, 100),
    location: String(payload.location ?? '').slice(0, 200),
    imageUrl: String(payload.imageUrl ?? '').slice(0, 500),
    caption: String(payload.caption ?? '').slice(0, 1000),
    impactHighlight: payload.impactHighlight ? String(payload.impactHighlight).slice(0, 200) : undefined,
    photos,
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
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
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
      // Flatten the nested author object so sanitizeArticlePayload can read
      // authorName / authorRole at the top level (matches the payload shape
      // that the admin page sends when editing an existing article).
      const flatPayload: Record<string, unknown> = { ...payload };
      if (payload.author && typeof payload.author === 'object') {
        const author = payload.author as Record<string, unknown>;
        if (!flatPayload.authorName) flatPayload.authorName = author.name;
        if (!flatPayload.authorRole) flatPayload.authorRole = author.role;
      }
      const safe = sanitizeArticlePayload(flatPayload);
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
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
      return NextResponse.json({ success: true, article: currentArticles[index] });
    }

    if (action === 'delete_article') {
      if (!payload?.id || typeof payload.id !== 'string') {
        return NextResponse.json({ success: false, message: 'Article ID required' }, { status: 400 });
      }
      currentArticles = currentArticles.filter((a) => a.id !== payload.id);
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
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
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
      return NextResponse.json({ success: true, metrics: currentMetrics });
    }

    if (action === 'add_gallery') {
      const safe = sanitizeGalleryPayload(payload || {});
      if (!safe.title) return NextResponse.json({ success: false, message: 'Title required' }, { status: 400 });
      if (!safe.imageUrl && safe.photos.length === 0) {
        return NextResponse.json({ success: false, message: 'Cover image required' }, { status: 400 });
      }

      const coverImage = safe.imageUrl || safe.photos[0]?.url;
      const slug = safe.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `album-${Date.now()}`;

      const newGalleryItem: GalleryItem = {
        id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        slug,
        title: safe.title,
        category: safe.category,
        date: safe.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        location: safe.location || 'Ghana',
        imageUrl: coverImage,
        caption: safe.caption,
        impactHighlight: safe.impactHighlight,
        photoCount: safe.photos.length > 0 ? safe.photos.length : 1,
        photos: safe.photos.length > 0 ? safe.photos : [{ id: `photo-${Date.now()}-0`, url: coverImage, caption: safe.caption }],
      };

      currentGallery.unshift(newGalleryItem);
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
      return NextResponse.json({ success: true, galleryItem: newGalleryItem });
    }

    if (action === 'update_gallery') {
      if (!payload?.id || typeof payload.id !== 'string') {
        return NextResponse.json({ success: false, message: 'Gallery item ID required' }, { status: 400 });
      }
      const index = currentGallery.findIndex((g) => g.id === payload.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Gallery item not found' }, { status: 404 });
      }
      const safe = sanitizeGalleryPayload(payload);
      const existing = currentGallery[index];
      const coverImage = safe.imageUrl || safe.photos[0]?.url || existing.imageUrl;
      const photos = safe.photos.length > 0 ? safe.photos : existing.photos;

      currentGallery[index] = {
        ...existing,
        title: safe.title || existing.title,
        category: safe.category,
        date: safe.date || existing.date,
        location: safe.location || existing.location,
        imageUrl: coverImage,
        caption: safe.caption || existing.caption,
        impactHighlight: safe.impactHighlight ?? existing.impactHighlight,
        photoCount: photos?.length || 1,
        photos,
      };

      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
      return NextResponse.json({ success: true, galleryItem: currentGallery[index] });
    }

    if (action === 'delete_gallery') {
      if (!payload?.id || typeof payload.id !== 'string') {
        return NextResponse.json({ success: false, message: 'Gallery item ID required' }, { status: 400 });
      }
      currentGallery = currentGallery.filter((g) => g.id !== payload.id);
      writeStore({ articles: currentArticles, metrics: currentMetrics, gallery: currentGallery });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update content' }, { status: 500 });
  }
}
