import 'server-only';
/**
 * Content access layer. Pages only talk to these functions.
 * Two sources are merged here:
 *  - src/data/*   — the archive built from the original PDFs (static, in the repo)
 *  - Sanity       — albums (Bộ ảnh) and achievements Minh adds in /studio (cached ~1 min)
 */
import { achievements, academicYears, categories, semesters } from '@/data/achievements';
import { collections, getCollection } from '@/data/gallery';
import { editions, getEdition } from '@/data/portfolios';
import { resolve, resolveAll } from '@/data/media';
import { collectionCredits, editionCredits } from '@/data/showcase';
import type { GalleryCollection, PortfolioEdition, ResolvedMedia, ShowcaseItem } from '@/data/types';
import { getCmsAchievements, getCmsAlbums, type CmsAlbum } from '@/sanity/fetch';

export { resolve, resolveAll };

const pad = (n: number) => String(n).padStart(2, '0');

/* ───────── Achievements ───────── */

export async function getAchievements() {
  const cms = await getCmsAchievements();
  return {
    years: academicYears,
    semesters,
    categories,
    items: [...cms, ...achievements.map((a) => ({ ...a, cover: a.cover ? resolve(a.cover) : undefined }))],
  };
}

/* ───────── Gallery ───────── */

export type RecapCard = { slug: string; title: string; dateLabel: string; count: number; cover?: ResolvedMedia };

export type CollectionView = Omit<GalleryCollection, 'cover' | 'photos'> & {
  cover?: ResolvedMedia;
  photos: ResolvedMedia[];
  count: number;
  recaps: RecapCard[];
  /** true when this entry is a Sanity album rather than an archive collection */
  isAlbum?: boolean;
};

const toRecap = (a: CmsAlbum): RecapCard => ({
  slug: a.slug,
  title: a.title,
  dateLabel: a.dateLabel,
  count: a.photos.length,
  cover: a.cover,
});

function albumToCollection(a: CmsAlbum, index: number): CollectionView {
  return {
    slug: a.slug,
    index: `(${pad(index)})`,
    partner: a.title,
    partnerEn: `${a.partnerLabel}${a.dateLabel ? ` · ${a.dateLabel}` : ''}`,
    kind: a.kind,
    years: a.dateLabel || a.year,
    summary: a.summary,
    statement: a.story,
    gear: a.gear,
    cover: a.cover,
    photos: a.photos,
    count: a.photos.length,
    recaps: [],
    isAlbum: true,
  };
}

function localToCollection(c: GalleryCollection, albums: CmsAlbum[]): CollectionView {
  const recaps = albums.filter((a) => a.partner === c.slug).map(toRecap);
  return {
    ...c,
    cover: c.cover ? resolve(c.cover) : recaps[0]?.cover,
    photos: resolveAll(c.photos),
    count: c.photos.length + recaps.reduce((n, r) => n + r.count, 0),
    recaps,
    pending: c.pending && recaps.length === 0,
  };
}

export async function getCollections(): Promise<CollectionView[]> {
  const albums = await getCmsAlbums();
  const local = collections.map((c) => localToCollection(c, albums));
  const standalone = albums
    .filter((a) => !collections.some((c) => c.slug === a.slug))
    .map((a, i) => albumToCollection(a, collections.length + i + 1));
  return [...local, ...standalone];
}

export async function getCollectionBySlug(slug: string): Promise<CollectionView | undefined> {
  const albums = await getCmsAlbums();
  const local = getCollection(slug);
  if (local) return localToCollection(local, albums);
  const i = albums.findIndex((a) => a.slug === slug);
  return i >= 0 ? albumToCollection(albums[i], collections.length + i + 1) : undefined;
}

export async function getCollectionSlugs() {
  const albums = await getCmsAlbums();
  return [...collections.map((c) => c.slug), ...albums.map((a) => a.slug)];
}

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

function albumToShowcase(a: CmsAlbum): ShowcaseItem | undefined {
  if (!a.cover) return undefined;
  return {
    id: `album-${a.id}`,
    href: `/gallery/${a.slug}`,
    index: '',
    year: a.year,
    title: a.title,
    category: `${a.kind} · ${a.partnerLabel}`,
    role: a.role,
    yearSemester: [a.academicYear, a.semester].filter(Boolean).join(' · ') || a.dateLabel,
    gearClient: a.gear,
    specs: `${a.photos.length} frames`,
    quote: a.quote || a.summary,
    cover: a.cover,
  };
}

function localSeriesShowcase(): ShowcaseItem[] {
  return collections
    .filter((c) => !c.pending && c.cover && collectionCredits[c.slug])
    .map((c) => {
      const cr = collectionCredits[c.slug];
      return {
        id: `gallery-${c.slug}`,
        href: `/gallery/${c.slug}`,
        index: '',
        year: cr.year,
        title: c.partner,
        category: c.kind,
        role: cr.role,
        yearSemester: cr.yearSemester,
        gearClient: cr.gearClient,
        specs: `${c.kind} · ${c.photos.length} frames`,
        quote: cr.quote,
        cover: resolve(c.cover!),
      };
    });
}

const reindex = (items: ShowcaseItem[]) => items.map((s, i) => ({ ...s, index: pad(i + 1) }));

/** /gallery: newest Sanity albums first, then the archive series. */
export async function getGalleryShowcase(): Promise<ShowcaseItem[]> {
  const albums = await getCmsAlbums();
  const cms = albums.map(albumToShowcase).filter((s): s is ShowcaseItem => Boolean(s));
  return reindex([...cms, ...localSeriesShowcase()]);
}

/** Home: the three editions, albums flagged "featured" in Studio, then the strongest archive series. */
export async function getFeaturedWorks(): Promise<ShowcaseItem[]> {
  const albums = await getCmsAlbums();
  const featured = albums
    .filter((a) => a.featured)
    .map(albumToShowcase)
    .filter((s): s is ShowcaseItem => Boolean(s));
  const series = localSeriesShowcase().filter((s) =>
    ['gallery-sseayp', 'gallery-concept-studio', 'gallery-street-heritage'].includes(s.id),
  );
  return reindex([...getEditionShowcase(), ...featured, ...series]);
}
