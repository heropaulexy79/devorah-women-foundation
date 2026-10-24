import { neon } from '@neondatabase/serverless';
import { 
  ARTICLES, 
  LEADERSHIP_PEOPLE, 
  PROGRAMS, 
  GALLERY_ITEMS, 
  IMPACT_METRICS 
} from '@/lib/data';
import type { 
  Article, 
  Person, 
  Program, 
  GalleryItem, 
  ImpactMetric 
} from '@/lib/types';

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: 'womendevorah@gmail.com',
  contactPhone: '08030526200',
  officeAddress: 'Lagos, Nigeria',
  bankName: 'Devorah Women Foundation',
  accountNumber: '1234567890',
  accountName: "Devorah Women's Leadership Initiative",
  currency: 'NGN',
};

// Check if Neon Database URL is configured
function getSql() {
  const connectionString = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;
  if (!connectionString) return null;
  try {
    return neon(connectionString);
  } catch (err) {
    console.error('[DB] Failed to initialize neon client:', err);
    return null;
  }
}

let tableInitialized = false;

type SqlClient = NonNullable<ReturnType<typeof getSql>>;

async function ensureTable(sql: SqlClient) {
  if (tableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cms_store (
        key VARCHAR(64) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    tableInitialized = true;
  } catch (err) {
    console.error('[DB] ensureTable error:', err);
    throw err;
  }
}

export async function testDbConnection(): Promise<{ connected: boolean; error?: string; databaseConfigured: boolean }> {
  const connectionString = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL || 
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    return { connected: false, databaseConfigured: false, error: 'No DATABASE_URL or POSTGRES_URL found in environment variables.' };
  }

  try {
    const sql = neon(connectionString);
    await ensureTable(sql);
    const testResult = await sql`SELECT 1 as test`;
    if (testResult && testResult.length > 0) {
      return { connected: true, databaseConfigured: true };
    }
    return { connected: false, databaseConfigured: true, error: 'Database query returned empty response.' };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { connected: false, databaseConfigured: true, error: message };
  }
}

// ── Generic Key-Value store with Neon and local fallback ────────────────────

export async function getCmsItem<T>(key: string, defaultValue: T): Promise<T> {
  const sql = getSql();
  if (!sql) return defaultValue;

  try {
    await ensureTable(sql);
    const rows = await sql`SELECT data FROM cms_store WHERE key = ${key} LIMIT 1`;
    if (rows && rows.length > 0 && rows[0].data !== undefined && rows[0].data !== null) {
      const raw = rows[0].data;
      return (typeof raw === 'string' ? JSON.parse(raw) : raw) as T;
    }
    // If not seeded yet, seed it with defaultValue
    const jsonStr = JSON.stringify(defaultValue);
    await sql`
      INSERT INTO cms_store (key, data, updated_at)
      VALUES (${key}, ${jsonStr}::jsonb, NOW())
      ON CONFLICT (key) DO NOTHING;
    `;
    return defaultValue;
  } catch (err) {
    console.error(`[DB] getCmsItem error for key "${key}":`, err);
    return defaultValue;
  }
}

export async function setCmsItem<T>(key: string, value: T): Promise<boolean> {
  const sql = getSql();
  if (!sql) {
    console.warn(`[DB] No DATABASE_URL/POSTGRES_URL found. Unable to persist key "${key}" to Neon.`);
    return false;
  }

  try {
    await ensureTable(sql);
    const jsonStr = JSON.stringify(value);
    await sql`
      INSERT INTO cms_store (key, data, updated_at)
      VALUES (${key}, ${jsonStr}::jsonb, NOW())
      ON CONFLICT (key) 
      DO UPDATE SET 
        data = ${jsonStr}::jsonb,
        updated_at = NOW();
    `;
    return true;
  } catch (err) {
    console.error(`[DB] setCmsItem error for key "${key}":`, err);
    return false;
  }
}

// ── Strongly-typed accessor functions ──────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  const stored = await getCmsItem<Article[]>('articles', [...ARTICLES]);
  if (!Array.isArray(stored) || stored.length === 0) return [...ARTICLES];

  let updatedAny = false;
  const cleaned = stored.map((art) => {
    let changed = false;
    let featuredImageUrl = art.featuredImageUrl;
    let avatarUrl = art.author?.avatarUrl;

    if (featuredImageUrl && (
      featuredImageUrl.includes('story_beneficiary') ||
      featuredImageUrl.includes('hero_portrait') ||
      featuredImageUrl.includes('who_we_are')
    )) {
      featuredImageUrl = '/images/leadership development/SV2L9258.jpeg';
      changed = true;
    }

    if (avatarUrl && (avatarUrl.includes('founder_portrait') || avatarUrl.includes('hero_portrait'))) {
      avatarUrl = '/images/board/Faith-Akinola.jpeg';
      changed = true;
    }

    if (changed) {
      updatedAny = true;
      return {
        ...art,
        featuredImageUrl,
        author: { ...art.author, avatarUrl },
      };
    }
    return art;
  });

  if (updatedAny) {
    setCmsItem('articles', cleaned).catch(() => {});
    return cleaned;
  }
  return stored;
}

export async function saveArticles(articles: Article[]): Promise<boolean> {
  return setCmsItem<Article[]>('articles', articles);
}

export async function getBoardMembers(): Promise<Person[]> {
  const stored = await getCmsItem<Person[]>('board_members', [...LEADERSHIP_PEOPLE]);
  if (!Array.isArray(stored) || stored.length === 0) return [...LEADERSHIP_PEOPLE];

  let needsSave = false;
  // Remove legacy placeholder 'board-3' if previously saved
  let baseList = stored.filter((p) => p.id !== 'board-3');
  if (baseList.length !== stored.length) {
    needsSave = true;
  }

  const storedIds = new Set(baseList.map((p) => p.id));
  const missing = LEADERSHIP_PEOPLE.filter((p) => !storedIds.has(p.id));

  if (missing.length > 0) {
    baseList = [...baseList, ...missing];
    needsSave = true;
  }

  // Sanitize any stale AI image paths in stored board members
  const cleaned = baseList.map((member) => {
    if (member.id === 'board-dr-olaitan-titilayo-akinola' && (!member.imageUrl || member.imageUrl === '/logo.png')) {
      needsSave = true;
      return {
        ...member,
        imageUrl: '/images/board/Dr-Olaitan-Akinola.jpeg',
      };
    }
    if (member.imageUrl && (member.imageUrl.includes('board_trustee') || member.imageUrl.includes('founder_portrait'))) {
      needsSave = true;
      return {
        ...member,
        imageUrl: member.id === 'founder' ? '/images/board/Faith-Akinola.jpeg' : '/logo.png',
      };
    }
    return member;
  });

  if (needsSave) {
    setCmsItem('board_members', cleaned).catch(() => {});
  }
  return cleaned;
}

export async function saveBoardMembers(members: Person[]): Promise<boolean> {
  return setCmsItem<Person[]>('board_members', members);
}

export async function getPrograms(): Promise<Program[]> {
  const stored = await getCmsItem<Program[]>('programs', [...PROGRAMS]);
  if (!Array.isArray(stored) || stored.length === 0) return [...PROGRAMS];

  let updatedAny = false;
  const cleaned = stored.map((p) => {
    if (
      Array.isArray(p.galleryImages) &&
      p.galleryImages.some(
        (img) =>
          img.includes('who_we_are') ||
          img.includes('story_beneficiary') ||
          img.includes('hero_portrait') ||
          img.includes('founder_portrait')
      )
    ) {
      updatedAny = true;
      return {
        ...p,
        galleryImages: (p.galleryImages || []).map((img) => {
          if (img.includes('who_we_are')) return '/images/heroslider/women-empowerment.PNG';
          if (img.includes('story_beneficiary')) return '/images/School Outreaches/IMG_5808.PNG';
          if (img.includes('hero_portrait')) return '/images/leadership development/SV2L9258.jpeg';
          if (img.includes('founder_portrait')) return '/images/board/Faith-Akinola.jpeg';
          return img;
        }),
      };
    }
    return p;
  });

  if (updatedAny) {
    setCmsItem('programs', cleaned).catch(() => {});
    return cleaned;
  }
  return stored;
}

export async function savePrograms(programs: Program[]): Promise<boolean> {
  return setCmsItem<Program[]>('programs', programs);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return getCmsItem<GalleryItem[]>('gallery', [...GALLERY_ITEMS]);
}

export async function saveGallery(gallery: GalleryItem[]): Promise<boolean> {
  return setCmsItem<GalleryItem[]>('gallery', gallery);
}

export async function getMetrics(): Promise<ImpactMetric[]> {
  return getCmsItem<ImpactMetric[]>('metrics', [...IMPACT_METRICS]);
}

export async function saveMetrics(metrics: ImpactMetric[]): Promise<boolean> {
  return setCmsItem<ImpactMetric[]>('metrics', metrics);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getCmsItem<SiteSettings>('site_settings', DEFAULT_SETTINGS);
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  return setCmsItem<SiteSettings>('site_settings', settings);
}
