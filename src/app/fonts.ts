import localFont from 'next/font/local';

/*
 * Swiss neo-grotesque system, self-hosted through next/font/local
 * (Google Fonts sources subset to Latin + Latin Extended + Vietnamese).
 *   Inter Tight  → --font-display (headings, hero titles)
 *   Be Vietnam Pro → --font-sans (body, navigation, micro-labels)
 * Korean (IBM Plex Sans KR) is loaded via fontsource in layout.tsx and swapped
 * in under html[lang='ko'] (globals.css).
 */
export const interTight = localFont({
  variable: '--font-intertight',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  src: [
    { path: '../fonts/InterTight_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/InterTight_400Regular_Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/InterTight_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/InterTight_600SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const beVietnam = localFont({
  variable: '--font-bevietnam',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  src: [
    { path: '../fonts/BeVietnamPro_300Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/BeVietnamPro_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/BeVietnamPro_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/BeVietnamPro_600SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const fontVariables = [interTight, beVietnam].map((f) => f.variable).join(' ');
