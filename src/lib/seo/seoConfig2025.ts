/**
 * 🌐 GoQuébeCan — SEO MASTER 2025 (Server-safe)
 * Next.js 16+ — Types sûrs sans JSX
 */

import type { Metadata } from 'next';

/* ==========================
   CONSTANTES GLOBALES
   ========================== */
export const SITE_URL = 'https://goquebecan.com';
export const SITE_NAME = 'GoQuébeCan';
export const DEFAULT_LOCALE = 'fr_CA';

export const PUBLISHER = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-og-512.png`,
  sameAs: [
    'https://www.youtube.com/@GoQuebecan',
    'https://www.facebook.com/GoQuebecan',
    'https://www.instagram.com/goquebecan/',
  ],
} as const;

/* ==========================
   TYPES OG + FONCTIONS SEO
   ========================== */
export type AllowedOgType =
  | 'website'
  | 'article'
  | 'profile'
  | 'book'
  | 'music.song'
  | 'video.movie'
  | 'video.episode'; // ✅ plus de "product"

const ALLOWED_OG_TYPES: AllowedOgType[] = [
  'website',
  'article',
  'profile',
  'book',
  'music.song',
  'video.movie',
  'video.episode',
];

/**
 * Génère le Metadata complet (Next.js)
 */
export function buildMetadata2025({
  title,
  description,
  canonical,
  image,
  keywords = [],
  noIndex = false,
  type = 'article',
}: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: string;
}): Metadata {
  const robots = noIndex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1';

  const ogType: AllowedOgType = ALLOWED_OG_TYPES.includes(type as AllowedOgType)
    ? (type as AllowedOgType)
    : 'article';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: { 'fr-CA': canonical },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: DEFAULT_LOCALE,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(SITE_URL),
    other: { robots },
  };
}

/* ==========================
   JSON-LD BUILDERS
   ========================== */
export function buildGenericJsonLd({
  type,
  title,
  description,
  canonical,
  image,
  published,
  modified,
  faq = [],
  steps = [],
  places = [],
  latitude,
  longitude,
  author = 'GoQuébeCAN',
}: {
  type: 'destination' | 'guide' | 'article';
  title: string;
  description: string;
  canonical: string;
  image: string;
  published: string;
  modified: string;
  faq?: { question: string; answer: string }[];
  steps?: string[];
  places?: string[];
  latitude?: number;
  longitude?: number;
  author?:
    | string
    | {
        '@type': 'Person' | 'Organization';
        name: string;
        url?: string;
      };
}) {
  const jsonLd: Record<string, any>[] = [];

  // Fil d’Ariane
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: canonical },
    ],
  });

  // TouristDestination
  if (type === 'destination') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: title,
      description,
      url: canonical,
      image: [image],
      geo: latitude && longitude ? { '@type': 'GeoCoordinates', latitude, longitude } : undefined,
      containsPlace: places?.length
        ? places.map((p) => ({ '@type': 'Place', name: p }))
        : undefined,
      touristType: ['Famille', 'Plein air', 'Gastronomie', 'Bien-être'],
    });
  }

  // HowTo
  if (type === 'guide' && steps.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: title,
      description,
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s,
      })),
    });
  }

  // FAQ
  if (faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  // Article
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'fr-CA',
    image: [image],
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    author:
      typeof author === 'string'
        ? { '@type': 'Organization', name: author, url: SITE_URL }
        : author,
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER.name,
      logo: { '@type': 'ImageObject', url: PUBLISHER.logo },
    },
  });

  return jsonLd;
}
