'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import type { ResolvedMedia } from '@/data/types';
import type { Hotspot } from '@/data/portfolios';

/** Artifact image with numbered hotspots that open annotation cards. */
export function Hotspots({ media, spots, caption }: { media: ResolvedMedia; spots: Hotspot[]; caption?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const id = useId();

  return (
    <figure>
      <div className="relative overflow-hidden" onKeyDown={(e) => e.key === 'Escape' && setActive(null)}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(min-width: 1024px) 66vw, 100vw"
          placeholder="blur"
          blurDataURL={media.blur}
          className="h-auto w-full"
        />
        {spots.map((s, i) => {
          const open = active === i;
          const left = s.x > 60;
          return (
            <div key={s.label} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-${i}`}
                onClick={() => setActive(open ? null : i)}
                className="group relative -ml-[22px] -mt-[22px] flex h-11 w-11 items-center justify-center"
              >
                <span className="absolute inset-1.5 animate-ping rounded-full bg-[var(--ed-accent,#c8452f)]/50 motion-reduce:animate-none" />
                <span className={`relative flex h-7 w-7 items-center justify-center rounded-full border ui-label text-[0.6875rem] transition-colors ${open ? 'border-white bg-white text-[#1c1711]' : 'border-white bg-[var(--ed-accent,#c8452f)] text-white group-hover:bg-white group-hover:text-[#1c1711]'}`}>
                  {open ? '×' : i + 1}
                </span>
                <span className="sr-only">{open ? `Close note: ${s.label}` : `Artifact note: ${s.label}`}</span>
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    id={`${id}-${i}`}
                    role="note"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25 }}
                    className={`absolute top-6 z-10 w-[min(18rem,70vw)] border border-white/15 bg-[var(--ed-surface,#0b1420)]/95 p-4 text-[#f4f1ea] shadow-2xl backdrop-blur ${left ? 'right-0' : 'left-0'}`}
                  >
                    <p className="ui-label text-[0.625rem] text-[var(--ed-accent,#e0735d)]">Hiện vật {String(i + 1).padStart(2, '0')}</p>
                    <p className="mt-1 text-lg font-semibold">{s.label}</p>
                    <p className="mt-2 text-sm leading-relaxed opacity-80">{s.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        {caption && <span className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-[var(--ed-accent,#e0735d)]" style={{ fontFamily: 'var(--ed-script, serif)' }}>{caption}</span>}
        <span className="shrink-0 ui-label text-[0.625rem] opacity-60">Chạm vào các điểm ● để đọc chú thích</span>
      </figcaption>
    </figure>
  );
}
