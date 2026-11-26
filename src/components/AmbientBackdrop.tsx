'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight cinematic atmosphere (replaces the canvas particle field):
 * CSS-only breathing steel glow + drifting projector dust, and on fine pointers a
 * 450px spotlight that lights up the 1px Swiss grid. One rAF-throttled CSS-var write.
 */
export function AmbientBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden className="ambient-backdrop pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      <div className="ambient-glow" />
      <div className="ambient-dust" />
      <div className="ambient-grid" />
    </div>
  );
}
