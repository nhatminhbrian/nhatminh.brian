'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { PartnerGroup } from '@/data/types';
import { FolderDeck, type DeckFolder } from './FolderDeck';
import { T, useT } from '@/components/i18n/LanguageProvider';

export type ArchiveFolder = DeckFolder & { partnerGroup: PartnerGroup; semester?: string };
type Group = { id: PartnerGroup; label: string };

const ALL = 'all' as const;

/**
 * Two-axis archive: Year tabs (primary) × Partner-group pills (secondary),
 * with a 3D Deck / Index List view switch. Defaults to the newest year.
 */
export function GalleryArchive({ folders, groups }: { folders: ArchiveFolder[]; groups: Group[] }) {
  const t = useT();
  const years = useMemo(() => [...new Set(folders.map((f) => f.year))].sort((a, b) => b - a), [folders]);
  const [year, setYear] = useState<number | typeof ALL>(years[0] ?? ALL);
  const [group, setGroup] = useState<PartnerGroup | typeof ALL>(ALL);
  const [view, setView] = useState<'deck' | 'list'>('deck');

  const inYear = folders.filter((f) => year === ALL || f.year === year);
  const filtered = inYear.filter((f) => group === ALL || f.partnerGroup === group);
  const groupCount = (g: PartnerGroup | typeof ALL) => inYear.filter((f) => g === ALL || f.partnerGroup === g).length;
  const yearCount = (y: number | typeof ALL) => folders.filter((f) => (y === ALL || f.year === y) && (group === ALL || f.partnerGroup === group)).length;

  // deck view: one stack per partner group present in the filtered set
  const stacks = groups
    .map((g) => ({ ...g, items: filtered.filter((f) => f.partnerGroup === g.id) }))
    .filter((s) => s.items.length > 0);

  const pill = (active: boolean) =>
    `flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
      active ? 'border-ice-100 bg-ice-100 text-night-950' : 'border-hairline bg-ice-100/[0.03] text-ice-300 hover:border-hairline-strong hover:text-ice-100'
    }`;

  return (
    <div>
      {/* ── sticky two-axis bar ── */}
      <div className="sticky top-14 z-30 -mx-[var(--gutter)] bg-night-950/35 px-[var(--gutter)] py-4 shadow-[inset_0_-1px_0_rgb(226_237_245/0.12)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <div role="tablist" aria-label={t('gallery.year')} className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none]">
              {[...years, ALL].map((y) => {
                const active = year === y;
                const n = yearCount(y);
                return (
                  <button
                    key={y}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setYear(y)}
                    className={`relative min-h-10 shrink-0 px-3 font-serif text-2xl transition-colors md:text-3xl ${active ? 'text-ice-100' : 'text-steel-400 hover:text-ice-300'} ${n === 0 && !active ? 'opacity-40' : ''}`}
                  >
                    {y === ALL ? <T k="gallery.allYears" /> : y}
                    <sup className="ml-1 font-mono text-[0.625rem] text-steel-400">{n}</sup>
                    {active && <motion.span layoutId="year-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-ice-100" />}
                  </button>
                );
              })}
            </div>
            <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]" role="group" aria-label={t('gallery.group')}>
              {[{ id: ALL, label: t('common.all') } as const, ...groups].map((g) => {
                const n = groupCount(g.id);
                return (
                  <button key={g.id} type="button" aria-pressed={group === g.id} disabled={n === 0 && group !== g.id} onClick={() => setGroup(g.id)} className={`${pill(group === g.id)} disabled:opacity-35`}>
                    {g.id === ALL ? g.label : t(`group.${g.id}`, g.label)}
                    <span className="font-mono text-[0.625rem] opacity-70">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* view toggle */}
          <div role="radiogroup" aria-label={t('gallery.view')} className="glass flex shrink-0 rounded-full p-1">
            {(['deck', 'list'] as const).map((v) => (
              <button
                key={v}
                role="radio"
                aria-checked={view === v}
                onClick={() => setView(v)}
                className={`relative min-h-9 rounded-full px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] transition-colors md:px-4 ${view === v ? 'text-night-950' : 'text-ice-300 hover:text-ice-100'}`}
              >
                {view === v && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ice-100" transition={{ duration: 0.35 }} />}
                <span className="relative">{v === 'deck' ? '3D Deck' : 'Index'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── views ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${view}-${year}-${group}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10"
        >
          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center">
              <p className="display text-4xl"><T k="gallery.empty" /></p>
              <button type="button" onClick={() => { setYear(ALL); setGroup(ALL); }} className="mt-6 min-h-11 rounded-full bg-ice-100 px-6 font-mono text-xs uppercase tracking-[0.14em] text-night-950">
                <T k="gallery.showAll" />
              </button>
            </div>
          ) : view === 'deck' ? (
            <div className="space-y-20">
              {stacks.map((s) => (
                <div key={s.id}>
                  <div className="mb-6 flex items-baseline justify-between border-t border-hairline pt-3">
                    <h2 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-ice-100">{t(`group.${s.id}`, s.label)}</h2>
                    <span className="font-mono text-[0.6875rem] text-steel-400">{String(s.items.length).padStart(2, '0')} <T k="gallery.folders" /></span>
                  </div>
                  <FolderDeck folders={s.items} label={s.label} />
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <caption className="sr-only"><T k="gallery.indexCaption" /></caption>
              <thead>
                <tr className="border-b border-hairline-strong font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400">
                  <th scope="col" className="w-14 py-3 font-normal">No.</th>
                  <th scope="col" className="py-3 font-normal"><T k="gallery.colFolder" /></th>
                  <th scope="col" className="hidden py-3 font-normal md:table-cell"><T k="gallery.colGroup" /></th>
                  <th scope="col" className="hidden py-3 font-normal lg:table-cell"><T k="gallery.colPlace" /></th>
                  <th scope="col" className="py-3 text-right font-normal"><T k="gallery.colDate" /></th>
                  <th scope="col" className="hidden w-20 py-3 text-right font-normal sm:table-cell"><T k="gallery.colFrames" /></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <tr key={f.id} className="group border-b border-hairline transition-colors hover:bg-ice-100/[0.04]">
                    <td className="py-3 align-middle font-mono text-xs text-steel-400">{f.indexNumber}</td>
                    <td className="py-3">
                      <Link href={`/gallery/${f.id}`} className="flex items-center gap-3">
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-night-850">
                          <Image src={f.cover.src} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-serif text-lg text-ice-100 group-hover:text-steel-300 md:text-xl">{f.title}</span>
                          <span className="block truncate text-xs text-steel-400">{f.organization}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="hidden py-3 text-sm text-ice-300 md:table-cell">{t(`group.${f.partnerGroup}`, groups.find((g) => g.id === f.partnerGroup)?.label)}</td>
                    <td className="hidden max-w-56 truncate py-3 text-sm text-steel-400 lg:table-cell">{f.location ?? '—'}</td>
                    <td className="py-3 text-right font-mono text-xs text-ice-300">{f.date.slice(0, 7).split('-').reverse().join('/')}</td>
                    <td className="hidden py-3 text-right font-mono text-xs text-steel-400 sm:table-cell">{f.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
