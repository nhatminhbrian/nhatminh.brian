/**
 * Ambient themes sampled from the original PDFs (pdftoppm renders, Nov 2026).
 * Each edition overrides the site's Nocturnal palette inside /portfolios/[slug].
 */
export type EditionTheme = {
  /** page paper / default ambient */
  bg: string;
  /** chrome surfaces (floating bar, menus) */
  surface: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accent2: string;
  line: string;
  display: string;
  script: string;
};

export const themes = {
  // Project Portfolio (UIC Yonsei, Canva, 03/2025): black + cream spreads, periwinkle blue
  // wide grotesk headlines, blue ribbon squiggles, copper hand-script on luminescent.
  project: {
    bg: '#0d0d0d',
    surface: '#151515',
    ink: '#fbfae8',
    inkSoft: '#c9c6b4',
    accent: '#5685cd',
    accent2: '#ed996b',
    line: 'rgb(251 250 232 / 0.16)',
    display: "'Archivo Variable', var(--font-sans)",
    script: "'Ephesis', cursive",
  },
  // SSEAYP 49th: signal red field, yellow geometric shapes, cream display type.
  sseayp: {
    bg: '#d4171d',
    surface: '#b0121a',
    ink: '#fcf0e4',
    inkSoft: '#ffd9cf',
    accent: '#ffd21f',
    accent2: '#ffffff',
    line: 'rgb(252 240 228 / 0.28)',
    display: "'Bowlby One', 'Anton', sans-serif",
    script: "'Anton', sans-serif",
  },
  // Nhãn Quan Thế Kỷ: museum paper + espresso spreads, condensed black headlines,
  // red brush-script captions, white hand-drawn loops.
  'nhan-quan-the-ky': {
    bg: '#f4f1ea',
    surface: '#221c14',
    ink: '#1c1711',
    inkSoft: '#5b5246',
    accent: '#d2281e',
    accent2: '#f4f1ea',
    line: 'rgb(28 23 17 / 0.18)',
    display: "'Anton', var(--font-sans)",
    script: "'Ephesis', cursive",
  },
} satisfies Record<string, EditionTheme>;

export type ThemeKey = keyof typeof themes;

export function themeVars(t: EditionTheme): Record<string, string> {
  return {
    '--ed-bg': t.bg,
    '--ed-surface': t.surface,
    '--ed-ink': t.ink,
    '--ed-ink-soft': t.inkSoft,
    '--ed-accent': t.accent,
    '--ed-accent-2': t.accent2,
    '--ed-line': t.line,
    '--ed-display': t.display,
    '--ed-script': t.script,
    '--edition-accent': t.accent,
  };
}
