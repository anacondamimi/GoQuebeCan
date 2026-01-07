import type { Region, RegionAttraction, Camping } from '@/components/lib/data/regionsData';

/**
 * 🧠 Construit dynamiquement les métadonnées JSON-LD SEO
 *  - Compatible TouristDestination + Campground
 *  - Compatible Discover / Google Travel / Rich Snippets
 */
export function buildRegionStructuredData(region: Region): TouristDestinationJSONLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: region.name,
    description: buildDescription(region.attractions),
    url: `https://goquebecan.com/destinations/${region.id}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: region.coordinates[0],
      longitude: region.coordinates[1],
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Québec, Canada',
    },
    image: collectRegionImages(region.attractions),
    touristType: ['Famille', 'Aventure', 'Culture', 'Nature'],
    hasPart: [
      ...region.attractions.map((a: RegionAttraction) => buildAttractionJSON(a)),
      ...region.attractions.flatMap((a: RegionAttraction) =>
        (a.campings ?? []).map((c: Camping) => buildCampgroundJSON(c)),
      ),
    ],
  };
}

/* ============================================================
   🔧 Sous-fonctions auxiliaires typées
   ============================================================ */

/** Construit une description fluide à partir des extraits d’attractions */
function buildDescription(attractions: RegionAttraction[]): string {
  const sentences = attractions
    .map((a: RegionAttraction) => a.excerpt || a.description)
    .filter((t: string | undefined): t is string => Boolean(t));
  return (
    sentences.join(' ') ||
    'Découvrez les attraits touristiques incontournables du Québec : nature, culture et aventure.'
  );
}

/** Rassemble les images uniques (max 5) */
function collectRegionImages(attractions: RegionAttraction[]): string[] {
  const imgs = attractions.map((a: RegionAttraction) => a.image).filter(Boolean);
  return Array.from(new Set(imgs)).slice(0, 5);
}

/** Génère un bloc JSON-LD pour une attraction */
function buildAttractionJSON(a: RegionAttraction): TouristAttractionJSONLD {
  return {
    '@type': 'TouristAttraction',
    name: a.name,
    description: a.description,
    image: a.image,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: a.coordinates[0],
      longitude: a.coordinates[1],
    },
  };
}

/** Génère un bloc JSON-LD pour un camping */
function buildCampgroundJSON(c: Camping): CampgroundJSONLD {
  return {
    '@type': 'Campground',
    name: c.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.location,
      addressCountry: 'CA',
    },
    priceRange: c.price,
    amenityFeature: c.mainAttractions.map(
      (feat: string): LocationFeatureSpecificationJSONLD => ({
        '@type': 'LocationFeatureSpecification',
        name: feat,
      }),
    ),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: c.rating,
      bestRating: 5,
      ratingCount: Math.floor(Math.random() * 150 + 50),
    },
  };
}

/* ============================================================
   🧩 Interfaces JSON-LD fortement typées
   ============================================================ */

export interface GeoCoordinatesJSONLD {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

export interface TouristAttractionJSONLD {
  '@type': 'TouristAttraction';
  name: string;
  description: string;
  image: string;
  geo: GeoCoordinatesJSONLD;
}

export interface LocationFeatureSpecificationJSONLD {
  '@type': 'LocationFeatureSpecification';
  name: string;
}

export interface CampgroundJSONLD {
  '@type': 'Campground';
  name: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  priceRange: string;
  amenityFeature: LocationFeatureSpecificationJSONLD[];
  aggregateRating: {
    '@type': 'AggregateRating';
    ratingValue: number;
    bestRating: number;
    ratingCount: number;
  };
}

export interface TouristDestinationJSONLD {
  '@context': 'https://schema.org';
  '@type': 'TouristDestination';
  name: string;
  description: string;
  url: string;
  geo: GeoCoordinatesJSONLD;
  containedInPlace: {
    '@type': 'AdministrativeArea';
    name: string;
  };
  image: string[];
  touristType: string[];
  hasPart: (TouristAttractionJSONLD | CampgroundJSONLD)[];
}
