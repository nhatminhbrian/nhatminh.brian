'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  id?: string;
  /** small mono line shown on the black matte, e.g. "(01) — Project Portfolio" */
  slate: string;
  /** right-hand slate, e.g. "42pp · 2025" */
  slateRight?: string;
  /** bold centred title, styled by the caller in the edition's own typeface */
  title: ReactNode;
  /** full-bleed art behind the title (photos, colour fields, motifs) */
  canvas: ReactNode;
  /** appears once the canvas has opened (byline, download…) */
  after?: ReactNode;
  /** ambient colour this frame hands to the backdrop */
  ambient: string;
  glow?: string;
  variant?: 'intro' | 'chapter';
  titleClassName?: string;
};

/**
 * Cinema letterbox: a crisp canvas inside a pure #000 matte with hairline registration
 * marks. Scrolling opens the canvas (clip-path) into the full-bleed chapter environment.
 */
export function Letterbox({ id, slate, slateRight, title, canvas, after, ambient, glow, variant = 'intro', titleClassName = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const v = useMotionValue(variant === 'intro' ? 20 : 24);
  const h = useMotionValue(12);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => {
      setMobile(mq.matches);
      v.set(mq.matches ? (variant === 'intro' ? 24 : 28) : variant === 'intro' ? 20 : 24);
      h.set(mq.matches ? 6 : 12);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [v, h, variant]);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const closed = useTransform(p, [0, 0.72], [1, 0], { clamp: true });
  const clipPath = useTransform([closed, v, h], ([c, vv, hh]: number[]) => `inset(${c * vv}% ${c * hh}% ${c * vv}% ${c * hh}% round ${c * 2}px)`);
  const canvasScale = useTransform(p, [0, 0.72], [1.14, 1]);
  const titleScale = useTransform(p, [0, 0.72], [mobile ? 0.78 : 0.62, 1]);
  const matte = useTransform(p, [0, 0.3], [1, 0]);
  const afterOpacity = useTransform(p, [0.55, 0.85], [0, 1]);

  if (reduce) {
    return (
      <section id={id} data-ambient={ambient} data-glow={glow} className="relative grid min-h-svh place-items-center overflow-hidden scroll-mt-14">
        <div className="absolute inset-0">{canvas}</div>
        <div className={`relative z-10 px-[var(--gutter)] text-center ${titleClassName}`}>{title}</div>
        {after && <div className="absolute inset-x-0 bottom-0 z-10">{after}</div>}
      </section>
    );
  }

  const tall = variant === 'intro' ? 'h-[250svh]' : 'h-[175svh]';
  const vin = mobile ? (variant === 'intro' ? 24 : 28) : variant === 'intro' ? 20 : 24;
  const hin = mobile ? 6 : 12;

  return (
    <section ref={ref} id={id} data-ambient={ambient} data-glow={glow} className={`relative ${tall} scroll-mt-14`}>
      <div className="sticky top-0 h-svh overflow-hidden" style={{ background: 'var(--portfolio-matte, #000)' }}>
        <motion.div className="absolute inset-0 overflow-hidden will-change-[clip-path]" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: canvasScale }}>{canvas}</motion.div>
        </motion.div>

        {/* registration marks on the matte */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: matte, color: 'var(--portfolio-accent, #fff)' }}>
          <span className="absolute inset-y-0 w-px bg-current opacity-25" style={{ left: `${hin}%` }} />
          <span className="absolute inset-y-0 w-px bg-current opacity-25" style={{ right: `${hin}%` }} />
          <span className="absolute inset-y-0 left-1/2 w-px bg-current opacity-10" />
          <span className="absolute border border-current opacity-60" style={{ left: `${hin}%`, right: `${hin}%`, top: `${vin}%`, bottom: `${vin}%` }} />
          {[['left', 'top'], ['right', 'top'], ['left', 'bottom'], ['right', 'bottom']].map(([x, y]) => (
            <span
              key={x + y}
              className="absolute size-5"
              style={{
                [x]: `calc(${hin}% - 14px)`,
                [y]: `calc(${vin}% - 14px)`,
                [`border${y === 'top' ? 'Bottom' : 'Top'}`]: '1px solid currentColor',
                [`border${x === 'left' ? 'Right' : 'Left'}`]: '1px solid currentColor',
              }}
            />
          ))}
          <p className="absolute max-w-[70%] truncate font-mono text-[0.625rem] uppercase tracking-[0.18em] " style={{ color: 'var(--portfolio-muted, #fff)', left: `${hin}%`, top: `calc(${vin}% - 2.25rem)` }}>{slate}</p>
          {slateRight && <p className="absolute hidden font-mono md:block text-[0.625rem] uppercase tracking-[0.18em] " style={{ color: 'var(--portfolio-muted, #fff)', right: `${hin}%`, top: `calc(${vin}% - 2.25rem)` }}>{slateRight}</p>}
          <p className="absolute inset-x-0 text-center font-mono text-[0.625rem] uppercase tracking-[0.3em]" style={{ color: 'var(--portfolio-muted, #fff)', bottom: `calc(${vin}% - 2.5rem)` }}>
            Scroll to open <span className="inline-block animate-bounce">↓</span>
          </p>
        </motion.div>

        <motion.div className="absolute inset-0 grid place-items-center px-[var(--gutter)]" style={{ scale: titleScale }}>
          <div className={`text-center ${titleClassName}`}>{title}</div>
        </motion.div>

        {after && (
          <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: afterOpacity }}>
            {after}
          </motion.div>
        )}
      </div>
    </section>
  );
}
