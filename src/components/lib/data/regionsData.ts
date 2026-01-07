import type { ComponentType } from 'react';
import loadBlogComponent from '@/components/blog/BlogComponents';

/* ============================================================
   🧭 TYPES — fortement typés et extensibles
   ============================================================ */

export interface Camping {
  name: string;
  location: string;
  nearestCity: string;
  price: string;
  mainAttractions: string[];
  rating: number;
}

export interface RegionAttraction {
  id: string;
  name: string;
  coordinates: [number, number];
  image: string;
  excerpt: string;
  description: string;
  articleComponent: ComponentType<any>; // ✅ corrige l’erreur "ComponentType<AnyProps> not assignable to FC"
  campings?: Camping[];
}

export interface Region {
  id: string;
  name: string;
  coordinates: [number, number];
  attractions: RegionAttraction[];
  structuredData: Record<string, any>;
}

/* ============================================================
   🗺️ DONNÉES — intégrées avec JSON-LD SEO
   ============================================================ */

export const regionsData: Region[] = [
  {
    id: 'quebec',
    name: 'Ville de Québec',
    coordinates: [46.8139, -71.208],
    attractions: [
      {
        id: 'vieux-quebec',
        name: 'Vieux-Québec',
        coordinates: [46.8139, -71.208],
        image:
          'https://images.unsplash.com/photo-1583266368698-234ffaa5350c?w=1200&auto=format&fit=crop&q=80',
        excerpt: "Découvrez les trésors cachés de la seule ville fortifiée d'Amérique du Nord.",
        description:
          "Le Vieux-Québec est un site du patrimoine mondial de l'UNESCO, célèbre pour son architecture historique, ses ruelles pittoresques et le célèbre Château Frontenac.",
        articleComponent: loadBlogComponent('quebec'),
        campings: [
          {
            name: 'Camping du Fort De La Martinière',
            location: 'Lévis',
            nearestCity: 'Lévis (0 km)',
            price: '35–50 $/nuit',
            mainAttractions: ['Site historique', 'Vue sur le fleuve', 'Piste cyclable'],
            rating: 4.4,
          },
          {
            name: 'Camping Chalets Lac St-Augustin',
            location: 'Saint-Augustin-de-Desmaures',
            nearestCity: 'Québec (15 km)',
            price: '35–55 $/nuit',
            mainAttractions: ['Lac Saint-Augustin', 'Pêche', 'Baignade'],
            rating: 4.5,
          },
        ],
      },
      {
        id: 'levis',
        name: 'Lévis',
        coordinates: [46.8032, -71.1631],
        image:
          'https://images.unsplash.com/photo-1595516004252-6d2a8a84794b?w=1200&auto=format&fit=crop&q=80',
        excerpt: 'Terrasse de Lévis, vue panoramique sur la ville de Québec.',
        description:
          'Lévis est reconnue pour sa terrasse emblématique offrant une vue spectaculaire sur le Vieux-Québec, ses pistes cyclables et ses espaces verts.',
        articleComponent: loadBlogComponent('levis'),
      },
    ],

    /* ============================================================
       🌐 JSON-LD STRUCTURÉ — TouristDestination + Campgrounds
       ============================================================ */
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: 'Ville de Québec – Capitale du Québec',
      description:
        'Découvrez la Ville de Québec : histoire, culture, gastronomie et nature. Explorez ses quartiers emblématiques, ses chutes et ses campings.',
      url: 'https://goquebecan.com/destinations/quebec',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 46.8139,
        longitude: -71.208,
      },
      image: [
        'https://images.unsplash.com/photo-1583266368698-234ffaa5350c?w=1200',
        'https://images.unsplash.com/photo-1503437313881-503a91226423?w=1200',
      ],
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Québec, Canada',
      },
      touristType: ['Famille', 'Culture', 'Aventure'],

      hasPart: [
        /* === Attractions === */
        {
          '@type': 'TouristAttraction',
          name: 'Vieux-Québec',
          description:
            "Quartier historique classé au patrimoine mondial de l'UNESCO avec le Château Frontenac et les fortifications.",
          image: 'https://images.unsplash.com/photo-1583266368698-234ffaa5350c?w=1200',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.8139,
            longitude: -71.208,
          },
        },
        {
          '@type': 'TouristAttraction',
          name: 'Chute Montmorency',
          description: 'Cascade de 83 m, accessible en téléphérique, plus haute que Niagara.',
          image: 'https://images.unsplash.com/photo-1503437313881-503a91226423?w=1200',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.89074,
            longitude: -71.1477,
          },
        },

        /* === Campings (Campground) === */
        {
          '@type': 'Campground',
          name: 'Camping du Fort De La Martinière',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lévis, Québec',
            addressCountry: 'CA',
          },
          priceRange: '$35–50',
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Vue sur le fleuve' },
            { '@type': 'LocationFeatureSpecification', name: 'Piste cyclable' },
            { '@type': 'LocationFeatureSpecification', name: 'Accès historique' },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.4,
            bestRating: 5,
            ratingCount: 120,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.75,
            longitude: -71.25,
          },
        },
        {
          '@type': 'Campground',
          name: 'Camping Chalets Lac St-Augustin',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Saint-Augustin-de-Desmaures, Québec',
            addressCountry: 'CA',
          },
          priceRange: '$35–55',
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Lac Saint-Augustin' },
            { '@type': 'LocationFeatureSpecification', name: 'Pêche' },
            { '@type': 'LocationFeatureSpecification', name: 'Baignade' },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 4.5,
            bestRating: 5,
            ratingCount: 90,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 46.73,
            longitude: -71.45,
          },
        },
      ],

      sameAs: [
        'https://www.quebec-cite.com/fr',
        'https://fr.wikipedia.org/wiki/Ville_de_Qu%C3%A9bec',
      ],
    },
  },
];
