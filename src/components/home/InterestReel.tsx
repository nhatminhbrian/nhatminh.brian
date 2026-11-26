'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLocale } from '@/components/i18n/LanguageProvider';
import { pickLang, type Localized } from '@/i18n/pick';

const ANCHOR = { vi: 'Mình quan tâm đến', en: 'Focused on', ko: '관심 분야' } as const;
const STEP_MS = 2400;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const MASK = 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 42%, #000 58%, rgba(0,0,0,0.45) 78%, transparent 100%)';

/**
 * Vertical kinetic reel for the Home "interests" list (Studio homePage.interests).
 * Static anchor phrase on the left, a 3-row drum on the right whose centre row is
 * the active item. The list is rendered three times so the loop wraps seamlessly.
 */
export function InterestReel({ items }: { items: Localized[] }) {
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const words = items.map((v) => pickLang(v, locale)).filter(Boolean);
  const n = words.length;
  const [pos, setPos] = useState(n); // index into the tripled list; middle copy is "home"
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const resumeRef = useRef(0);

  const step = useCallback((d: number) => { setAnimate(true); setPos((p) => p + d); }, []);

  useEffect(() => {
    if (reduce || paused || n < 2) return;
    const t = window.setInterval(() => step(1), STEP_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused, n, step]);

  // after sliding into the first/last copy, jump back to the middle copy without a transition
  const onEnd = () => {
    if (pos >= 2 * n || pos < n) { setAnimate(false); setPos((p) => ((p % n) + n) % n + n); }
  };
  useEffect(() => {
    if (!animate) { const r = requestAnimationFrame(() => setAnimate(true)); return () => cancelAnimationFrame(r); }
  }, [animate]);
  useEffect(() => () => window.clearTimeout(resumeRef.current), []);

  if (!n) return null;
  const anchor = ANCHOR[locale] ?? ANCHOR.vi;
  const type = 'font-display font-normal whitespace-nowrap text-[clamp(1rem,4.6vw,1.125rem)] sm:text-2xl md:text-[28px] tracking-[-0.01em]';

  if (reduce) {
    return (
      <div className="mt-10 grid gap-3 border-y border-white/[0.06] py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
        <p className={`${type} text-[#F4F7FA]`}>{anchor}</p>
        <ul className="grid gap-1">
          {words.map((w) => <li key={w} className={`${type} text-[#F4F7FA]`}>{w}</li>)}
        </ul>
      </div>
    );
  }

  const list = [...words, ...words, ...words];
  const active = ((pos % n) + n) % n;

  return (
    <div className="mt-10 border-y border-white/[0.06] py-6 sm:py-8 [--row:2.75rem] sm:[--row:3rem]">
      <div className="grid items-center gap-x-8 gap-y-1 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
        <p className={`${type} text-[#F4F7FA]`}>{anchor}</p>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={anchor}
          tabIndex={0}
          onClick={() => step(1)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); step(1); }
            if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
          }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onTouchStart={() => { setPaused(true); window.clearTimeout(resumeRef.current); }}
          onTouchEnd={() => { resumeRef.current = window.setTimeout(() => setPaused(false), 3000); }}
          className="relative h-[calc(var(--row)*3)] min-w-0 cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-white/20"
          style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        >
          <ul
            aria-live="polite"
            onTransitionEnd={onEnd}
            className="will-change-transform"
            style={{
              transform: `translate3d(0, calc(var(--row) * ${1 - pos}), 0)`,
              transition: animate ? `transform 650ms ${EASE}` : 'none',
            }}
          >
            {list.map((w, i) => {
              const on = i === pos;
              return (
                <li
                  key={i}
                  aria-hidden={!on}
                  className={`${type} flex h-11 items-center sm:h-12 transition-[opacity,color] duration-[650ms] ${on ? 'text-[#F4F7FA] opacity-100' : 'text-steel-400 opacity-35'}`}
                >
                  {w}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <span className="ui-label mr-2 text-[0.625rem] tabular-nums text-steel-400">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <button type="button" onClick={() => step(-1)} aria-label="Previous interest" className="grid h-9 w-9 place-items-center text-steel-400 transition-colors hover:text-[#F4F7FA]">↑</button>
          <button type="button" onClick={() => step(1)} aria-label="Next interest" className="grid h-9 w-9 place-items-center text-steel-400 transition-colors hover:text-[#F4F7FA]">↓</button>
        </div>
      </div>
    </div>
  );
}
