'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Props = {
  value: string;
  className?: string;
  /** stagger offset in seconds, so stacked rows roll one after another */
  delay?: number;
  /** direction of travel: 1 = next card (rolls up), -1 = previous card (rolls down) */
  direction?: number;
  as?: 'span' | 'div';
};

/** Vertical masked slot-roll: the old value slides out of an overflow-hidden clip as the new one rolls in. */
export function SlotText({ value, className = '', delay = 0, direction = 1, as = 'span' }: Props) {
  const reduce = useReducedMotion();
  const Tag = as === 'div' ? motion.div : motion.span;
  const dist = '110%';
  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <Tag
          key={value}
          className="col-start-1 row-start-1 block"
          custom={direction}
          initial={reduce ? { opacity: 0 } : { y: direction > 0 ? dist : `-${dist}` }}
          animate={reduce ? { opacity: 1 } : { y: '0%' }}
          exit={reduce ? { opacity: 0 } : { y: direction > 0 ? `-${dist}` : dist }}
          transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </Tag>
      </AnimatePresence>
    </span>
  );
}
