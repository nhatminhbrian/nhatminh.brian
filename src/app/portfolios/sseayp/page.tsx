import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { Photo } from '@/components/Photo';
import { EditionStage } from '@/components/portfolios/stage/EditionStage';
import { Letterbox } from '@/components/portfolios/stage/Letterbox';
import { Folio, Sparkle, Star, SwipeHint } from '@/components/portfolios/stage/Motifs';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { sseaypEdition as S } from '@/data/portfolios';
import type { ResolvedMedia } from '@/data/types';

export const metadata: Metadata = {
  title: 'SSEAYP 49th Photo Portfolio — web edition',
  description: 'The Viet Nam Contingent of the Ship for Southeast Asian and Japanese Youth Program, in four acts — photos and design by Nguyen Nhat Minh.',
};

/* Native palette (sampled from the PDF) */
const RED = '#d4171d';
const YELLOW = '#ffd21f';
const CREAM = '#fcf0e4';
const WHITE = '#ffffff';
const INK = '#1d1d1b';

const rounded: CSSProperties = { fontFamily: "'Bowlby One', sans-serif", lineHeight: 0.92, letterSpacing: '-0.01em' };
const condensed: CSSProperties = { fontFamily: "'Anton', sans-serif", lineHeight: 0.95, letterSpacing: '0.005em' };

/* Yellow geometry from the PDF: triangles, quarter-discs, half-discs, stars. */
type ShapeKind = 'tri' | 'quarter' | 'half' | 'disc' | 'star' | 'sparkle' | 'pill';
function Shape({ kind, className = '', color = YELLOW, style }: { kind: ShapeKind; className?: string; color?: string; style?: CSSProperties }) {
  if (kind === 'star') return <Star className={`pointer-events-none absolute ${className}`} color={color} />;
  if (kind === 'sparkle') return <Sparkle className={`pointer-events-none absolute ${className}`} color={color} />;
  const shape: Record<string, CSSProperties> = {
    tri: { clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' },
    quarter: { borderBottomLeftRadius: '100%' },
    half: { borderTopLeftRadius: '999px', borderTopRightRadius: '999px' },
    disc: { borderRadius: '999px' },
    pill: { borderRadius: '40% 40% 48% 48% / 50% 50% 50% 50%' },
  };
  return <span aria-hidden className={`pointer-events-none absolute ${className}`} style={{ background: color, ...shape[kind], ...style }} />;
}

function Pic({ m, className = '', sizes = '(min-width: 768px) 33vw, 84vw', priority }: { m: ResolvedMedia; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo media={m} fill sizes={sizes} priority={priority} />
    </div>
  );
}

function ActTitle({ n, title, color = RED, className = '' }: { n: string; title: string; color?: string; className?: string }) {
  return <h2 className={`uppercase ${className}`} style={{ ...condensed, color }}>{n}: {title}</h2>;
}

const byline = (onRed = true): ReactNode => (
  <Folio
    left={<span>Diplomatic Academy of Viet Nam</span>}
    right={<span className="text-right">Photos and Design by <b className="block text-sm">Nguyen Nhat Minh</b></span>}
    className={onRed ? '' : 'text-[#1d1d1b]'}
  />
);

const chapters = [
  { id: 'xin-chao', n: '00', label: 'Xin chào' },
  { id: 'act-1', n: 'I', label: 'Act 1 · The Beginning' },
  { id: 'act-2', n: 'II', label: 'Act 2 · The Identity' },
  { id: 'act-3', n: 'III', label: 'Act 3 · The Connection' },
  { id: 'act-4', n: 'IV', label: 'Act 4 · The Cradle' },
  { id: 'thank-you', n: '—', label: 'Thank you' },
];

export default function SseaypEditionPage() {
  const edition = getEditionBySlug('sseayp');
  const hello = resolve({ id: 'portrait-openhouse', alt: 'Minh with a camera at the DAV Open House' });
  const [a1, a2, a3] = S.acts.map((a) => ({ ...a, photos: resolveAll(a.media) }));
  const a4 = resolveAll(S.coda.media);

  const chapterFrame = (id: string, n: string, title: string, place: string, m: ResolvedMedia, shapes: ReactNode) => (
    <Letterbox
      id={id}
      variant="chapter"
      slate={`${n} · SSEAYP 49th`}
      slateRight={place}
      ambient={RED}
      glow={YELLOW}
      canvas={
        <div className="absolute inset-0" style={{ background: RED }}>
          <Photo media={m} fill sizes="100vw" imgClassName="object-cover opacity-35 mix-blend-luminosity" />
          {shapes}
        </div>
      }
      title={<ActTitle n={n} title={title} color={YELLOW} className="text-[clamp(3rem,11vw,10rem)]" />}
    />
  );

  return (
    <EditionStage edition={edition} chapters={chapters}>
      {/* ── Cover ── */}
      <Letterbox
        slate="(02) — SSEAYP 49th · Photo Portfolio"
        slateRight="16pp · 01–03/2026"
        ambient={RED}
        glow={YELLOW}
        canvas={
          <div className="absolute inset-0 overflow-hidden" style={{ background: RED }}>
            <Shape kind="tri" className="left-[30%] top-[-4%] h-[22%] w-[12%]" />
            <Shape kind="half" className="right-[8%] top-[-8%] h-[16%] w-[14%] rotate-180" />
            <Shape kind="tri" className="left-[-4%] top-[30%] h-[32%] w-[14%] rotate-[100deg]" />
            <Shape kind="tri" className="bottom-[14%] right-[-3%] h-[30%] w-[12%] -rotate-90" />
            <Shape kind="sparkle" className="bottom-[22%] left-[12%] size-[7vmin]" />
          </div>
        }
        title={
          <h1 className="text-left uppercase" style={{ color: CREAM }}>
            <span className="block text-[clamp(1.75rem,5.5vw,4.75rem)]" style={rounded}>SSEAYP 49th</span>
            <span className="block text-[clamp(1.75rem,5.5vw,4.75rem)]" style={rounded}>Viet Nam Contingent’s</span>
            <span className="block text-[clamp(2.75rem,10vw,8.75rem)]" style={rounded}>Photo Portfolio</span>
          </h1>
        }
        after={
          <div className="frame grid gap-6 pb-24 md:grid-cols-12 md:items-end md:pb-10" style={{ color: CREAM }}>
            <div className="flex gap-2 md:col-span-4" aria-label="Viet Nam and Japan">
              <span className="grid h-7 w-10 place-items-center border border-black/30" style={{ background: '#da251d' }}><Star className="size-4" color={YELLOW} /></span>
              <span className="grid h-7 w-10 place-items-center border border-black/30 bg-white"><span className="size-3.5 rounded-full" style={{ background: '#bc002d' }} /></span>
            </div>
            <p className="text-sm md:col-span-6 md:col-start-7">{S.welcome}</p>
          </div>
        }
      />

      {/* ── Xin chào — white panel on red ── */}
      <section id="xin-chao" data-ambient={RED} data-glow={YELLOW} className="relative scroll-mt-14 overflow-hidden py-16 md:py-24">
        <Shape kind="quarter" className="right-0 top-0 h-40 w-40 md:h-72 md:w-72" />
        <Shape kind="disc" className="-bottom-24 left-[10%] h-48 w-48 md:h-72 md:w-72" />
        <div className="frame relative">
          <div className="grid gap-8 rounded-[2rem] p-6 md:grid-cols-12 md:p-14" style={{ background: WHITE, color: INK }}>
            <div className="md:col-span-7">
              <h2 className="flex items-center gap-3 text-[clamp(2.75rem,7vw,5.5rem)]" style={{ ...condensed, color: RED }}>
                Xin chào
                <svg aria-hidden viewBox="0 0 60 40" className="h-[0.5em] w-auto" fill="none" stroke={YELLOW} strokeWidth="6" strokeLinecap="round"><path d="M4 8 L52 2 M4 20 L56 20 M4 32 L52 38" /></svg>
              </h2>
              <div className="ed-body mt-6 space-y-4">{S.hello.map((p) => <p key={p}>{p}</p>)}</div>
              <p className="mt-6 font-bold italic" style={{ color: RED }}>Welcome to the visual diary of my youth!</p>
            </div>
            <Pic m={hello} className="aspect-[4/5] rounded-2xl md:col-span-5" sizes="(min-width: 768px) 36vw, 90vw" />
          </div>
        </div>
      </section>

      {/* ── Act 1 ── */}
      {chapterFrame('act-1', a1.n, a1.title, a1.place, a1.photos[4] ?? a1.photos[0], (
        <>
          <Shape kind="star" className="left-[8%] top-[12%] size-[14vmin]" />
          <Shape kind="half" className="bottom-[-6%] right-[14%] h-[18%] w-[22%]" />
        </>
      ))}

      <section data-ambient={WHITE} data-glow="#ffe9a8" className="relative overflow-hidden py-16 md:py-24" style={{ color: INK }}>
        <Shape kind="tri" color={RED} className="right-[18%] top-[-3rem] h-28 w-28 md:h-40 md:w-40" />
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <ActTitle n={a1.n} title={a1.title} className="text-[clamp(2.5rem,5vw,4.5rem)]" />
            <p className="ed-body mt-5 text-justify">{a1.lede}</p>
            <Pic m={a1.photos[0]} className="mt-6 aspect-[16/9]" sizes="(min-width: 768px) 45vw, 90vw" />
            <p className="mt-2 text-xs">Nguyen Nhat Minh</p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Pic m={a1.photos[2]} className="aspect-[16/9]" sizes="(min-width: 768px) 40vw, 90vw" />
            <div className="relative mt-10">
              <Shape kind="star" className="-right-2 -top-8 size-14 md:size-20" />
              <p className="text-[clamp(2.5rem,5.5vw,4.75rem)] uppercase" style={{ ...rounded, color: RED }}>{S.definition.term}</p>
              <p className="text-right text-sm font-semibold" style={{ color: RED }}>{S.definition.phonetic}</p>
              <p className="mt-3 text-sm italic">{S.definition.body}</p>
            </div>
          </div>
        </div>
      </section>

      <section data-ambient={RED} data-glow={YELLOW} className="relative overflow-hidden py-16 md:py-24">
        <div className="frame">
          <div className="zine md:grid-cols-3 md:gap-3">
            {a1.photos.slice(6, 12).map((m) => <Pic key={m.id} m={m} className="aspect-[3/2]" />)}
          </div>
          <SwipeHint count={6} />
          <p className="mt-6 max-w-3xl text-lg">{a1.notes[0].body}</p>
        </div>
      </section>

      {/* A–RI–GA–TO — cream spread */}
      <section data-ambient={CREAM} className="relative overflow-hidden py-16 md:py-24" style={{ color: INK }}>
        <Shape kind="sparkle" className="bottom-10 right-[6%] size-16 md:size-24" />
        <div className="frame grid gap-10 md:grid-cols-12 md:items-center">
          <div className="zine md:col-span-7 md:grid-cols-2 md:gap-3">
            {[a1.photos[12], a1.photos[13], a1.photos[3], a1.photos[5]].filter(Boolean).map((m, i) => (
              <Pic key={m.id} m={m} className={`aspect-[3/2] ${i === 0 ? 'md:col-span-2' : ''}`} sizes="(min-width: 768px) 40vw, 84vw" />
            ))}
          </div>
          <div className="md:col-span-5">
            <p className="text-[clamp(2.25rem,4.5vw,3.75rem)] uppercase" style={{ ...condensed, color: RED }}>A – RI – GA – TO!<br />ARI GATO!<br />ARIGATOOO!</p>
            <p className="mt-1 font-semibold" style={{ color: RED }}>(ありがとう)</p>
            <p className="ed-body mt-5">{a1.notes[1].body}</p>
            <p className="ed-body mt-5"><b style={{ color: RED }}>{a1.notes[2].title}</b> — {a1.notes[2].body}</p>
          </div>
        </div>
      </section>

      {/* ── Act 2 ── */}
      {chapterFrame('act-2', a2.n, a2.title, a2.place, a2.photos[0], (
        <>
          <Shape kind="quarter" className="right-0 top-0 h-[26%] w-[18%]" />
          <Shape kind="tri" className="bottom-[8%] left-[6%] h-[20%] w-[10%] rotate-12" />
        </>
      ))}

      <section data-ambient={WHITE} data-glow="#ffe9a8" className="relative overflow-hidden py-16 md:py-24" style={{ color: INK }}>
        <Shape kind="half" color={RED} className="-bottom-10 left-[40%] h-24 w-48" />
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <ActTitle n={a2.n} title={a2.title} className="text-[clamp(2.5rem,5vw,4.5rem)]" />
            <p className="ed-body mt-5 text-justify">{a2.lede}</p>
            <p className="ed-body mt-5">{a2.notes[0].body}</p>
          </div>
          <div className="grid gap-3 md:col-span-5 md:col-start-8">
            <Pic m={a2.photos[1]} className="aspect-[4/3]" sizes="(min-width: 768px) 40vw, 90vw" />
            <Pic m={a2.photos[2]} className="aspect-[16/9]" sizes="(min-width: 768px) 40vw, 90vw" />
          </div>
        </div>
      </section>

      <section data-ambient={RED} data-glow={YELLOW} className="relative overflow-hidden py-16 md:py-24">
        <Shape kind="sparkle" className="left-[4%] top-8 size-14 md:size-20" />
        <div className="frame grid gap-10 md:grid-cols-12 md:items-start">
          <p className="text-xl md:col-span-4">{a2.notes[1].body.replace('Beyond the lens, I', 'At the Talkshow, my camera captured more than just the speakers. Beyond the lens, I')}</p>
          <div className="zine md:col-span-8 md:grid-cols-3 md:gap-3">
            {a2.photos.slice(3, 9).map((m, i) => <Pic key={m.id} m={m} className={`aspect-[3/2] ${i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-auto' : ''}`} />)}
          </div>
          <SwipeHint count={6} className="md:col-span-12" />
        </div>
      </section>

      {/* ── Act 3 ── */}
      {chapterFrame('act-3', a3.n, a3.title, a3.place, a3.photos[2], (
        <>
          <Shape kind="disc" className="-left-[6%] top-[20%] h-[40%] w-[20%]" />
          <Shape kind="star" className="bottom-[10%] right-[10%] size-[12vmin]" />
        </>
      ))}

      <section data-ambient={CREAM} className="relative overflow-hidden py-16 md:py-24" style={{ color: INK }}>
        <Shape kind="tri" color={RED} className="left-[-2rem] top-1/3 h-32 w-24 rotate-90" />
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <ActTitle n={a3.n} title={a3.title} className="text-[clamp(2.5rem,5vw,4.5rem)]" />
            <p className="ed-body mt-5 text-justify">{a3.lede}</p>
          </div>
          <div className="zine md:col-span-7 md:grid-cols-2 md:gap-3">
            {a3.photos.map((m, i) => <Pic key={m.id} m={m} className={`aspect-[3/2] ${i === 0 ? 'md:col-span-2' : ''}`} sizes="(min-width: 768px) 40vw, 84vw" />)}
          </div>
          <SwipeHint count={a3.photos.length} className="md:col-span-12" />
        </div>
      </section>

      <section data-ambient={RED} data-glow={YELLOW} className="py-16 md:py-24">
        <div className="frame grid gap-10 md:grid-cols-2">
          <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug">{a3.notes[0].body} Bright smiles and warm interactions in this elegant space are the perfect puzzle pieces for a portrait of <b style={{ color: YELLOW }}>youth without borders</b>.</p>
          <p className="ed-body">{a3.notes[1].body} This final act celebrates the power of networking and the limitless potential of youth — a vibrant ecosystem of inspiration, cultural exchange, and a shared vision for a <b style={{ color: YELLOW }}>borderless tomorrow</b>.</p>
        </div>
      </section>

      {/* ── Act 4 ── */}
      {chapterFrame('act-4', S.coda.n, S.coda.title, S.coda.place, a4[0], (
        <>
          <Shape kind="sparkle" className="left-[10%] top-[14%] size-[12vmin]" />
          <Shape kind="half" className="bottom-[-4%] left-[40%] h-[16%] w-[24%]" />
        </>
      ))}

      <section data-ambient={WHITE} data-glow="#ffe9a8" className="relative overflow-hidden py-16 md:py-24" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12 md:items-center">
          <Pic m={a4[0]} className="aspect-[3/2] md:col-span-7" sizes="(min-width: 768px) 55vw, 90vw" />
          <div className="md:col-span-5">
            <p className="ed-body">{S.coda.lede}</p>
            <ActTitle n={S.coda.n} title={S.coda.title} className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)]" />
          </div>
        </div>
      </section>

      <section data-ambient={RED} data-glow={YELLOW} className="py-16 md:py-24">
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="zine md:col-span-7 md:grid-cols-3 md:gap-2">
            {a4.slice(1).map((m) => <Pic key={m.id} m={m} className="aspect-[3/2]" sizes="(min-width: 768px) 20vw, 84vw" />)}
          </div>
          <SwipeHint count={a4.length - 1} className="md:hidden" />
          <div className="self-center md:col-span-4 md:col-start-9">
            <p className="text-lg leading-relaxed">{S.coda.body}</p>
            <p className="mt-6 text-2xl font-bold">I am Nguyen Nhat Minh. <span style={{ color: YELLOW }}>Thank you.</span></p>
          </div>
        </div>
      </section>

      {/* ── Thank you ── */}
      <section id="thank-you" data-ambient={RED} data-glow={YELLOW} className="relative scroll-mt-14 overflow-hidden py-20 md:py-28">
        <Shape kind="pill" className="bottom-24 right-[6%] h-24 w-32 md:h-40 md:w-56" />
        <div className="frame relative">
          {byline()}
          <div className="relative mt-10 inline-block">
            <p className="text-[clamp(5rem,20vw,17rem)] uppercase" style={{ ...rounded, color: CREAM }}>Thank<br />you</p>
            <Sparkle className="absolute -right-10 top-0 size-20 md:size-32" color={YELLOW} />
          </div>
          <dl className="mt-12 grid gap-6 text-sm sm:grid-cols-2 md:max-w-3xl">
            <div><dt className="font-bold">Social Media:</dt><dd>Main Instagram Account: @ntjst_brian<br />Photography Instagram Account: @_wandergraph_</dd></div>
            <div><dt className="font-bold">Email:</dt><dd>nhatminh.brian@gmail.com<br />nguyennhatminh-ktqt52c1@dav.edu.vn</dd></div>
          </dl>
        </div>
      </section>
    </EditionStage>
  );
}
