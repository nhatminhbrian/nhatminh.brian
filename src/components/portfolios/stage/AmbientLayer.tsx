'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

type Map = { input: number[]; bg: string[]; glow: string[] };

function rgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h.slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Fixed ambient backdrop. Every section tagged data-ambient="#hex" (and optional
 * data-glow) becomes a colour stop; the backdrop interpolates between them as the
 * reader scrolls, so each chapter carries its own mood.
 */
export function AmbientLayer({ fallback }: { fallback: string }) {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    let t = 0;
    const measure = () => {
      const els = [...document.querySelectorAll<HTMLElement>('[data-ambient]')];
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      if (!els.length || max <= 0) return;
      const input: number[] = [];
      const bg: string[] = [];
      const glow: string[] = [];
      const clamp = (v: number) => Math.min(1, Math.max(0, v / max));
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        const bottom = top + r.height;
        // colour holds while the section owns the middle of the viewport;
        // the hand-off happens over ~30% of a screen around each boundary.
        let a = clamp(top - vh * 0.35);
        let b = clamp(bottom - vh * 0.65);
        if (b < a) a = b = clamp((top + bottom) / 2 - vh / 2);
        const c = el.dataset.ambient!;
        const g = rgba(el.dataset.glow ?? c, el.dataset.glow ? 0.38 : 0);
        for (const x of [a, b]) {
          const prev = input[input.length - 1];
          input.push(prev !== undefined && x <= prev ? Math.min(1, prev + 1e-5) : x);
          bg.push(c);
          glow.push(g);
        }
      }
      if (input[0] > 0) { input.unshift(0); bg.unshift(bg[0]); glow.unshift(glow[0]); }
      setMap({ input, bg, glow });
    };
    const schedule = () => { window.clearTimeout(t); t = window.setTimeout(measure, 120); };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    document.fonts?.ready.then(schedule);
    return () => { ro.disconnect(); window.clearTimeout(t); };
  }, []);

  if (!map) return <div aria-hidden className="pointer-events-none fixed inset-0 -z-[1]" style={{ background: fallback }} />;
  return <AmbientMotion key={map.input.join(',')} {...map} />;
}

function AmbientMotion({ input, bg, glow }: Map) {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(scrollYProgress, input, bg);
  const g = useTransform(scrollYProgress, input, glow);
  const backgroundImage = useMotionTemplate`radial-gradient(70% 55% at 78% 12%, ${g}, transparent 70%), radial-gradient(60% 50% at 10% 95%, ${g}, transparent 70%)`;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-[1]" style={{ backgroundColor }} />
      <motion.div aria-hidden className="pointer-events-none fixed inset-0 -z-[1]" style={{ backgroundImage }} />
    </>
  );
}
