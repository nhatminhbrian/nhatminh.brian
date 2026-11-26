'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePick } from '@/components/i18n/LanguageProvider';
import type { Localized } from '@/i18n/pick';

export type Chapter = { id: string; n: string; label: Localized };
type EditionLink = { slug: string; index: string; title: string };

type Props = {
  current: EditionLink;
  editions: EditionLink[];
  chapters: Chapter[];
  pdf: { href: string; label: string; pages: number; sizeMb: number };
};

/** Theme-matched floating bar: back to /portfolios · chapter switcher · original PDF. */
export function FloatingBar({ current, editions, chapters, pdf }: Props) {
  const pick = usePick();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(chapters[0]?.id);
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.5));

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, [open]);

  const chapter = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <motion.div
      ref={wrap}
      initial={false}
      animate={{ y: shown || open ? 0 : 96, opacity: shown || open ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-lg"
      style={{ color: 'var(--ed-ink-bar, #fff)' }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id="chapter-menu"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mb-2 max-h-[60svh] overflow-y-auto rounded-3xl border p-2 shadow-2xl backdrop-blur-2xl"
            style={{ background: 'color-mix(in srgb, var(--ed-bar) 92%, transparent)', borderColor: 'var(--ed-bar-line)' }}
          >
            <p className="px-3 pb-1 pt-2 ui-label text-[0.625rem] opacity-60">{current.title}</p>
            <ol>
              {chapters.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={c.id === active ? 'true' : undefined}
                    className="flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm hover:bg-white/10 aria-[current=true]:bg-white/15"
                  >
                    <span className="w-8 ui-label text-[0.6875rem] opacity-60">{c.n}</span>
                    <span>{pick(c.label)}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-2 flex gap-1 border-t pt-2" style={{ borderColor: 'var(--ed-bar-line)' }}>
              {editions.map((e) => (
                <Link
                  key={e.slug}
                  href={`/portfolios/${e.slug}`}
                  aria-current={e.slug === current.slug ? 'page' : undefined}
                  className="flex min-h-11 flex-1 flex-col justify-center rounded-2xl px-3 text-xs hover:bg-white/10 aria-[current=page]:bg-white/15"
                >
                  <span className="ui-label text-[0.625rem] opacity-60">{e.index}</span>
                  <span className="truncate">{e.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Edition"
        className="relative flex items-center gap-1 overflow-hidden rounded-full border p-1.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] backdrop-blur-2xl"
        style={{ background: 'color-mix(in srgb, var(--ed-bar) 82%, transparent)', borderColor: 'var(--ed-bar-line)' }}
      >
        <Link href="/portfolios" aria-label="Back to portfolios" className="grid size-11 shrink-0 place-items-center rounded-full text-lg hover:bg-white/10">
          ←
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="chapter-menu"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-full px-3 text-left hover:bg-white/10"
        >
          <span className="ui-label text-[0.6875rem] opacity-60">{chapter?.n}</span>
          <span className="truncate text-sm">{pick(chapter?.label)}</span>
          <span aria-hidden className={`ml-auto text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▴</span>
        </button>
        <a
          href={pdf.href}
          download={pdf.label}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 ui-label text-[0.6875rem]"
          style={{ background: 'var(--ed-bar-accent)', color: 'var(--ed-bar-accent-ink)' }}
          aria-label={`Download original PDF, ${pdf.pages} pages, ${pdf.sizeMb} MB`}
        >
          ↓ PDF
        </a>
        <motion.span aria-hidden className="absolute inset-x-6 bottom-0 h-px origin-left" style={{ scaleX: progress, background: 'var(--ed-bar-accent)' }} />
      </nav>
    </motion.div>
  );
}
