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
    process.env.POSTGRES_PRISMA_URL;
  if (!connectionString) return null;
  try {
    return neon(connectionString);
  } catch {
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
  }
}

// ── Generic Key-Value store with Neon and local fallback ────────────────────

export async function getCmsItem<T>(key: string, defaultValue: T): Promise<T> {
  const sql = getSql();
  if (!sql) return defaultValue;

  try {
    await ensureTable(sql);
    const rows = await sql`SELECT data FROM cms_store WHERE key = ${key} LIMIT 1`;
    if (rows && rows.length > 0 && rows[0].data) {
      return rows[0].data as T;
    }
    // If not seeded yet, seed it with defaultValue
    await sql`
      INSERT INTO cms_store (key, data, updated_at)
      VALUES (${key}, ${JSON.stringify(defaultValue)}::jsonb, NOW())
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
    console.warn(`[DB] No DATABASE_URL found. Unable to persist key "${key}" to Neon.`);
    return false;
  }

  try {
    await ensureTable(sql);
    await sql`
      INSERT INTO cms_store (key, data, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
      ON CONFLICT (key) 
      DO UPDATE SET 
        data = ${JSON.stringify(value)}::jsonb,
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
  return getCmsItem<Article[]>('articles', [...ARTICLES]);
}

export async function saveArticles(articles: Article[]): Promise<boolean> {
  return setCmsItem<Article[]>('articles', articles);
}

export async function getBoardMembers(): Promise<Person[]> {
  return getCmsItem<Person[]>('board_members', [...LEADERSHIP_PEOPLE]);
}

export async function saveBoardMembers(members: Person[]): Promise<boolean> {
  return setCmsItem<Person[]>('board_members', members);
}

export async function getPrograms(): Promise<Program[]> {
  return getCmsItem<Program[]>('programs', [...PROGRAMS]);
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
