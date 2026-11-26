'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ResolvedMedia } from '@/data/types';

type Props = {
  photos: ResolvedMedia[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  label: string;
  gear?: string;
};

const SWIPE = 80;

export function Lightbox({ photos, index, onClose, onIndex, label, gear }: Props) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(0);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndex((index + delta + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, go, onClose]);

  // preload neighbours
  const neighbours = open ? [photos[(index! + 1) % photos.length], photos[(index! - 1 + photos.length) % photos.length]] : [];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE || info.velocity.x < -500) go(1);
    else if (info.offset.x > SWIPE || info.velocity.x > 500) go(-1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} - photo viewer`}
          className="fixed inset-0 z-[80] flex flex-col bg-night-950/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="frame flex h-14 shrink-0 items-center justify-between border-b border-hairline ui-label text-[0.6875rem] text-steel-300">
            <span aria-live="polite">
              {String(index! + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <span className="hidden truncate px-4 sm:block">{label}</span>
            <button ref={closeRef} type="button" onClick={onClose} className="flex min-h-11 items-center gap-2 text-ice-100">
              Close <span aria-hidden className="text-lg">×</span>
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                className="absolute inset-0 touch-pan-y p-3 md:p-10"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={photos[index!].src}
                    alt={photos[index!].alt}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={photos[index!].blur}
                    className="pointer-events-none select-none object-contain"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-hairline bg-night-950/60 text-ice-100 hover:bg-ice-100 hover:text-night-950 md:flex">
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-hairline bg-night-950/60 text-ice-100 hover:bg-ice-100 hover:text-night-950 md:flex">
              →
            </button>
          </div>

          <div className="frame flex min-h-14 shrink-0 flex-col justify-center gap-1 border-t border-hairline py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ice-300">{photos[index!].alt}</p>
            <p className="ui-label text-[0.625rem] text-steel-400">
              {gear ?? 'Photo - Nguyễn Nhật Minh'} · <span className="md:hidden">Swipe ← →</span><span className="hidden md:inline">← → keys</span>
            </p>
          </div>

          <div aria-hidden className="hidden">
            {neighbours.map((p) => (
              <Image key={p.id} src={p.src} alt="" width={p.width} height={p.height} sizes="100vw" loading="eager" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
