import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { Marker } from '@/components/Marker';
import { Reveal } from '@/components/Reveal';
import { HeroParallax } from '@/components/home/HeroParallax';
import { L, T } from '@/components/i18n/LanguageProvider';
import { credentialLabels } from '@/data/home.i18n';
import { getHome } from '@/sanity/fetch';
import { IndexNav, type IndexItem } from '@/components/home/IndexNav';
import { ShowcaseStack } from '@/components/showcase/ShowcaseStack';
import { getFeaturedWorks, resolve } from '@/lib/content';
import { credentials, profile } from '@/data/profile';
import { MobileIntro } from '@/components/home/MobileIntro';
import { InterestReel } from '@/components/home/InterestReel';

export default async function HomePage() {
  const [featured, home] = await Promise.all([getFeaturedWorks(), getHome()]);
  const { aboutI18n, interestsI18n, city, lensesI18n, milestonesI18n, philosophyI18n, visionI18n } = home;
  const hero = resolve(profile.heroPortrait);
  const about = resolve(profile.aboutPortrait);
  const podium = resolve(profile.diplomacyPortrait);

  const index: IndexItem[] = [
    { index: '01', label: 'Gallery', labelKey: 'nav.gallery', subKey: 'index.gallery', labelVi: 'Thư viện ảnh', href: '/gallery', meta: 'Event folders indexed by year and partner group - SSEAYP, Đoàn Thanh niên HVNG, Street & Travel.', preview: resolve({ id: 'sseayp-004-008', alt: '' }) },
    { index: '02', label: 'Portfolios', labelKey: 'nav.portfolios', subKey: 'index.portfolios', labelVi: 'Ba ấn bản tương tác', href: '/portfolios', meta: 'Project Portfolio, SSEAYP 49th and Nhãn Quan Thế Kỷ - re-engineered for the web, with original PDFs.', preview: resolve({ id: 'nqtk-005-009', alt: '' }) },
    { index: '03', label: 'Achievements', labelKey: 'nav.achievements', subKey: 'index.achievements', labelVi: 'Thành tích theo năm học', href: '/achievements', meta: 'Filterable archive by academic year, semester and category, 2022 → 2027.', preview: resolve({ id: 'portrait-podium', alt: '' }) },
    { index: '04', label: 'Contact', labelKey: 'nav.contact', subKey: 'index.contact', labelVi: 'Liên hệ', href: '#contact', meta: `${profile.email} · ${profile.handle}`, preview: resolve({ id: 'portrait-camera-2', alt: '' }) },
  ];

  // splash frames: Studio featured covers first, then local archive fallbacks
  const introPhotos = [
    ...featured.map((f) => f.cover),
    ...['sseayp-004-008', 'nqtk-005-009', 'portrait-camera-2', 'project-006-019', 'sseayp-005-012', 'nqtk-007-015', 'portrait-foie', 'project-007-030', 'sseayp-003-004'].flatMap((id) => { try { return [resolve({ id, alt: '' })]; } catch { return []; } }),
  ].filter((m, i, a) => m?.src && a.findIndex((x) => x?.src === m.src) === i).slice(0, 9);

  return (
    <>
      <MobileIntro photos={introPhotos} />
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="hairline-grid relative overflow-hidden" aria-labelledby="hero-title">
        <div className="frame grid grid-cols-12 gap-x-4 pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="col-span-12 flex items-center justify-between ui-label text-[0.6875rem] text-steel-300 md:col-span-12">
            <span><T k="home.portfolioYear" /></span>
            <span className="hidden sm:inline"><L t={city} /></span>
            <span>{profile.handle}</span>
          </div>

          <div className="relative col-span-12 mt-8 md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-2 md:mt-10">
            <HeroParallax className="print relative aspect-[4/5] md:aspect-[2/3]">
              <Photo media={hero} fill priority sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />
            </HeroParallax>
            <p className="mt-3 hidden justify-between ui-label text-[0.625rem] text-steel-400 md:flex">
              <span>Fig. 01 - Self, under open sky</span>
              <span>{profile.gear}</span>
            </p>
          </div>

          <h1
            id="hero-title"
            className="display relative z-10 col-span-12 -mt-24 min-w-0 md:col-span-6 md:col-start-1 md:row-start-2 md:mt-0 md:self-end md:pb-10 md:pr-6"
          >
            <span className="rise-mask whitespace-nowrap pt-[0.08em] text-[clamp(3.25rem,16vw,5.5rem)] leading-[0.95] md:text-[clamp(3.25rem,8.2vw,8rem)]"><span className="rise">Brian<span className="text-steel-300">.</span></span></span>
            <span className="rise-mask mt-3 pl-[1.5vw] text-[clamp(2rem,5.2vw,4.75rem)] font-[family-name:var(--font-serif-italic)] font-normal italic leading-[1.08] tracking-[-0.01em] text-steel-300 md:pl-[2vw]">
              <span className="rise" style={{ animationDelay: '180ms' }}>Nguyễn Nhật Minh</span>
            </span>
          </h1>

          <div className="col-span-12 mt-8 grid content-start gap-6 md:col-span-5 md:row-start-3 md:mt-6">
            <p className="font-display font-medium text-2xl leading-snug text-ice-100 md:text-3xl">
              “<T k="home.tagline" />”
            </p>
            <p className="eyebrow">
              {profile.handle} · <T k="home.role" />
            </p>
          </div>
        </div>
      </section>

      {/* ─── Index 01–04 ──────────────────────────────────── */}
      <section className="frame mt-8" aria-labelledby="index-title">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="index-title" className="eyebrow"><T k="home.index" /></h2>
          <p className="hidden ui-label text-[0.625rem] text-steel-400 md:block"><T k="home.hover" /></p>
        </div>
        <IndexNav items={index} />
      </section>

      {/* ─── Featured Works - cinema-archival stack ───────── */}
      <section className="mt-32" aria-labelledby="featured-title">
        <div className="frame">
          <Marker index="(★)" label={<T k="home.featured" />} />
          <h2 id="featured-title" className="display mt-8 text-[clamp(2.75rem,7vw,6.5rem)]">
            <em className="font-[family-name:var(--font-serif-italic)] font-normal tracking-[-0.005em] text-steel-300"><T k="home.nowScreening" /></em>
          </h2>
          <p className="mt-3 ui-label text-[0.6875rem] text-steel-400"><T k="home.reelHint" /></p>
        </div>
        <ShowcaseStack items={featured} label="Featured" />
      </section>

      {/* ─── Dual-lens bio ────────────────────────────────── */}
      <section className="frame mt-16" aria-labelledby="lens-title">
        <Marker index="(A/B)" label={<T k="home.dualLens" />} />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="lens-title" className="display text-[clamp(2.75rem,6vw,5.5rem)]">
              <T k="home.dualTitle" />
            </h2>
            <div className="print relative mt-10 aspect-[3/4] w-3/4 md:w-full">
              <Photo media={podium} fill sizes="(min-width: 768px) 40vw, 75vw" />
            </div>
            <p className="mt-3 ui-label text-[0.625rem] text-steel-400">Fig. 02 - Diplomatic Academy of Viet Nam</p>
          </Reveal>

          <div className="grid gap-4 self-start md:col-span-7">
            {lensesI18n.map((lens, i) => (
              <Reveal key={lens.index} delay={i * 0.1} className="border-t border-white/[0.06] pt-8 md:pt-12">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="shrink-0 whitespace-nowrap ui-label text-[0.6875rem] text-steel-300">{lens.index} <L t={lens.label} /></span>
                  <span className="text-right ui-label text-[0.625rem] text-steel-400">{lens.meta}</span>
                </p>
                <h3 className="mt-6 font-display font-medium text-4xl text-ice-100 md:text-5xl"><L t={lens.title} /></h3>
                <p className="mt-1 font-display font-medium text-xl text-steel-300"><L t={lens.sub} /></p>
                <div className="mt-6 space-y-4">
                  {lens.body.map((p) => (
                    <p key={p.en} className="prose-ice"><L t={p} /></p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About & philosophy ───────────────────────────── */}
      <section className="frame mt-32" aria-labelledby="about-title">
        <Marker index="(05)" label={<T k="home.about" />} />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="print relative aspect-[2/3]">
              <Photo media={about} fill sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <h2 id="about-title" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
              <T k="home.aboutTitle" />
            </h2>
            <div className="mt-8 space-y-5">
              {aboutI18n.map((p) => (
                <p key={p.en} className="prose-ice"><L t={p} /></p>
              ))}
            </div>
            <blockquote className="mt-10 border-l border-steel-600 pl-6 font-display font-medium text-2xl leading-snug text-ice-100">
              <L t={visionI18n} />
            </blockquote>
            <p className="signature mt-8 -rotate-3 text-right text-5xl text-steel-300 md:text-6xl">@_wandergraph_</p>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <h3 className="display text-[clamp(2.25rem,4vw,3.75rem)] md:col-span-4">
            <T k="home.philosophy" />
          </h3>
          <ol className="md:col-span-8">
            {philosophyI18n.map((p, i) => (
              <li key={p.en} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-hairline py-5 last:border-b">
                <span className="ui-label text-[0.6875rem] text-steel-300">({String(i + 1).padStart(2, '0')})</span>
                <span className="text-lg text-ice-100 md:text-xl"><L t={p} /></span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Milestones & credentials ─────────────────────── */}
      <section className="frame mt-32" aria-labelledby="milestones-title">
        <Marker index="(06)" label={<T k="home.milestones" />} />
        <h2 id="milestones-title" className="sr-only">Milestones</h2>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {milestonesI18n.map((m) => (
            <li key={m.year} className="border-t border-white/[0.06] pt-6">
              <p className="display text-5xl">{m.year}</p>
              <p className="mt-4 text-sm leading-relaxed text-ice-300"><L t={m.text} /></p>
            </li>
          ))}
        </ol>
        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.label} className="border-t border-hairline pt-4">
              <dt className="eyebrow">{credentialLabels[c.label] ? <L t={credentialLabels[c.label]} /> : c.label}</dt>
              <dd className="mt-2 font-display font-medium text-4xl text-ice-100">{c.value}</dd>
              <dd className="ui-label text-[0.625rem] text-steel-400">{c.year}</dd>
            </div>
          ))}
        </dl>
        <InterestReel items={interestsI18n} />
        <Link href="/achievements" className="mt-10 inline-flex min-h-11 items-center gap-3 border-b border-ice-300 ui-label text-[0.6875rem] text-ice-100 hover:border-ice-100">
          <T k="home.fullArchive" />
        </Link>
      </section>
    </>
  );
}
