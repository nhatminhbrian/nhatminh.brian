/**
 * Per-portfolio themeConfig — colours sampled from pdftoppm renders of each PDF,
 * fonts matched to the faces embedded in them (see src/app/portfolios/fonts.ts).
 * Everything is scoped to the edition's <article>; the rest of the site keeps the
 * Nocturnal Steel & Ice Slate theme.
 */
export type ThemeConfig = {
  colors: {
    bg: string;
    surface: string;
    ink: string;
    mutedInk: string;
    accent: string;
    accent2: string;
    border: string;
    /** letterbox matte = the PDF's own page colour */
    matte: string;
    /** text on the accent (buttons) */
    onAccent: string;
  };
  fonts: {
    headingFont: string;
    subFont: string;
    bodyFont: string;
    scriptFont: string;
    monoFont: string;
  };
};

const MONO = 'var(--font-spacemono), ui-monospace, monospace';

export const themeConfig = {
  // UIC Project Portfolio — black/cream spreads, periwinkle blue, copper hand-script.
  project: {
    colors: {
      bg: '#0d0d0d',
      surface: '#161616',
      ink: '#fbfae8',
      mutedInk: '#c9c6b4',
      accent: '#5685cd',
      accent2: '#ed996b',
      border: 'rgb(251 250 232 / 0.16)',
      matte: '#0d0d0d',
      onAccent: '#fbfae8',
    },
    fonts: {
      headingFont: "'Archivo Variable', var(--font-leaguespartan), sans-serif", // PP Neue Machina → Archivo Expanded
      subFont: 'var(--font-leaguespartan), sans-serif', // League Spartan (original)
      bodyFont: 'var(--font-bevietnam), sans-serif', // Canva Sans → Be Vietnam Pro
      scriptFont: "'Ephesis', cursive", // Blowing → Ephesis
      monoFont: MONO,
    },
  },
  // SSEAYP 49th — signal red field, yellow geometry, rounded heavy display.
  sseayp: {
    colors: {
      bg: '#d4171d',
      surface: '#a50f16',
      ink: '#fcf0e4',
      mutedInk: '#ffd9cf',
      accent: '#ffd21f',
      accent2: '#ffffff',
      border: 'rgb(252 240 228 / 0.28)',
      matte: '#d4171d',
      onAccent: '#a50f16',
    },
    fonts: {
      headingFont: "'Bowlby One', var(--font-montserrat), sans-serif", // TAN St Canard → Bowlby One
      subFont: 'var(--font-montserrat), sans-serif', // Gotham Black → Montserrat Black
      bodyFont: 'var(--font-montserrat), sans-serif', // Montserrat (original)
      scriptFont: 'var(--font-montserrat), sans-serif',
      monoFont: MONO,
    },
  },
  // Nhãn Quan Thế Kỷ — museum paper / espresso, DT Phudu headlines, Allison red script.
  'nhan-quan-the-ky': {
    colors: {
      bg: '#f4f1ea',
      surface: '#221c14',
      ink: '#1c1711',
      mutedInk: '#5b5246',
      accent: '#d2281e',
      accent2: '#f4f1ea',
      border: 'rgb(28 23 17 / 0.18)',
      matte: '#f4f1ea',
      onAccent: '#f4f1ea',
    },
    fonts: {
      headingFont: 'var(--font-phudu), sans-serif', // DT Phudu → Phudu
      subFont: 'var(--font-phudu), sans-serif',
      bodyFont: 'var(--font-montserrat), sans-serif', // Montserrat (original)
      scriptFont: 'var(--font-allison), cursive', // Allison (original)
      monoFont: MONO,
    },
  },
} satisfies Record<string, ThemeConfig>;

export type ThemeKey = keyof typeof themeConfig;

/** CSS variables for the edition wrapper. --ed-* stay as aliases for the stage components. */
export function portfolioVars(t: ThemeConfig): Record<string, string> {
  const { colors: c, fonts: f } = t;
  return {
    '--portfolio-bg': c.bg,
    '--portfolio-surface': c.surface,
    '--portfolio-ink': c.ink,
    '--portfolio-muted': c.mutedInk,
    '--portfolio-accent': c.accent,
    '--portfolio-accent-2': c.accent2,
    '--portfolio-border': c.border,
    '--portfolio-matte': c.matte,
    '--portfolio-on-accent': c.onAccent,
    '--portfolio-font-display': f.headingFont,
    '--portfolio-font-sub': f.subFont,
    '--portfolio-font-body': f.bodyFont,
    '--portfolio-font-script': f.scriptFont,
    '--portfolio-font-mono': f.monoFont,
    '--ed-bg': 'var(--portfolio-bg)',
    '--ed-surface': 'var(--portfolio-surface)',
    '--ed-ink': 'var(--portfolio-ink)',
    '--ed-ink-soft': 'var(--portfolio-muted)',
    '--ed-accent': 'var(--portfolio-accent)',
    '--ed-accent-2': 'var(--portfolio-accent-2)',
    '--ed-line': 'var(--portfolio-border)',
    '--ed-display': 'var(--portfolio-font-display)',
    '--ed-script': 'var(--portfolio-font-script)',
    '--edition-accent': 'var(--portfolio-accent)',
    // re-point the global type tokens inside the edition only
    '--font-sans': 'var(--portfolio-font-body)',
    '--font-editorial': 'var(--portfolio-font-body)',
    '--font-display': 'var(--portfolio-font-display)',
    '--font-serif': 'var(--portfolio-font-display)',
    '--font-mono': 'var(--portfolio-font-mono)',
  };
}
