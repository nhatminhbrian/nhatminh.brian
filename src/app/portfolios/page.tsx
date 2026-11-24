import type { Metadata } from 'next';
import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { DownloadPdf } from '@/components/portfolios/EditionShell';
import { getEditions } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Portfolios',
  description: 'Three interactive web editions re-engineered from Nguyễn Nhật Minh’s print portfolios, with original PDFs.',
};

export default function PortfoliosPage() {
  const editions = getEditions();
  return (
    <div className="frame">
      <header className="grid gap-6 pb-14 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12">(02) — Portfolios · Ba ấn bản</p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-9">
          Print, <em className="text-steel-300">re-engineered</em>
        </h1>
        <p className="prose-ice self-end md:col-span-3">
          Each PDF rebuilt as a scrolling web edition — same words, same photographs, new interactions. The originals stay one click away.
        </p>
      </header>

      <ol className="border-t border-hairline">
        {editions.map((e, i) => (
          <li key={e.slug} className="border-b border-hairline py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-12">
              <Link href={`/portfolios/${e.slug}`} className={`group relative block aspect-[4/3] overflow-hidden md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : ''}`}>
                <Photo media={e.cover} fill sizes="(min-width: 768px) 50vw, 100vw" imgClassName="object-cover transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]" />
                <span className="absolute bottom-0 left-0 h-1 w-full" style={{ background: e.palette.accent }} />
              </Link>
              <div className={`flex flex-col md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-8'}`}>
                <p className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-steel-300">{e.index}</span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400">{e.language} · {e.pdf.pages} pages</span>
                </p>
                <p className="mt-6 font-serif text-lg italic text-steel-300">{e.kicker}</p>
                <h2 className="display mt-1 text-[clamp(2.75rem,5.5vw,5rem)]">
                  <Link href={`/portfolios/${e.slug}`} className="hover:italic hover:text-steel-300">{e.title}</Link>
                </h2>
                <p className="eyebrow mt-4">{e.context}</p>
                <p className="prose-ice mt-6">{e.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/portfolios/${e.slug}`} className="inline-flex min-h-11 items-center gap-3 border border-hairline-strong px-5 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:bg-ice-100 hover:text-night-950">
                    Open web edition →
                  </Link>
                  <DownloadPdf edition={e} variant="ghost" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
