/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://connect.facebook.net https://www.googletagmanager.com https://cdn.jsdelivr.net;
  frame-src https://www.youtube.com https://player.vimeo.com;
  connect-src 'self' https://www.googletagmanager.com https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  img-src * data: blob:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
`.replace(/\n/g, '').replace(/\s{2,}/g, ' ');

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    domains: [
      'img.youtube.com',
      'images.unsplash.com',
      'm.media-amazon.com',
      'cf.bstatic.com',
      'a0.muscache.com',
      'res.cloudinary.com',
      'goquebecan.vercel.app',
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
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
