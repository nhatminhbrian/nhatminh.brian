import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Achievement, FolderView, PartnerGroup, ResolvedMedia } from '@/data/types';
import { apiVersion, dataset, projectId } from './env';
import type { I18nFields } from '@/i18n/pick';

const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' });
const builder = createImageUrlBuilder({ projectId, dataset });

type SanityImage = {
  asset?: { _ref?: string; _id?: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
  alt?: string;
  caption?: string;
  hotspot?: unknown;
  crop?: unknown;
};

const IMAGE = `{ ..., alt, caption, asset->{ _id, metadata { lqip, dimensions { width, height } } } }`;

const FOLDERS = `*[_type == "photoFolder" && defined(slug.current)] | order(date desc) {
  _id, title, "slug": slug.current, indexNumber, date, monthOnly, year, semester, partnerGroup, organization,
  location, gear, role, summary, story, quote, featured, translations,
  coverImage ${IMAGE},
  images[] ${IMAGE}
}`;

const ACHIEVEMENTS = `*[_type == "achievement"] | order(coalesce(order, 99999) asc, date desc) {
  _id, title, subtitle, organisation, role, period, year, semester, category, summary, details, link, translations,
  cover ${IMAGE}
}`;

function toMedia(img: SanityImage | undefined, fallbackAlt: string, key: string): ResolvedMedia | undefined {
  const dims = img?.asset?.metadata?.dimensions;
  if (!img?.asset || !dims) return undefined;
  const width = Math.min(dims.width, 2400);
  const height = Math.round((dims.height / dims.width) * width);
  return {
    id: key,
    alt: img.alt || fallbackAlt,
    caption: img.caption,
    src: builder.image(img).width(width).fit('max').auto('format').quality(82).url(),
    width,
    height,
    blur: img.asset.metadata?.lqip ?? '',
  };
}

type Tx = Record<string, string | string[] | undefined>;
function toI18n(t: unknown, map: (o: Tx) => Tx = (o) => o): I18nFields | undefined {
  const tt = t as { en?: Tx; ko?: Tx } | null | undefined;
  if (!tt) return undefined;
  return { en: tt.en ? map(tt.en) : undefined, ko: tt.ko ? map(tt.ko) : undefined };
}

/** All published photo folders, newest first. Cached ~1 minute; [] if Sanity is unreachable. */
export async function getCmsFolders(): Promise<FolderView[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('sanity', 'folders');
  try {
    const raw = await client.fetch<Array<Record<string, unknown>>>(FOLDERS);
    return raw.flatMap((a) => {
      const title = String(a.title ?? '');
      const images = ((a.images as SanityImage[] | null) ?? [])
        .map((p, i) => toMedia(p, `${title} — frame ${String(i + 1).padStart(2, '0')}`, `${a._id}-${i}`))
        .filter((m): m is ResolvedMedia => Boolean(m));
      const coverImage = toMedia(a.coverImage as SanityImage, title, `${a._id}-cover`) ?? images[0];
      if (!coverImage) return [];
      const fullDate = String(a.date ?? '');
      const date = a.monthOnly ? fullDate.slice(0, 7) : fullDate;
      const year = Number(a.year) || (fullDate ? new Date(fullDate).getFullYear() : new Date().getFullYear());
      const group = String(a.partnerGroup ?? 'hvng') as PartnerGroup;
      return [{
        id: String(a.slug),
        indexNumber: String(a.indexNumber ?? ''),
        title,
        year,
        semester: (a.semester as FolderView['semester']) || undefined,
        partnerGroup: group,
        organization: String(a.organization ?? ''),
        date,
        location: (a.location as string) || undefined,
        gear: (a.gear as string) || undefined,
        role: (a.role as string) || undefined,
        summary: (a.summary as string) || undefined,
        story: String(a.story ?? '').split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean),
        quote: (a.quote as string) || undefined,
        featured: Boolean(a.featured),
        i18n: toI18n(a.translations, (o) => ({ ...o, story: o.story ? String(o.story).split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) : undefined })),
        coverImage,
        images,
        source: 'sanity' as const,
      }];
    });
  } catch {
    return [];
  }
}

export type CmsAchievement = Omit<Achievement, 'cover'> & { cover?: ResolvedMedia };

export async function getCmsAchievements(): Promise<CmsAchievement[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('sanity', 'achievements');
  try {
    const raw = await client.fetch<Array<Record<string, unknown>>>(ACHIEVEMENTS);
    return raw.map((a) => ({
      id: `cms-${a._id}`,
      title: String(a.title ?? ''),
      subtitle: (a.subtitle as string) || undefined,
      organisation: String(a.organisation ?? ''),
      role: (a.role as string) || undefined,
      period: String(a.period ?? ''),
      year: a.year as Achievement['year'],
      semester: a.semester as Achievement['semester'],
      category: a.category as Achievement['category'],
      summary: String(a.summary ?? ''),
      details: (a.details as string[] | null) ?? [],
      cover: toMedia(a.cover as SanityImage, String(a.title ?? ''), `${a._id}-cover`),
      i18n: toI18n(a.translations),
      link: (a.link as { href?: string; label?: string } | null)?.href
        ? { href: (a.link as { href: string }).href, label: (a.link as { label?: string }).label || 'Xem thêm' }
        : undefined,
    }));
  } catch {
    return [];
  }
}

/* ── Trang chủ (singleton) — every field falls back to the code defaults ── */
import * as homeDefaults from '@/data/home.i18n';
/* eslint-disable @typescript-eslint/no-explicit-any */
type HomeContent = Pick<typeof homeDefaults, 'city' | 'aboutI18n' | 'visionI18n' | 'interestsI18n' | 'lensesI18n' | 'philosophyI18n' | 'milestonesI18n'>;

export async function getHome(): Promise<HomeContent> {
  'use cache';
  cacheLife('minutes');
  cacheTag('sanity', 'homePage');
  const d = homeDefaults;
  type Raw = Partial<{ city: any; about: any[]; vision: any; interests: any[]; lenses: any[]; philosophy: any[]; milestones: any[] }>;
  let h: Raw | null = null;
  try {
    h = await client.fetch<Raw | null>(`*[_id == "homePage"][0]{ city, about, vision, interests, lenses, philosophy, milestones }`);
  } catch {
    h = null;
  }
  const loc = (v: any, fb: homeDefaults.Loc): homeDefaults.Loc => (v?.vi ? { vi: v.vi, en: v.en || v.vi, ko: v.ko || v.en || v.vi } : fb);
  const list = <T,>(v: any[] | undefined, fb: T[], map: (x: any) => T): T[] => (v?.length ? v.map(map) : fb);
  return {
    city: loc(h?.city, d.city),
    visionI18n: loc(h?.vision, d.visionI18n),
    aboutI18n: list(h?.about, d.aboutI18n, (x) => loc(x, x)),
    interestsI18n: list(h?.interests, d.interestsI18n, (x) => loc(x, x)),
    philosophyI18n: list(h?.philosophy, d.philosophyI18n, (x) => loc(x, x)),
    milestonesI18n: list(h?.milestones, d.milestonesI18n, (x) => ({ year: x.year ?? '', text: loc(x.text, x.text) })),
    lensesI18n: list(h?.lenses, d.lensesI18n, (x) => ({
      index: x.index ?? '',
      label: loc(x.label, x.label),
      title: loc(x.title, x.title),
      sub: loc(x.sub, x.sub),
      meta: x.meta ?? '',
      body: (x.body ?? []).map((b: any) => loc(b, b)),
    })) as HomeContent['lensesI18n'],
  };
}
