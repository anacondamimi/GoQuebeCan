import type { BlogMetaSEO } from '@/components/lib/types/blog';

export const blogMetaSEOPatch: Record<string, BlogMetaSEO> = {
  // Exemple concret (à dupliquer/adapter)
  'anse-saint-jean': {
    keywords: ['Anse-Saint-Jean', 'Fjord du Saguenay', 'randonnée', 'kayak', 'Québec'],
    publishedTime: '2025-06-26T10:00:00.000Z',
    modifiedTime: '2025-07-01T18:30:00.000Z',
    locale: 'fr_CA',
  },

  // 'autre-slug': {
  //   keywords: ['mot', 'clé'],
  //   publishedTime: '2025-07-10T09:00:00.000Z',
  //   modifiedTime: '2025-07-12T15:30:00.000Z',
  //   locale: 'fr_CA',
  // },
};
