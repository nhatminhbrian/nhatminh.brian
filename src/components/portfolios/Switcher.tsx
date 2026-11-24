'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId, useRef, useState, type ReactNode, type KeyboardEvent } from 'react';

export type SwitcherTab = { key: string; label: ReactNode; sub?: string; content: ReactNode };

/**
 * Accessible tablist (roving focus, arrow keys) with an animated panel swap.
 * Used by the SSEAYP act switcher and the luminescent. Red/Blue toggle.
 */
export function Switcher({ tabs, ariaLabel, accent }: { tabs: SwitcherTab[]; ariaLabel: string; accent?: string }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    let next = active;
    if (e.key === 'ArrowRight') next = (active + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel} onKeyDown={onKey} className="grid border-y border-hairline" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.key}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className="relative min-h-16 border-l border-hairline px-3 py-4 text-left transition-colors first:border-l-0 hover:bg-night-850 md:px-6"
            >
              <span className={`block font-serif text-xl leading-tight md:text-3xl ${selected ? 'text-ice-100' : 'text-steel-400'}`}>{t.label}</span>
              {t.sub && <span className="mt-1 hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-steel-400 md:block">{t.sub}</span>}
              {selected && (
                <motion.span
                  layoutId={`${id}-bar`}
                  className="absolute inset-x-0 -bottom-px h-0.5"
                  style={{ background: accent ?? 'var(--edition-accent, var(--color-ice-100))' }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="focus-visible:outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tabs[active].key}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
