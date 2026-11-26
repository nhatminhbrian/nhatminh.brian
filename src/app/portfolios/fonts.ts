import localFont from 'next/font/local';

/*
 * Native-matched faces for the portfolio editions (Vietnamese-safe, self-hosted from
 * the Google Fonts sources). Fonts embedded in the PDFs (pdffonts):
 *   Project - PP Neue Machina, League Spartan, Canva Sans, Blowing
 *   SSEAYP  - TAN St Canard, Montserrat, Gotham Black
 *   NQTK    - DT Phudu, Allison, Montserrat
 * League Spartan, Montserrat, Phudu and Allison are the originals; the commercial
 * faces are matched in themes.ts (Archivo Expanded, Bowlby One, Ephesis).
 */
export const leagueSpartan = localFont({
  variable: '--font-leaguespartan',
  display: 'swap',
  preload: false,
  src: [
    { path: '../../fonts/portfolio/LeagueSpartan_700Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../fonts/portfolio/LeagueSpartan_800ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
});

export const montserrat = localFont({
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
  src: [
    { path: '../../fonts/portfolio/Montserrat_400Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/portfolio/Montserrat_400Regular_Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../fonts/portfolio/Montserrat_600SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../fonts/portfolio/Montserrat_700Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../fonts/portfolio/Montserrat_900Black.woff2', weight: '900', style: 'normal' },
  ],
});

export const phudu = localFont({
  variable: '--font-phudu',
  display: 'swap',
  preload: false,
  src: [
    { path: '../../fonts/portfolio/Phudu_700Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../fonts/portfolio/Phudu_900Black.woff2', weight: '900', style: 'normal' },
  ],
});

export const allison = localFont({
  variable: '--font-allison',
  display: 'swap',
  preload: false,
  src: [{ path: '../../fonts/portfolio/Allison_400Regular.woff2', weight: '400', style: 'normal' }],
});

export const portfolioFontVariables = [leagueSpartan, montserrat, phudu, allison].map((f) => f.variable).join(' ');
