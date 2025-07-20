import React from 'react';

import BlogComponents from '@/components/blog/BlogComponents';

export type Camping = {
  name: string;
  location: string;
  nearestCity: string;
  price: string;
  mainAttractions: string[];
  rating: number;
};

export type RegionAttraction = {
  id: string;
  name: string;
  coordinates: [number, number];
  image: string;
  excerpt: string;
  description: string;
  articleComponent: React.FC;
  campings?: Camping[];
};

export type Region = {
  id: string;
  name: string;
  coordinates: [number, number];
  attractions: RegionAttraction[];
};

export const regionsData: Region[] = [
  {
    id: 'quebec',
    name: 'Ville de Québec',
    coordinates: [46.8139, -71.208],
    attractions: [
      {
        id: 'quebec',
        name: 'Vieux-Québec',
        coordinates: [46.8139, -71.208],
        image: 'https://images.unsplash.com/photo-1583266368698-234ffaa5350c',
        excerpt: "Découvrez les trésors cachés de la seule ville fortifiée d'Amérique du Nord.",
        description:
          "Le Vieux-Québec est un site du patrimoine mondial de l'UNESCO, célèbre pour son architecture historique, ses ruelles pittoresques et le célèbre Château Frontenac.",
        articleComponent: BlogComponents['quebec'],
        campings: [
          {
            name: 'Camping du Fort De La Martiniere',
            location: 'Lévis',
            nearestCity: 'Lévis (0 km)',
            price: '35-50$/nuit',
            mainAttractions: ['Site historique', 'Vue sur le fleuve', 'Piste cyclable'],
            rating: 4.4,
          },
          {
            name: 'Camping Chalets Lac St-Augustin',
            location: 'Saint-Augustin-de-Desmaures',
            nearestCity: 'Québec (15 km)',
            price: '35-55$/nuit',
            mainAttractions: ['Lac Saint-Augustin', 'Pêche', 'Baignade'],
            rating: 4.5,
          },
          {
            name: 'Camping Valcartier',
            location: 'Saint-Gabriel-de-Valcartier',
            nearestCity: 'Québec (30 km)',
            price: '40-60$/nuit',
            mainAttractions: [
              'Village Vacances Valcartier',
              'Parc aquatique',
              'Activités familiales',
            ],
            rating: 4.7,
          },
          {
            name: 'Parc national de la Jacques-Cartier',
            location: 'Stoneham-et-Tewkesbury',
            nearestCity: 'Québec (40 km)',
            price: '42-65$/nuit',
            mainAttractions: ['Vallée glaciaire', 'Kayak', 'Randonnée'],
            rating: 4.9,
          },
        ],
      },
      {
        id: 'levis',
        name: 'Lévis',
        coordinates: [46.8032, -71.1631],
        image: 'https://images.unsplash.com/photo-1595516004252-6d2a8a84794b',
        excerpt: 'Terrasse de Lévis, vue panoramique sur la ville de Québec.',
        description:
          'Lévis est reconnue pour sa terrasse emblématique offrant une vue spectaculaire sur le Vieux-Québec, ses pistes cyclables et ses espaces verts.',
        articleComponent: BlogComponents['levis'],
      },
      {
        id: 'montmorency',
        name: 'Chute Montmorency',
        coordinates: [46.89074, -71.1477],
        image: 'https://images.unsplash.com/photo-1503437313881-503a91226423',
        excerpt: 'Une chute plus haute que les chutes du Niagara.',
        description:
          'Située à quelques minutes de Québec, la Chute Montmorency est une impressionnante cascade de 83 mètres, accessible via téléphérique et passerelle.',
        articleComponent: BlogComponents['montmorency'],
      },
      {
        id: 'orleans',
        name: "Île d'Orléans",
        coordinates: [46.9258, -70.9413],
        image: 'https://images.unsplash.com/photo-1594761149290-f3ea0e3a1f5e',
        excerpt: 'Vignobles, cidreries et paysages agricoles.',
        description:
          'L’Île d’Orléans est une perle patrimoniale à quelques kilomètres de Québec, idéale pour découvrir les produits du terroir et l’architecture traditionnelle.',
        articleComponent: BlogComponents['orleans'],
      },
    ],
  },
];
