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
                <span className="absolute inset-1.5 animate-ping rounded-full bg-[#c8452f]/40 motion-reduce:animate-none" />
                <span className={`relative flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.6875rem] transition-colors ${open ? 'border-ice-100 bg-ice-100 text-night-950' : 'border-ice-100 bg-night-950/70 text-ice-100 group-hover:bg-ice-100 group-hover:text-night-950'}`}>
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
                    className={`absolute top-6 z-10 w-[min(18rem,70vw)] border border-hairline-strong bg-night-950/95 p-4 backdrop-blur ${left ? 'right-0' : 'left-0'}`}
                  >
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#e0735d]">Hiện vật {String(i + 1).padStart(2, '0')}</p>
                    <p className="mt-1 font-serif text-xl text-ice-100">{s.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ice-300">{s.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        {caption && <span className="font-serif text-2xl italic text-[#e0735d]">{caption}</span>}
        <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-steel-400">Chạm vào các điểm ● để đọc chú thích</span>
      </figcaption>
    </figure>
  );
}
