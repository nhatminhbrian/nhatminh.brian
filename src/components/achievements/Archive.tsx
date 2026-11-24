'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import type { AcademicYear, Achievement, AchievementCategory, ResolvedMedia, Semester } from '@/data/types';

type Item = Omit<Achievement, 'cover'> & { cover?: ResolvedMedia };
type Props = {
  items: Item[];
  years: AcademicYear[];
  semesters: Semester[];
  categories: AchievementCategory[];
};

const ALL = 'Tất cả';

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: T[];
  value: T | typeof ALL;
  onChange: (v: T | typeof ALL) => void;
  counts: Record<string, number>;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="eyebrow mb-3">{label}</legend>
      <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
        {([ALL, ...options] as (T | typeof ALL)[]).map((opt) => {
          const active = value === opt;
          const n = counts[opt] ?? 0;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              disabled={!active && n === 0}
              onClick={() => onChange(opt)}
              className="flex min-h-11 shrink-0 items-center gap-2 border border-hairline px-4 text-sm text-ice-300 transition-colors hover:border-hairline-strong hover:text-ice-100 disabled:opacity-35 aria-pressed:border-ice-100 aria-pressed:bg-ice-100 aria-pressed:text-night-950"
            >
              {opt}
              <span className="font-mono text-[0.625rem] opacity-70">{n}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Archive({ items, years, semesters, categories }: Props) {
  const [year, setYear] = useState<AcademicYear | typeof ALL>(ALL);
  const [semester, setSemester] = useState<Semester | typeof ALL>(ALL);
  const [category, setCategory] = useState<AchievementCategory | typeof ALL>(ALL);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const baseId = useId();

  const match = (a: Item, y = year, s = semester, c = category) =>
    (y === ALL || a.year === y) && (s === ALL || a.semester === s) && (c === ALL || a.category === c);

  const filtered = useMemo(() => items.filter((a) => match(a)), [items, year, semester, category]); // eslint-disable-line react-hooks/exhaustive-deps

  // facet counts reflect the other two active filters
  const counts = useMemo(() => {
    const y: Record<string, number> = { [ALL]: 0 };
    const s: Record<string, number> = { [ALL]: 0 };
    const c: Record<string, number> = { [ALL]: 0 };
    for (const a of items) {
      if (match(a, ALL, semester, category)) { y[ALL]++; y[a.year] = (y[a.year] ?? 0) + 1; }
      if (match(a, year, ALL, category)) { s[ALL]++; s[a.semester] = (s[a.semester] ?? 0) + 1; }
      if (match(a, year, semester, ALL)) { c[ALL]++; c[a.category] = (c[a.category] ?? 0) + 1; }
    }
    return { y, s, c };
  }, [items, year, semester, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => { setYear(ALL); setSemester(ALL); setCategory(ALL); };
  const filtering = year !== ALL || semester !== ALL || category !== ALL;

  return (
    <div>
      <div className="z-30 -mx-[var(--gutter)] lg:sticky lg:top-14 border-y border-hairline bg-night-950/85 px-[var(--gutter)] py-5 backdrop-blur-md">
        <div className="grid gap-5 lg:grid-cols-[auto_auto_1fr]">
          <FilterGroup label="Năm học · Academic year" options={years} value={year} onChange={setYear} counts={counts.y} />
          <FilterGroup label="Học kì · Semester" options={semesters} value={semester} onChange={setSemester} counts={counts.s} />
          <FilterGroup label="Lĩnh vực · Category" options={categories} value={category} onChange={setCategory} counts={counts.c} />
        </div>
        <p className="mt-4 flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-steel-300" aria-live="polite">
          <span>{filtered.length} / {items.length} entries</span>
          {filtering && (
            <button type="button" onClick={reset} className="min-h-11 border-b border-steel-400 text-ice-100 hover:border-ice-100">
              Clear filters
            </button>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="border-b border-hairline py-24 text-center">
          <p className="display text-4xl">No entries for this combination.</p>
          <button type="button" onClick={reset} className="mt-6 min-h-11 border border-hairline-strong px-5 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:bg-ice-100 hover:text-night-950">
            Show all achievements
          </button>
        </div>
      ) : (
        years.map((y) => {
          const group = filtered.filter((a) => a.year === y);
          if (group.length === 0) return null;
          return (
            <section key={y} aria-labelledby={`${baseId}-${y}`} className="mt-16">
              <h2 id={`${baseId}-${y}`} className="flex items-baseline justify-between border-b border-hairline-strong pb-4">
                <span className="display text-[clamp(3rem,8vw,6.5rem)]">{y}</span>
                <span className="font-mono text-xs text-steel-300">({String(group.length).padStart(2, '0')})</span>
              </h2>
              <ul>
                {group.map((a, i) => {
                  const isOpen = open.has(a.id);
                  const panelId = `${baseId}-${a.id}`;
                  return (
                    <li key={a.id} className="border-b border-hairline">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(a.id)}
                        className="group grid w-full grid-cols-[2.5rem_1fr_2.75rem] items-start gap-3 py-6 text-left md:grid-cols-12 md:gap-6"
                      >
                        <span className="pt-1 font-mono text-xs text-steel-400 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                        <span className="md:col-span-6">
                          <span className="block font-serif text-2xl leading-tight text-ice-100 transition-colors group-hover:text-steel-300 md:text-3xl">
                            {a.title}
                          </span>
                          <span className="mt-1 block text-sm text-ice-300">{a.organisation}</span>
                          <span className="mt-3 flex flex-wrap gap-2 md:hidden">
                            <Tag>{a.semester}</Tag><Tag>{a.category}</Tag>
                          </span>
                        </span>
                        <span className="hidden gap-2 md:col-span-4 md:flex md:flex-wrap md:pt-2">
                          <Tag>{a.semester}</Tag><Tag>{a.category}</Tag><Tag muted>{a.period}</Tag>
                        </span>
                        <span aria-hidden className="flex h-11 w-11 items-center justify-center border border-hairline text-xl text-ice-100 transition-transform duration-300 group-hover:border-hairline-strong md:col-span-1 md:justify-self-end">
                          <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                        </span>
                        <span className="sr-only">{isOpen ? 'Collapse details' : 'Expand details'}</span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-label={a.title}
                        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-editorial)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                        inert={!isOpen}
                      >
                        <div className="overflow-hidden">
                          <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-6">
                            <div className="md:col-span-6 md:col-start-2">
                              {a.subtitle && <p className="font-serif text-xl italic text-steel-300">{a.subtitle}</p>}
                              {a.role && <p className="eyebrow mt-3">{a.role} · {a.period}</p>}
                              <p className="prose-ice mt-4">{a.summary}</p>
                              <ul className="mt-5 space-y-2">
                                {a.details.map((d) => (
                                  <li key={d} className="grid grid-cols-[1rem_1fr] text-sm leading-relaxed text-ice-300">
                                    <span aria-hidden className="text-steel-400">—</span>{d}
                                  </li>
                                ))}
                              </ul>
                              {a.link && (
                                <Link href={a.link.href} className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-ice-300 font-mono text-xs uppercase tracking-[0.14em] text-ice-100 hover:border-ice-100">
                                  {a.link.label} →
                                </Link>
                              )}
                            </div>
                            {a.cover && (
                              <div className="relative aspect-[4/3] overflow-hidden md:col-span-4 md:col-start-9">
                                <Image
                                  src={a.cover.src}
                                  alt={a.cover.alt}
                                  fill
                                  sizes="(min-width: 768px) 30vw, 100vw"
                                  placeholder="blur"
                                  blurDataURL={a.cover.blur}
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}

function Tag({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span className={`border border-hairline px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${muted ? 'text-steel-400' : 'text-steel-300'}`}>
      {children}
    </span>
  );
}
