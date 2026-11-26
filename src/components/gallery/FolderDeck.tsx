'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import type { ResolvedMedia } from '@/data/types';
import type { I18nFields } from '@/i18n/pick';
import { useT, useTr } from '@/components/i18n/LanguageProvider';
import { SlotText } from '@/components/showcase/SlotText';

export type DeckFolder = {
  id: string;
  indexNumber: string;
  title: string;
  i18n?: I18nFields;
  year: number;
  organization: string;
  date: string;
  location?: string;
  count: number;
  cover: ResolvedMedia;
};

const VISIBLE = 6; // cards drawn behind the front one
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 3D perspective folder stack (slide-tray metaphor).
 * Desktop: move the cursor horizontally across the deck to scrub; trackpad horizontal scroll steps.
 * Touch: drag/flick horizontally, or use the step buttons. Click the front card to open it.
 */
export function FolderDeck({ folders, label }: { folders: DeckFolder[]; label: string }) {
  const L = useTr();
  const t = useT();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const wheelLock = useRef(0);
  const n = folders.length;

  const go = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(n - 1, i));
      setDir(next >= active ? 1 : -1);
      setActive(next);
    },
    [active, n],
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || n < 2) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const t = (e.clientX - rect.left) / rect.width;
    const i = Math.min(n - 1, Math.max(0, Math.floor(t * n)));
    if (i !== active) go(i);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return; // never hijack vertical scroll
    const now = Date.now();
    if (now - wheelLock.current < 220) return;
    wheelLock.current = now;
    go(active + (e.deltaX > 0 ? 1 : -1));
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) go(active + 1);
    else if (info.offset.x > 50 || info.velocity.x > 400) go(active - 1);
  };

  const front = folders[active];

  return (
    <section aria-label={label} tabIndex={0} className="relative rounded-3xl outline-none focus-visible:ring-1 focus-visible:ring-ice-100/40" onKeyDown={(e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
    }}>
      {/* ambient colour bleed: blurred copy of the front cover */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={front.id}
            className="absolute inset-[-10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
          >
            <Image src={front.cover.src} alt="" fill sizes="40vw" className="object-cover blur-[120px]" />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* pill tab badge for the front card */}
      <div className="relative z-20 mb-3 flex justify-center md:mb-4">
        <span className="inline-flex max-w-[92vw] items-center gap-2 rounded-full bg-ice-100 px-4 py-1.5 ui-label text-[0.6875rem] text-night-950 shadow-[0_10px_30px_-10px_rgb(226_237_245/0.4)]">
          <SlotText value={front.indexNumber} direction={dir} className="font-semibold" />
          <SlotText value={L(front, 'title') as string} direction={dir} className="max-w-[60vw] truncate normal-case tracking-normal md:max-w-[32rem]" />
          <SlotText value={String(front.year)} direction={dir} className="text-steel-600" />
        </span>
      </div>

      <div
        className="relative mx-auto h-[54svh] w-full md:h-[60vh] max-w-5xl touch-pan-y select-none [perspective:1200px]"
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        role="group"
        aria-roledescription="folder deck"
        aria-label={`${label}: ${n} folders, showing ${active + 1}`}
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          drag={n > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={onDragEnd}
        >
          {folders.map((f, i) => {
            const d = i - active;
            if (d < -1 || d > VISIBLE) return null;
            const isFront = d === 0;
            const behind = Math.max(0, d);
            const style = reduce
              ? { x: d < 0 ? '-110%' : `${behind * 5}%`, opacity: d < 0 ? 0 : 1 - behind * 0.12 }
              : {
                  x: d < 0 ? '-62%' : `${behind * 7.5}%`,
                  z: d < 0 ? 120 : -behind * 90,
                  rotateY: d < 0 ? 18 : -14,
                  opacity: d < 0 ? 0 : 1,
                  filter: `brightness(${1 - behind * 0.14}) saturate(${1 - behind * 0.1})`,
                };
            const card = (
              <>
                <Image
                  src={f.cover.src}
                  alt={isFront ? f.cover.alt : ''}
                  fill
                  sizes="(min-width: 1024px) 640px, 85vw"
                  placeholder="blur"
                  blurDataURL={f.cover.blur}
                  draggable={false}
                  className="pointer-events-none object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14]/85 via-[#070D14]/20 to-[#070D14]/35" />
                {isFront && (
                  <span aria-hidden className="pointer-events-none absolute inset-3 ui-label text-[0.6875rem] leading-none text-ice-100/70 md:inset-4">
                    <span className="absolute left-0 top-0">+</span><span className="absolute right-0 top-0">+</span>
                    <span className="absolute bottom-0 left-0">+</span><span className="absolute bottom-0 right-0">+</span>
                  </span>
                )}
                {/* folder tab */}
                <span className="absolute -top-px left-6 h-3 w-24 rounded-b-md bg-ice-100/15 backdrop-blur" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
                  <div className="min-w-0">
                    <p className="ui-label text-[0.625rem] text-steel-300">{L(f, 'organization') as string}</p>
                    <p className="mt-1 truncate font-display font-medium text-2xl text-ice-100 md:text-4xl">{L(f, 'title') as string}</p>
                  </div>
                  <p className="shrink-0 text-right ui-label text-[0.625rem] text-ice-300">
                    {f.count} {t('gallery.frames')}
                    {f.location && <span className="mt-0.5 hidden max-w-48 truncate text-steel-400 md:block">{L(f, 'location') as string}</span>}
                  </p>
                </div>
              </>
            );
            return (
              <motion.div
                key={f.id}
                className="absolute inset-y-0 left-[4%] w-[78%] print border border-ice-100/15 bg-night-850 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] md:left-[8%] md:w-[62%]"
                style={{ zIndex: 100 - Math.abs(d) * 2 - (d < 0 ? 50 : 0), transformOrigin: 'left center' }}
                initial={false}
                animate={style}
                transition={{ duration: reduce ? 0.15 : 0.6, ease }}
              >
                {isFront ? (
                  <Link href={`/gallery/${f.id}`} className="absolute inset-0 block focus-visible:outline-offset-[-4px]" aria-label={`Open ${f.title} - ${f.count} photos`} draggable={false}>
                    {card}
                  </Link>
                ) : (
                  <button type="button" tabIndex={-1} aria-hidden className="absolute inset-0 block cursor-pointer" onClick={() => go(i)}>
                    {card}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* step controls + scrub rail */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous folder" className="glass flex h-11 w-11 items-center justify-center rounded-full text-ice-100 disabled:opacity-30">←</button>
        <div className="w-[min(50vw,16rem)]" aria-hidden>
          <div className="h-px w-full bg-ice-100/20">
            <motion.div className="h-px origin-left bg-ice-100" initial={false} animate={{ scaleX: (active + 1) / n }} transition={{ duration: 0.6, ease }} />
          </div>
          <p className="mt-1.5 text-center ui-label text-[0.625rem] tabular-nums text-steel-400">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
        </div>
        <button type="button" onClick={() => go(active + 1)} disabled={active === n - 1} aria-label="Next folder" className="glass flex h-11 w-11 items-center justify-center rounded-full text-ice-100 disabled:opacity-30">→</button>
      </div>
      <p className="mt-2 text-center ui-label text-[0.625rem] text-steel-400">
        <span className="hidden md:inline">{t('gallery.hintDesktop')}</span>
        <span className="md:hidden">{t('gallery.hintMobile')}</span>
      </p>
    </section>
  );
}
