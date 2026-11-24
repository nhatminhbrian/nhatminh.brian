import type { Metadata } from 'next';
import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { getCollections } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Client and event photography by Nguyễn Nhật Minh, grouped by partner.',
};

export default function GalleryPage() {
  const all = getCollections();
  const collections = all.filter((c) => !c.pending);
  const pending = all.filter((c) => c.pending);
  return (
    <div className="frame">
      <header className="grid gap-6 pb-14 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12">(01) — Gallery · Thư viện ảnh</p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-8">
          Frames, <em className="text-steel-300">by partner</em>
        </h1>
        <p className="prose-ice self-end md:col-span-4">
          Client, event and personal work. Each collection opens into an asymmetric grid with a swipeable fullscreen viewer.
        </p>
      </header>

      <ol className="grid gap-x-5 gap-y-14 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-12">
        {collections.map((c, i) => {
          // asymmetric rhythm: wide / narrow alternation on large screens
          const span = [
            'lg:col-span-7', 'lg:col-span-5 lg:mt-28', 'lg:col-span-5', 'lg:col-span-7 lg:mt-16',
            'lg:col-span-6', 'lg:col-span-6 lg:mt-24',
          ][i % 6];
          return (
            <li key={c.slug} className={span}>
              <Link href={`/gallery/${c.slug}`} className="group block">
                <div className={`relative overflow-hidden bg-night-850 ${i % 2 ? 'aspect-[4/5]' : 'aspect-[16/11]'}`}>
                  {c.cover ? (
                    <Photo media={c.cover} fill sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" imgClassName="object-cover transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between border border-hairline p-6">
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400">Archive in preparation</span>
                      <span className="display text-[clamp(2.5rem,5vw,4.5rem)] italic text-steel-300">{c.partner}</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ice-100 mix-blend-difference">
                    {c.kind}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-baseline gap-4">
                  <span className="font-mono text-xs text-steel-300">{c.index}</span>
                  <h2 className="font-serif text-3xl leading-tight text-ice-100 transition-colors group-hover:text-steel-300 md:text-4xl">{c.partner}</h2>
                  <span className="font-mono text-[0.6875rem] text-steel-400">
                    {c.pending ? 'Soon' : `${String(c.count).padStart(2, '0')} frames`}
                  </span>
                </div>
                <p className="mt-2 pl-10 text-sm text-ice-300">{c.partnerEn} · {c.years}</p>
              </Link>
            </li>
          );
        })}
      </ol>

      {pending.length > 0 && (
        <section aria-labelledby="pending-title" className="mt-24">
          <h2 id="pending-title" className="eyebrow border-t border-hairline pt-3">In preparation — archives being edited</h2>
          <ul className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {pending.map((c) => (
              <li key={c.slug} className="bg-night-950">
                <Link href={`/gallery/${c.slug}`} className="group flex min-h-40 flex-col justify-between p-6 hover:bg-night-850">
                  <span className="flex justify-between font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-steel-400">
                    <span>{c.index} {c.kind}</span><span>{c.years}</span>
                  </span>
                  <span className="mt-8 font-serif text-3xl italic text-ice-100 group-hover:text-steel-300">{c.partner}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
