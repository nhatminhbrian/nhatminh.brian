import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Suspense } from 'react';
import { AmbientBackdrop } from '@/components/AmbientBackdrop';
import { MarginaliaRails } from '@/components/MarginaliaRails';
import { LanguageProvider } from '@/components/i18n/LanguageProvider';
import { fontVariables } from './fonts';
import '@fontsource/ephesis/400.css';
// Korean editorial faces (self-hosted, unicode-range sliced — only fetched when Hangul renders)
import '@fontsource/ibm-plex-sans-kr/400.css';
import '@fontsource/ibm-plex-sans-kr/500.css';
import '@fontsource/ibm-plex-sans-kr/600.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nhatminhbrian.vercel.app'),
  title: {
    default: 'Brian · Nguyễn Nhật Minh — @_wandergraph_',
    template: '%s — Brian',
  },
  description:
    'Portfolio of Brian (Nguyễn Nhật Minh), International Economics student at the Diplomatic Academy of Viet Nam and visual storyteller behind @_wandergraph_.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Brian · @_wandergraph_',
    images: [{ url: '/media/portrait/portrait-intro.webp' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#070D14',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${fontVariables} antialiased`}>
      <body>
        <LanguageProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ice-100 focus:px-4 focus:py-2 focus:text-night-950"
        >
          Skip to content
        </a>
        <AmbientBackdrop />
        <Suspense fallback={null}><MarginaliaRails /></Suspense>
        <div aria-hidden className="grain" />
        <SiteHeader />
        <div className="page-canvas relative z-10 rounded-t-2xl md:rounded-t-3xl">
          <main id="main" className="pt-14">
          {children}
        </main>
        <SiteFooter />
        </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
