'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const NAV = [
  { href: '/gallery', index: '01', label: 'Gallery' },
  { href: '/portfolios', index: '02', label: 'Portfolios' },
  { href: '/achievements', index: '03', label: 'Achievements' },
  { href: '/#contact', index: '04', label: 'Contact' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // close the sheet when the route changes (derived, no effect needed)
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => !href.startsWith('/#') && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-night-950/70 backdrop-blur-md">
      <div className="frame flex h-14 items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-3" aria-label="Nguyễn Nhật Minh — home">
          <span className="font-serif text-xl italic text-ice-100">N.N.Minh</span>
          <span className="hidden font-mono text-[0.6875rem] tracking-[0.12em] text-steel-300 sm:inline">
            @_wandergraph_
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="group flex items-baseline gap-1.5 py-2 text-[0.8125rem] uppercase tracking-[0.14em] text-ice-300 transition-colors hover:text-ice-100 aria-[current=page]:text-ice-100"
                >
                  <span className="font-mono text-[0.625rem] text-steel-400">({item.index})</span>
                  <span className="border-b border-transparent group-hover:border-ice-300 group-aria-[current=page]:border-ice-100">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-11 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ice-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => {
            setOpen((v) => !v);
            setOpenedAt(pathname);
          }}
        >
          {open ? 'Close' : 'Menu'}
          <span aria-hidden className="relative block h-2.5 w-5">
            <span className={`absolute left-0 top-0 h-px w-full bg-ice-100 transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-px w-full bg-ice-100 transition-transform ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-14 bottom-0 bg-night-950 md:hidden"
          >
            <ul className="frame flex flex-col pt-6">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-hairline"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                  >
                    <span className="display text-5xl">{item.label}</span>
                    <span className="font-mono text-xs text-steel-300">({item.index})</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
