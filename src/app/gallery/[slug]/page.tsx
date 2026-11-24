import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '@/components/Photo';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { getCollectionBySlug, getCollections, getCollectionSlugs } from '@/lib/content';
import { profile } from '@/data/profile';

export function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/gallery/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.partner} — Gallery`,
    description: c.summary,
    openGraph: c.cover ? { images: [{ url: c.cover.src, width: c.cover.width, height: c.cover.height }] } : undefined,
  };
}

export default async function CollectionPage({ params }: PageProps<'/gallery/[slug]'>) {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) notFound();

  const all = getCollections();
  const pos = all.findIndex((x) => x.slug === slug);
  const next = all[(pos + 1) % all.length];

  return (
    <article>
      <header className="frame grid gap-6 pb-12 pt-10 md:grid-cols-12 md:pt-16">
        <nav aria-label="Breadcrumb" className="eyebrow md:col-span-12">
          <Link href="/gallery" className="hover:text-ice-100">(01) Gallery</Link> <span aria-hidden>/</span> {c.index} {c.kind}
        </nav>
        <h1 className="display text-[clamp(3.25rem,10vw,9rem)] md:col-span-9">{c.partner}</h1>
        <dl className="grid grid-cols-2 gap-4 self-end font-mono text-[0.6875rem] uppercase tracking-[0.12em] md:col-span-3">
          <div><dt className="text-steel-400">Period</dt><dd className="mt-1 text-ice-100">{c.years}</dd></div>
          <div><dt className="text-steel-400">Frames</dt><dd className="mt-1 text-ice-100">{c.pending ? '—' : String(c.photos.length).padStart(2, '0')}</dd></div>
          <div className="col-span-2"><dt className="text-steel-400">Kit</dt><dd className="mt-1 text-ice-100">{c.gear ?? profile.gear}</dd></div>
        </dl>
        <p className="font-serif text-xl italic text-steel-300 md:col-span-6">{c.partnerEn}</p>
        <div className="space-y-4 md:col-span-6">
          <p className="prose-ice">{c.summary}</p>
          {c.statement?.map((s) => <p key={s} className="prose-ice">{s}</p>)}
          {c.relatedPortfolio && (
            <Link href={c.relatedPortfolio} className="inline-flex min-h-11 items-center border-b border-ice-300 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:border-ice-100">
              Read the portfolio edition →
            </Link>
          )}
        </div>
      </header>

      {c.cover && !c.pending && (
        <div className="frame">
          <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
            <Photo media={c.cover} fill priority sizes="100vw" />
          </div>
        </div>
      )}

      <section className="frame mt-12 md:mt-20" aria-label={`${c.partner} photographs`}>
        {c.pending || c.photos.length === 0 ? (
          <div className="grid gap-6 border border-hairline p-8 md:grid-cols-12 md:p-14">
            <p className="eyebrow md:col-span-12">Archive in preparation</p>
            <p className="display text-[clamp(2.25rem,5vw,4rem)] md:col-span-8">
              This collection is being edited and will be published soon.
            </p>
            <div className="flex flex-col gap-3 md:col-span-4 md:self-end">
              <a href={profile.instagram} className="inline-flex min-h-11 items-center justify-between border border-hairline-strong px-5 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:bg-ice-100 hover:text-night-950">
                See latest on {profile.handle} <span aria-hidden>↗</span>
              </a>
              <Link href="/gallery" className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.14em] text-steel-300 hover:text-ice-100">
                ← Back to all collections
              </Link>
            </div>
          </div>
        ) : (
          <MasonryGallery photos={c.photos} label={c.partner} gear={c.gear} />
        )}
      </section>

      <nav aria-label="Next collection" className="frame mt-24">
        <Link href={`/gallery/${next.slug}`} className="group grid gap-2 border-t border-hairline pt-6 md:grid-cols-12">
          <span className="eyebrow md:col-span-2">Next {next.index}</span>
          <span className="display text-[clamp(2.5rem,7vw,6rem)] transition-colors group-hover:italic group-hover:text-steel-300 md:col-span-10">
            {next.partner} →
          </span>
        </Link>
      </nav>
    </article>
  );
}
