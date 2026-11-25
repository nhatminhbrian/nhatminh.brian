import localFont from 'next/font/local';

/*
 * European editorial & museum-archive pairing, self-hosted through next/font/local
 * (subset to Latin + Latin Extended + Vietnamese from the Google Fonts sources).
 * Schibsted Grotesk ships no Vietnamese glyphs, so Be Vietnam Pro takes over the
 * UI sans when the interface language is Vietnamese (see globals.css).
 */
export const fraunces = localFont({
  variable: '--font-fraunces',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  src: [
    { path: '../fonts/Fraunces_300Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/Fraunces_300Light_Italic.woff2', weight: '300', style: 'italic' },
    { path: '../fonts/Fraunces_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Fraunces_400Regular_Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/Fraunces_600SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/Fraunces_600SemiBold_Italic.woff2', weight: '600', style: 'italic' },
  ],
});

export const schibsted = localFont({
  variable: '--font-schibsted',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  src: [
    { path: '../fonts/SchibstedGrotesk_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/SchibstedGrotesk_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/SchibstedGrotesk_600SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const beVietnam = localFont({
  variable: '--font-bevietnam',
  display: 'swap',
  preload: false,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  src: [
    { path: '../fonts/BeVietnamPro_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/BeVietnamPro_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/BeVietnamPro_600SemiBold.woff2', weight: '600', style: 'normal' },
  ],
});

export const spectral = localFont({
  variable: '--font-spectral',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
  src: [
    { path: '../fonts/Spectral_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Spectral_400Regular_Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/Spectral_500Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Spectral_500Medium_Italic.woff2', weight: '500', style: 'italic' },
  ],
});

export const spaceMono = localFont({
  variable: '--font-spacemono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
  src: [
    { path: '../fonts/SpaceMono_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/SpaceMono_700Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fontVariables = [fraunces, schibsted, beVietnam, spectral, spaceMono].map((f) => f.variable).join(' ');
