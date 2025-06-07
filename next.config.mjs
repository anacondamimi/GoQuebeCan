/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const csp = isDev
  ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: *; style-src 'self' 'unsafe-inline'; connect-src *; img-src * data: blob:;"
  : "default-src 'self'; script-src 'self' https://*.vercel.app https://*.supabase.co https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; connect-src *; img-src * data: blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self';";

const nextConfig = {
  reactStrictMode: true,
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
