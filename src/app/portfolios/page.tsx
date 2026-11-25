import type { Metadata } from 'next';
import { ShowcaseStack } from '@/components/showcase/ShowcaseStack';
import { getEditionShowcase } from '@/lib/content';
import { T } from '@/components/i18n/LanguageProvider';

export const metadata: Metadata = {
  title: 'Portfolios',
  description: 'Three interactive web editions re-engineered from Nguyễn Nhật Minh’s print portfolios, with original PDFs.',
};

export default function PortfoliosPage() {
  const items = getEditionShowcase();
  return (
    <>
      <header className="frame grid gap-6 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12"><T k="port.kicker" /></p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-9"><T k="port.title" /></h1>
        <p className="prose-ice self-end md:col-span-3"><T k="port.lede" /></p>
      </header>
      <ShowcaseStack items={items} label="Editions" priorityFirst />
    </>
  );
}
