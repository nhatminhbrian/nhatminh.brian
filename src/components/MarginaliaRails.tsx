'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useT } from '@/components/i18n/LanguageProvider';

const routeKey: Record<string, string> = { '': 'nav.home', gallery: 'nav.gallery', portfolios: 'nav.portfolios', achievements: 'nav.achievements' };

/** Desktop vertical marginalia: route name on the left, live section counter on the right. */
export function MarginaliaRails() {
  const path = usePathname();
  const t = useT();
  const [count, setCount] = useState({ i: 1, n: 1 });

  useEffect(() => {
    let raf = 0;
    const sections = () => {
      const marked = [...document.querySelectorAll<HTMLElement>('main [data-rail]')];
      return marked.length ? marked : [...document.querySelectorAll<HTMLElement>('main > * > section, main > section')];
    };
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = sections();
        const mid = window.innerHeight / 2;
        let i = 0;
        s.forEach((el, k) => { if (el.getBoundingClientRect().top <= mid) i = k; });
        setCount({ i: i + 1, n: Math.max(1, s.length) });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); cancelAnimationFrame(raf); };
  }, [path]);

  const seg = path.split('/')[1] ?? '';
  const sub = path.split('/')[2];
  const label = `${t((routeKey[seg] ?? 'nav.home') as never)}${sub ? ` / ${sub.replace(/-/g, ' ')}` : ''}`;
  const pad = (v: number) => String(v).padStart(2, '0');

  return (
    <>
      <div aria-hidden className="rail fixed inset-y-0 left-0 z-40 hidden w-10 items-center justify-center border-r lg:flex">
        <span className="rail-text">{label}</span>
      </div>
      <div aria-hidden className="rail fixed inset-y-0 right-0 z-40 hidden w-10 items-center justify-center border-l lg:flex">
        <span className="rail-text rail-text-r tabular-nums">{pad(count.i)} / {pad(count.n)}</span>
      </div>
    </>
  );
}
