/** Content that may be a plain legacy string or a { vi, en, ko } object. */
export type Localized = string | { vi?: string; en?: string; ko?: string } | null | undefined;
export type Lang = 'vi' | 'en' | 'ko';

/** pickLang(value, lang): localized objects switch, legacy strings pass through. */
export function pickLang(v: Localized, lang: Lang): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return v[lang] || v.vi || v.en || v.ko || '';
}

/** Per-item translations from Studio: item.i18n.en.title, item.i18n.ko.summary … */
export type I18nFields = Partial<Record<'en' | 'ko', Record<string, string | string[] | undefined>>>;

export function tr<T extends { i18n?: I18nFields }>(item: T, key: keyof T & string, lang: Lang): T[keyof T] {
  const v = lang === 'vi' ? undefined : item.i18n?.[lang]?.[key];
  if (Array.isArray(v) ? v.length : v) return v as T[keyof T];
  return item[key];
}
