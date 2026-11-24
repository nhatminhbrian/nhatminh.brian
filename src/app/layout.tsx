import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LiveBackground } from '@/components/LiveBackground';
// Self-hosted variable fonts (Vietnamese subsets included) — no build-time network fetch
import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/inter-tight/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nhatminh-brian.vercel.app'),
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
    <html lang="vi" className="antialiased">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ice-100 focus:px-4 focus:py-2 focus:text-night-950"
        >
          Skip to content
        </a>
        <LiveBackground />
        <div aria-hidden className="grain" />
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main id="main" className="pt-14">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
