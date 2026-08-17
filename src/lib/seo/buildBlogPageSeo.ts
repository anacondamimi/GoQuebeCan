// src/lib/seo/buildBlogPageSeo.ts
//
// 🎯 Source UNIQUE de vérité SEO pour une page d'article de blog.
//
// Tu décris l'article une seule fois (titre, description, image, dates, FAQ…)
// et ce helper dérive d'un coup :
//   - metadata      → balises <meta> (via buildMetadata2025)
//   - breadcrumbLd  → JSON-LD BreadcrumbList
//   - articleLd     → JSON-LD BlogPosting (E-E-A-T : auteur, dates, éditeur)
//   - faqLd         → JSON-LD FAQPage (ou null si pas de FAQ)
//   - publishedTime / modifiedTime → pour <HeadExtras>
//
// Tous les chemins se passent en RELATIF : chaque builder absolutise lui-même
// (même convention que buildBreadcrumbLd / buildDestinationLd / buildArticleLd).
//
// Fini la duplication : meta-description et schema Article ne peuvent plus
// se désynchroniser, puisqu'ils sortent du même objet.

import type { Metadata } from 'next';
import { buildMetadata2025 } from './buildMetadata2025';
import { buildBreadcrumbLd } from './buildBreadcrumbLd';
import { buildFaqLd, type FaqEntry } from './buildFaqLd';
import { buildArticleLd } from './buildArticleLd';

// Auteur par défaut du site. Surchargeable par article.
const DEFAULT_AUTHOR_NAME = 'Mathieu';
const DEFAULT_AUTHOR_URL = '/notre-mission';

export type BlogPageSeoInput = {
  /** Titre <meta>/<title> complet (avec suffixe marque si voulu). */
  metaTitle: string;
  /** Headline du schema Article — plus court, sans suffixe marque. Défaut = metaTitle. */
  headline?: string;
  description: string;
  /** Description courte dédiée au schema Article. Défaut = description. */
  articleDescription?: string;
  /** Chemin relatif, ex. '/blog/mexique-yucatan'. */
  canonical: string;
  /** Chemin relatif, ex. '/images/blog/mexique-yucatan.avif'. */
  image: string;
  keywords?: string[];
  /** ISO 8601, ex. '2026-08-01T09:00:00-05:00'. */
  datePublished: string;
  /** Défaut = datePublished. */
  dateModified?: string;
  /** Fil d'Ariane en chemins relatifs. */
  breadcrumb: { name: string; item: string }[];
  /** Questions/réponses de l'article. Omis → pas de FAQ schema. */
  faq?: FaqEntry[];
  /** Surcharges d'auteur si un article a une signature différente. */
  authorName?: string;
  authorUrl?: string;
  noIndex?: boolean;
};

export type BlogPageSeo = {
  metadata: Metadata;
  breadcrumbLd: ReturnType<typeof buildBreadcrumbLd>;
  articleLd: ReturnType<typeof buildArticleLd>;
  faqLd: ReturnType<typeof buildFaqLd>;
  publishedTime: string;
  modifiedTime: string;
};

export function buildBlogPageSeo(input: BlogPageSeoInput): BlogPageSeo {
  const modified = input.dateModified || input.datePublished;

  const metadata = buildMetadata2025({
    title: input.metaTitle,
    description: input.description,
    canonical: input.canonical, // buildMetadata2025 attend le relatif
    image: input.image,
    keywords: input.keywords || [],
    noIndex: input.noIndex ?? false,
    type: 'article',
  });

  const breadcrumbLd = buildBreadcrumbLd(input.breadcrumb);

  const articleLd = buildArticleLd({
    headline: input.headline || input.metaTitle,
    description: input.articleDescription || input.description,
    url: input.canonical, // relatif → buildArticleLd absolutise
    image: input.image, // relatif → buildArticleLd absolutise
    datePublished: input.datePublished,
    dateModified: modified,
    authorName: input.authorName ?? DEFAULT_AUTHOR_NAME,
    authorUrl: input.authorUrl ?? DEFAULT_AUTHOR_URL,
  });

  const faqLd = input.faq && input.faq.length ? buildFaqLd(input.faq) : null;

  return {
    metadata,
    breadcrumbLd,
    articleLd,
    faqLd,
    publishedTime: input.datePublished,
    modifiedTime: modified,
  };
}
