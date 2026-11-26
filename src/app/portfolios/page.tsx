import type { Metadata } from 'next';
import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { getEditions } from '@/lib/content';
import { T } from '@/components/i18n/LanguageProvider';

export const metadata: Metadata = {
  title: 'Portfolios',
  description: 'Three interactive web editions re-engineered from Nguyễn Nhật Minh’s print portfolios, with original PDFs.',
};

export default function PortfoliosPage() {
  const editions = getEditions();
  return (
    <div className="frame pb-24 pt-16 md:pt-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow"><T k="port.kicker" /></p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,6.5rem)]"><T k="port.title" /></h1>
        <p className="prose-ice mx-auto mt-6"><T k="port.lede" /></p>
      </header>

      {/* staggered triptych — middle edition raised; swipeable on mobile */}
      <ul className="zine mt-16 md:mt-28 md:grid-cols-3 md:items-start md:gap-8 lg:gap-12">
        {editions.map((e, i) => (
          <li key={e.slug} className={i === 1 ? 'md:-translate-y-6' : 'md:translate-y-6'}>
            <Link href={`/portfolios/${e.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-hairline">
                <Photo media={e.cover} fill sizes="(min-width: 768px) 30vw, 84vw" imgClassName="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14]/80 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 ui-label text-[0.625rem] text-ice-100/80">{e.index}</span>
              </div>
              <p className="mt-5 ui-label text-[0.625rem] text-steel-400">{e.context}</p>
              <h2 className="mt-2 font-display font-medium text-3xl leading-tight text-ice-100 group-hover:">{e.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ice-300">{e.summary}</p>
              <p className="mt-4 ui-label text-[0.625rem] text-steel-300">{e.pdf.pages}pp · PDF →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
