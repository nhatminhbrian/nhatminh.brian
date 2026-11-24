'use client';

import { useEffect, useRef } from 'react';

/**
 * Living Nocturnal-Steel backdrop: slow-drifting steel-blue light pools (pure CSS, GPU transforms),
 * a faint aurora sweep, and a soft glow that trails the pointer on desktop.
 * Everything sits on a fixed layer behind content and stops for prefers-reduced-motion.
 */
export function LiveBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.3;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    el.style.opacity = '1';
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="live-bg">
      <div className="live-bg__pool live-bg__pool--a" />
      <div className="live-bg__pool live-bg__pool--b" />
      <div className="live-bg__pool live-bg__pool--c" />
      <div className="live-bg__aurora" />
      <div ref={glowRef} className="live-bg__glow" />
      <div className="live-bg__vignette" />
    </div>
  );
}
