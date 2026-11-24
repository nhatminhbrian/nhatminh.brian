import type { Metadata } from 'next';
import { Photo } from '@/components/Photo';
import { Marker } from '@/components/Marker';
import { Reveal } from '@/components/Reveal';
import { DownloadPdf, EditionShell } from '@/components/portfolios/EditionShell';
import { Switcher } from '@/components/portfolios/Switcher';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { projectEdition as P } from '@/data/portfolios';
import { aboutStory, artisticVision, philosophy, profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Project Portfolio — web edition',
  description: 'luminescent. the double album, The Closet and selected street work — Nhat Minh Nguyen’s Project Portfolio, rebuilt for the web.',
};

export default function ProjectEditionPage() {
  const edition = getEditionBySlug('project');
  const vision = resolveAll([
    { id: 'project-006-019', alt: 'Train street lined with plants in Hà Nội' },
    { id: 'project-006-022', alt: 'Turtle Tower framed by trees on Hoàn Kiếm Lake' },
    { id: 'project-006-021', alt: 'Water buffalo walking along a rail track' },
  ]);

  return (
    <EditionShell edition={edition}>
      {/* Cover */}
      <section className="frame grid gap-6 pt-10 md:grid-cols-12 md:pt-16">
        <div className="relative z-10 md:col-span-7 md:row-start-1">
          <p className="eyebrow">{edition.index} — {edition.context}</p>
          <h1 className="display mt-6 text-[clamp(4rem,13vw,12rem)] uppercase">
            Pro<span className="italic normal-case text-[var(--edition-accent)]">ject</span>
            <br />Portfolio
          </h1>
          <p className="mt-6 font-serif text-2xl italic text-steel-300">by {profile.nameEn}</p>
          <div className="mt-8"><DownloadPdf edition={edition} /></div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#1d4fb8] to-night-950 md:col-span-5 md:col-start-8 md:row-start-1">
          <Photo media={edition.cover} fill priority sizes="(min-width: 768px) 40vw, 100vw" imgClassName="object-cover object-top" />
        </div>
      </section>

      {/* Chapter index */}
      <nav aria-label="Chapters" className="frame mt-16">
        <ol className="grid grid-cols-2 gap-px border border-hairline bg-hairline md:grid-cols-6">
          {P.chapters.map((c) => (
            <li key={c.id} className="bg-night-950">
              <a href={`#${c.id}`} className="flex min-h-16 flex-col justify-between p-4 hover:bg-night-850">
                <span className="font-mono text-[0.625rem] text-steel-400">({c.n})</span>
                <span className="text-sm uppercase tracking-[0.12em] text-ice-100">{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Introduction */}
      <section id="introduction" className="frame mt-28 scroll-mt-32">
        <Marker index="(1)" label="Introduction" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="display text-[clamp(2.25rem,4.5vw,4rem)] md:col-span-5">Dear Readers,</p>
          <div className="space-y-5 md:col-span-7">
            {P.introduction.map((p) => <p key={p} className="prose-ice">{p}</p>)}
            <p className="font-serif text-xl italic text-steel-300">Thank you for taking the time to review my work.</p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <h3 className="display text-[clamp(2.5rem,6vw,5.5rem)] uppercase md:col-span-6">
            Hello, I’m <br /><span className="text-[var(--edition-accent)]">Nhat Minh</span> Nguyen
          </h3>
          <div className="space-y-5 md:col-span-6">
            <p className="eyebrow">1.1 — About me</p>
            {aboutStory.map((p) => <p key={p} className="prose-ice">{p}</p>)}
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">1.2 — Creative philosophy</p>
            <p className="mt-4 text-ice-300">I always follow five key principles in every project I undertake:</p>
          </div>
          <ol className="md:col-span-8">
            {philosophy.map((p, i) => (
              <li key={p} className="grid grid-cols-[3rem_1fr] border-t border-hairline py-4 text-lg text-ice-100 last:border-b">
                <span className="font-mono text-sm text-[var(--edition-accent)]">{i + 1}.</span>{p}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">1.3 — Artistic vision</p>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-ice-100">{artisticVision}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:col-span-8">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden"><Photo media={vision[0]} fill sizes="(min-width: 768px) 60vw, 100vw" /></div>
            <div className="relative aspect-[4/5] overflow-hidden"><Photo media={vision[1]} fill sizes="30vw" /></div>
            <div className="relative aspect-[4/5] overflow-hidden"><Photo media={vision[2]} fill sizes="30vw" /></div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            {P.events.map((p) => <p key={p} className="prose-ice">{p}</p>)}
          </div>
          <div className="grid grid-cols-3 gap-3 md:col-span-7">
            {resolveAll(P.eventsMedia).map((m) => (
              <div key={m.id} className="relative aspect-[3/4] overflow-hidden"><Photo media={m} fill sizes="25vw" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Overview */}
      <section id="overview" className="frame mt-28 scroll-mt-32">
        <Marker index="(2)" label="Project overview" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="display text-[clamp(5rem,14vw,12rem)] text-[var(--edition-accent)] md:col-span-4">40+</p>
          <div className="space-y-5 md:col-span-8">{P.overview.map((p) => <p key={p} className="prose-ice">{p}</p>)}</div>
        </div>
        <div className="mt-12">
          <MasonryGallery photos={resolveAll(P.overviewMedia)} label="Project overview — clubs and organizations" />
        </div>
      </section>

      {/* 3. luminescent. */}
      <section id="luminescent" className="frame mt-28 scroll-mt-32">
        <Marker index="(3)" label="luminescent. — the double album" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <h2 className="display text-[clamp(4rem,11vw,10rem)] italic md:col-span-7">luminescent.</h2>
          <p className="prose-ice self-end md:col-span-5">{P.luminescent.intro}</p>
        </div>
        <div className="mt-12">
          <Switcher
            ariaLabel="luminescent. parts"
            tabs={P.luminescent.sides.map((side) => {
              const media = resolveAll(side.media);
              return {
                key: side.key,
                label: <span style={{ color: side.tone }}>{side.name}</span>,
                sub: side.part,
                content: (
                  <div className="grid gap-10 pt-10 md:grid-cols-12">
                    <div className="space-y-5 md:col-span-5">
                      {side.text.map((t) => <p key={t} className="prose-ice">{t}</p>)}
                      <dl className="mt-8 border-t border-hairline">
                        <dt className="eyebrow pt-4">3.3.1 — Base idea</dt>
                        {side.base.map(([k, v]) => (
                          <dd key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-hairline py-3 text-sm">
                            <span className="text-steel-400">{k}</span><span className="text-ice-100">{v}</span>
                          </dd>
                        ))}
                        <dt className="eyebrow pt-6">3.3.2 — Set-up concept</dt>
                        {side.setup.map(([k, v]) => (
                          <dd key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-hairline py-3 text-sm">
                            <span className="text-steel-400">{k}</span><span className="text-ice-300">{v}</span>
                          </dd>
                        ))}
                      </dl>
                    </div>
                    <div className="md:col-span-7">
                      <MasonryGallery photos={media} label={`luminescent. — ${side.name}`} />
                    </div>
                  </div>
                ),
              };
            })}
          />
        </div>
        <Reveal>
          <p className="mt-14 border-l border-steel-600 pl-6 font-serif text-2xl italic text-ice-100">{P.luminescent.outro}</p>
          <p className="mt-4 pl-6 text-sm text-steel-300">Credit — {P.luminescent.credit}</p>
        </Reveal>
      </section>

      {/* 4. The Closet */}
      <section id="closet" className="frame mt-28 scroll-mt-32">
        <Marker index="(4)" label="The Closet. Concept — Nhat Minh Nguyen × Jan21st" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">The Closet.</h2>
            <p className="mt-2 font-serif text-xl italic text-steel-300">A doorway to our most cherished memories</p>
            <div className="mt-8 space-y-5">{P.closet.concept.map((p) => <p key={p} className="prose-ice">{p}</p>)}</div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden md:col-span-6 md:col-start-7">
            <Photo media={resolve({ id: 'project-027-103', alt: 'The empty closet set lit in warm tones' })} fill sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
        <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          <div className="bg-night-950 p-6 md:p-8">
            <p className="eyebrow">4.1 — The process · 45 people</p>
            <p className="mt-4 text-ice-300">{P.closet.process}</p>
          </div>
          <div className="bg-night-950 p-6 md:p-8">
            <p className="eyebrow">After the survey</p>
            <ul className="mt-4 space-y-2">
              {P.closet.findings.map((f) => <li key={f} className="text-ice-100">— {f}</li>)}
            </ul>
          </div>
          <div className="bg-night-950 p-6 md:p-8">
            <p className="eyebrow">Lighting map</p>
            <p className="mt-4 text-ice-300">{P.closet.lighting}</p>
          </div>
        </div>
        <div className="mt-12">
          <MasonryGallery photos={resolveAll(P.closet.media)} label="The Closet × Jan21st" />
        </div>
      </section>

      {/* 5. Other projects */}
      <section id="other" className="frame mt-28 scroll-mt-32">
        <Marker index="(5)" label="Some other projects" />
        <div className="mt-10 space-y-16">
          {P.other.map((proj, i) => (
            <Reveal key={proj.title}>
              <div className="grid gap-6 md:grid-cols-12">
                <h3 className="font-serif text-3xl text-ice-100 md:col-span-3 md:text-4xl">
                  <span className="mr-3 font-mono text-xs text-steel-400">5.{i + 1}</span>{proj.title}
                </h3>
                <div className="grid grid-cols-3 gap-3 md:col-span-9">
                  {resolveAll(proj.media).map((m) => (
                    <div key={m.id} className="relative aspect-[3/4] overflow-hidden"><Photo media={m} fill sizes="(min-width: 768px) 25vw, 33vw" /></div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6. Conclusion */}
      <section id="conclusion" className="frame mt-28 scroll-mt-32">
        <Marker index="(6)" label="Conclusion" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="display text-[clamp(2.5rem,5vw,4.5rem)] md:col-span-5">
            Bridging stories <em className="text-[var(--edition-accent)]">and</em> strategies.
          </p>
          <div className="space-y-5 md:col-span-7">{P.conclusion.map((p) => <p key={p} className="prose-ice">{p}</p>)}</div>
        </div>
      </section>
    </EditionShell>
  );
}
