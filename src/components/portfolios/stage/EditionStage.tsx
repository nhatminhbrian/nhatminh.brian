import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { editions } from '@/data/portfolios';
import type { PortfolioEdition } from '@/data/types';
import { AmbientLayer } from './AmbientLayer';
import { FloatingBar, type Chapter } from './FloatingBar';
import { themeConfig, portfolioVars, type ThemeKey } from './themes';
import { portfolioFontVariables } from '@/app/portfolios/fonts';

/** Floating-bar ink: the bar sits on the edition's surface colour. */
const barInk: Record<ThemeKey, string> = { project: '#fbfae8', sseayp: '#fcf0e4', 'nhan-quan-the-ky': '#f4f1ea' };

/**
 * Per-edition stage: overrides the site palette with the PDF's own ambient theme,
 * paints the scroll-driven backdrop and mounts the floating bar.
 */
export function EditionStage({ edition, chapters, children }: { edition: PortfolioEdition; chapters: Chapter[]; children: ReactNode }) {
  const key = edition.slug as ThemeKey;
  const t = themeConfig[key];
  const style = {
    ...portfolioVars(t),
    '--ed-bar': 'var(--portfolio-surface)',
    '--ed-ink-bar': barInk[key],
    '--ed-bar-line': 'color-mix(in srgb, var(--portfolio-accent) 35%, transparent)',
    '--ed-bar-accent': 'var(--portfolio-accent)',
    '--ed-bar-accent-ink': 'var(--portfolio-on-accent)',
    color: 'var(--portfolio-ink)',
    fontFamily: 'var(--portfolio-font-body)',
  } as CSSProperties;

  const i = editions.findIndex((e) => e.slug === edition.slug);
  const next = editions[(i + 1) % editions.length];
  const links = editions.map((e) => ({ slug: e.slug, index: e.index, title: e.title }));

  return (
    <article data-edition={edition.slug} style={style} className={`${portfolioFontVariables} relative -mt-14`}>
      <AmbientLayer fallback={t.colors.matte} />
      {children}
      <Link
        href={`/portfolios/${next.slug}`}
        data-ambient={t.colors.surface}
        className="group relative block overflow-hidden px-[var(--gutter)] pb-36 pt-24"
        style={{ background: 'var(--portfolio-surface)', color: barInk[key] }}
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] opacity-60">Next reel · {next.index}</span>
        <span className="mt-4 block text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-tight transition-transform duration-700 group-hover:translate-x-3" style={{ fontFamily: 'var(--portfolio-font-display)' }}>
          {next.title} <span aria-hidden>→</span>
        </span>
        <span className="mt-6 block max-w-xl opacity-70">{next.summary}</span>
      </Link>
      <FloatingBar current={links[i]} editions={links} chapters={chapters} pdf={edition.pdf} />
    </article>
  );
}
