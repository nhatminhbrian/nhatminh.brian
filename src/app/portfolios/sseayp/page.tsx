import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Marker } from '@/components/Marker';
import { DownloadPdf, EditionShell } from '@/components/portfolios/EditionShell';
import { Switcher } from '@/components/portfolios/Switcher';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { sseaypEdition as S } from '@/data/portfolios';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'SSEAYP 49th Photo Portfolio — web edition',
  description: 'The Viet Nam Contingent of the Ship for Southeast Asian and Japanese Youth Program, in three acts and a coda — photos and design by Nguyen Nhat Minh.',
};

const RED = '#e3262b';
const GOLD = '#ffcd1c';

export default function SseaypEditionPage() {
  const edition = getEditionBySlug('sseayp');
  const hello = resolve({ id: 'portrait-openhouse', alt: 'Minh with a camera at the DAV Open House' });

  return (
    <EditionShell edition={edition}>
      {/* Cover */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Photo media={edition.cover} fill priority sizes="100vw" imgClassName="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/40 via-night-950/60 to-night-950" />
        </div>
        <div className="frame relative grid min-h-[78svh] content-end gap-6 pb-14 pt-24 md:grid-cols-12">
          <p className="eyebrow md:col-span-12">{edition.index} — Diplomatic Academy of Viet Nam · Photos and design by {profile.nameEn}</p>
          <h1 className="display text-[clamp(3.5rem,11vw,10.5rem)] uppercase md:col-span-10">
            SSEAYP <span style={{ color: GOLD }}>49th</span>
            <span className="block text-[0.42em] italic normal-case text-ice-300">Viet Nam Contingent’s photo portfolio</span>
          </h1>
          <p className="prose-ice md:col-span-6">{S.welcome}</p>
          <div className="md:col-span-6 md:self-end md:justify-self-end"><DownloadPdf edition={edition} /></div>
        </div>
        <div aria-hidden className="h-1.5" style={{ background: `linear-gradient(90deg, ${RED} 0 70%, ${GOLD} 70% 100%)` }} />
      </section>

      {/* Xin chào */}
      <section className="frame mt-24 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display text-[clamp(3rem,7vw,6rem)] italic" style={{ color: GOLD }}>Xin chào</p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden">
            <Photo media={hello} fill sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
        <div className="space-y-5 md:col-span-6 md:col-start-7 md:pt-6">
          {S.hello.map((p) => <p key={p} className="prose-ice">{p}</p>)}
          <p className="font-serif text-2xl italic text-ice-100">Welcome to the visual diary of my youth!</p>
          <dl className="mt-10 border-l-2 pl-6" style={{ borderColor: RED }}>
            <dt className="font-serif text-4xl text-ice-100">{S.definition.term} <span className="font-mono text-xs text-steel-300">{S.definition.phonetic}</span></dt>
            <dd className="mt-3 text-ice-300">{S.definition.body}</dd>
          </dl>
        </div>
      </section>

      {/* Act switcher */}
      <section className="frame mt-28" aria-labelledby="acts-title">
        <Marker index="(I–III)" label="Three acts" />
        <h2 id="acts-title" className="display mt-8 text-[clamp(2.75rem,6vw,5.5rem)]">
          Through my <em style={{ color: GOLD }}>viewfinder</em>
        </h2>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-400">Switch acts · ← → keys</p>
        <div className="mt-8">
          <Switcher
            ariaLabel="SSEAYP acts"
            accent={RED}
            tabs={S.acts.map((act) => ({
              key: act.key,
              label: (
                <>
                  <span className="mr-2 font-mono text-[0.6875rem] not-italic text-steel-300">{act.n}</span>
                  <span className="italic">{act.title}</span>
                </>
              ),
              sub: act.place,
              content: (
                <div className="pt-10">
                  <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <p className="eyebrow" style={{ color: GOLD }}>{act.n} · {act.place}</p>
                      <p className="mt-5 font-serif text-2xl leading-snug text-ice-100 md:text-3xl">{act.lede}</p>
                    </div>
                    <ul className="grid gap-px self-start border border-hairline bg-hairline md:col-span-7">
                      {act.notes.map((n) => (
                        <li key={n.title} className="bg-night-950 p-5 md:p-6">
                          <p className="font-serif text-xl italic text-ice-100">{n.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-ice-300">{n.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12">
                    <MasonryGallery photos={resolveAll(act.media)} label={`SSEAYP 49th — ${act.n}: ${act.title}`} gear={profile.gear} />
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* Coda — Act 4 */}
      <section className="mt-28 border-y border-hairline bg-night-900/60 py-20" aria-labelledby="coda-title">
        <div className="frame">
          <Marker index={`(${S.coda.n})`} label="Coda" />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="eyebrow" style={{ color: GOLD }}>{S.coda.place}</p>
              <h2 id="coda-title" className="display mt-4 text-[clamp(3rem,8vw,7rem)] italic">{S.coda.title}</h2>
            </div>
            <div className="space-y-5 md:col-span-6">
              <p className="prose-ice">{S.coda.lede}</p>
              <p className="prose-ice">{S.coda.body}</p>
              <p className="font-serif text-2xl italic text-ice-100">I am Nguyen Nhat Minh. Thank you.</p>
            </div>
          </div>
          <div className="mt-12">
            <MasonryGallery photos={resolveAll(S.coda.media)} label="SSEAYP 49th — Act 4: The Cradle" gear={profile.gear} />
          </div>
        </div>
      </section>

      <section className="frame mt-20 text-center">
        <p className="display text-[clamp(4rem,14vw,12rem)] uppercase" style={{ color: GOLD }}>A–ri–ga–to!</p>
        <p className="mt-2 font-mono text-xs text-steel-300">ありがとう</p>
      </section>
    </EditionShell>
  );
}
