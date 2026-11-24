import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Achievement, ResolvedMedia } from '@/data/types';
import { apiVersion, dataset, projectId } from './env';
import { partnerOptions } from './schemaTypes/options';

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

const ALBUMS = `*[_type == "album" && defined(slug.current)] | order(date desc) {
  _id, title, "slug": slug.current, partner, kind, date, summary, story, quote, role, gear,
  academicYear, semester, featured,
  cover ${IMAGE},
  photos[] ${IMAGE}
}`;

const ACHIEVEMENTS = `*[_type == "achievement"] | order(date desc) {
  _id, title, subtitle, organisation, role, period, year, semester, category, summary, details, link,
  cover ${IMAGE}
}`;

export type CmsAlbum = {
  id: string;
  slug: string;
  title: string;
  partner: string;
  partnerLabel: string;
  kind: 'Client' | 'Event' | 'Personal';
  date: string;
  dateLabel: string;
  year: string;
  summary: string;
  story: string[];
  quote: string;
  role: string;
  gear: string;
  academicYear?: string;
  semester?: string;
  featured: boolean;
  cover?: ResolvedMedia;
  photos: ResolvedMedia[];
};

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

/** All published albums, newest first. Cached ~1 minute; returns [] if Sanity is unreachable. */
export async function getCmsAlbums(): Promise<CmsAlbum[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('sanity', 'albums');
  try {
    const raw = await client.fetch<Array<Record<string, unknown>>>(ALBUMS);
    return raw.map((a) => {
      const title = String(a.title ?? '');
      const photos = ((a.photos as SanityImage[] | null) ?? [])
        .map((p, i) => toMedia(p, `${title} — frame ${String(i + 1).padStart(2, '0')}`, `${a._id}-${i}`))
        .filter((m): m is ResolvedMedia => Boolean(m));
      const cover = toMedia(a.cover as SanityImage, title, `${a._id}-cover`) ?? photos[0];
      const date = String(a.date ?? '');
      const d = date ? new Date(date) : null;
      return {
        id: String(a._id),
        slug: String(a.slug),
        title,
        partner: String(a.partner ?? 'other'),
        partnerLabel: partnerOptions.find((o) => o.value === a.partner)?.title ?? 'Recap',
        kind: (a.kind as CmsAlbum['kind']) ?? 'Event',
        date,
        dateLabel: d ? d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
        year: d ? String(d.getFullYear()) : '',
        summary: String(a.summary ?? ''),
        story: String(a.story ?? '')
          .split(/\n\s*\n/)
          .map((s) => s.trim())
          .filter(Boolean),
        quote: String(a.quote ?? a.summary ?? ''),
        role: String(a.role ?? 'Photographer'),
        gear: String(a.gear ?? 'CANON 6D • EF 24-105MM F/4'),
        academicYear: a.academicYear as string | undefined,
        semester: a.semester as string | undefined,
        featured: Boolean(a.featured),
        cover,
        photos,
      };
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
      link: (a.link as { href?: string; label?: string } | null)?.href
        ? { href: (a.link as { href: string }).href, label: (a.link as { label?: string }).label || 'Xem thêm' }
        : undefined,
    }));
  } catch {
    return [];
  }
}
