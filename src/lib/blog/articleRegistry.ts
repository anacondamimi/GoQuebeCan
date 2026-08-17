// src/lib/blog/articleRegistry.ts
//
// Source unique de vérité "quels slugs de blog sont des articles valides
// pouvant être recommandés/liés" (chatbot, etc.) — distincte du ROUTING.
//
// - componentMap.ts / BLOG_SLUGS : slugs servis par la route dynamique
//   app/blog/[slug]/page.tsx (routing).
// - DEDICATED_BLOG_SLUGS ci-dessous : slugs qui ont leur propre
//   app/blog/<slug>/page.tsx (metadata/JSON-LD sur mesure), donc absents
//   de componentMap.ts pour éviter la collision de build.
//
// ALL_BLOG_SLUGS = union des deux. C'est cette liste que le chatbot doit
// utiliser pour valider/recommander un article, jamais componentMap seul.
import { BLOG_SLUGS as ROUTED_BLOG_SLUGS } from './componentMap';

/**
 * Ajouter ici un slug quand tu crées un app/blog/<slug>/page.tsx dédié
 * (au lieu d'ajouter le slug dans componentMap.ts).
 */
export const DEDICATED_BLOG_SLUGS = [
  'mexique-yucatan',
  'reserver-voyage-sud-soi-meme',
  'argent-cartes-voyage',
  'vpn-esim-voyage',
  'valise-mexique',
  'sandbanks',
  'points-aeroplan-amex-cobalt',
] as const;

export const ALL_BLOG_SLUGS = Object.freeze([...ROUTED_BLOG_SLUGS, ...DEDICATED_BLOG_SLUGS]);

export type AnyBlogSlug = (typeof ALL_BLOG_SLUGS)[number];
