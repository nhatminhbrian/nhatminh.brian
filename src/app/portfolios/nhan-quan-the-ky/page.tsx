import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { Photo } from '@/components/Photo';
import { Hotspots } from '@/components/portfolios/Hotspots';
import { EditionStage } from '@/components/portfolios/stage/EditionStage';
import { Letterbox } from '@/components/portfolios/stage/Letterbox';
import { Folio, Script, Squiggle, SwipeHint } from '@/components/portfolios/stage/Motifs';
import { getEditionBySlug, resolve, resolveAll } from '@/lib/content';
import { nqtkEdition as N } from '@/data/portfolios';
import type { ResolvedMedia } from '@/data/types';

export const metadata: Metadata = {
  title: 'Nhãn Quan Thế Kỷ - tiểu luận thị giác',
  description: 'Một thế kỷ hoa lửa, một lăng kính trần trụi. Tiểu luận nhiếp ảnh của Nguyễn Nhật Minh về tính vật chất của truyền thông.',
};

/* Native palette (sampled from the PDF) */
const PAPER = '#f4f1ea';
const ESPRESSO = '#221c14';
const INK = '#1c1711';
const RED = '#d2281e';

/* DT Phudu (PDF) → Phudu */
const heavy: CSSProperties = { fontFamily: 'var(--portfolio-font-display)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.015em' };

function Pic({ m, className = '', sizes = '(min-width: 768px) 40vw, 84vw', priority }: { m: ResolvedMedia; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo media={m} fill sizes={sizes} priority={priority} />
    </div>
  );
}

/** The running footer printed on every spread of the PDF. */
const runner = (dark = false): ReactNode => (
  <Folio
    className={dark ? 'text-[#f4f1ea]' : 'text-[#1c1711]'}
    left={<><span>Nguyễn Nhật Minh</span><span>KTQT52C10465</span></>}
    right={<><span>Đại cương truyền thông quốc tế</span><span>Học viện Ngoại giao</span></>}
  />
);

const chapters = [
  { id: 'loi-tua', n: '00', label: { vi: 'Lời tựa · Tuyên ngôn sáng tạo', en: 'Preface · Creative rationale', ko: '서문 · 창작 선언' } },
  { id: 'hoi-1', n: 'I', label: { vi: 'Hồi I · Phá vỡ sự bất đối xứng', en: 'Act I · Breaking the asymmetry', ko: '1막 · 비대칭을 깨다' } },
  { id: 'hoi-2', n: 'II', label: { vi: 'Hồi II · Ngôn ngữ của khói lửa và rỉ sét', en: 'Act II · The language of fire and rust', ko: '2막 · 포화와 녹의 언어' } },
  { id: 'hoi-3', n: 'III', label: { vi: 'Hồi III · Tọa độ toàn cầu', en: 'Act III · Global coordinates', ko: '3막 · 세계의 좌표' } },
  { id: 'vi-thanh', n: 'IV', label: { vi: 'Vĩ thanh · Người quan sát', en: 'Epilogue · The observer', ko: '에필로그 · 관찰자' } },
  { id: 'cam-on', n: '-', label: { vi: 'Xin cảm ơn!', en: 'Thank you!', ko: '감사합니다!' } },
];

export default function NhanQuanTheKyPage() {
  const edition = getEditionBySlug('nhan-quan-the-ky');
  const cover = resolve(N.cover);
  const preface = resolve(N.preface.media);
  const [h1, h2, h3] = N.acts.map((a) => ({ ...a, photos: resolveAll(a.media), hero: resolve(a.feature) }));
  const epi = resolveAll(N.epilogue.media);
  const group = epi[epi.length - 1];

  const actFrame = (id: string, act: typeof h1, dark: boolean) => (
    <Letterbox
      id={id}
      variant="chapter"
      slate={`${act.n} · Nhãn Quan Thế Kỷ`}
      slateRight="Bảo tàng Báo chí Việt Nam"
      ambient={dark ? ESPRESSO : PAPER}
      glow={dark ? '#8a3b1c' : undefined}
      canvas={
        <div className="absolute inset-0" style={{ background: ESPRESSO }}>
          <Photo media={act.hero} fill sizes="100vw" imgClassName="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221c14] via-[#221c14]/30 to-transparent" />
        </div>
      }
      title={
        <div style={{ color: PAPER }}>
          <p className="text-[clamp(1.25rem,3vw,2.25rem)] uppercase" style={heavy}>{act.n}</p>
          <h2 className="mt-2 text-[clamp(2.5rem,9vw,8rem)] uppercase" style={heavy}>{act.title}</h2>
          <Script className="mt-4 text-[clamp(2rem,5vw,4rem)]" color={RED} rotate={-4}>{act.captions[0]}</Script>
        </div>
      }
    />
  );

  return (
    <EditionStage edition={edition} chapters={chapters}>
      {/* ── Cover: museum photo above, paper below, headline straddling the seam ── */}
      <Letterbox
        slate="(03) - Nhãn Quan Thế Kỷ · Tiểu luận thị giác"
        slateRight="12pp · VI · 2026"
        ambient={PAPER}
        canvas={
          <div className="absolute inset-0" style={{ background: PAPER }}>
            <div className="absolute inset-x-0 top-0 h-[44%]">
              <Photo media={cover} fill priority sizes="100vw" imgClassName="object-cover" />
            </div>
          </div>
        }
        title={
          <div className="pt-[16svh]">
            <h1 className="text-[clamp(3.25rem,12.5vw,11.5rem)] uppercase" style={{ ...heavy, color: INK }}>Nhãn Quan Thế Kỷ</h1>
            <Script className="-mt-[0.2em] text-[clamp(1.75rem,5vw,4.25rem)]" color={RED} rotate={-3} as="p">{N.subtitle}</Script>
          </div>
        }
        after={<div className="frame pb-24 md:pb-8">{runner()}</div>}
      />

      {/* ── Lời tựa ── */}
      <section id="loi-tua" data-ambient={PAPER} className="relative scroll-mt-14 py-16 md:py-24" style={{ color: INK }}>
        <span aria-hidden className="absolute right-[var(--gutter)] top-10 size-3" style={{ background: INK }} />
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] uppercase" style={heavy}>Lời tựa</h2>
            <p className="mt-3 text-[clamp(1.25rem,2.4vw,2rem)] uppercase" style={heavy}>Creative rationale | Tuyên ngôn sáng tạo<br />Dự án: Nhãn Quan Thế Kỷ (The Century’s Vision)</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Script className="text-[clamp(2.25rem,4vw,3.5rem)]" color={RED} rotate={-8}>{N.preface.epigraph}</Script>
          </div>
          <div className="ed-body space-y-3 text-justify md:col-span-8 md:columns-2 md:gap-10 md:space-y-0 [&>p]:mb-3">
            <p>{N.preface.salutation.replace('thầy Nguyễn Minh Tuấn', '')}<b>thầy Nguyễn Minh Tuấn</b>,</p>
            <p>Em là <b>Nguyễn Nhật Minh - Mã sinh viên: KTQT52C10465</b>, là sinh viên đang theo học bộ môn bổ trợ Đại cương truyền thông quốc tế.</p>
            {N.preface.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <Pic m={preface} className="aspect-[4/5] md:col-span-4" sizes="(min-width: 768px) 30vw, 90vw" />
        </div>
        <div className="frame">{runner()}</div>
      </section>

      {/* ── Hồi I - paper spread: collage left, artifact right ── */}
      {actFrame('hoi-1', h1, false)}
      <section data-ambient={PAPER} className="py-16 md:py-24" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="zine md:grid-cols-2 md:gap-2">
              {h1.photos.map((m, i) => <Pic key={m.id} m={m} className={`aspect-[4/3] ${i === 0 ? 'md:row-span-2 md:aspect-auto' : ''}`} />)}
            </div>
            <SwipeHint count={h1.photos.length} />
            <Script className="mt-4 text-[clamp(2rem,3.5vw,3rem)]" color={RED} rotate={-5} as="p">{h1.captions[0]}</Script>
          </div>
          <div className="md:col-span-6">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] uppercase" style={heavy}>{h1.n} – {h1.title}</h3>
            <p className="ed-body mt-4 italic">{h1.body}</p>
            <div className="mt-8"><Hotspots media={h1.hero} spots={h1.hotspots} caption={h1.captions[1]} /></div>
          </div>
        </div>
        <div className="frame">{runner()}</div>
      </section>

      {/* ── Hồi II - espresso spread, white hand-drawn loops ── */}
      {actFrame('hoi-2', h2, true)}
      <section data-ambient={ESPRESSO} data-glow="#8a3b1c" className="relative overflow-hidden py-16 md:py-24" style={{ color: PAPER }}>
        <Squiggle variant={3} color={PAPER} width={4} className="absolute -right-10 top-10 w-72 opacity-80 md:w-[28rem]" />
        <div className="frame relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Hotspots media={h2.hero} spots={h2.hotspots} caption={h2.captions[0]} />
          </div>
          <div className="self-end md:col-span-4">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] uppercase" style={heavy}>{h2.n} – {h2.title}</h3>
            <p className="ed-body mt-4 italic opacity-90">{h2.body}</p>
          </div>
          <div className="md:col-span-12">
            <div className="zine md:grid-cols-4 md:gap-3">
              {h2.photos.map((m) => <Pic key={m.id} m={m} className="aspect-[4/3]" sizes="(min-width: 768px) 25vw, 84vw" />)}
            </div>
            <SwipeHint count={h2.photos.length} />
            <Script className="mt-4 text-[clamp(2rem,3.5vw,3rem)]" color={RED} rotate={-4} as="p">{h2.captions[1]}</Script>
          </div>
        </div>
        <div className="frame">{runner(true)}</div>
      </section>

      {/* ── Hồi III - dark, tall vitrine strip with red captions ── */}
      {actFrame('hoi-3', h3, true)}
      <section data-ambient={ESPRESSO} data-glow="#8a3b1c" className="relative overflow-hidden py-16 md:py-24" style={{ color: PAPER }}>
        <Squiggle variant={0} color={PAPER} width={4} className="absolute -left-16 bottom-20 w-72 opacity-70 md:w-[30rem]" />
        <div className="frame relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] uppercase" style={heavy}>{h3.n} – {h3.title}</h3>
            <p className="ed-body mt-4 italic opacity-90">{h3.body}</p>
            <Script className="mt-6 text-[clamp(2rem,3.5vw,3rem)]" color={RED} rotate={-6} as="p">{h3.captions[0]}</Script>
          </div>
          <div className="md:col-span-8">
            <Hotspots media={h3.hero} spots={h3.hotspots} caption={h3.captions[1]} />
          </div>
          <div className="md:col-span-12">
            <div className="zine md:grid-cols-6 md:gap-3">
              {h3.photos.map((m) => <Pic key={m.id} m={m} className="aspect-[2/3]" sizes="(min-width: 768px) 16vw, 70vw" />)}
            </div>
            <SwipeHint count={h3.photos.length} />
            <div className="mt-4 flex flex-wrap justify-between gap-4">
              {h3.captions.slice(2).map((c, i) => <Script key={c} className="text-[clamp(1.75rem,3vw,2.5rem)]" color={RED} rotate={i ? 4 : -4}>{c}</Script>)}
            </div>
          </div>
        </div>
        <div className="frame">{runner(true)}</div>
      </section>

      {/* ── Vĩ thanh - paper, observers in the museum ── */}
      <section id="vi-thanh" data-ambient={PAPER} className="scroll-mt-14 py-16 md:py-24" style={{ color: INK }}>
        <div className="frame grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Script className="text-[clamp(1.75rem,3vw,2.5rem)]" color={RED} rotate={-5} as="p">{N.epilogue.captions[0]}</Script>
            <h2 className="mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] uppercase" style={heavy}>{N.epilogue.n} – {N.epilogue.title}</h2>
            <div className="ed-body mt-5 space-y-4 italic">{N.epilogue.body.map((p) => <p key={p}>{p}</p>)}</div>
            <Script className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)]" color={RED} rotate={-3} as="p">{N.epilogue.captions[1]}</Script>
          </div>
          <div className="md:col-span-7">
            <div className="zine md:grid-cols-2 md:gap-3">
              {epi.slice(0, -1).map((m, i) => <Pic key={m.id} m={m} className={`aspect-[4/3] ${i === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''}`} />)}
            </div>
            <SwipeHint count={epi.length - 1} />
          </div>
        </div>
        <div className="frame">{runner()}</div>
      </section>

      {/* ── Xin cảm ơn! ── */}
      <section id="cam-on" data-ambient={PAPER} className="scroll-mt-14 pb-16 md:pb-24" style={{ color: INK }}>
        <div className="frame grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(5rem,16vw,14rem)] uppercase md:col-span-6" style={heavy}>Xin<br />cảm ơn!</h2>
          <div className="md:col-span-6">
            <Pic m={group} className="aspect-[16/9]" sizes="(min-width: 768px) 50vw, 90vw" />
            <div className="mt-3 text-right">
              {N.closing.lines.map((l, i) => <Script key={l} className="block text-[clamp(1.75rem,3vw,2.5rem)]" color={RED} rotate={-4 + i * 2} as="p">{l}</Script>)}
            </div>
          </div>
          <dl className="grid gap-6 text-sm sm:grid-cols-2 md:col-span-12 md:max-w-3xl">
            <div><dt className="font-bold">Mạng xã hội:</dt><dd>Tài khoản IG chính: @ntjst_brian<br />Tài khoản IG nhiếp ảnh: @_wandergraph_</dd></div>
            <div><dt className="font-bold">Địa chỉ email:</dt><dd>nhatminh.brian@gmail.com<br />nguyennhatminh-ktqt52c1@dav.edu.vn</dd></div>
          </dl>
          <p className="italic md:col-span-9">
            Chân thành cảm ơn TS. Nguyễn Minh Tuấn và quý độc giả đã nán lại đến những khung hình cuối cùng của <b>Nhãn Quan Thế Kỷ</b>. {N.closing.body}
          </p>
        </div>
        <div className="frame">{runner()}</div>
      </section>
    </EditionStage>
  );
}
