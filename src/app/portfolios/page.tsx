import type { Metadata } from 'next';
import { ShowcaseStack } from '@/components/showcase/ShowcaseStack';
import { getEditionShowcase } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Portfolios',
  description: 'Three interactive web editions re-engineered from Nguyễn Nhật Minh’s print portfolios, with original PDFs.',
};

export default function PortfoliosPage() {
  const items = getEditionShowcase();
  return (
    <>
      <header className="frame grid gap-6 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12">(02) — Portfolios · Ba ấn bản</p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-9">
          Print, <em className="text-steel-300">re-engineered</em>
        </h1>
        <p className="prose-ice self-end md:col-span-3">
          Each PDF rebuilt as a scrolling web edition — same words, same photographs, new interactions. The originals stay one click away.
        </p>
      </header>
      <ShowcaseStack items={items} label="Editions" priorityFirst />
    </>
  );
}
