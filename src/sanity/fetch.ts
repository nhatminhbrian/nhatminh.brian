import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Achievement, FolderView, PartnerGroup, ResolvedMedia } from '@/data/types';
import { apiVersion, dataset, projectId } from './env';

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
  _id, title, "slug": slug.current, indexNumber, date, year, semester, partnerGroup, organization,
  location, gear, role, summary, story, quote, featured,
  coverImage ${IMAGE},
  images[] ${IMAGE}
}`;

const ACHIEVEMENTS = `*[_type == "achievement"] | order(date desc) {
  _id, title, subtitle, organisation, role, period, year, semester, category, summary, details, link,
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
      const date = String(a.date ?? '');
      const year = Number(a.year) || (date ? new Date(date).getFullYear() : new Date().getFullYear());
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
      link: (a.link as { href?: string; label?: string } | null)?.href
        ? { href: (a.link as { href: string }).href, label: (a.link as { label?: string }).label || 'Xem thêm' }
        : undefined,
    }));
  } catch {
    return [];
  }
}
