// src/lib/seo/buildGenericJsonLd.ts (ou seoConfig2025.tsx, même contenu)

/**
 * 🌐 JSON-LD BUILDER — VERSION 2025
 * Supporte : Destination, Guide (HowTo), Article, FAQ
 */

export function buildGenericJsonLd({
  type, // 'destination' | 'guide' | 'article'
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
  steps?: (string | { name: string; text: string })[]; // ✅ string OU objet
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

  // ✅ FIL D’ARIANE (breadcrumb universel)
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://goquebecan.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://goquebecan.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: canonical,
      },
    ],
  });

  // 🗺️ DESTINATION — TouristDestination
  if (type === 'destination') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: title,
      description,
      url: canonical,
      image: [image],
      geo: latitude && longitude ? { '@type': 'GeoCoordinates', latitude, longitude } : undefined,
      containsPlace:
        places && places.length > 0
          ? places.map((p) => ({ '@type': 'Place', name: p }))
          : undefined,
      touristType: ['Famille', 'Plein air', 'Gastronomie', 'Bien-être'],
    });
  }

  // 🧭 GUIDE — HowTo (avec normalisation des steps)
  if (type === 'guide' && steps.length > 0) {
    const normalizedSteps = steps.map((s, i) =>
      typeof s === 'string'
        ? {
            '@type': 'HowToStep',
            position: i + 1,
            name: s,
            text: s,
          }
        : {
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.text,
          },
    );

    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: title,
      description,
      step: normalizedSteps,
    });
  }

  // 💬 FAQ — FAQPage
  if (faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  // 📰 ARTICLE — structure principale
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'fr-CA',
    image: [image],
    datePublished: published,
    dateModified: modified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    author:
      typeof author === 'string'
        ? {
            '@type': 'Organization',
            name: author,
            url: 'https://goquebecan.com',
          }
        : author,
    publisher: {
      '@type': 'Organization',
      name: 'GoQuébeCAN',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goquebecan.com/images/logo-og-512.png',
      },
    },
  });

  return jsonLd;
}
