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
  const [shown, setShown] = useState(false);

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
        setShown(window.scrollY > 240);
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
    <div
      aria-hidden
      data-shown={shown || undefined}
      className="folio-pill pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 opacity-0 backdrop-blur-xl transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] translate-y-2 data-[shown]:translate-y-0 data-[shown]:opacity-100 md:flex"
    >
      <span className="ui-label text-[0.625rem] text-steel-300">{label}</span>
      <span aria-hidden className="h-3 w-px bg-white/15" />
      <span className="ui-label text-[0.625rem] tabular-nums text-ice-100">{pad(count.i)} / {pad(count.n)}</span>
    </div>
  );
}
