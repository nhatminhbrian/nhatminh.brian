'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ResolvedMedia } from '@/data/types';
import { Lightbox } from './Lightbox';

type Props = { photos: ResolvedMedia[]; label: string; gear?: string };

/** Greedy shortest-column distribution - deterministic, so server and client agree. */
function distribute(photos: ResolvedMedia[], cols: number) {
  const columns: { i: number; p: ResolvedMedia }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  photos.forEach((p, i) => {
    let target = 0;
    for (let c = 1; c < cols; c++) if (heights[c] < heights[target]) target = c;
    columns[target].push({ i, p });
    heights[target] += p.height / p.width;
  });
  return columns;
}

// Asymmetric stagger per column (Swiss offset rhythm)
const OFFSETS: Record<number, string[]> = {
  2: ['pt-0', 'pt-20'],
  3: ['pt-12', 'pt-0', 'pt-28'],
};

export function MasonryGallery({ photos, label, gear }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const tile = (p: ResolvedMedia, i: number, sizes: string) => (
    <button
      key={p.id}
      type="button"
      onClick={() => setIndex(i)}
      className="group relative block w-full print bg-night-800 text-left"
      aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`}
    >
      <Image
        src={p.src}
        alt={p.alt}
        width={p.width}
        height={p.height}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={p.blur}
        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-night-950/80 to-transparent p-3 ui-label text-[0.625rem] text-ice-100 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <span>{String(i + 1).padStart(2, '0')}</span>
        <span>View +</span>
      </span>
    </button>
  );

  const layout = (cols: 2 | 3, className: string, sizes: string) => (
    <div className={`${className} gap-3 md:gap-5`}>
      {distribute(photos, cols).map((col, c) => (
        <div key={c} className={`flex min-w-0 flex-1 flex-col gap-3 md:gap-5 ${OFFSETS[cols][c]}`}>
          {col.map(({ p, i }) => tile(p, i, sizes))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-3 sm:hidden">{photos.map((p, i) => tile(p, i, '100vw'))}</div>
      {layout(2, 'hidden sm:flex lg:hidden', '50vw')}
      {layout(3, 'hidden lg:flex', '(min-width: 1600px) 520px, 33vw')}
      <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={() => setIndex(null)} label={label} gear={gear} />
    </>
  );
}
