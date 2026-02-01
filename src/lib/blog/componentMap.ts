// components/blogpost/componentMap.ts
// ✅ Single source of truth for blog article slugs + lazy loaders
import type { ComponentType } from 'react';

/**
 * Map <slug> -> dynamic import for its TSX component.
 * Only add a new entry when you create a new BlogArticle*.tsx file.
 * Sitemap, dynamic routes, and listings will auto‑update from BLOG_SLUGS.
 */
const componentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  'anse-saint-jean': () => import('@/components/blogpost/BlogArticleAnseSaintJean'),
  'baie-saint-paul': () => import('@/components/blogpost/BlogArticleBaieSaintPaul'),
  bic: () => import('@/components/blogpost/BlogArticleBic'),
  'bromont-granby': () => import('@/components/blogpost/BlogArticleBromontGranby'),
  canyon: () => import('@/components/blogpost/BlogArticleCanyon'),
  carleton: () => import('@/components/blogpost/BlogArticleCarleton'),
  'eeyou-istchee': () => import('@/components/blogpost/BlogArticleEeyouIstchee'),
  forillon: () => import('@/components/blogpost/BlogArticleForillon'),
  gaspesie: () => import('@/components/blogpost/BlogArticleGaspesie'),
  'grand-bend': () => import('@/components/blogpost/BlogArticleGrandBend'),
  'hautes-gorges': () => import('@/components/blogpost/BlogArticleHautesGorges'),
  kamouraska: () => import('@/components/blogpost/BlogArticleKamouraska'),
  kuururjuaq: () => import('@/components/blogpost/BlogArticleKuururjuaq'),
  levis: () => import('@/components/blogpost/BlogArticleLevis'),
  'location-vr': () => import('@/components/blogpost/BlogArticleLocationVR'),
  massif: () => import('@/components/blogpost/BlogArticleMassif'),
  mingan: () => import('@/components/blogpost/BlogArticleMingan'),
  montmorency: () => import('@/components/blogpost/BlogArticleMontmorency'),
  montreal: () => import('@/components/blogpost/BlogArticleMontreal'),
  saguenay: () => import('@/components/blogpost/BlogArticleSaguenay'),
  orleans: () => import('@/components/blogpost/BlogArticleOrleans'),
  'parc-aquatique': () => import('@/components/blogpost/BlogArticleParcAquatique'),
  perce: () => import('@/components/blogpost/BlogArticlePerce'),
  'port-au-persil': () => import('@/components/blogpost/BlogArticlePortAuPersil'),
  'port-cartier': () => import('@/components/blogpost/BlogArticlePortCartier'),
  'port-dover': () => import('@/components/blogpost/BlogArticlePortDover'),
  quebec: () => import('@/components/blogpost/BlogArticleQuebec'),
  'riviere-du-loup': () => import('@/components/blogpost/BlogArticleRiviereduLoup'),
  sabrevois: () => import('@/components/blogpost/BlogArticleSabrevois'),
  sandbanks: () => import('@/components/blogpost/BlogArticleSandbanks'),
  'wasaga-beach': () => import('@/components/blogpost/BlogArticleWasagaBeach'),
  'magog-orford': () => import('@/components/blogpost/BlogArticleMagogOrford'),
  'sauble-beach': () => import('@/components/blogpost/BlogArticleSaubleBeach'),
  'sept-iles': () => import('@/components/blogpost/BlogArticleSeptIles'),
  sherbrooke: () => import('@/components/blogpost/BlogArticleSherbrooke'),
  'singing-sands': () => import('@/components/blogpost/BlogArticleSingingSands'),
  tadoussac: () => import('@/components/blogpost/BlogArticleTadoussac'),
  'voyage-avion': () => import('@/components/blogpost/BlogArticleVoyageAvion'),
  'voyage-camping': () => import('@/components/blogpost/BlogArticleVoyageCamping'),
  'voyage-hotel': () => import('@/components/blogpost/BlogArticleVoyageHotel'),
  'voyage-voiture': () => import('@/components/blogpost/BlogArticleVoyageVoiture'),
};

/** Export typed list of slugs so everything (sitemap, routes) stays in sync. */
export const BLOG_SLUGS = Object.freeze(Object.keys(componentMap)) as readonly string[];
export type BlogSlug = (typeof BLOG_SLUGS)[number];

export default componentMap;
