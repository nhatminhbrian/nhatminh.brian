'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const EDITIONS = new Set(['sseayp', 'project', 'nhan-quan-the-ky']);

/**
 * Pathname-driven edition flag on <html>. Next keeps previously visited routes
 * mounted (hidden) so DOM-based `:has(article[data-edition])` selectors leak
 * paper styling onto other routes. This flag is set only while the current
 * route is an edition and is always cleared on unmount / route change, so the
 * global Nocturnal Steel (#070D14) theme is restored everywhere else.
 */
export function RouteTheme() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const m = /^\/portfolios\/([^/]+)\/?$/.exec(pathname);
    if (m && EDITIONS.has(m[1])) root.dataset.routeEdition = m[1];
    else delete root.dataset.routeEdition;
    return () => { delete root.dataset.routeEdition; };
  }, [pathname]);
  return null;
}
