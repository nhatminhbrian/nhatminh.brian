'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import type { ShowcaseItem } from '@/data/types';
import { SlotText } from './SlotText';

type Props = {
  items: ShowcaseItem[];
  active: number;
  direction: number;
  visible: boolean;
  label: string;
  onJump: (i: number) => void;
};

/** Perforated exhibition-ticket stub, floating top-right; expands into a jump list. */
export function TicketSwitcher({ items, active, direction, visible, label, onJump }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const item = items[active];
  const isOpen = open && visible;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          key="ticket"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-3 top-[4.25rem] z-40 w-[min(19rem,calc(100vw-1.5rem))] text-night-950 md:right-[var(--gutter)] md:top-[4.75rem] md:w-[22rem]"
        >
          {/* ── the stub ── */}
          <div className="ticket-stub flex items-stretch bg-ice-100 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
            <div className="flex min-w-0 flex-1 items-center gap-3 p-2.5 pl-4 md:p-3 md:pl-5">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[3px] bg-night-850 md:h-12 md:w-12">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={item.id}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { y: direction > 0 ? '100%' : '-100%' }}
                    animate={reduce ? { opacity: 1 } : { y: '0%' }}
                    exit={reduce ? { opacity: 0 } : { y: direction > 0 ? '-100%' : '100%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={item.cover.src} alt="" fill sizes="48px" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="min-w-0 flex-1">
                <p className="ui-label text-[0.5625rem] text-steel-600">
                  {label} · <SlotText value={item.index} direction={direction} />/{String(items.length).padStart(2, '0')}
                </p>
                <p className="truncate font-display font-medium text-lg leading-tight md:text-xl" aria-live="polite">
                  <SlotText value={item.title} direction={direction} className="max-w-full" />
                </p>
                {/* mini metadata bar */}
                <dl className="mt-1.5 hidden grid-cols-3 border-t border-night-950/15 pt-1.5 ui-label text-[0.5625rem] sm:grid">
                  {[
                    ['Category', item.category],
                    ['Year', item.year],
                    ['Specs', item.specs],
                  ].map(([k, v], i) => (
                    <div key={k} className={`min-w-0 ${i > 0 ? 'border-l border-night-950/15 pl-2' : 'pr-2'}`}>
                      <dt className="text-steel-600">{k}</dt>
                      <dd className="truncate"><SlotText value={v} direction={direction} delay={0.05 * (i + 1)} className="max-w-full" /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* perforation + menu tear-off */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={listId}
              onClick={() => setOpen((v) => !v)}
              className="ticket-perforation relative flex w-12 shrink-0 flex-col items-center justify-center gap-1 transition-colors hover:bg-ice-300 md:w-14"
            >
              <span className="sr-only">{isOpen ? 'Close project list' : 'Open project list'}</span>
              <span aria-hidden className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-px w-full bg-night-950 transition-transform ${isOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-1/2 h-px w-full bg-night-950 transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-night-950 transition-transform ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
              </span>
              <span aria-hidden className="ui-label text-[0.5rem]">{isOpen ? 'Close' : 'Index'}</span>
            </button>
          </div>

          {/* ── drop-down list ── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id={listId}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="ticket-stub mt-1.5 bg-ice-100 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]"
              >
                <p className="border-b border-dashed border-night-950/25 px-5 py-2 ui-label text-[0.5625rem] text-steel-600">
                  Jump to — {items.length} entries
                </p>
                <ul className="max-h-[min(60svh,26rem)] overflow-y-auto overscroll-contain py-1">
                  {items.map((it, i) => (
                    <li key={it.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onJump(i);
                          setOpen(false);
                        }}
                        aria-current={i === active ? 'true' : undefined}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-ice-300/70 aria-[current=true]:bg-ice-300/50"
                      >
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[3px] bg-night-850">
                          <Image src={it.cover.src} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display font-medium text-base leading-tight">{it.title}</span>
                          <span className="block truncate ui-label text-[0.5625rem] text-steel-600">
                            {it.category} · {it.year}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={`h-2 w-2 shrink-0 rounded-full transition-colors ${i === active ? 'bg-night-950' : 'border border-night-950/30'}`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
