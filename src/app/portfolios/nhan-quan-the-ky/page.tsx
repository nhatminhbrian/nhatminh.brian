import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Marker } from '@/components/Marker';
import { Reveal } from '@/components/Reveal';
import { DownloadPdf, EditionShell } from '@/components/portfolios/EditionShell';
import { Hotspots } from '@/components/portfolios/Hotspots';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { nqtkEdition as N } from '@/data/portfolios';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Nhãn Quan Thế Kỷ — tiểu luận thị giác',
  description: 'Một thế kỷ hoa lửa, một lăng kính trần trụi. Tiểu luận nhiếp ảnh của Nguyễn Nhật Minh về tính vật chất của truyền thông.',
};

const RUST = '#e0735d';

function Script({ children, className = '' }: { children: string; className?: string }) {
  return <p className={`font-serif text-[clamp(1.75rem,3.5vw,3rem)] italic leading-tight ${className}`} style={{ color: RUST }}>{children}</p>;
}

export default function NhanQuanTheKyPage() {
  const edition = getEditionBySlug('nhan-quan-the-ky');
  const cover = resolve(N.cover);
  const preface = resolve(N.preface.media);

  return (
    <EditionShell edition={edition}>
      {/* Cover — headline overlaps the museum image */}
      <section className="frame pt-8 md:pt-12">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9]">
            <Photo media={cover} fill priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent" />
          </div>
          <h1 className="display relative z-10 -mt-[0.9em] text-[clamp(3.5rem,12vw,11.5rem)] uppercase sm:-mt-[1.1em]">
            Nhãn Quan<br />
            <span className="pl-[6vw]">Thế Kỷ</span>
          </h1>
          <Script className="mt-4 pl-[6vw]">{N.subtitle}</Script>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-300">{N.student} · {N.course}</p>
          <DownloadPdf edition={edition} />
        </div>
      </section>

      {/* Lời tựa */}
      <section className="frame mt-28 grid gap-10 md:grid-cols-12" aria-labelledby="preface-title">
        <div className="md:col-span-4">
          <p className="eyebrow">{N.preface.kicker}</p>
          <h2 id="preface-title" className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">{N.preface.title}</h2>
          <figure className="mt-8">
            <div className="relative aspect-[2/3] overflow-hidden"><Photo media={preface} fill sizes="(min-width: 768px) 30vw, 100vw" /></div>
            <figcaption><Script className="mt-4">{N.preface.epigraph}</Script></figcaption>
          </figure>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="bg-[#efe8dc] p-6 text-[#2a1f19] md:p-12">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#8a5a45]">Dự án: Nhãn Quan Thế Kỷ (The Century’s Vision)</p>
            <p className="mt-6 font-serif text-2xl italic">{N.preface.salutation}</p>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.75]">
              {N.preface.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <p className="mt-8 text-right font-serif text-xl italic">— {profile.name}</p>
          </div>
        </div>
      </section>

      {/* Acts */}
      {N.acts.map((act, i) => (
        <section key={act.n} className="frame mt-28" aria-labelledby={`act-${i}`}>
          <Marker index={`(${act.n})`} label={act.title} />
          <div className={`mt-10 grid gap-10 md:grid-cols-12`}>
            <div className={`md:col-span-4 ${i % 2 ? 'md:order-2 md:col-start-9' : ''}`}>
              <h2 id={`act-${i}`} className="display text-[clamp(2.5rem,5vw,4.5rem)]">
                <span className="block font-mono text-xs not-italic tracking-[0.14em] text-steel-300">{act.n}</span>
                {act.title}
              </h2>
              <p className="prose-ice mt-6 italic">{act.body}</p>
              <div className="mt-8 space-y-2">
                {act.captions.map((c) => <Script key={c} className="!text-2xl">{c}</Script>)}
              </div>
            </div>
            <div className={`md:col-span-8 ${i % 2 ? 'md:order-1 md:col-start-1' : ''}`}>
              <Hotspots media={resolve(act.feature)} spots={act.hotspots} caption={act.feature.caption} />
            </div>
          </div>
          <Reveal className="mt-12">
            <MasonryGallery photos={resolveAll(act.media)} label={`Nhãn Quan Thế Kỷ — ${act.n}: ${act.title}`} gear={profile.gear} />
          </Reveal>
        </section>
      ))}

      {/* Vĩ thanh */}
      <section className="mt-28 border-y border-hairline bg-night-900/60 py-20" aria-labelledby="epilogue-title">
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">{N.epilogue.n}</p>
            <h2 id="epilogue-title" className="display mt-4 text-[clamp(3rem,7vw,6rem)] italic">{N.epilogue.title}</h2>
            <div className="mt-8 space-y-2">{N.epilogue.captions.map((c) => <Script key={c} className="!text-2xl">{c}</Script>)}</div>
          </div>
          <div className="space-y-5 md:col-span-6 md:col-start-7">
            {N.epilogue.body.map((p) => <p key={p} className="prose-ice">{p}</p>)}
          </div>
          <div className="md:col-span-12">
            <MasonryGallery photos={resolveAll(N.epilogue.media)} label="Nhãn Quan Thế Kỷ — Vĩ thanh" gear={profile.gear} />
          </div>
        </div>
      </section>

      <section className="frame mt-20 grid gap-6 md:grid-cols-12">
        <p className="display text-[clamp(4rem,13vw,11rem)] uppercase md:col-span-7">{N.closing.title}</p>
        <div className="self-end md:col-span-5">
          {N.closing.lines.map((l) => <Script key={l} className="!text-3xl">{l}</Script>)}
          <p className="prose-ice mt-6">{N.closing.body}</p>
        </div>
      </section>
    </EditionShell>
  );
}
