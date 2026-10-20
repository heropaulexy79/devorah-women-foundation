import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/sessions';
import { 
  getArticles, 
  saveArticles,
  getBoardMembers,
  saveBoardMembers,
  getPrograms,
  savePrograms,
  getGallery,
  saveGallery,
  getMetrics,
  saveMetrics,
  getSiteSettings,
  saveSiteSettings
} from '@/lib/db';
import type { Article, Person, Program, GalleryItem, ImpactMetric } from '@/lib/types';

export const dynamic = 'force-dynamic';

function isAuthenticated(req: Request): boolean {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .find((c) => c.trim().startsWith('devorah_admin_session='))
    ?.split('=')[1]
    ?.trim();
  return verifySessionToken(token);
}

// ── GET: Public reads ───────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  try {
    if (type === 'articles') {
      const articles = await getArticles();
      return NextResponse.json({ articles });
    }
    if (type === 'board' || type === 'board_members') {
      const boardMembers = await getBoardMembers();
      return NextResponse.json({ boardMembers });
    }
    if (type === 'programs') {
      const programs = await getPrograms();
      return NextResponse.json({ programs });
    }
    if (type === 'gallery') {
      const gallery = await getGallery();
      return NextResponse.json({ gallery });
    }
    if (type === 'metrics') {
      const metrics = await getMetrics();
      return NextResponse.json({ metrics });
    }
    if (type === 'settings') {
      const settings = await getSiteSettings();
      return NextResponse.json({ settings });
    }

    const [articles, boardMembers, programs, gallery, metrics, settings] = await Promise.all([
      getArticles(),
      getBoardMembers(),
      getPrograms(),
      getGallery(),
      getMetrics(),
      getSiteSettings(),
    ]);

    return NextResponse.json({
      articles,
      boardMembers,
      programs,
      gallery,
      metrics,
      settings,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error fetching content';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ── POST: Authenticated CMS mutations ──────────────────────────────────────
export async function POST(req: Request) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!action || typeof action !== 'string') {
      return NextResponse.json({ success: false, message: 'Missing action' }, { status: 400 });
    }

    // ── 1. Articles Actions ────────────────────────────────────────────────
    if (action === 'add_article') {
      const articles = await getArticles();
      const title = String(payload?.title || '').trim();
      if (!title) return NextResponse.json({ success: false, message: 'Title is required' }, { status: 400 });

      const newArticle: Article = {
        id: `art-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title,
        category: payload?.category || 'Foundation News',
        excerpt: String(payload?.excerpt || ''),
        content: String(payload?.content || ''),
        readingTime: String(payload?.readingTime || '4 min read'),
        author: {
          name: payload?.authorName || payload?.author?.name || 'Faith Akinola',
          role: payload?.authorRole || payload?.author?.role || 'Founder',
          avatarUrl: payload?.author?.avatarUrl || '/images/board/Faith-Akinola.jpeg',
        },
        featuredImageUrl: payload?.featuredImageUrl || '/images/board/Faith-Akinola.jpeg',
      };

      articles.unshift(newArticle);
      await saveArticles(articles);
      return NextResponse.json({ success: true, article: newArticle });
    }

    if (action === 'update_article') {
      const articles = await getArticles();
      const index = articles.findIndex((a) => a.id === payload?.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
      }

      articles[index] = {
        ...articles[index],
        title: payload?.title || articles[index].title,
        category: payload?.category || articles[index].category,
        excerpt: payload?.excerpt ?? articles[index].excerpt,
        content: payload?.content ?? articles[index].content,
        readingTime: payload?.readingTime ?? articles[index].readingTime,
        featuredImageUrl: payload?.featuredImageUrl ?? articles[index].featuredImageUrl,
        author: {
          ...articles[index].author,
          name: payload?.authorName || payload?.author?.name || articles[index].author.name,
          role: payload?.authorRole || payload?.author?.role || articles[index].author.role,
        },
      };

      await saveArticles(articles);
      return NextResponse.json({ success: true, article: articles[index] });
    }

    if (action === 'delete_article') {
      const articles = await getArticles();
      const updated = articles.filter((a) => a.id !== payload?.id);
      await saveArticles(updated);
      return NextResponse.json({ success: true });
    }

    // ── 2. Board Members Actions ───────────────────────────────────────────
    if (action === 'update_board_member') {
      const members = await getBoardMembers();
      const index = members.findIndex((m) => m.id === payload?.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
      }

      members[index] = {
        ...members[index],
        name: payload?.name || members[index].name,
        title: payload?.title || members[index].title,
        role: payload?.role || members[index].role,
        badge: payload?.badge || members[index].badge,
        biography: payload?.biography ?? members[index].biography,
        background: payload?.background ?? members[index].background,
        education: payload?.education ?? members[index].education,
        vision: payload?.vision ?? members[index].vision,
        quote: payload?.quote ?? members[index].quote,
        imageUrl: payload?.imageUrl || members[index].imageUrl,
        expertise: Array.isArray(payload?.expertise) ? payload.expertise : members[index].expertise,
      };

      await saveBoardMembers(members);
      return NextResponse.json({ success: true, member: members[index] });
    }

    if (action === 'add_board_member') {
      const members = await getBoardMembers();
      const name = String(payload?.name || '').trim();
      if (!name) return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });

      const newMember: Person = {
        id: `board-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name,
        title: payload?.title || 'Board Member',
        role: payload?.role || 'Board Member',
        category: 'Board Member',
        badge: payload?.badge || 'Board Member',
        biography: String(payload?.biography || ''),
        background: payload?.background,
        education: payload?.education,
        vision: payload?.vision,
        quote: payload?.quote,
        imageUrl: payload?.imageUrl || '/images/board_trustee_1.jpg',
        expertise: Array.isArray(payload?.expertise) ? payload.expertise : [],
      };

      members.push(newMember);
      await saveBoardMembers(members);
      return NextResponse.json({ success: true, member: newMember });
    }

    if (action === 'delete_board_member') {
      const members = await getBoardMembers();
      const updated = members.filter((m) => m.id !== payload?.id);
      await saveBoardMembers(updated);
      return NextResponse.json({ success: true });
    }

    // ── 3. Programs Actions ────────────────────────────────────────────────
    if (action === 'update_program') {
      const programs = await getPrograms();
      const index = programs.findIndex((p) => p.id === payload?.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Program not found' }, { status: 404 });
      }

      programs[index] = {
        ...programs[index],
        name: payload?.name || programs[index].name,
        tagline: payload?.tagline ?? programs[index].tagline,
        description: payload?.description ?? programs[index].description,
        targetAudience: payload?.targetAudience ?? programs[index].targetAudience,
        imageUrl: payload?.imageUrl || programs[index].imageUrl,
        objectives: Array.isArray(payload?.objectives) ? payload.objectives : programs[index].objectives,
        activities: Array.isArray(payload?.activities) ? payload.activities : programs[index].activities,
      };

      await savePrograms(programs);
      return NextResponse.json({ success: true, program: programs[index] });
    }

    // ── 4. Gallery Actions ─────────────────────────────────────────────────
    if (action === 'add_gallery') {
      const gallery = await getGallery();
      const title = String(payload?.title || '').trim();
      if (!title) return NextResponse.json({ success: false, message: 'Title required' }, { status: 400 });

      const coverImage = payload?.imageUrl || payload?.photos?.[0]?.url || '/images/gallery_outreach.png';
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `album-${Date.now()}`;

      const newAlbum: GalleryItem = {
        id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        slug,
        title,
        category: payload?.category || 'Community Outreach',
        date: payload?.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        location: payload?.location || 'Lagos, Nigeria',
        imageUrl: coverImage,
        caption: payload?.caption || '',
        impactHighlight: payload?.impactHighlight,
        photoCount: Array.isArray(payload?.photos) && payload.photos.length > 0 ? payload.photos.length : 1,
        photos: Array.isArray(payload?.photos) && payload.photos.length > 0 ? payload.photos : [{ id: `p-${Date.now()}`, url: coverImage }],
      };

      gallery.unshift(newAlbum);
      await saveGallery(gallery);
      return NextResponse.json({ success: true, galleryItem: newAlbum });
    }

    if (action === 'update_gallery') {
      const gallery = await getGallery();
      const index = gallery.findIndex((g) => g.id === payload?.id);
      if (index === -1) {
        return NextResponse.json({ success: false, message: 'Gallery item not found' }, { status: 404 });
      }

      gallery[index] = {
        ...gallery[index],
        title: payload?.title || gallery[index].title,
        category: payload?.category || gallery[index].category,
        date: payload?.date || gallery[index].date,
        location: payload?.location || gallery[index].location,
        imageUrl: payload?.imageUrl || gallery[index].imageUrl,
        caption: payload?.caption ?? gallery[index].caption,
        impactHighlight: payload?.impactHighlight ?? gallery[index].impactHighlight,
        photos: Array.isArray(payload?.photos) ? payload.photos : gallery[index].photos,
        photoCount: Array.isArray(payload?.photos) ? payload.photos.length : gallery[index].photoCount,
      };

      await saveGallery(gallery);
      return NextResponse.json({ success: true, galleryItem: gallery[index] });
    }

    if (action === 'delete_gallery') {
      const gallery = await getGallery();
      const updated = gallery.filter((g) => g.id !== payload?.id);
      await saveGallery(updated);
      return NextResponse.json({ success: true });
    }

    // ── 5. Metrics & Settings Actions ──────────────────────────────────────
    if (action === 'update_metrics') {
      if (!Array.isArray(payload)) {
        return NextResponse.json({ success: false, message: 'Payload must be an array' }, { status: 400 });
      }
      const metrics: ImpactMetric[] = payload.map((m, i) => ({
        id: String(m.id || `metric-${i}`),
        number: String(m.number || ''),
        label: String(m.label || ''),
        description: String(m.description || ''),
      }));
      await saveMetrics(metrics);
      return NextResponse.json({ success: true, metrics });
    }

    if (action === 'update_site_settings') {
      const current = await getSiteSettings();
      const updated = { ...current, ...(payload || {}) };
      await saveSiteSettings(updated);
      return NextResponse.json({ success: true, settings: updated });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
