import type { Metadata } from 'next';
import Link from 'next/link';
import { ShowcaseStack } from '@/components/showcase/ShowcaseStack';
import { getCollections, getGalleryShowcase } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Client and event photography by Nguyễn Nhật Minh, grouped by partner.',
};

export default async function GalleryPage() {
  const [all, series] = await Promise.all([getCollections(), getGalleryShowcase()]);
  const pending = all.filter((c) => c.pending);
  return (
    <>
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

    </div>
      <ShowcaseStack items={series} label="Series" priorityFirst />
    <div className="frame">
      {pending.length > 0 && (
        <section aria-labelledby="pending-title" className="mt-8">
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
    </>
  );
}
