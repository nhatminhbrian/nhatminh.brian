import 'server-only';
/**
 * Content access layer. Pages only talk to these functions, so swapping the
 * local `src/data` modules for Sanity (GROQ via next-sanity, Studio at /studio)
 * means re-implementing this file — components stay untouched.
 */
import { achievements, academicYears, categories, semesters } from '@/data/achievements';
import { collections, getCollection } from '@/data/gallery';
import { editions, getEdition } from '@/data/portfolios';
import { resolve, resolveAll } from '@/data/media';
import type { GalleryCollection, PortfolioEdition } from '@/data/types';

export { resolve, resolveAll };

export function getAchievements() {
  return {
    years: academicYears,
    semesters,
    categories,
    items: achievements.map((a) => ({ ...a, cover: a.cover ? resolve(a.cover) : undefined })),
  };
}

export function getCollections() {
  return collections.map((c) => ({
    ...c,
    cover: c.cover ? resolve(c.cover) : undefined,
    count: c.photos.length,
  }));
}

export function getCollectionBySlug(slug: string) {
  const c = getCollection(slug);
  if (!c) return undefined;
  return { ...c, cover: c.cover ? resolve(c.cover) : undefined, photos: resolveAll(c.photos) };
}

export function getCollectionSlugs() {
  return collections.map((c: GalleryCollection) => c.slug);
}

export function getEditions() {
  return editions.map((e) => ({ ...e, cover: resolve(e.cover) }));
}

export function getEditionBySlug(slug: PortfolioEdition['slug']) {
  const e = getEdition(slug);
  return { ...e, cover: resolve(e.cover) };
}
