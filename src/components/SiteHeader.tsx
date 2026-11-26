'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSwitcher, useT } from '@/components/i18n/LanguageProvider';

export const NAV = [
  { href: '/gallery', index: '01', label: 'Gallery', key: 'nav.gallery' },
  { href: '/portfolios', index: '02', label: 'Portfolios', key: 'nav.portfolios' },
  { href: '/achievements', index: '03', label: 'Achievements', key: 'nav.achievements' },
  { href: '/#contact', index: '04', label: 'Contact', key: 'nav.contact' },
] as const;

export function SiteHeader() {
  const t = useT();
  const [open, setOpen] = useState(false);

  // RouteSync (below) announces navigations; close the mobile sheet on each one
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('brian:route', close);
    return () => window.removeEventListener('brian:route', close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.menu = 'open';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      delete document.documentElement.dataset.menu;
    };
  }, [open]);


  return (
    <>
    <Suspense fallback={null}>
      <RouteSync />
    </Suspense>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#070D14]/95 pt-[env(safe-area-inset-top)] md:bg-[#070D14]/70 md:backdrop-blur-2xl md:backdrop-saturate-150">
      <div className="frame flex h-14 items-center justify-between gap-3">
        <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label="Brian · Nguyễn Nhật Minh - home">
          <span className="font-display font-medium text-2xl leading-none text-ice-100">Brian.</span>
          <span className="hidden ui-label text-[0.6875rem] text-steel-300 sm:inline">
            @_wandergraph_
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-4 xl:gap-7">
            {NAV.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  data-nav={item.href}
                  className="group flex shrink-0 items-baseline gap-1.5 whitespace-nowrap py-2 text-[11px] uppercase tracking-[0.1em] text-ice-300 transition-colors hover:text-ice-100 aria-[current=page]:text-ice-100"
                >
                  <span className="ui-label text-[0.625rem] text-steel-400">({item.index})</span>
                  <span className="relative">
                    {t(item.key, item.label)}
                    <Suspense fallback={null}><ActiveMark href={item.href} /></Suspense>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher className="ml-auto md:ml-0" />

        <button
          type="button"
          className="-mr-2.5 grid h-11 w-11 shrink-0 touch-manipulation place-items-center text-ice-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('nav.close') : t('nav.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-2.5 w-5">
            <span className={`absolute left-0 top-0 h-px w-full bg-ice-100 transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-px w-full bg-ice-100 transition-transform ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

    </header>

    {/* Backstage menu: the page canvas slides down to reveal it (mobile) */}
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 overflow-y-auto overscroll-contain bg-[#070D14] pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <ul className="frame flex flex-col pt-6">
            {NAV.map((item, i) => (
              <motion.li key={item.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-16 items-baseline gap-3 border-b border-white/[0.06] py-3">
                  <span className="ui-label text-[0.625rem] text-steel-400">({item.index})</span>
                  <span className="display text-4xl">{t(item.key, item.label)}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
    </>
  );
}

/** Marks the active nav link (aria-current) and announces route changes. Isolated in Suspense
 *  so reading the URL never blocks or de-opts the header itself. */
function RouteSync() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => {
      const href = a.dataset.nav ?? '';
      if (!href.startsWith('/#') && pathname.startsWith(href)) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.dispatchEvent(new Event('brian:route'));
  }, [pathname]);
  return null;
}


/** Viewfinder mark that glides (layoutId) above the active route. */
function ActiveMark({ href }: { href: string }) {
  const path = usePathname();
  if (!(path === href || path.startsWith(`${href}/`))) return null;
  return (
    <motion.span
      layoutId="nav-mark"
      aria-hidden
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -top-3 left-1/2 -translate-x-1/2 ui-label text-[0.75rem] leading-none text-ice-100 [text-shadow:0_0_10px_rgb(226_237_245/0.8)]"
    >
      +
    </motion.span>
  );
}
