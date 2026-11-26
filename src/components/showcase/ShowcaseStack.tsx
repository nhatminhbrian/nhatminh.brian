'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ShowcaseItem } from '@/data/types';
import { TicketSwitcher } from './TicketSwitcher';
import { usePick, useT, useTerms } from '@/components/i18n/LanguageProvider';

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
  const railRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(0);
  const t = useT();
  const term = useTerms();
  const pick = usePick();
  /** Studio VI/EN/KO copy first, then the term map */
  const tx = (item: ShowcaseItem, k: keyof NonNullable<ShowcaseItem['loc']>) => (item.loc?.[k]?.en || item.loc?.[k]?.ko ? pick(item.loc[k]) : term(item[k]));

  const setActiveIndex = useCallback((i: number) => {
    if (i === activeRef.current) return;
    setDirection(i > activeRef.current ? 1 : -1);
    activeRef.current = i;
    setActive(i);
  }, []);

  // mobile: horizontal snap rail. rAF-throttled scroll read, state only changes when the index does
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (rail.scrollWidth <= rail.clientWidth) return; // desktop: vertical stack
        const card = cardRefs.current[0];
        const step = card ? card.offsetWidth + 12 : rail.clientWidth;
        setActiveIndex(Math.min(items.length - 1, Math.max(0, Math.round(rail.scrollLeft / step))));
      });
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => { rail.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [items.length, setActiveIndex]);

  // desktop: which card is centred → active
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
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
    const rail = railRef.current;
    if (rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: cardRefs.current[i]?.offsetLeft ? cardRefs.current[i]!.offsetLeft - rail.offsetLeft - 16 : 0, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    cardRefs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, []);

  return (
    <section ref={sectionRef} data-snap-stack aria-label={label} className="relative">
      <div className="hidden md:block">
        <TicketSwitcher items={items} active={active} direction={direction} visible={inView} label={label} onJump={jumpTo} />
      </div>

      <ol
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-4 pt-8 md:frame md:snap-none md:flex-col md:gap-6 md:overflow-visible md:py-24"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li
              key={item.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              className="w-[86vw] max-w-[26rem] shrink-0 snap-start md:w-auto md:max-w-none md:snap-center"
            >
              <article
                aria-labelledby={`${item.id}-title`}
                className={`relative isolate h-[min(38rem,calc(100dvh-9rem))] min-h-[30rem] print border border-hairline bg-night-850 transition-[transform,opacity] duration-700 ease-[var(--ease-editorial)] md:h-[calc(100svh-12rem)] ${isActive ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-70'}`}
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
                    <p className="font-display font-medium text-[clamp(2.25rem,6vw,5rem)] leading-none text-ice-100/90">{item.year}</p>
                    <p className="hidden ui-label text-[0.6875rem] text-ice-300 md:block">
                      ({item.index}/{String(items.length).padStart(2, '0')})
                    </p>
                  </div>

                  {/* bottom: title + meta (left) · quote + CTA (right) */}
                  <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
                    <div className="md:col-span-7">
                      <Roll active={isActive} delay={0.05}>
                        <span className="glass inline-block rounded-full px-3 py-1 ui-label text-[0.625rem] text-ice-100">
                          {tx(item, 'category')}
                        </span>
                      </Roll>
                      <h3 id={`${item.id}-title`} className="display mt-3 text-[clamp(2.5rem,7.5vw,7.5rem)]">
                        <Roll active={isActive} delay={0.1}>{tx(item, 'title')}</Roll>
                      </h3>
                      <dl className="glass mt-5 max-w-xl rounded-xl px-4 py-1 ui-label text-[0.6875rem]">
                        {[
                          [t('show.role'), tx(item, 'role')],
                          [t('show.yearSem'), tx(item, 'yearSemester')],
                          [t('show.gearClient'), tx(item, 'gearClient')],
                        ].map(([k, v], r) => (
                          <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 border-b border-hairline py-2 last:border-b-0 md:grid-cols-[10rem_1fr]">
                            <dt className="text-steel-300">{k}</dt>
                            <dd className="text-ice-100"><Roll active={isActive} delay={0.18 + r * 0.06}>{v}</Roll></dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="flex flex-col gap-4 md:col-span-4 md:col-start-9 md:items-end md:text-right">
                      <blockquote className="glass w-full max-w-[320px] text-balance rounded-2xl p-4 font-display font-medium text-lg leading-snug text-ice-100 md:p-5 md:text-2xl">
                        “{tx(item, 'quote')}”
                      </blockquote>
                      <div className="flex items-center gap-3 md:flex-wrap md:justify-end">
                        {item.secondary && (
                          <a href={item.secondary.href} download className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-4 ui-label text-[0.6875rem] text-ice-300 underline-offset-4 hover:text-ice-100 md:min-h-11 md:rounded-none md:border-0 md:px-0 md:hover:underline">
                            ↓ {item.secondary.label}
                          </a>
                        )}
                        <Link
                          href={item.href}
                          className="ticket-notch group inline-flex min-h-12 flex-1 items-center justify-center gap-3 bg-ice-100 px-6 md:flex-none md:justify-start ui-label text-[0.6875rem] font-medium text-night-950 transition-colors hover:bg-steel-300"
                          aria-label={`Explore ${item.title}`}
                        >
                          {t('common.explore')}
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

      {/* mobile reel position */}
      <div className="flex items-center justify-between px-4 pb-6 md:hidden">
        <p className="ui-label text-[0.625rem] tabular-nums text-steel-400">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {items.map((it, i) => (
            <span key={it.id} className={`h-px w-6 origin-left bg-ice-100 transition-[transform,opacity] duration-500 ${i === active ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-30'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
