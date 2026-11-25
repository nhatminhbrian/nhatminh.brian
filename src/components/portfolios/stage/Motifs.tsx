import type { CSSProperties, ReactNode } from 'react';

/** Hand-drawn ribbon squiggles (Project Portfolio blue / Nhãn Quan white loops). */
const SQUIGGLES = [
  'M10 120 C 60 20, 140 20, 150 90 S 90 170, 60 120 S 120 30, 210 60 S 300 150, 250 180',
  'M20 40 C 120 10, 160 120, 90 130 S 40 60, 130 50 S 260 90, 220 160 S 120 200, 180 230',
  'M10 160 C 70 160, 70 60, 130 60 S 200 170, 250 110 S 230 20, 180 40 S 170 140, 290 150',
  'M30 30 C 30 120, 140 140, 150 80 S 80 20, 70 90 S 180 200, 280 150',
];

export function Squiggle({ variant = 0, color = 'currentColor', width = 22, className = '', style }: { variant?: number; color?: string; width?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden viewBox="0 0 300 240" fill="none" className={`pointer-events-none ${className}`} style={style}>
      <path d={SQUIGGLES[variant % SQUIGGLES.length]} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Four-point sparkle (luminescent. wordmark, SSEAYP "THANK YOU"). */
export function Sparkle({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" fill={color} />
    </svg>
  );
}

export function Star({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <path d="M50 2 L62 38 L99 38 L69 60 L80 97 L50 75 L20 97 L31 60 L1 38 L38 38 Z" fill={color} />
    </svg>
  );
}

/** Script annotation in the edition's hand (var(--ed-script)). */
export function Script({ children, className = '', color, rotate = -6, as: Tag = 'span' }: { children: ReactNode; className?: string; color?: string; rotate?: number; as?: 'span' | 'p' | 'h2' | 'h3' }) {
  return (
    <Tag
      className={`inline-block leading-[0.9] ${className}`}
      style={{ fontFamily: 'var(--ed-script)', color: color ?? 'var(--ed-accent)', transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </Tag>
  );
}

/** Print-style running footer with page number — kept from the PDFs. */
export function Folio({ left, right, page, className = '' }: { left?: ReactNode; right?: ReactNode; page?: number | string; className?: string }) {
  return (
    <div className={`flex items-end justify-between gap-6 pt-10 text-[0.6875rem] opacity-70 ${className}`}>
      <span className="flex flex-wrap gap-x-8 gap-y-1">{left}</span>
      <span className="flex flex-wrap items-end justify-end gap-x-8 gap-y-1 text-right">{right}{page !== undefined && <b className="text-sm">{page}</b>}</span>
    </div>
  );
}

/** Mobile swipe hint for zine strips. */
export function SwipeHint({ count, className = '' }: { count: number; className?: string }) {
  return (
    <p className={`mt-3 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-60 md:hidden ${className}`}>
      <span>Swipe</span>
      <span>{String(count).padStart(2, '0')} frames →</span>
    </p>
  );
}
