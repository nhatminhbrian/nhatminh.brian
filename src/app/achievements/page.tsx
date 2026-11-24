import type { Metadata } from 'next';
import { Archive } from '@/components/achievements/Archive';
import { getAchievements } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Thành tích của Nguyễn Nhật Minh theo năm học, học kì và lĩnh vực — 2022 đến 2027.',
};

export default async function AchievementsPage() {
  const { items, years, semesters, categories } = await getAchievements();
  return (
    <div className="frame">
      <header className="grid gap-6 pb-12 pt-12 md:grid-cols-12 md:pt-20">
        <p className="eyebrow md:col-span-12">(03) — Achievements · Thành tích</p>
        <h1 className="display text-[clamp(3.5rem,11vw,10rem)] md:col-span-9">
          Archive <em className="text-steel-300">of</em> milestones
        </h1>
        <p className="prose-ice md:col-span-5 md:col-start-8">
          Academic, media and photography milestones from THPT Chuyên Ngoại ngữ to the Diplomatic Academy of Viet Nam.
          Filter by năm học, học kì and lĩnh vực — open any entry with <span className="font-mono text-ice-100">+</span>.
        </p>
      </header>
      <Archive items={items} years={years} semesters={semesters} categories={categories} />
    </div>
  );
}
