import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Marker } from '@/components/Marker';
import { Reveal } from '@/components/Reveal';
import { HeroParallax } from '@/components/home/HeroParallax';
import { IndexNav, type IndexItem } from '@/components/home/IndexNav';
import { ShowcaseStack } from '@/components/showcase/ShowcaseStack';
import { getFeaturedWorks, resolve } from '@/lib/content';
import { aboutStory, artisticVision, credentials, interests, lenses, philosophy, profile } from '@/data/profile';

const milestones = [
  { year: '2022', text: 'THPT Chuyên Ngoại ngữ — chuyên tiếng Hàn; bắt đầu hành trình qua 48 dự án & CLB.' },
  { year: '2023', text: 'TOPIK II · Level 4. Media and design roles across school clubs.' },
  { year: '2024', text: 'IELTS 8.5. luminescent. — the double album, for my 17th birthday.' },
  { year: '2025', text: 'Jan21st Studio internship; The Closet. Graduated with GPA 9.4 → DAV.' },
  { year: '2026', text: 'SSEAYP 49th media collaborator; Nhãn Quan Thế Kỷ; SSEAYP 50th.' },
];

export default async function HomePage() {
  const featured = await getFeaturedWorks();
  const hero = resolve(profile.heroPortrait);
  const about = resolve(profile.aboutPortrait);
  const podium = resolve(profile.diplomacyPortrait);

  const index: IndexItem[] = [
    { index: '01', label: 'Gallery', labelVi: 'Thư viện ảnh · 8 bộ sưu tập', href: '/gallery', meta: 'Client & event photography grouped by partner — SSEAYP, Đoàn Thanh niên HVNG, Street & Heritage.', preview: resolve({ id: 'sseayp-004-008', alt: '' }) },
    { index: '02', label: 'Portfolios', labelVi: 'Ba ấn bản tương tác', href: '/portfolios', meta: 'Project Portfolio, SSEAYP 49th and Nhãn Quan Thế Kỷ — re-engineered for the web, with original PDFs.', preview: resolve({ id: 'nqtk-005-009', alt: '' }) },
    { index: '03', label: 'Achievements', labelVi: 'Thành tích theo năm học', href: '/achievements', meta: 'Filterable archive by academic year, semester and category, 2022 → 2027.', preview: resolve({ id: 'portrait-podium', alt: '' }) },
    { index: '04', label: 'Contact', labelVi: 'Liên hệ', href: '#contact', meta: `${profile.email} · ${profile.handle}`, preview: resolve({ id: 'portrait-camera-2', alt: '' }) },
  ];

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hairline-grid relative overflow-hidden" aria-labelledby="hero-title">
        <div className="frame grid grid-cols-12 gap-x-4 pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="col-span-12 flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-300 md:col-span-12">
            <span>(00) — Portfolio 2026</span>
            <span className="hidden sm:inline">{profile.city}</span>
            <span>{profile.handle}</span>
          </div>

          <div className="relative col-span-12 mt-8 md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-2 md:mt-10">
            <HeroParallax className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[2/3]">
              <Photo media={hero} fill priority sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
            </HeroParallax>
            <p className="mt-3 hidden justify-between font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400 md:flex">
              <span>Fig. 01 — Self, under open sky</span>
              <span>{profile.gear}</span>
            </p>
          </div>

          <h1
            id="hero-title"
            className="display relative z-10 col-span-12 -mt-24 text-[clamp(4.25rem,15vw,15rem)] md:col-span-10 md:col-start-1 md:row-start-2 md:mt-0 md:self-end md:pb-10"
          >
            <span className="rise-mask text-[clamp(5.5rem,22vw,20rem)] leading-[0.8]"><span className="rise">Brian<span className="text-steel-300">.</span></span></span>
            <span className="rise-mask mt-3 pl-[1.5vw] text-[clamp(1.75rem,4.6vw,4.25rem)] italic leading-none text-steel-300 md:pl-[2vw]">
              <span className="rise" style={{ animationDelay: '180ms' }}>Nguyễn Nhật Minh</span>
            </span>
          </h1>

          <div className="col-span-12 mt-8 grid content-start gap-6 md:col-span-5 md:row-start-3 md:mt-6">
            <p className="font-serif text-2xl italic leading-snug text-ice-100 md:text-3xl">
              “{profile.tagline}”
            </p>
            <p className="eyebrow">
              {profile.handle} · {profile.role}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Index 01–04 ──────────────────────────────────── */}
      <section className="frame mt-8" aria-labelledby="index-title">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="index-title" className="eyebrow">Index — 01 / 04</h2>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400 md:block">Hover to preview</p>
        </div>
        <IndexNav items={index} />
      </section>

      {/* ─── Featured Works — cinema-archival stack ───────── */}
      <section className="mt-32" aria-labelledby="featured-title">
        <div className="frame">
          <Marker index="(★)" label="Featured Works" />
          <h2 id="featured-title" className="display mt-8 text-[clamp(2.75rem,7vw,6.5rem)]">
            Now <em className="text-steel-300">screening</em>
          </h2>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-400">Scroll or swipe through the reel · use the ticket to jump</p>
        </div>
        <ShowcaseStack items={featured} label="Featured" />
      </section>

      {/* ─── Dual-lens bio ────────────────────────────────── */}
      <section className="frame mt-16" aria-labelledby="lens-title">
        <Marker index="(A/B)" label="Dual-lens bio" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="lens-title" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
              Two disciplines, <em className="text-steel-300">one</em> way of seeing.
            </h2>
            <div className="relative mt-10 aspect-[3/4] w-3/4 overflow-hidden rounded-3xl md:w-full">
              <Photo media={podium} fill sizes="(min-width: 768px) 40vw, 75vw" />
            </div>
            <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400">Fig. 02 — Diplomatic Academy of Viet Nam</p>
          </Reveal>

          <div className="grid gap-4 self-start md:col-span-7">
            {lenses.map((lens, i) => (
              <Reveal key={lens.label} delay={i * 0.1} className="glass glass-sheen rounded-3xl p-6 md:p-10">
                <p className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-steel-300">{lens.index} {lens.label}</span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-steel-400">{lens.meta}</span>
                </p>
                <h3 className="mt-6 font-serif text-4xl text-ice-100 md:text-5xl">{lens.title}</h3>
                <p className="mt-1 font-serif text-xl italic text-steel-300">{lens.titleVi}</p>
                <div className="mt-6 space-y-4">
                  {lens.body.map((p) => (
                    <p key={p} className="prose-ice">{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About & philosophy ───────────────────────────── */}
      <section className="frame mt-32" aria-labelledby="about-title">
        <Marker index="(05)" label="About — Hello, I’m Brian" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl">
              <Photo media={about} fill sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <h2 id="about-title" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
              A photojournalist’s grandson, <em className="text-steel-300">raised on K-dramas.</em>
            </h2>
            <div className="mt-8 space-y-5">
              {aboutStory.map((p) => (
                <p key={p} className="prose-ice">{p}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l border-steel-600 pl-6 font-serif text-2xl italic leading-snug text-ice-100">
              {artisticVision}
            </blockquote>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <h3 className="display text-[clamp(2.25rem,4vw,3.75rem)] md:col-span-4">
            Creative <em className="text-steel-300">philosophy</em>
          </h3>
          <ol className="md:col-span-8">
            {philosophy.map((p, i) => (
              <li key={p} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-hairline py-5 last:border-b">
                <span className="font-mono text-xs text-steel-300">({String(i + 1).padStart(2, '0')})</span>
                <span className="text-lg text-ice-100 md:text-xl">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Milestones & credentials ─────────────────────── */}
      <section className="frame mt-32" aria-labelledby="milestones-title">
        <Marker index="(06)" label="Milestones" />
        <h2 id="milestones-title" className="sr-only">Milestones</h2>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {milestones.map((m) => (
            <li key={m.year} className="glass glass-sheen rounded-2xl p-6 transition-transform duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1">
              <p className="display text-5xl">{m.year}</p>
              <p className="mt-4 text-sm leading-relaxed text-ice-300">{m.text}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.label} className="border-t border-hairline pt-4">
              <dt className="eyebrow">{c.label}</dt>
              <dd className="mt-2 font-serif text-4xl text-ice-100">{c.value}</dd>
              <dd className="font-mono text-[0.625rem] text-steel-400">{c.year}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 flex flex-wrap gap-2">
          {interests.map((i) => (
            <li key={i} className="border border-hairline px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-steel-300">{i}</li>
          ))}
        </ul>
        <Link href="/achievements" className="mt-10 inline-flex min-h-11 items-center gap-3 border-b border-ice-300 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:border-ice-100">
          Full achievements archive →
        </Link>
      </section>
    </>
  );
}
