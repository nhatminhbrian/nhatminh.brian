import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '@/components/Photo';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { T } from '@/components/i18n/LanguageProvider';
import { getFolderBySlug, getFolderSlugs, partnerGroups } from '@/lib/content';
import { DEFAULT_GEAR } from '@/data/folders';

export async function generateStaticParams() {
  const slugs = await getFolderSlugs();
  // Cache Components needs at least one param; a placeholder 404s if Studio is unreachable at build time.
  return (slugs.length ? slugs : ['_']).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/gallery/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const r = await getFolderBySlug(slug);
  if (!r) return {};
  const f = r.folder;
  return {
    title: `${f.title} — Gallery`,
    description: f.summary ?? `${f.organization} · ${f.year}`,
    openGraph: { images: [{ url: f.coverImage.src, width: f.coverImage.width, height: f.coverImage.height }] },
  };
}

const formatDate = (d: string) => d.split('-').reverse().join('/');

export default async function FolderPage({ params }: PageProps<'/gallery/[slug]'>) {
  const { slug } = await params;
  const r = await getFolderBySlug(slug);
  if (!r) notFound();
  const { folder: f, next } = r;
  const group = partnerGroups.find((g) => g.id === f.partnerGroup);

  return (
    <article>
      <header className="frame grid gap-6 pb-12 pt-10 md:grid-cols-12 md:pt-16">
        <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap gap-x-2 md:col-span-12">
          <Link href="/gallery" className="hover:text-ice-100">(01) Gallery</Link>
          <span aria-hidden>/</span>
          <span>{f.year}</span>
          <span aria-hidden>/</span>
          <span><T k={`group.${f.partnerGroup}`} fallback={group?.label} /></span>
        </nav>
        <div className="md:col-span-9">
          <span className="inline-flex items-center gap-2 rounded-full bg-ice-100 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-night-950">
            {f.indexNumber} · {f.year}
          </span>
          <h1 className="display mt-4 text-[clamp(3rem,9vw,8rem)]">{f.title}</h1>
          <p className="mt-3 font-serif text-xl italic text-steel-300">{f.organization}</p>
        </div>
        <dl className="glass grid grid-cols-2 gap-4 self-end rounded-2xl p-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] md:col-span-3">
          <div><dt className="text-steel-400"><T k="gallery.date" /></dt><dd className="mt-1 text-ice-100">{formatDate(f.date)}</dd></div>
          <div><dt className="text-steel-400"><T k="gallery.colFrames" /></dt><dd className="mt-1 text-ice-100">{String(f.images.length).padStart(2, '0')}</dd></div>
          {f.location && <div className="col-span-2"><dt className="text-steel-400"><T k="gallery.place" /></dt><dd className="mt-1 normal-case tracking-normal text-ice-100">{f.location}</dd></div>}
          <div className="col-span-2"><dt className="text-steel-400"><T k="gallery.kit" /></dt><dd className="mt-1 text-ice-100">{f.gear ?? DEFAULT_GEAR}</dd></div>
        </dl>
        {(f.summary || f.story?.length) && (
          <div className="space-y-4 md:col-span-7">
            {f.summary && <p className="prose-ice text-lg">{f.summary}</p>}
            {f.story?.map((s) => <p key={s} className="prose-ice">{s}</p>)}
          </div>
        )}
      </header>

      <div className="frame">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl md:aspect-[21/9]">
          <Photo media={f.coverImage} fill priority sizes="100vw" />
        </div>
      </div>

      <section className="frame mt-12 md:mt-20" aria-label={`${f.title} photographs`}>
        <MasonryGallery photos={f.images} label={f.title} gear={f.gear ?? DEFAULT_GEAR} />
      </section>

      <nav aria-label="Next folder" className="frame mt-24 grid gap-6 md:grid-cols-12">
        <Link href="/gallery" className="eyebrow self-end hover:text-ice-100 md:col-span-3"><T k="gallery.backAll" /></Link>
        {next && next.id !== f.id && (
          <Link href={`/gallery/${next.id}`} className="glass glass-sheen group flex items-center gap-5 rounded-3xl p-4 md:col-span-9">
            <span className="relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl">
              <Photo media={next.coverImage} fill sizes="128px" />
            </span>
            <span className="min-w-0">
              <span className="eyebrow"><T k="gallery.nextFolder" /> · {next.year}</span>
              <span className="mt-1 block truncate font-serif text-3xl text-ice-100 group-hover:italic md:text-5xl">{next.title} →</span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
