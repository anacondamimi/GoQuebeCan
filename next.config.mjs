/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://connect.facebook.net https://www.googletagmanager.com https://cdn.jsdelivr.net;
  frame-src https://www.youtube.com https://player.vimeo.com;
  connect-src 'self' https://api.unsplash.com https://unsplash.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://api.mapbox.com;
  style-src 'self' 'unsafe-inline';
  img-src * data: blob:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
`
  .replace(/\n/g, ' ')
  .replace(/\s{2,}/g, ' ');

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,

  experimental: {
    serverComponentsExternalPackages: ['unsplash-js'],
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'a.impactradius-go.com' },
      { protocol: 'https', hostname: 'frenchbeefr.pxf.io' },
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
