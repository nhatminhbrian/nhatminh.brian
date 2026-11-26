'use client';

import { termsI18n } from '@/data/home.i18n';
import { pickLang, tr, type I18nFields, type Lang, type Localized } from '@/i18n/pick';
import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { dictionaries, locales, localeLabels, localeNames, type Locale } from '@/i18n/dictionaries';

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LanguageContext = createContext<Ctx>({ locale: 'vi', setLocale: () => {} });
const KEY = 'brian.locale';

// Locale lives in a tiny external store so hydration always uses the server value ('vi')
// and the visitor's saved choice is applied right after, without mismatches.
const listeners = new Set<() => void>();
function readLocale(): Locale {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch {}
  if (stored && (locales as readonly string[]).includes(stored)) return stored as Locale;
  const browser = navigator.language.slice(0, 2);
  return (locales as readonly string[]).includes(browser) ? (browser as Locale) : 'vi';
}
let current: Locale | null = null;
const store = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get(): Locale {
    if (current === null) current = readLocale();
    return current;
  },
  server: (): Locale => 'vi',
  set(l: Locale) {
    current = l;
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    listeners.forEach((cb) => cb());
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(store.subscribe, store.get, store.server);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const setLocale = useCallback((l: Locale) => store.set(l), []);
  return <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  return useContext(LanguageContext);
}

/** t('key', fallback?) — current language → Vietnamese → fallback → key. */
export function useT() {
  const { locale } = useContext(LanguageContext);
  return useCallback(
    (key: string, fallback?: string) => dictionaries[locale][key] ?? dictionaries.vi[key] ?? fallback ?? key,
    [locale],
  );
}

/** Inline translated string usable from server components: <T k="nav.gallery" /> */
export function T({ k, fallback }: { k: string; fallback?: string }) {
  const t = useT();
  return <>{t(k, fallback)}</>;
}

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div role="radiogroup" aria-label="Language" className={`flex items-center rounded-full border border-hairline bg-ice-100/[0.04] p-0.5 ${className}`}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={locale === l}
          title={localeNames[l]}
          onClick={() => setLocale(l)}
          className={`min-h-8 min-w-9 rounded-full px-2 ui-label text-[0.6875rem] transition-colors ${locale === l ? 'bg-ice-100 text-night-950' : 'text-ice-300 hover:text-ice-100'}`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}

/** Inline localized content: <L t={{ vi, en, ko }} /> */
export function L({ t }: { t: { vi: string; en: string; ko: string } }) {
  const { locale } = useContext(LanguageContext);
  return <>{t[locale as 'vi' | 'en' | 'ko'] ?? t.vi}</>;
}

/** Translate known content terms inside a string (semesters, partner groups, course names). */
export function useTerms() {
  const { locale } = useContext(LanguageContext);
  return useCallback(
    (s: string) => {
      if (locale === 'vi' || !s) return s;
      let out = s;
      for (const [vi, tr] of Object.entries(termsI18n).sort((a, b) => b[0].length - a[0].length)) {
        if (out.includes(vi)) out = out.split(vi).join(tr[locale as 'en' | 'ko']);
      }
      return out;
    },
    [locale],
  );
}

/** Item-level translator for Studio content: const t = useTr(); t(item, 'title') */
export function useTr() {
  const { locale } = useContext(LanguageContext);
  return useCallback(
    <I extends { i18n?: I18nFields }>(item: I, key: keyof I & string) => tr(item, key, locale as Lang),
    [locale],
  );
}

export function usePick() {
  const { locale } = useContext(LanguageContext);
  return useCallback((v: Localized) => pickLang(v, locale as Lang), [locale]);
}

/** Server-component friendly: <Tr item={{ title, i18n }} k="title" /> */
export function Tr<I extends { i18n?: I18nFields }>({ item, k }: { item: I; k: keyof I & string }) {
  const t = useTr();
  const v = t(item, k);
  return <>{Array.isArray(v) ? v.join(' ') : (v as string)}</>;
}

/** Paragraph list (story, details) that follows the language. */
export function TrParas<I extends { i18n?: I18nFields }>({ item, k, className }: { item: I; k: keyof I & string; className?: string }) {
  const t = useTr();
  const v = t(item, k) as unknown as string[] | string | undefined;
  const list = Array.isArray(v) ? v : String(v ?? '').split(/\n\s*\n/).filter(Boolean);
  return <>{list.map((p) => <p key={p} className={className}>{p}</p>)}</>;
}

/** <P v={localizedOrString} /> */
export function P({ v }: { v: Localized }) {
  const pick = usePick();
  return <>{pick(v)}</>;
}
