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
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

// Check if Firebase is configured
function isFirebaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  );
}

export async function testDbConnection(): Promise<{ connected: boolean; error?: string; databaseConfigured: boolean }> {
  if (!isFirebaseConfigured()) {
    return { 
      connected: false, 
      databaseConfigured: false, 
      error: 'Firebase environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_API_KEY) are not set in .env.local' 
    };
  }

  try {
    const testDoc = doc(db, 'cms_store', 'connection_test');
    await setDoc(testDoc, { testedAt: new Date().toISOString() }, { merge: true });
    return { connected: true, databaseConfigured: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { connected: false, databaseConfigured: true, error: message };
  }
}

// ── Generic Firestore document store with local data fallback ────────────────

export async function getCmsItem<T>(key: string, defaultValue: T): Promise<T> {
  if (!isFirebaseConfigured()) {
    return defaultValue;
  }

  try {
    const docRef = doc(db, 'cms_store', key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.data !== undefined ? data.data : data) as T;
    }

    // Seed initial default value into Firestore if not present yet
    await setDoc(docRef, { data: defaultValue, updatedAt: new Date().toISOString() });
    return defaultValue;
  } catch (err) {
    console.error(`[Firebase] getCmsItem error for key "${key}":`, err);
    return defaultValue;
  }
}

export async function setCmsItem<T>(key: string, value: T): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    console.warn(`[Firebase] No Firebase Project ID found. Unable to persist key "${key}".`);
    return false;
  }

  try {
    const docRef = doc(db, 'cms_store', key);
    await setDoc(docRef, { data: value, updatedAt: new Date().toISOString() });
    return true;
  } catch (err) {
    console.error(`[Firebase] setCmsItem error for key "${key}":`, err);
    return false;
  }
}

// ── Strongly-typed accessor functions ──────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  const stored = await getCmsItem<Article[]>('articles', [...ARTICLES]);
  if (!Array.isArray(stored) || stored.length === 0) return [...ARTICLES];
  return stored;
}

export async function saveArticles(articles: Article[]): Promise<boolean> {
  return setCmsItem('articles', articles);
}

export async function getPrograms(): Promise<Program[]> {
  const stored = await getCmsItem<Program[]>('programs', [...PROGRAMS]);
  if (!Array.isArray(stored) || stored.length === 0) return [...PROGRAMS];
  return stored.map((prog) => {
    const defaultProg = PROGRAMS.find((d) => d.slug === prog.slug || d.id === prog.id);
    if (!defaultProg) return prog;
    if (defaultProg.galleryImages && (!prog.galleryImages || prog.galleryImages.length < defaultProg.galleryImages.length)) {
      return { ...prog, galleryImages: defaultProg.galleryImages };
    }
    return prog;
  });
}

export async function savePrograms(programs: Program[]): Promise<boolean> {
  return setCmsItem('programs', programs);
}

export async function getGallery(): Promise<GalleryItem[]> {
  const stored = await getCmsItem<GalleryItem[]>('gallery', [...GALLERY_ITEMS]);
  if (!Array.isArray(stored) || stored.length === 0) return [...GALLERY_ITEMS];
  return stored.map((item) => {
    const defaultItem = GALLERY_ITEMS.find((d) => d.id === item.id || d.slug === item.slug);
    if (!defaultItem) return item;
    if (defaultItem.photos && defaultItem.photos.length > (item.photos?.length || 0)) {
      return {
        ...item,
        photoCount: defaultItem.photos.length,
        photos: defaultItem.photos,
      };
    }
    return item;
  });
}

export async function saveGallery(gallery: GalleryItem[]): Promise<boolean> {
  return setCmsItem('gallery', gallery);
}

export async function getBoardMembers(): Promise<Person[]> {
  const stored = await getCmsItem<Person[]>('board_members', [...LEADERSHIP_PEOPLE]);
  if (!Array.isArray(stored) || stored.length === 0) return [...LEADERSHIP_PEOPLE];
  return stored;
}

export async function saveBoardMembers(people: Person[]): Promise<boolean> {
  return setCmsItem('board_members', people);
}

export const getLeadership = getBoardMembers;
export const saveLeadership = saveBoardMembers;

export async function getSiteSettings(): Promise<SiteSettings> {
  const stored = await getCmsItem<SiteSettings>('site_settings', DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  return setCmsItem('site_settings', settings);
}

export const getSettings = getSiteSettings;
export const saveSettings = saveSiteSettings;

export async function getMetrics(): Promise<ImpactMetric[]> {
  const stored = await getCmsItem<ImpactMetric[]>('impact_metrics', [...IMPACT_METRICS]);
  if (!Array.isArray(stored) || stored.length === 0) return [...IMPACT_METRICS];
  return stored;
}

export async function saveMetrics(metrics: ImpactMetric[]): Promise<boolean> {
  return setCmsItem('impact_metrics', metrics);
}

export const getImpactMetrics = getMetrics;
export const saveImpactMetrics = saveMetrics;
