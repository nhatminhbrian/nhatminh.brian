import localFont from 'next/font/local';

/*
 * Swiss neo-grotesque system, self-hosted through next/font/local
 * (Google Fonts sources subset to Latin + Latin Extended + Vietnamese).
 *   Newsreader → --font-display (monograph serif, light/regular only)
 *   Archivo Expanded stays loaded for the Project Portfolio edition (layout.tsx)
 *   Cormorant Garamond  → --font-serif-italic (hover morphs, pull-quotes)
 *   Be Vietnam Pro → --font-sans (body, navigation, micro-labels)
 * Korean (IBM Plex Sans KR) is loaded via fontsource in layout.tsx and swapped
 * in under html[lang='ko'] (globals.css).
 */
export const newsreader = localFont({
  variable: '--font-newsreader',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  src: [
    { path: '../fonts/Newsreader_300Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/Newsreader_300Light_Italic.woff2', weight: '300', style: 'italic' },
    { path: '../fonts/Newsreader_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Newsreader_400Regular_Italic.woff2', weight: '400', style: 'italic' },
  ],
});

export const cormorant = localFont({
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
  src: [
    { path: '../fonts/CormorantGaramond_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/CormorantGaramond_400Regular_Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/CormorantGaramond_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/CormorantGaramond_500Medium_Italic.woff2', weight: '500', style: 'italic' },
    { path: '../fonts/CormorantGaramond_600SemiBold_Italic.woff2', weight: '600', style: 'italic' },
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

export const fontVariables = [newsreader, cormorant, beVietnam].map((f) => f.variable).join(' ');
