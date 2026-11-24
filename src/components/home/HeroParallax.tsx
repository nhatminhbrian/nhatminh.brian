'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** Hero image: settles in on load, then drifts and scales gently as the page scrolls. */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, clipPath: 'inset(8% 8% 8% 8% round 24px)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
