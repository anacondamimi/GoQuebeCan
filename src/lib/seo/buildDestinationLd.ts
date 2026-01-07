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
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    url,
    image: [image],
    geo: { '@type': 'GeoCoordinates', latitude, longitude },
    containsPlace: containedPlaces.map((p) => ({ '@type': 'Place', name: p })),
    touristType,
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value,
        ratingCount: rating.count,
      },
    }),
    ...(videoUrl && {
      video: {
        '@type': 'VideoObject',
        name: `${name} – Vidéo découverte`,
        description,
        thumbnailUrl: image,
        contentUrl: videoUrl,
      },
    }),
  };
}
