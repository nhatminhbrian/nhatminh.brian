'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useState } from 'react';
import type { ResolvedMedia } from '@/data/types';
import { useT } from '@/components/i18n/LanguageProvider';

export type IndexItem = {
  index: string;
  label: string;
  labelVi: string;
  labelKey?: string;
  subKey?: string;
  href: string;
  meta: string;
  preview: ResolvedMedia;
};

export function IndexNav({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const t = useT();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerEnter={(e) => {
        // start the preview at the cursor instead of springing in from the corner
        sx.jump(e.clientX);
        sy.jump(e.clientY);
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol className="border-b border-hairline">
        {items.map((item, i) => (
          <li key={item.href} className="border-t border-hairline">
            <Link
              href={item.href}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-colors md:grid-cols-12 md:gap-6 md:py-7"
            >
              <span className="ui-label text-[0.6875rem] text-steel-300 md:col-span-1">({item.index})</span>
              <span className="md:col-span-7">
                <span className="display block text-[clamp(2.5rem,7vw,6.5rem)] transition-[letter-spacing,color] duration-500 ease-[var(--ease-editorial)] group-hover:text-steel-300 group-hover:italic md:group-hover:tracking-normal">
                  {item.labelKey ? t(item.labelKey, item.label) : item.label}
                </span>
                <span className="mt-1 block ui-label text-[0.6875rem] text-steel-400">
                  {item.subKey ? t(item.subKey, item.labelVi) : item.labelVi}
                </span>
              </span>
              <span className="hidden text-sm text-ice-300 md:col-span-3 md:block">{item.meta}</span>
              {/* touch: inline thumbnail instead of hover preview */}
              <span className="relative h-16 w-12 overflow-hidden md:hidden">
                <Image src={item.preview.src} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span aria-hidden className="hidden text-right text-xl text-steel-300 transition-transform group-hover:translate-x-1 md:col-span-1 md:block">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {active !== null && !reduce && (
          <motion.div
            key="preview"
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[22rem] w-[16rem] overflow-hidden rounded-2xl ring-1 ring-ice-100/20 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] md:block"
            style={{ x: sx, y: sy, translateX: '24px', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.92, clipPath: 'inset(12% 12% 12% 12%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item, i) => (
              <Image
                key={item.href}
                src={item.preview.src}
                alt=""
                fill
                sizes="256px"
                placeholder="blur"
                blurDataURL={item.preview.blur}
                className={`object-cover transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <span className="absolute bottom-2 left-2 ui-label text-[0.625rem] text-ice-100 mix-blend-difference">
              ({items[active].index}) {items[active].label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
