// src/lib/seo/buildArticleLd.ts
/**
 * 🧠 buildArticleLd()
 * Génère un objet JSON-LD "BlogPosting" conforme Schema.org / Google.
 *
 * Complète buildFaqLd() et buildBreadcrumbLd() : c'est le schema qui déclare
 * l'auteur, les dates, l'éditeur et l'image principale — le cœur de l'E-E-A-T
 * pour un contenu vécu. À rendre côté serveur via <JsonLd data={...} />.
 *
 * Aligné sur les conventions du projet :
 *   - éditeur = PUBLISHER (seoConfig2025) → vrai logo android-chrome-512x512.png
 *   - absolutisation url/image identique à buildDestinationLd/buildBreadcrumbLd
 *   - inLanguage: 'fr-CA' comme buildGenericJsonLd
 *
 * Utilisation :
 *   const articleLd = buildArticleLd({
 *     headline: 'Voyage au Mexique (Yucatán) sans voiture…',
 *     description: 'Notre guide vécu…',
 *     url: '/blog/mexique-yucatan',          // relatif OK, absolutisé ici
 *     image: '/images/blog/mexique-yucatan.avif',
 *     datePublished: '2026-08-01T09:00:00-05:00',
 *     authorName: 'Mathieu',
 *     authorUrl: '/notre-mission',
 *   })
 */

import { SITE_URL, PUBLISHER } from './seoConfig2025';

export type ArticleLdInput = {
  headline: string;
  description?: string;
  /** Relatif ('/blog/x') ou absolu — absolutisé si besoin. */
  url: string;
  /** Relatif ('/images/x.avif') ou absolu — absolutisé si besoin. */
  image?: string;
  datePublished?: string;
  dateModified?: string;
  /** Nom d'un auteur réel (recommandé E-E-A-T). Absent → l'éditeur fait office d'auteur. */
  authorName?: string;
  /** Page bio (relatif ou absolu), ex. '/notre-mission'. */
  authorUrl?: string;
};

function sanitize(text: string) {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function absolutize(pathOrUrl: string): string {
  const v = (pathOrUrl || '').trim();
  if (!v) return SITE_URL;
  if (v.startsWith('http')) return v;
  return `${SITE_URL}${v.startsWith('/') ? '' : '/'}${v}`;
}

export function buildArticleLd(input: ArticleLdInput | null = null) {
  if (!input) return null;

  const headline = sanitize(input.headline || '');
  const url = absolutize(input.url || '');

  if (!headline || !input.url) return null;

  const publisher = {
    '@type': 'Organization',
    name: PUBLISHER.name,
    logo: { '@type': 'ImageObject', url: PUBLISHER.logo },
  };

  const author = input.authorName
    ? {
        '@type': 'Person',
        name: sanitize(input.authorName),
        ...(input.authorUrl ? { url: absolutize(input.authorUrl) } : {}),
      }
    : { '@type': 'Organization', name: PUBLISHER.name, url: SITE_URL };

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: headline.slice(0, 110),
    inLanguage: 'fr-CA',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author,
    publisher,
  };

  const description = input.description ? sanitize(input.description) : '';
  if (description) ld.description = description;

  if (input.image) ld.image = [absolutize(input.image)];
  if (input.datePublished) ld.datePublished = input.datePublished.trim();
  if (input.dateModified || input.datePublished) {
    ld.dateModified = (input.dateModified || input.datePublished || '').trim();
  }

  return ld;
}
