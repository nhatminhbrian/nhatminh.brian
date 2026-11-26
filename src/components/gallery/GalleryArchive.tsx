'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { PartnerGroup } from '@/data/types';
import { FolderDeck, type DeckFolder } from './FolderDeck';
import { T, useT, useTr } from '@/components/i18n/LanguageProvider';

export type ArchiveFolder = DeckFolder & { partnerGroup: PartnerGroup; semester?: string };
type Group = { id: PartnerGroup; label: string };

const ALL = 'all' as const;

/**
 * Two-axis archive: Year tabs (primary) × Partner-group pills (secondary),
 * with a 3D Deck / Index List view switch. Defaults to the newest year.
 */
export function GalleryArchive({ folders, groups }: { folders: ArchiveFolder[]; groups: Group[] }) {
  const t = useT();
  const L = useTr();
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
            <div role="tablist" aria-label={t('gallery.year')} className="edge-fade -mx-1 flex gap-1 overflow-x-auto px-1 pb-2 pr-8 [scrollbar-width:none]">
              {[...years, ALL].map((y) => {
                const active = year === y;
                const n = yearCount(y);
                return (
                  <button
                    key={y}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setYear(y)}
                    className={`relative min-h-10 shrink-0 px-3 font-display font-medium text-2xl transition-colors md:text-3xl ${active ? 'text-ice-100' : 'text-steel-400 hover:text-ice-300'} ${n === 0 && !active ? 'opacity-40' : ''}`}
                  >
                    {y === ALL ? <T k="gallery.allYears" /> : y}
                    <sup className="ml-1 ui-label text-[0.625rem] text-steel-400">{n}</sup>
                    {active && <motion.span layoutId="year-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-ice-100" />}
                  </button>
                );
              })}
            </div>
            <div className="edge-fade -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2 pr-8 [scrollbar-width:none]" role="group" aria-label={t('gallery.group')}>
              {[{ id: ALL, label: t('common.all') } as const, ...groups].map((g) => {
                const n = groupCount(g.id);
                return (
                  <button key={g.id} type="button" aria-pressed={group === g.id} disabled={n === 0 && group !== g.id} onClick={() => setGroup(g.id)} className={`${pill(group === g.id)} disabled:opacity-35`}>
                    {g.id === ALL ? g.label : t(`group.${g.id}`, g.label)}
                    <span className="ui-label text-[0.625rem] opacity-70">{n}</span>
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
                className={`relative min-h-9 rounded-full px-3 ui-label text-[0.625rem] transition-colors md:px-4 ${view === v ? 'text-night-950' : 'text-ice-300 hover:text-ice-100'}`}
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
              <button type="button" onClick={() => { setYear(ALL); setGroup(ALL); }} className="mt-6 min-h-11 rounded-full bg-ice-100 px-6 ui-label text-[0.6875rem] text-night-950">
                <T k="gallery.showAll" />
              </button>
            </div>
          ) : view === 'deck' ? (
            <div className="space-y-20">
              {stacks.map((s) => (
                <div key={s.id}>
                  <div className="mb-6 flex items-baseline justify-between border-t border-hairline pt-3">
                    <h2 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-ice-100">{t(`group.${s.id}`, s.label)}</h2>
                    <span className="ui-label text-[0.6875rem] text-steel-400">{String(s.items.length).padStart(2, '0')} <T k="gallery.folders" /></span>
                  </div>
                  <FolderDeck folders={s.items} label={s.label} />
                </div>
              ))}
            </div>
          ) : (
            <div role="table" className="w-full text-left">
              <p className="sr-only"><T k="gallery.indexCaption" /></p>
              <div role="row" className="grid grid-cols-[32px_minmax(0,1fr)_auto] gap-x-4 border-b border-hairline-strong py-3 ui-label text-[0.625rem] text-steel-400 md:grid-cols-[48px_minmax(0,1fr)_180px_150px] md:gap-x-6">
                <span role="columnheader">No.</span>
                <span role="columnheader"><T k="gallery.colFolder" /></span>
                <span role="columnheader" className="hidden md:block"><T k="gallery.colGroup" /></span>
                <span role="columnheader" className="text-right"><T k="gallery.colDate" /> · <T k="gallery.colFrames" /></span>
              </div>
              {filtered.map((f) => {
                const place = [L(f, 'organization') as string, L(f, 'location') as string].filter(Boolean).join(', ');
                return (
                  <Link
                    key={f.id}
                    role="row"
                    href={`/gallery/${f.id}`}
                    className="group grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-hairline py-3 transition-colors hover:bg-ice-100/[0.04] md:grid-cols-[48px_minmax(0,1fr)_180px_150px] md:gap-x-6"
                  >
                    <span role="cell" className="ui-label text-[0.6875rem] text-steel-400">{f.indexNumber}</span>
                    <span role="cell" className="flex min-w-0 items-center gap-3">
                      <span className="print relative h-11 w-11 shrink-0 bg-night-850">
                        <Image src={f.cover.src} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-1 font-display text-lg font-medium tracking-[-0.015em] text-ice-100 group-hover:text-steel-300 md:text-xl">{L(f, 'title') as string}</span>
                        <span className="line-clamp-1 text-[0.75rem] text-steel-400">{place || '-'}</span>
                      </span>
                    </span>
                    <span role="cell" className="hidden whitespace-nowrap text-sm text-ice-300 md:block">{t(`group.${f.partnerGroup}`, groups.find((g) => g.id === f.partnerGroup)?.label)}</span>
                    <span role="cell" className="whitespace-nowrap text-right ui-label text-[0.6875rem] text-ice-300">
                      {f.date.slice(0, 7).split('-').reverse().join('/')}
                      <span className="text-steel-400"> · {f.count}<span className="hidden sm:inline"> {t('gallery.frames')}</span></span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
