// src/lib/seo/buildDestinationLd.ts
export function buildDestinationLd({
  name,
  description,
  url,
  image,
  latitude,
  longitude,
  containedPlaces = [],
  touristType = [],
  videoUrl,
  rating,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
  latitude: number;
  longitude: number;
  containedPlaces?: string[];
  touristType?: string[];
  videoUrl?: string;
  rating?: { value: number; count: number };
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.goquebecan.com';

  const absoluteUrl = url.startsWith('http')
    ? url
    : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;

  const absoluteImage = image.startsWith('http')
    ? image
    : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;

  const absoluteVideoUrl = videoUrl
    ? videoUrl.startsWith('http')
      ? videoUrl
      : `${baseUrl}${videoUrl.startsWith('/') ? '' : '/'}${videoUrl}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    url: absoluteUrl,
    image: [absoluteImage],
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    containsPlace: containedPlaces.map((p) => ({
      '@type': 'Place',
      name: p,
    })),
    touristType,
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value,
        ratingCount: rating.count,
      },
    }),
    ...(absoluteVideoUrl && {
      video: {
        '@type': 'VideoObject',
        name: `${name} – Vidéo découverte`,
        description,
        thumbnailUrl: [absoluteImage],
        contentUrl: absoluteVideoUrl,
      },
    }),
  };
}
