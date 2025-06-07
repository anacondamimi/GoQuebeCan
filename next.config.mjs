/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const csp = `
  default-src 'self';
  connect-src 'self'
    https://m.media-amazon.com
    https://www.amazon.ca
    https://cf.bstatic.com
    https://www.getyourguide.com
    https://images.unsplash.com
    https://widgets.skyscanner.net
    https://www.amazon.com
    https://chargehub.com
    https://abetterrouteplanner.com
    https://apps.apple.com
    https://play.google.com
    https://sovrn.co
    https://www.w3.org
    https://cdn-icons-png.flaticon.com
    https://api.mapbox.com
    https://turo.com
    https://connect.facebook.net
    https://goquebecan.com
    https://facebook.com
    https://twitter.com
    https://instagram.com
    https://localhost:3000
    https://localhost:3001
    https://192.168.2.170:3008
    https://www.wasagabeach.com
    https://www.croisieres-aml.com
    https://www.pc.gc.ca
    https://www.destinationsherbrooke.com
    https://tourismesetpiles.ca
    https://www.saublebeach.com
    https://www.ontarioparks.com
    https://www.tourisme-monteregie.qc.ca
    https://www.portdover.ca
    https://villeport-cartier.com
    https://www.tourisme-charlevoix.com
    https://www.croisieresgaspe.ca
    https://www.sepaq.com
    https://geoparcdeperce.com
    https://www.quebec-cite.com
    https://www.locationvelos.com
    https://www.tourisme.iledorleans.com
    https://www.mtl.org
    https://www.lemassif.com
    https://www.nunavikparks.ca
    https://www.airinuit.com
    https://www.tourisme-kamouraska.com
    https://www.grandbend.com
    https://www.decrochezcommejamais.com
    https://carletonsurmer.com
    https://www.canyonportesenfer.qc.ca
    https://www.skibromont.com;
  script-src 'self' https://www.googletagmanager.com;
  frame-src https://www.youtube.com https://player.vimeo.com;
  style-src 'self' 'unsafe-inline';
  img-src * data: blob:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
`.replace(/\n/g, '');



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
