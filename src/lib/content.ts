import 'server-only';
/**
 * Content access layer. Pages only talk to these functions.
 *  - Sanity (/studio) — every photo folder and achievement; edit them there (cached ~1 min)
 *  - public/gallery   — optional folders dropped into the repo (scripts/gallery-index.mjs)
 *  - src/data/*       — portfolio editions, profile and the media used by them
 */
import { academicYears, categories, semesters } from '@/data/achievements';
import { partnerGroups } from '@/data/folders';
import generatedFolders from '@/data/folders.generated.json';
import { editions, getEdition } from '@/data/portfolios';
import { resolve, resolveAll } from '@/data/media';
import { editionCredits } from '@/data/showcase';
import type { FolderView, PortfolioEdition, ShowcaseItem } from '@/data/types';
import { getCmsAchievements, getCmsFolders } from '@/sanity/fetch';

export { resolve, resolveAll };

const pad = (n: number) => String(n).padStart(2, '0');

/* ───────── Achievements ───────── */

export async function getAchievements() {
  const cms = await getCmsAchievements();
  return {
    years: academicYears,
    semesters,
    categories,
    items: cms,
  };
}

/* ───────── Gallery folders ───────── */

type FsFolder = Omit<FolderView, 'source' | 'indexNumber'> & { indexNumber?: string };

/**
 * Every photo folder from all three sources, newest first.
 * Precedence when ids collide: Sanity > public/gallery.
 * Missing index numbers are assigned per year in chronological order (01 = earliest).
 */
export async function getFolders(): Promise<FolderView[]> {
  const cms = await getCmsFolders();
  const fs: FolderView[] = (generatedFolders as unknown as FsFolder[]).map((f) => ({
    ...f,
    indexNumber: f.indexNumber ?? '',
    source: 'filesystem',
  }));
  const byId = new Map<string, FolderView>();
  for (const f of [...fs, ...cms]) byId.set(f.id, f);
  const all = [...byId.values()];

  const years = new Map<number, FolderView[]>();
  for (const f of all) years.set(f.year, [...(years.get(f.year) ?? []), f]);
  for (const list of years.values()) {
    list
      .toSorted((a, b) => a.date.localeCompare(b.date))
      .forEach((f, i) => {
        if (!f.indexNumber) f.indexNumber = pad(i + 1);
      });
  }
  return all.toSorted((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export async function getFolderBySlug(slug: string) {
  const all = await getFolders();
  const i = all.findIndex((f) => f.id === slug);
  if (i < 0) return undefined;
  return { folder: all[i], prev: all[i - 1], next: all[i + 1] ?? all[0] };
}

export async function getFolderSlugs() {
  return (await getFolders()).map((f) => f.id);
}

export { partnerGroups };

/* ───────── Portfolios ───────── */

export function getEditions() {
  return editions.map((e) => ({ ...e, cover: resolve(e.cover) }));
}

export function getEditionBySlug(slug: PortfolioEdition['slug']) {
  const e = getEdition(slug);
  return { ...e, cover: resolve(e.cover) };
}

/* ───────── Showcase (cinema-archival card stack) ───────── */

export function getEditionShowcase(): ShowcaseItem[] {
  return editions.map((e, i) => {
    const c = editionCredits[e.slug];
    return {
      id: `edition-${e.slug}`,
      href: `/portfolios/${e.slug}`,
      index: pad(i + 1),
      year: c.year,
      title: e.title,
      category: `Portfolio · ${e.language}`,
      role: c.role,
      yearSemester: c.yearSemester,
      gearClient: c.gearClient,
      specs: c.specs,
      quote: c.quote,
      cover: resolve(e.cover),
      secondary: { href: e.pdf.href, label: `PDF · ${e.pdf.sizeMb}MB` },
    };
  });
}

function folderToShowcase(f: FolderView): ShowcaseItem {
  const group = partnerGroups.find((g) => g.id === f.partnerGroup)?.label ?? '';
  return {
    id: `folder-${f.id}`,
    href: `/gallery/${f.id}`,
    index: '',
    year: String(f.year),
    title: f.title,
    category: group,
    role: f.role ?? 'Photographer',
    yearSemester: [f.year, f.semester].filter(Boolean).join(' · '),
    gearClient: f.organization,
    specs: `${f.images.length} frames`,
    quote: f.quote || f.summary || f.organization,
    cover: f.coverImage,
  };
}

const reindex = (items: ShowcaseItem[]) => items.map((s, i) => ({ ...s, index: pad(i + 1) }));

/** Home: the three editions, then folders flagged “featured” in Studio, newest first. */
export async function getFeaturedWorks(): Promise<ShowcaseItem[]> {
  const featured = (await getFolders()).filter((f) => f.featured).slice(0, 5).map(folderToShowcase);
  return reindex([...getEditionShowcase(), ...featured]);
}
