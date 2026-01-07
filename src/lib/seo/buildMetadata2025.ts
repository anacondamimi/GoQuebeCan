import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, DEFAULT_LOCALE } from './seoConfig2025';

export type AllowedOgType =
  | 'website'
  | 'article'
  | 'profile'
  | 'book'
  | 'music.song'
  | 'video.movie';

const ALLOWED_OG_TYPES: AllowedOgType[] = [
  'website',
  'article',
  'profile',
  'book',
  'music.song',
  'video.movie',
];

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
