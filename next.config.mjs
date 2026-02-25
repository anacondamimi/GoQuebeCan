// next.config.mjs
// Configuration Next.js 14.2.30 — GoQuébeCan
// ⚙️ Optimisée pour Windows + SEO + sécurité + performance 2025

/** @type {import('next').NextConfig} */

// 🛡️ Content Security Policy
const CONTENT_SECURITY_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://creator.expediagroup.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src * blob: data: https://creator.expediagroup.com https://*.expediagroup.com https://*.expedia.com;
 connect-src 'self' https://creator.expediagroup.com https://*.expediagroup.com https://*.expedia.com https://www.google-analytics.com https://www.googletagmanager.com;
  frame-src https://www.youtube.com https://player.vimeo.com;
  media-src *;
  object-src 'none';
  base-uri 'self';
`
  .replace(/\s{2,}/g, ' ')
  .trim();

// 🔐 Headers globaux de sécurité
const securityHeaders = [
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), fullscreen=(self)',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // 🖼️ Images externes autorisées (YouTube, Amazon, Booking, etc.)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    remotePatterns: [
      // 🌐 GoQuébeCan & Cloudinary
      { protocol: 'https', hostname: 'goquebecan.com' },
      { protocol: 'https', hostname: 'www.goquebecan.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },

      // 🎥 YouTube
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },

      // 🖼️ Banques d’images / Google
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },

      // 🏨 Booking / Expedia / Viator / Outgo
      { protocol: 'https', hostname: 'booking.com' },
      { protocol: 'https', hostname: 'cf.bstatic.com' },
      { protocol: 'https', hostname: 'r-xx.bstatic.com' },
      { protocol: 'https', hostname: 'expedia.ca' },
      { protocol: 'https', hostname: 'images.trvl-media.com' },
      { protocol: 'https', hostname: 'viator.com' },
      { protocol: 'https', hostname: 'media.tacdn.com' },
      { protocol: 'https', hostname: 'outdoorsy.com' },
      { protocol: 'https', hostname: 'rvezy.com' },
      { protocol: 'https', hostname: 'authentikcanada.com' },

      // 🛍️ Amazon (Canada et global)
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'amazon.ca' },
      { protocol: 'https', hostname: 'amazon.com' },
      { protocol: 'https', hostname: 'amazonaws.com' },
    ],
  },

  // ⚙️ Optimisations internes
  experimental: {
    optimizeCss: true,
  },

  // 🧹 Build propre
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 🔁 Redirection canonique (www → sans www)
  // async redirects() {
  // return [
  //   {
  //     source: '/:path*',
  //    has: [{ type: 'host', value: 'www.goquebecan.com' }],
  //    destination: 'https://goquebecan.com/:path*',
  //    permanent: true,
  //  },
  // ];
  // },
  async redirects() {
    return [{ source: '/vr', destination: '/blog/location-vr', permanent: true }];
  },

  // 🔒 Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
