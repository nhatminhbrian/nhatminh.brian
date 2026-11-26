'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ResolvedMedia } from '@/data/types';
import { INTRO_KEY as KEY } from './introGate';
const EASE = [0.22, 1, 0.36, 1] as const;
const PAPER = '#F4F3F1';
const INK = '#111111';

/** Asymmetric radial scatter (viewport %). w in vw; a = aspect ratio w/h. Outer frames bleed off the edges. */
const SLOTS = [
  { x: -7, y: 7, w: 31, a: 4 / 5 },
  { x: 40, y: 4, w: 21, a: 1 },
  { x: 75, y: 13, w: 33, a: 4 / 5 },
  { x: 7, y: 33, w: 20, a: 1 },
  { x: 79, y: 41, w: 24, a: 4 / 5 },
  { x: -9, y: 58, w: 29, a: 3 / 4 },
  { x: 70, y: 63, w: 22, a: 1 },
  { x: 19, y: 76, w: 26, a: 4 / 5 },
  { x: 53, y: 84, w: 24, a: 1 },
];

/**
 * Mobile-only editorial splash: assemble (0-0.7s), hold (0.7-1.4s),
 * zoom-out reveal (1.4-2.3s), then unmount. Once per session; tap to skip.
 * The inline gate script (introGate.ts, in <head>) hides it before first paint when it should not play.
 */
export function MobileIntro({ photos }: { photos: ResolvedMedia[] }) {
  const [phase, setPhase] = useState<'play' | 'exit' | 'done'>('play');

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.introSkip) {
      // already hidden by CSS before paint; unmount on the next frame
      const r = requestAnimationFrame(() => setPhase('done'));
      return () => cancelAnimationFrame(r);
    }
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    document.body.style.overflow = 'hidden';
    const t1 = window.setTimeout(() => setPhase('exit'), 1400);
    const t2 = window.setTimeout(() => setPhase('done'), 2300);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      document.body.style.overflow = '';
      document.documentElement.dataset.introSkip = '1';
    }
  }, [phase]);

  if (phase === 'done' || !photos.length) return null;
  const exiting = phase === 'exit';

  return (
    <motion.div
      aria-hidden
      onClick={() => setPhase('done')}
      className="mobile-intro fixed inset-x-0 top-0 z-[100] h-[100dvh] overflow-hidden will-change-transform md:hidden"
      style={{ background: PAPER, color: INK, pointerEvents: exiting ? 'none' : 'auto' }}
      initial={false}
      animate={exiting ? { scale: 0.88, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {SLOTS.map((s, i) => {
        const m = photos[i % photos.length];
        const h = s.w / s.a;
        const cx = s.x + s.w / 2;
        const cy = s.y + (h * 0.46) / 2; // vh approx for a ~390x844 viewport
        return (
          <motion.div
            key={i}
            className="absolute overflow-hidden rounded-[2px] bg-black/5"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}vw`, aspectRatio: s.a }}
            initial={{ opacity: 0, scale: 0.92, x: 0, y: 0 }}
            animate={
              exiting
                ? { opacity: 0, scale: 1.05, x: `${(cx - 50) * 1.9}vw`, y: `${(cy - 50) * 1.9}vh` }
                : { opacity: 1, scale: 1, x: 0, y: [0, i % 2 ? -3 : 3, 0] }
            }
            transition={
              exiting
                ? { duration: 0.9, ease: EASE }
                : { opacity: { duration: 0.5, delay: 0.08 + i * 0.05, ease: EASE }, scale: { duration: 0.6, delay: 0.08 + i * 0.05, ease: EASE }, y: { duration: 2.4, delay: 0.7, ease: 'easeInOut', repeat: Infinity } }
            }
          >
            <Image src={m.src} alt="" fill sizes="34vw" quality={60} className="object-cover" />
          </motion.div>
        );
      })}

      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="text-center">
          <p className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-[-0.02em]">Brian.</p>
          <p className="mt-2 text-[0.625rem] uppercase tracking-[0.14em]" style={{ color: 'rgb(17 17 17 / 0.5)' }}>@_wandergraph_</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
