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
    instrumentationHook: true,
    // Désactiver temporairement pour debug
    esmExternals: false,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // ou liste spécifique
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    // Debug: afficher les informations de build
    if (dev && isServer) {
      console.log('🔍 [DEBUG] Configuration Webpack côté serveur...');
    }

    // Résolution des fallbacks pour éviter les erreurs "self is not defined"
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Fallbacks originaux
      fs: false,
      net: false,
      tls: false,
      // Nouveaux fallbacks pour résoudre l'erreur "self is not defined"
      self: false,
      window: false,
      document: false,
      navigator: false,
      location: false,
      // Autres fallbacks potentiels
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      events: false,
      path: false,
      querystring: false,
      url: false,
    };

    // Polyfills pour le côté serveur
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        self: false,
      };
    }

    // Ignorer les modules problématiques pendant le build côté serveur
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        // Remplacez ces noms par les vrais modules qui causent problème
        'mapbox-gl': 'mapbox-gl',
        'leaflet': 'leaflet',
        // Ajoutez d'autres modules si nécessaire
      });
    }

    // Module rules pour gérer les modules ESM problématiques
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Debug: intercepter les erreurs de module
    if (dev) {
      const originalResolve = config.resolve.plugins || [];
      config.resolve.plugins = [
        ...originalResolve,
        {
          apply: (resolver) => {
            resolver.hooks.resolve.tapAsync('DebugPlugin', (request, resolveContext, callback) => {
              if (request.request && request.request.includes('self')) {
                console.log('🚨 [DEBUG] Tentative de résolution de "self":', request.request);
              }
              callback();
            });
          },
        },
      ];
    }

    return config;
  },

  // Transpiler les packages problématiques
  transpilePackages: [
    // Packages courants qui causent des problèmes avec 'self'
    'uuid',
    'nanoid',
    'react-dnd',
    'react-dnd-html5-backend',
    'dnd-core',
    // Ajoutez d'autres packages si nécessaire
  ],

  // Configuration pour ignorer les avertissements spécifiques
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Configuration pour le build
  poweredByHeader: false,
  generateEtags: false,

  // Configuration pour les erreurs de build
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build (temporaire pour debug)
    ignoreBuildErrors: false,
  },

  eslint: {
    // Ignorer les erreurs ESLint pendant le build (temporaire pour debug)
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;