// lib/seo/seoToMetadata.ts
import type { Metadata } from 'next';

export type SEOInput = {
  title: string;
  description: string;
  /** URL absolue (https://...) OU chemin commençant par / */
  url: string;
  /** URL absolue OU chemin relatif de l'image OG */
  image?: string;
  keywords?: string | string[];
  type?: 'website' | 'article';
  author?: { name: string; url?: string } | string;
  publishedTime?: string; // ISO
  modifiedTime?: string; // ISO
  siteName?: string; // ex: "GoQuébeCan"
  locale?: string; // ex: "fr_CA"
  twitterSite?: string; // ex: "@goquebecan"
  twitterCreator?: string; // ex: "@mathieu"
  /** { 'fr-CA': 'https://.../fr', 'en-CA': 'https://.../en' } */
  languageAlternates?: Record<string, string>;
};

/** Normalise un tableau de mots-clés conforme au type Next */
function toKeywords(k?: string | string[]): Metadata['keywords'] {
  if (!k) return undefined;
  return Array.isArray(k) ? k : [k];
}

/** Convertit auteur(s) vers le type Metadata.authors */
function toAuthors(author?: SEOInput['author']): NonNullable<Metadata['authors']> | undefined {
  if (!author) return undefined;
  if (typeof author === 'string') return [{ name: author }];
  return [author];
}

/** Récupère l'URL de base du site depuis l'ENV (fallback vers prod) */
function getSiteBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://goquebecan.com';
  try {
    return new URL(raw);
  } catch {
    return new URL('https://goquebecan.com');
  }
}

/** Retourne une URL absolue (depuis absolu/relatif) basée sur siteBase */
function toAbsoluteUrl(input: string, siteBase = getSiteBase()): URL {
  // input absolu → renvoyer tel quel
  if (/^https?:\/\//i.test(input)) return new URL(input);
  // chemin relatif
  if (input.startsWith('/')) return new URL(input, siteBase);
  // sinon, on tente de parser (cas rare : `foo/bar`)
  return new URL('/' + input.replace(/^\.?\//, ''), siteBase);
}

/** Return an absolute image URL or undefined */
function toAbsoluteImage(image?: string, siteBase = getSiteBase()): string | undefined {
  if (!image) return undefined;
  return toAbsoluteUrl(image, siteBase).toString();
}

export function seoToMetadata(input: SEOInput): Metadata {
  const {
    title,
    description,
    url,
    image,
    keywords,
    type = 'website',
    author = { name: 'GoQuébeCan' },
    publishedTime,
    modifiedTime,
    siteName = 'GoQuébeCan',
    locale = 'fr_CA',
    twitterSite,
    twitterCreator,
    languageAlternates,
  } = input;

  const siteBase = getSiteBase();
  const pageUrl = toAbsoluteUrl(url, siteBase);
  const metadataBase = new URL(pageUrl.origin);
  const canonicalPath = pageUrl.pathname + (pageUrl.search || '');
  const imageAbs = toAbsoluteImage(image, siteBase);

  const images = imageAbs
    ? [{ url: imageAbs, width: 1200, height: 630, alt: `${title} — ${siteName}` }]
    : undefined;

  // Normalisation des keywords
  const normalizedKeywords = toKeywords(keywords);

  // Champs article OG (si type === 'article')
  const isArticle = type === 'article';
  const ogAuthors =
    typeof author === 'string' ? [author] : author && 'name' in author ? [author.name] : undefined;

  return {
    // Important: permet canonical relatif & liens auto
    metadataBase,
    title,
    description,
    keywords: normalizedKeywords,

    // Canonical RELATIF (Next l'absolutisera via metadataBase)
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates,
    },

    openGraph: {
      title,
      description,
      url: pageUrl.toString(), // OG accepte l'absolu
      siteName,
      type: isArticle ? 'article' : 'website',
      images,
      locale,
      ...(isArticle && {
        authors: ogAuthors,
        publishedTime,
        modifiedTime,
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageAbs ? [imageAbs] : undefined,
      site: twitterSite,
      creator: twitterCreator,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },

    authors: toAuthors(author),

    // Bonus anti faux positifs UX mobile (Google 2025-friendly)
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
      url: false,
    },

    // Si tu veux pousser plus loin (validation Search Console, appLinks, icons), ajoute-le ici.
    // verification: { google: '...' },
    // icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png', other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg' }] },

    // Champs article “non typés” conservés pour compat (si besoin)
    other: {
      ...(publishedTime ? { 'article:published_time': publishedTime } : {}),
      ...(modifiedTime ? { 'article:modified_time': modifiedTime } : {}),
    },
  };
}
