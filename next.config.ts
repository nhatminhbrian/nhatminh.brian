import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    deviceSizes: [384, 640, 828, 1080, 1280, 1600, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // old collection URLs → their new folder (or the archive)
  async redirects() {
    return [
      { source: '/gallery/sseayp', destination: '/gallery/sseayp-49-le-ra-quan', permanent: true },
      { source: '/gallery/doan-thanh-nien-hvng', destination: '/gallery/doan-thanh-nien-the-cradle', permanent: true },
      { source: '/gallery/street-heritage', destination: '/gallery/long-bien-footprints-of-time', permanent: true },
      { source: '/gallery/concept-studio', destination: '/gallery/luminescent-red-sun', permanent: true },
      { source: '/gallery/youth-events', destination: '/gallery/school-stage-concerts', permanent: true },
      { source: '/gallery/:slug(khoa-kinh-te-quoc-te|sac-lam-tan-thoi|pich-xo)', destination: '/gallery', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/pdf/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
