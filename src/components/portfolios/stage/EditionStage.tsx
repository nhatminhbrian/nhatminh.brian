import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { editions } from '@/data/portfolios';
import type { PortfolioEdition } from '@/data/types';
import { AmbientLayer } from './AmbientLayer';
import { FloatingBar, type Chapter } from './FloatingBar';
import { themes, themeVars, type ThemeKey } from './themes';

type Bar = { bg: string; ink: string; line: string; accent: string; accentInk: string };

const bars: Record<ThemeKey, Bar> = {
  project: { bg: '#101010', ink: '#fbfae8', line: 'rgb(251 250 232 / 0.16)', accent: '#5685cd', accentInk: '#fbfae8' },
  sseayp: { bg: '#a50f16', ink: '#fcf0e4', line: 'rgb(255 210 31 / 0.35)', accent: '#ffd21f', accentInk: '#a50f16' },
  'nhan-quan-the-ky': { bg: '#221c14', ink: '#f4f1ea', line: 'rgb(244 241 234 / 0.16)', accent: '#d2281e', accentInk: '#f4f1ea' },
};

/**
 * Per-edition stage: overrides the site palette with the PDF's own ambient theme,
 * paints the scroll-driven backdrop and mounts the floating bar.
 */
export function EditionStage({ edition, chapters, children }: { edition: PortfolioEdition; chapters: Chapter[]; children: ReactNode }) {
  const key = edition.slug as ThemeKey;
  const t = themes[key];
  const b = bars[key];
  const style = {
    ...themeVars(t),
    '--ed-bar': b.bg,
    '--ed-ink-bar': b.ink,
    '--ed-bar-line': b.line,
    '--ed-bar-accent': b.accent,
    '--ed-bar-accent-ink': b.accentInk,
    color: t.ink,
  } as CSSProperties;

  const i = editions.findIndex((e) => e.slug === edition.slug);
  const next = editions[(i + 1) % editions.length];
  const links = editions.map((e) => ({ slug: e.slug, index: e.index, title: e.title }));

  return (
    <article data-edition={edition.slug} style={style} className="relative -mt-14">
      <AmbientLayer fallback={t.bg} />
      {children}
      <Link
        href={`/portfolios/${next.slug}`}
        data-ambient="#000000"
        className="group relative block overflow-hidden bg-black px-[var(--gutter)] pb-36 pt-24 text-white"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-white/50">Next reel · {next.index}</span>
        <span className="mt-4 block text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-tight transition-transform duration-700 group-hover:translate-x-3">
          {next.title} <span aria-hidden>→</span>
        </span>
        <span className="mt-6 block max-w-xl text-white/60">{next.summary}</span>
      </Link>
      <FloatingBar current={links[i]} editions={links} chapters={chapters} pdf={edition.pdf} />
    </article>
  );
}
