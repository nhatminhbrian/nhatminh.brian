import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { P as Pick } from '@/components/i18n/LanguageProvider';
import { Photo } from '@/components/Photo';
import { EditionStage } from '@/components/portfolios/stage/EditionStage';
import { Letterbox } from '@/components/portfolios/stage/Letterbox';
import { Folio, Script, Sparkle, Squiggle, SwipeHint } from '@/components/portfolios/stage/Motifs';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { projectEdition as P } from '@/data/portfolios';
import { artisticVision, philosophy } from '@/data/profile';
import type { MediaRef, ResolvedMedia } from '@/data/types';

export const metadata: Metadata = {
  title: 'Project Portfolio — web edition',
  description: 'luminescent. the double album, The Closet and selected street work — Nhat Minh Nguyen’s Project Portfolio for UIC Yonsei, rebuilt for the web.',
};

/* Native palette (sampled from the PDF) */
const CREAM = '#fbfae8'; // text on dark spreads
const PAPER = '#f4efe6'; // archival notebook paper
const INK = '#181715';
const BLUE = '#5685cd';
const COPPER = '#ed996b';
const GOLD = '#f1ddb4';
const SKY = '#a9c9f2';
const NAVY = '#10213d';

/** Wide heavy grotesk used for every headline in the PDF. */
const wide: CSSProperties = { fontFamily: 'var(--ed-display)', fontStretch: '125%', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 0.9 };

function H({ children, className = '', style, as: Tag = 'h2' }: { children: ReactNode; className?: string; style?: CSSProperties; as?: 'h1' | 'h2' | 'h3' | 'p' }) {
  return <Tag className={`uppercase ${className}`} style={{ ...wide, ...style }}>{children}</Tag>;
}

function Frame({ m, className = '', sizes = '(min-width: 768px) 40vw, 84vw', fit = 'object-cover', priority }: { m: ResolvedMedia; className?: string; sizes?: string; fit?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo media={m} fill sizes={sizes} imgClassName={fit} priority={priority} />
    </div>
  );
}

const foot = (page: number, dark = false) => (
  <Folio left={<span>Nhat Minh Nguyen</span>} right={<span>@_wandergraph_</span>} page={page} className={dark ? 'text-[#141414]' : ''} />
);

const chapters = [
  { id: 'contents', n: '00', label: { vi: 'Mục lục', en: 'Table of content', ko: '목차' } },
  { id: 'introduction', n: '1', label: { vi: 'Giới thiệu', en: 'Introduction', ko: '소개' } },
  { id: 'overview', n: '2', label: { vi: 'Tổng quan dự án', en: 'Project overview', ko: '프로젝트 개요' } },
  { id: 'luminescent', n: '3', label: { vi: 'luminescent. album đôi', en: 'luminescent. the double album', ko: 'luminescent. 더블 앨범' } },
  { id: 'closet', n: '4', label: { vi: 'Dự án The Closet', en: 'The Closet project', ko: '더 클로젯 프로젝트' } },
  { id: 'other', n: '5', label: { vi: 'Các dự án khác', en: 'Some other projects', ko: '기타 프로젝트' } },
  { id: 'contact', n: '6', label: { vi: 'Liên hệ', en: 'Contact', ko: '연락처' } },
];

export default function ProjectEditionPage() {
  const edition = getEditionBySlug('project');
  const r = (id: string, alt: string): ResolvedMedia => resolve({ id, alt });
  const all = (refs: MediaRef[]) => resolveAll(refs);
  const [red, blue] = P.luminescent.sides;

  const vision = [r('project-006-019', 'Train street lined with plants in Hà Nội'), r('project-006-022', 'Turtle Tower framed by trees on Hoàn Kiếm Lake'), r('project-006-021', 'Water buffalo walking along a rail track')];
  const events = all(P.eventsMedia);
  const overview = all(P.overviewMedia);
  const closet = all(P.closet.media);

  return (
    <EditionStage edition={edition} chapters={chapters}>
      {/* ── Cover: letterboxed title frame opening into the blue-to-black cover ── */}
      <Letterbox
        slate="(01) — Project Portfolio · UIC Yonsei"
        slateRight="42pp · EN · 03/2025"
        ambient={PAPER}
        glow={BLUE}
        canvas={
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${BLUE} 0%, #1d2c4a 38%, #000 70%)` }}>
            <div className="absolute inset-y-0 left-1/2 w-[min(78vw,640px)] -translate-x-1/2">
              <Photo media={edition.cover} fill priority sizes="(min-width: 768px) 640px, 78vw" imgClassName="object-cover object-top" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        }
        title={
          <H as="h1" className="text-[clamp(2.6rem,12vw,11.5rem)]" style={{ color: CREAM }}>
            <span className="flex justify-between gap-[0.5em]"><span>Pro</span><span>ject</span></span>
            <span className="block">
              Por<span className="text-stroke">tfol</span>io
            </span>
          </H>
        }
        after={
          <div className="frame flex items-end justify-between pb-24 text-sm md:pb-10" style={{ color: CREAM }}>
            <span className="text-lg">by</span>
            <span className="font-semibold">Nhat Minh Nguyen</span>
          </div>
        }
      />

      {/* ── Table of content ── */}
      <section id="contents" data-ambient={PAPER} data-glow={BLUE} className="relative scroll-mt-14 overflow-hidden py-24 md:py-32">
        <Squiggle variant={1} color={BLUE} className="absolute -top-10 left-[8%] w-56 md:w-80" />
        <div className="frame grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="ui-label text-[0.6875rem] opacity-60">Yonsei University</p>
            <H className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)]" style={{ color: INK }}>Table<br />of<br />Content</H>
          </div>
          <ol className="relative grid gap-3 md:col-span-6 md:col-start-7">
            {chapters.slice(1).map((c, i) => (
              <li key={c.id} style={{ marginLeft: `${(i % 2) * 18}%` }}>
                <a
                  href={`#${c.id}`}
                  className="flex min-h-12 items-center justify-center rounded-full px-6 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ background: BLUE, color: CREAM }}
                >
                  {c.n}. <Pick v={c.label} />
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="frame">{foot(1)}</div>
      </section>

      {/* ── 1. Introduction — cream spread, photo left, letter right ── */}
      <section id="introduction" data-ambient={PAPER} className="scroll-mt-14 py-20 md:py-28" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12 md:items-start">
          <Frame m={r('portrait-camera', 'Minh shooting with a Canon camera')} className="aspect-[4/5] md:col-span-4" />
          <div className="md:col-span-7 md:col-start-6">
            <H className="text-[clamp(2rem,8.5vw,4.75rem)] md:text-[clamp(2.5rem,5vw,5.25rem)]" style={{ color: BLUE }}>Introduction</H>
            <div className="ed-body mt-8 space-y-4 md:columns-2 md:gap-10 md:space-y-0 [&>p]:mb-4">
              {P.introduction.map((p, i) => (
                <p key={p} className={i === 0 ? 'font-semibold' : ''}>{p}</p>
              ))}
            </div>
            <p className="mt-4 text-right text-sm font-semibold">@_wandergraph_</p>
          </div>
        </div>
        <div className="frame">{foot(2, true)}</div>
      </section>

      {/* 1.1 Hello, I'm */}
      <section data-ambient={PAPER} className="relative overflow-hidden pb-20 md:pb-28" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <span className="inline-block -rotate-3 bg-[#141414] px-5 py-2 text-[clamp(1.1rem,2.4vw,2rem)]" style={{ ...wide, color: CREAM }}>HELLO, I’M</span>
            <H className="mt-1 text-[clamp(2.25rem,9.5vw,7.5rem)]" style={{ color: BLUE }}>
              Nhat Minh<br />Nguyen <span aria-hidden className="inline-block align-top text-[0.8em]">✱</span>
            </H>
            <p className="mt-10 flex items-center gap-3 text-xl font-semibold"><span className="h-8 w-1.5" style={{ background: BLUE }} /> 1.1. about me:</p>
            <div className="ed-body mt-5 max-w-xl space-y-4">{P.about.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <Frame m={r('portrait-intro', 'Brian in a varsity jacket')} className="aspect-[3/4] md:col-span-5" sizes="(min-width: 768px) 38vw, 84vw" fit="object-cover object-top" />
        </div>
        <div className="frame">{foot(3, true)}</div>
      </section>

      {/* 1.2 Creative philosophy — right-aligned, italic numbered principles */}
      <section data-ambient={PAPER} className="pb-20 md:pb-28" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12 md:items-center">
          <Frame m={r('portrait-studio', 'Minh in a studio portrait')} className="order-2 aspect-[4/5] md:order-1 md:col-span-4" />
          <div className="order-1 text-right md:order-2 md:col-span-7 md:col-start-6">
            <H className="text-[clamp(1.9rem,7.5vw,5rem)]" style={{ color: BLUE }}>
              <span aria-hidden className="mr-3 inline-block -rotate-12 text-[0.6em]">⚡</span>1.2.<br />Creative<br />Philosophy
            </H>
            <p className="mt-8 font-semibold">I always follow five key principles in every project I undertake:</p>
            <ol className="mt-5 space-y-3 italic">
              {philosophy.map((p, i) => <li key={p}>{i + 1}. {p}</li>)}
            </ol>
          </div>
        </div>
        <div className="frame">{foot(4, true)}</div>
      </section>

      {/* 1.3 Artistic vision — black, text column + street collage */}
      <section data-ambient={PAPER} data-glow="#2f6b3a" className="relative overflow-hidden py-20 md:py-28">
        <Squiggle variant={2} color={BLUE} className="absolute -bottom-12 right-[30%] w-48 md:w-72" />
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <H className="text-[clamp(2.25rem,5vw,4.25rem)]" style={{ color: INK }}>1.3.<br />Artistic<br />Vision</H>
            <p className="ed-body mt-8 opacity-90">{artisticVision} Through landscape, street, and portrait photography, I bring these contrasts to life.</p>
          </div>
          <div className="zine md:col-span-8 md:grid-cols-2 md:gap-3">
            <Frame m={vision[0]} className="aspect-[4/5] md:col-span-2 md:aspect-[16/9]" sizes="(min-width: 768px) 60vw, 84vw" />
            <Frame m={vision[1]} className="aspect-[4/5]" />
            <Frame m={vision[2]} className="aspect-[4/5]" />
          </div>
          <SwipeHint count={3} className="md:col-span-12" />
        </div>
        <div className="frame">{foot(5)}</div>
      </section>

      {/* Events — collage left, column right (page 6) */}
      <section data-ambient={PAPER} data-glow="#c2412d" className="py-20 md:py-28">
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="zine md:col-span-7 md:grid-cols-3 md:gap-3">
            {events.map((m, i) => <Frame key={m.id} m={m} className={`aspect-[3/4] ${i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto' : ''}`} sizes="(min-width: 768px) 30vw, 84vw" />)}
          </div>
          <div className="ed-body space-y-4 md:col-span-4 md:col-start-9">
            {P.events.map((p) => <p key={p}>{p}</p>)}
            <p className="font-semibold" style={{ color: BLUE }}>As an “observer,” my responsibility is to capture these moments as truthfully as possible.</p>
          </div>
          <SwipeHint count={events.length} className="md:col-span-12" />
        </div>
        <div className="frame">{foot(6)}</div>
      </section>

      {/* ── 2. Project overview — collage band + right-aligned blue headline ── */}
      <section id="overview" data-ambient={PAPER} data-glow={BLUE} className="scroll-mt-14 py-20 md:py-28">
        <div className="frame">
          <div className="zine md:grid-cols-5 md:gap-2">
            {overview.map((m) => <Frame key={m.id} m={m} className="aspect-[4/5] md:aspect-[3/4]" sizes="(min-width: 768px) 20vw, 84vw" />)}
          </div>
          <SwipeHint count={overview.length} />
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[clamp(6rem,16vw,13rem)] leading-none" style={{ ...wide, color: BLUE }}>34</p>
              <p className="ui-label text-[0.6875rem] opacity-70">projects · clubs · organisations · 2022–2025</p>
            </div>
            <div className="md:col-span-8">
              <H className="text-right text-[clamp(2rem,8vw,6rem)]" style={{ color: BLUE }}>2. Project<br />Overview</H>
              <div className="ed-body mt-8 space-y-4 md:columns-2 md:gap-10 [&>p]:mb-4">{P.overview.map((p) => <p key={p}>{p}</p>)}</div>
              <p className="mt-2 font-semibold">On February 27, 2023, I had the opportunity to meet the UIC Yonsei admissions team. That was a moment I will never forget.</p>
            </div>
          </div>
        </div>
        <div className="frame">{foot(8)}</div>
      </section>

      {/* ── 3. luminescent. — chapter letterbox ── */}
      <Letterbox
        id="luminescent"
        variant="chapter"
        slate="Chapter 3"
        slateRight="17th birthday"
        ambient="#0a0809"
        glow={GOLD}
        canvas={
          <div className="absolute inset-0 grid grid-cols-2 bg-[#0a0809]">
            <div className="relative"><Photo media={resolve(red.media[0])} fill sizes="50vw" imgClassName="object-cover opacity-70" /></div>
            <div className="relative"><Photo media={resolve(blue.media[0])} fill sizes="50vw" imgClassName="object-cover opacity-70" /></div>
            <div className="absolute inset-0 bg-black/45" />
          </div>
        }
        title={
          <div style={{ color: GOLD }}>
            <p className="text-left text-[clamp(2.5rem,6vw,5rem)]" style={wide}>3.</p>
            <p className="relative text-[clamp(4.5rem,16vw,13rem)] leading-none" style={{ fontFamily: 'var(--ed-script)' }}>
              luminescent.
              <Sparkle className="absolute -right-6 -top-4 size-10 md:size-16" color={GOLD} />
              <Sparkle className="absolute -left-4 bottom-2 size-6 md:size-9" color={GOLD} />
            </p>
            <p className="mt-2 text-sm font-bold md:text-base">the double album</p>
          </div>
        }
      />

      <section data-ambient={PAPER} data-glow={GOLD} className="py-20 md:py-28">
        <div className="frame ed-body grid max-w-5xl gap-5 md:grid-cols-2 md:gap-x-12">
          <p className="md:col-span-2"><b>luminescent.</b> {P.luminescent.intro.replace(/^luminescent\. /, '')}</p>
          <p><b style={{ color: COPPER }}>Red Sun</b> — a representation of <b>fiery passion, energy, and confidence</b>, captured through bold red tones, dramatic lighting, and striking compositions.</p>
          <p><b style={{ color: SKY }}>Blue Moon</b> — a reflection of <b>quiet introspection, mystery, and depth</b>, expressed through cool blue hues, soft lighting, and ethereal atmospheres.</p>
          <p className="md:col-span-2">{P.luminescent.outro}</p>
        </div>
      </section>

      {/* 3.1 Red Sun — warm dark, copper script, filmstrip */}
      <section data-ambient={PAPER} data-glow={COPPER} className="relative overflow-hidden py-20 md:py-28">
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="text-[clamp(2rem,4vw,3.5rem)]" style={{ ...wide, color: GOLD }}>3.1. <span style={{ fontFamily: 'var(--ed-script)', fontWeight: 400, fontStretch: '100%' }} className="text-[1.6em]">luminescent.</span> <span className="text-[0.5em]">pt.1</span></p>
            <Script className="text-[clamp(2.75rem,6vw,5.5rem)]" color={COPPER} rotate={-4}>be the son of devil.</Script>
          </div>
          <div className="filmstrip mt-12">
            {resolveAll(red.media).map((m) => (
              <figure key={m.id} className="relative h-[62svh] max-h-[640px] w-auto" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
                <Photo media={m} fill sizes="(min-width: 768px) 45vw, 84vw" />
              </figure>
            ))}
          </div>
          <SwipeHint count={red.media.length} />
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            {red.text.map((t, i) => <p key={t} className={`ed-body md:col-span-5 ${i ? 'md:col-start-8' : ''}`}>{t}</p>)}
          </div>
        </div>
      </section>

      {/* 3.2 Blue Moon — sky field, navy ink */}
      <section data-ambient={SKY} data-glow="#ffffff" className="relative overflow-hidden py-20 md:py-28" style={{ color: NAVY }}>
        <div className="frame">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Script className="text-[clamp(2.75rem,6vw,5.5rem)]" color="#ffffff" rotate={-5}>brian.</Script>
            <p className="text-[clamp(2rem,4vw,3.5rem)]" style={{ ...wide, color: '#ffffff' }}>3.2. <span style={{ fontFamily: 'var(--ed-script)', fontWeight: 400, fontStretch: '100%' }} className="text-[1.6em]">luminescent.</span> <span className="text-[0.5em]">pt.2</span></p>
          </div>
          <div className="zine mt-12 md:grid-cols-6 md:gap-3">
            {resolveAll(blue.media).map((m, i) => (
              <Frame key={m.id} m={m} className={`aspect-[4/5] shadow-[0_30px_60px_-30px_rgb(16_33_61/0.6)] ${['md:col-span-2 md:row-span-2 md:aspect-auto', 'md:col-span-2', 'md:col-span-2', 'md:col-span-3 md:aspect-[3/2]', 'md:col-span-3 md:aspect-[3/2]', 'md:col-span-6 md:aspect-[21/9]'][i] ?? ''}`} sizes="(min-width: 768px) 50vw, 84vw" />
            ))}
          </div>
          <SwipeHint count={blue.media.length} />
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            <p className="ed-body md:col-span-5">{blue.text[0]}</p>
            <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight md:col-span-6 md:col-start-7">If Red Sun is the relentless pursuit, then Blue Moon is the quiet surrender. One cannot exist without the other.</p>
          </div>
          <p className="mt-10 text-sm opacity-80"><b>Credit:</b> {P.luminescent.credit}</p>
        </div>
      </section>

      {/* 3.3 The process — split columns separated by a hairline */}
      <section data-ambient={PAPER} data-glow={BLUE} className="relative overflow-hidden py-20 md:py-28">
        <Squiggle variant={0} color={BLUE} className="absolute -right-10 top-6 w-56 md:w-80" />
        <div className="frame">
          <H className="text-[clamp(1.75rem,3.5vw,3rem)]" style={{ color: INK }}>3.3. The process<br />3.3.1. Base idea</H>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:divide-x md:divide-[rgb(251_250_232/0.4)]">
            {[red, blue].map((s) => (
              <div key={s.key} className="md:px-10 first:md:pl-0">
                <H as="h3" className="text-[clamp(2rem,4vw,3.5rem)]" style={{ color: s.key === 'red' ? COPPER : BLUE }}>{s.name}</H>
                <ul className="mt-6 space-y-2 font-display font-medium text-lg">
                  {s.base.map(([k, v]) => <li key={k}>– {k}: <b style={{ color: s.key === 'red' ? COPPER : SKY }}>{v}.</b></li>)}
                </ul>
                <p className="mt-10 font-semibold uppercase" style={{ ...wide, color: s.key === 'red' ? COPPER : BLUE }}>3.3.2. Set up concept</p>
                <ul className="ed-body mt-4 space-y-3">
                  {s.setup.map(([k, v]) => <li key={k}>• <b>{k}</b>: {v}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="frame">{foot(23)}</div>
      </section>

      {/* ── 4. The Closet — chapter letterbox ── */}
      <Letterbox
        id="closet"
        variant="chapter"
        slate="Chapter 4 · Nhat Minh Nguyen x Jan21st"
        slateRight="45 people · 1 closet"
        ambient="#1a0f08"
        glow="#e0782f"
        canvas={<div className="absolute inset-0"><Photo media={closet[0]} fill sizes="100vw" imgClassName="object-cover" /><div className="absolute inset-0 bg-black/45" /></div>}
        title={<H as="p" className="text-[clamp(2.4rem,11vw,9.5rem)]" style={{ color: CREAM }}>4.<br />The Closet.</H>}
        after={<p className="frame pb-24 text-center font-semibold md:pb-10" style={{ color: CREAM }}>A Doorway to Our Most Cherished Memories</p>}
      />

      <section data-ambient={PAPER} data-glow="#e0782f" className="py-20 md:py-28">
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm font-semibold opacity-80">Nhat Minh Nguyen x Jan21st</p>
            <H className="mt-4 text-[clamp(2.25rem,5vw,4.25rem)]" style={{ color: INK }}>The Closet.<br />Concept</H>
            <p className="mt-3 font-semibold">A Doorway to Our Most Cherished Memories</p>
            <div className="ed-body mt-6 space-y-4">{P.closet.concept.map((p) => <p key={p}>{p}</p>)}</div>
          </div>
          <div className="zine md:col-span-7 md:grid-cols-3 md:gap-2">
            {closet.slice(1, 7).map((m, i) => <Frame key={m.id} m={m} className={`aspect-[3/4] ${i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto' : ''}`} sizes="(min-width: 768px) 25vw, 84vw" />)}
          </div>
          <SwipeHint count={6} className="md:col-span-12" />
        </div>
        {/* fisheye circle, as in the PDF */}
        <div className="frame mt-16 grid place-items-center">
          <div className="relative aspect-square w-[min(88vw,720px)] overflow-hidden rounded-full shadow-[0_40px_120px_-40px_rgb(224_120_47/0.6)]">
            <Photo media={closet[closet.length - 1]} fill sizes="(min-width: 768px) 720px, 88vw" />
          </div>
        </div>
      </section>

      {/* 4.1 The process — survey findings, blue ribbons */}
      <section data-ambient={PAPER} data-glow={BLUE} className="relative overflow-hidden py-20 md:py-28">
        <Squiggle variant={3} color={BLUE} className="absolute -left-12 top-10 w-60 md:w-96" />
        <Squiggle variant={2} color={BLUE} className="absolute -right-16 bottom-0 w-60 md:w-96" />
        <div className="frame relative grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <H className="text-[clamp(2.25rem,5vw,4.5rem)]" style={{ color: INK }}>4.1. The process</H>
            <p className="ed-body mt-8">{P.closet.process}</p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <H as="h3" className="text-[clamp(1.25rem,2vw,1.75rem)]" style={{ color: INK }}>After the survey, I have drawn the following main ideas:</H>
            <ul className="mt-6 divide-y divide-[rgb(251_250_232/0.18)] border-y border-[rgb(251_250_232/0.18)]">
              {P.closet.findings.map((f) => <li key={f} className="py-3 font-semibold">– {f}.</li>)}
            </ul>
          </div>
        </div>
        <div className="frame">{foot(30)}</div>
      </section>

      {/* Lighting map — cream spread */}
      <section data-ambient={PAPER} className="py-20 md:py-28" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <H className="text-[clamp(2rem,4.5vw,3.75rem)]">Lighting map</H>
            <p className="ed-body mt-6">{P.closet.lighting}</p>
          </div>
          <div className="relative md:col-span-6">
            <Squiggle variant={1} color={BLUE} className="absolute -top-16 right-0 w-40" />
            <ul className="grid gap-3 text-sm font-semibold">
              {['1 rectangular gobo — spotlight', '1 background light — vivid gradient', '1 light inside the cabinet — key'].map((l, i) => (
                <li key={l} className="flex items-center gap-4 rounded-full border border-[#141414]/15 bg-white px-5 py-3">
                  <span className="grid size-8 place-items-center rounded-full text-xs" style={{ background: BLUE, color: CREAM }}>{i + 1}</span>{l}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="frame">{foot(33, true)}</div>
      </section>

      {/* ── 5. Some other projects — cream, coloured titles per project ── */}
      <section id="other" data-ambient={PAPER} className="scroll-mt-14 py-20 md:py-28" style={{ color: INK }}>
        <div className="frame">
          <H className="text-[clamp(2.25rem,5.5vw,4.75rem)]">5.<br />Some other<br />project</H>
          {P.other.map((o, i) => {
            const color = [BLUE, '#d9541e', '#d9541e', BLUE, '#2e7d32'][i] ?? BLUE;
            const media = resolveAll(o.media);
            return (
              <div key={o.title} className="mt-16 md:mt-24">
                <H as="h3" className={`text-[clamp(1.5rem,3vw,2.5rem)] ${i % 2 ? '' : 'md:text-right'}`} style={{ color }}>{o.title}</H>
                <div className="zine mt-6 md:grid-cols-3 md:gap-3">
                  {media.map((m) => <Frame key={m.id} m={m} className="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 84vw" />)}
                </div>
                <SwipeHint count={media.length} />
              </div>
            );
          })}
        </div>
        <div className="frame">{foot(39, true)}</div>
      </section>

      {/* ── 6. Contact ── */}
      <section id="contact" data-ambient={PAPER} className="scroll-mt-14 py-20 md:py-28" style={{ color: INK }}>
        <div className="frame">
          <div className="flex justify-between text-xs font-semibold"><span>Nhat Minh Nguyen</span><span>Project Portfolio</span></div>
          <p className="mt-12 text-center text-[clamp(4rem,14vw,10rem)] leading-none" style={{ fontFamily: 'var(--ed-script)', color: INK }}>Brian.</p>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 text-sm sm:grid-cols-3">
            {P.contact.links.map((l) => (
              <a key={l.label} href={l.href} className="block border-t border-[#141414]/20 pt-3 hover:opacity-70">
                <span className="block font-semibold">{l.label}</span>
                <span>{l.value}</span>
              </a>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center italic">{P.contact.closing}</p>
        </div>
        <div className="frame">{foot(40, true)}</div>
      </section>
    </EditionStage>
  );
}
