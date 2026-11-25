import Link from 'next/link';
import type { ReactNode } from 'react';
import { editions } from '@/data/portfolios';
import type { PortfolioEdition } from '@/data/types';
import { ReadingProgress } from './ReadingProgress';
import { T } from '@/components/i18n/LanguageProvider';

export function DownloadPdf({ edition, variant = 'solid' }: { edition: PortfolioEdition; variant?: 'solid' | 'ghost' }) {
  return (
    <a
      href={edition.pdf.href}
      download={edition.pdf.label}
      className={`inline-flex min-h-11 items-center gap-3 px-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
        variant === 'solid'
          ? 'bg-ice-100 text-night-950 hover:bg-steel-300'
          : 'border border-hairline-strong text-ice-100 hover:bg-ice-100 hover:text-night-950'
      }`}
    >
      <span aria-hidden>↓</span> <T k="common.download" />
      <span className="opacity-60">{edition.pdf.pages}pp · {edition.pdf.sizeMb}MB</span>
    </a>
  );
}

/** Shared chrome so the three editions behave as one synchronised set. */
export function EditionShell({ edition, children }: { edition: PortfolioEdition; children: ReactNode }) {
  const i = editions.findIndex((e) => e.slug === edition.slug);
  const prev = editions[(i - 1 + editions.length) % editions.length];
  const next = editions[(i + 1) % editions.length];

  return (
    <article style={{ ['--edition-accent' as string]: edition.palette.accent }}>
      <ReadingProgress />
      <div className="sticky top-14 z-30 bg-night-950/30 shadow-[inset_0_-1px_0_rgb(226_237_245/0.12)] backdrop-blur-xl backdrop-saturate-150">
        <div className="frame flex h-12 items-center justify-between gap-4">
          <Link href="/portfolios" className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-steel-300 hover:text-ice-100">
            <T k="port.back" />
          </Link>
          <nav aria-label="Editions" className="flex items-center gap-1">
            {editions.map((e) => (
              <Link
                key={e.slug}
                href={`/portfolios/${e.slug}`}
                aria-current={e.slug === edition.slug ? 'page' : undefined}
                className="flex h-9 min-w-11 items-center justify-center border border-transparent px-2 font-mono text-[0.6875rem] text-steel-400 hover:text-ice-100 aria-[current=page]:border-hairline-strong aria-[current=page]:text-ice-100"
                title={e.title}
              >
                {e.index}
              </Link>
            ))}
          </nav>
          <a href={edition.pdf.href} download={edition.pdf.label} className="hidden min-h-9 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ice-100 hover:text-steel-300 sm:inline-flex">
            ↓ PDF
          </a>
        </div>
      </div>

      {children}

      <footer className="frame mt-24 grid gap-8 border-t border-hairline pt-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow"><T k="port.original" /></p>
          <p className="mt-3 text-ice-300">{edition.title} — {edition.pdf.pages} pages, as designed for print.</p>
          <div className="mt-5"><DownloadPdf edition={edition} /></div>
        </div>
        <Link href={`/portfolios/${prev.slug}`} className="group md:col-span-4">
          <p className="eyebrow"><T k="port.prev" /> {prev.index}</p>
          <p className="mt-3 font-serif text-3xl text-ice-100 group-hover:italic group-hover:text-steel-300">{prev.title}</p>
        </Link>
        <Link href={`/portfolios/${next.slug}`} className="group md:col-span-4 md:text-right">
          <p className="eyebrow">{next.index} <T k="port.next" /></p>
          <p className="mt-3 font-serif text-3xl text-ice-100 group-hover:italic group-hover:text-steel-300">{next.title}</p>
        </Link>
      </footer>
    </article>
  );
}
