import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/anton/400.css';
import '@fontsource/ephesis/400.css';
import '@fontsource/bowlby-one/400.css';
import type { ReactNode } from 'react';

/** Edition typefaces load only under /portfolios. */
export default function PortfoliosLayout({ children }: { children: ReactNode }) {
  return children;
}
