/** Content that may be a plain legacy string or a { vi, en, ko } object. */
export type Localized = string | { vi?: string; en?: string; ko?: string } | null | undefined;
export type Lang = 'vi' | 'en' | 'ko';

/** pickLang(value, lang): localized objects switch, legacy strings pass through. */
export function pickLang(v: Localized, lang: Lang): string {
  if (v == null) return '';
  if (typeof v === 'string') return noEmDash(v);
  return noEmDash(v[lang] || v.vi || v.en || v.ko || '');
}

/** House rule: never render an em-dash (U+2014); always a plain hyphen. */
const EM = /\u2014/g;
export function noEmDash(s: string): string {
  return s.includes('\u2014') ? s.replace(EM, '-') : s;
}

/** Deep-normalise every string in CMS data (objects, arrays) to the hyphen rule. */
export function cleanDashes<T>(v: T): T {
  if (typeof v === 'string') return noEmDash(v) as T;
  if (Array.isArray(v)) return v.map(cleanDashes) as T;
  if (v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) out[k] = cleanDashes(x);
    return out as T;
  }
  return v;
}

/** Per-item translations from Studio: item.i18n.en.title, item.i18n.ko.summary … */
export type I18nFields = Partial<Record<'en' | 'ko', Record<string, string | string[] | undefined>>>;

export function tr<T extends { i18n?: I18nFields }>(item: T, key: keyof T & string, lang: Lang): T[keyof T] {
  const v = lang === 'vi' ? undefined : item.i18n?.[lang]?.[key];
  if (Array.isArray(v) ? v.length : v) return cleanDashes(v) as T[keyof T];
  return cleanDashes(item[key]);
}
