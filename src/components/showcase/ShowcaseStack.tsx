'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ShowcaseItem } from '@/data/types';
import { TicketSwitcher } from './TicketSwitcher';

type Props = {
  items: ShowcaseItem[];
  /** label shown on the ticket stub, e.g. "Featured Works" */
  label: string;
  /** priority-load the first card image (only for the first fold of a page) */
  priorityFirst?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Masked roll-in used by the in-card metadata rows when a card becomes active. */
function Roll({ active, delay, children, className = '' }: { active: boolean; delay: number; children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={false}
        animate={reduce ? { opacity: active ? 1 : 0.35 } : { y: active ? '0%' : '105%' }}
        transition={{ duration: reduce ? 0.15 : 0.6, delay: active ? delay : 0, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ShowcaseStack({ items, label, priorityFirst }: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);

  // which card is centred → active
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          if (i !== activeRef.current) {
            setDirection(i > activeRef.current ? 1 : -1);
            activeRef.current = i;
            setActive(i);
          }
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [items.length]);

  // is the stack on screen → show the floating ticket
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const jumpTo = useCallback((i: number) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cardRefs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, []);

  return (
    <section ref={sectionRef} data-snap-stack aria-label={label} className="relative">
      <TicketSwitcher items={items} active={active} direction={direction} visible={inView} label={label} onJump={jumpTo} />

      <ol className="frame flex flex-col gap-3 py-[5.5rem] md:gap-6 md:py-24">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li
              key={item.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              className="snap-center"
            >
              <article
                aria-labelledby={`${item.id}-title`}
                className={`relative isolate h-[calc(100svh-11rem)] min-h-[30rem] overflow-hidden rounded-2xl border border-hairline bg-night-850 transition-[transform,opacity] duration-700 ease-[var(--ease-editorial)] md:h-[calc(100svh-12rem)] md:rounded-3xl ${isActive ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-70'}`}
              >
                <Image
                  src={item.cover.src}
                  alt={item.cover.alt}
                  fill
                  sizes="(min-width: 1600px) 1540px, 100vw"
                  priority={priorityFirst && i === 0}
                  placeholder="blur"
                  blurDataURL={item.cover.blur}
                  className={`-z-10 object-cover object-[center_28%] transition-transform duration-[1.6s] ease-[var(--ease-editorial)] ${isActive ? 'scale-100' : 'scale-105'}`}
                />
                {/* steel-blue scrims keep text legible without changing the palette */}
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night-950 via-night-950/45 to-night-950/20" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_0%_100%,rgb(7_13_20/0.85),transparent)]" />

                <div className="flex h-full flex-col justify-between p-5 md:p-10">
                  {/* top row */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-serif text-[clamp(2.25rem,6vw,5rem)] leading-none text-ice-100/90">{item.year}</p>
                    <p className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ice-300 md:block">
                      ({item.index}/{String(items.length).padStart(2, '0')})
                    </p>
                  </div>

                  {/* bottom: title + meta (left) · quote + CTA (right) */}
                  <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
                    <div className="md:col-span-7">
                      <Roll active={isActive} delay={0.05}>
                        <span className="inline-block border border-hairline-strong bg-night-950/40 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ice-100 backdrop-blur-sm">
                          {item.category}
                        </span>
                      </Roll>
                      <h3 id={`${item.id}-title`} className="display mt-3 text-[clamp(2.5rem,7.5vw,7.5rem)]">
                        <Roll active={isActive} delay={0.1}>{item.title}</Roll>
                      </h3>
                      <dl className="mt-5 max-w-xl border-t border-hairline-strong font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
                        {[
                          ['Role', item.role],
                          ['Year / Semester', item.yearSemester],
                          ['Gear / Client', item.gearClient],
                        ].map(([k, v], r) => (
                          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-hairline-strong py-2 md:grid-cols-[10rem_1fr]">
                            <dt className="text-steel-300">{k}</dt>
                            <dd className="text-ice-100"><Roll active={isActive} delay={0.18 + r * 0.06}>{v}</Roll></dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="flex flex-col gap-4 md:col-span-4 md:col-start-9 md:items-end md:text-right">
                      <blockquote className="font-serif text-lg italic leading-snug text-ice-100 md:text-2xl">
                        “{item.quote}”
                      </blockquote>
                      <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        {item.secondary && (
                          <a href={item.secondary.href} download className="inline-flex min-h-11 items-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ice-300 underline-offset-4 hover:text-ice-100 hover:underline">
                            ↓ {item.secondary.label}
                          </a>
                        )}
                        <Link
                          href={item.href}
                          className="ticket-notch group inline-flex min-h-12 items-center gap-3 bg-ice-100 px-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-night-950 transition-colors hover:bg-steel-300"
                          aria-label={`Explore ${item.title}`}
                        >
                          Explore
                          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
