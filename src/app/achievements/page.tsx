import type { Metadata } from 'next';
import { Archive } from '@/components/achievements/Archive';
import { getAchievements } from '@/lib/content';
import { T } from '@/components/i18n/LanguageProvider';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Thành tích của Nguyễn Nhật Minh theo năm học, học kì và lĩnh vực - 2022 đến 2027.',
};

export default async function AchievementsPage() {
  const { items, years, semesters, categories } = await getAchievements();
  return (
    <div className="frame">
      <header className="grid gap-6 pb-12 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12"><T k="ach.kicker" /></p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-9"><T k="ach.title" /></h1>
        <p className="prose-ice md:col-span-5 md:col-start-8"><T k="ach.lede" /></p>
      </header>
      <Archive items={items} years={years} semesters={semesters} categories={categories} />
    </div>
  );
}
