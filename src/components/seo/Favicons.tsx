// src/components/seo/Favicons.tsx
import type { Metadata } from 'next';

export const FAVICON_METADATA: Partial<Metadata> = {
  icons: {
    icon: [
      // ✅ Favicon principal pour Google
      { url: '/favicon.ico', sizes: 'any' },

      // PNG standards
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },

      // Android / Chrome
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],

    // iOS
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',
};
