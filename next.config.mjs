// next.config.mjs
/** @type {import('next').NextConfig} */

const CONTENT_SECURITY_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://creator.expediagroup.com https://www.google.com https://connect.facebook.net https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https: http: https://*.basemaps.cartocdn.com;
  connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://*.mapbox.com https://router.project-osrm.org https://*.basemaps.cartocdn.com https://creator.expediagroup.com https://*.expediagroup.com https://*.expedia.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://recaptcha.google.com https://www.facebook.com https://connect.facebook.net https://*.supabase.co https://hbjqefbnjpgfxxqifvcu.supabase.co;
  font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
  frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.google.com https://recaptcha.google.com;
  media-src 'self' data: blob: https: http:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
`
  .replace(/[\r\n\t]+/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), fullscreen=(self)',
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

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'goquebecan.com' },
      { protocol: 'https', hostname: 'www.goquebecan.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },

      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },

      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },

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

      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'amazon.ca' },
      { protocol: 'https', hostname: 'amazon.com' },
      { protocol: 'https', hostname: 'amazonaws.com' },
    ],
  },

  experimental: {
    optimizeCss: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

 async redirects() {
  return [
    // 🔹 Canonical domain (très important SEO)


    // 🔹 Redirections SEO internes
    {
      source: '/vr',
      destination: '/blog/location-vr',
      permanent: true,
    },
    
    {
      source: '/carte-interactive',
      destination: '/planificateur',
      permanent: true,
    },

    // 🔹 Anciennes routes → nouvelles
    {
      source: '/voyage/hotel',
      destination: '/blog/voyage-hotel',
      permanent: true,
    },
    {
      source: '/voyage/avion',
      destination: '/blog/voyage-avion',
      permanent: true,
    },
    {
      source: '/voyage/voiture-electrique',
      destination: '/blog/voyage-voiture',
      permanent: true,
    },

    // 🔹 Contenu SEO
    {
      source: '/objets-indispensables/camping',
      destination: '/blog/voyage-camping',
      permanent: true,
    },

    // 🔹 Blog erreurs détectées
    {
      source: '/blog/gaspe',
      destination: '/blog/gaspesie',
      permanent: true,
    },
    {
      source: '/blog/parc-national-forillon',
      destination: '/blog/forillon',
      permanent: true,
    },
  ];
},

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
