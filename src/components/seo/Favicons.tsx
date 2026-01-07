// src/components/seo/Favicons.tsx
// ✅ Remplace l'ancien composant <Head> par un objet réutilisable pour la Metadata API

import type { Metadata } from 'next';

export const FAVICON_METADATA: Partial<Metadata> = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      // fallback "any"
      { url: '/favicon.png', rel: 'icon', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    // Note: Next ne supporte pas l'attribut "color" sur mask-icon via Metadata API.
    // Pour conserver une couleur, mets-la directement DANS le SVG (fill) de /safari-pinned-tab.svg.
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }],
  },
  manifest: '/site.webmanifest',

  // msapplication-TileColor n’existe pas en champ typé — on l’injecte via "other" (meta name)
  other: {
    'msapplication-TileColor': '#0f3d36',
  },
};
export const viewport = {
  themeColor: '#38b6ff',
};

// Optionnel : export nommé pour cohérence avec tes imports existants
export { FAVICON_METADATA as Favicons };
