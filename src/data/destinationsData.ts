// src/data/destinationsData.ts
export interface DestinationArticle {
  title: string;
  slug: string;
  published: boolean;
  image?: string;
  excerpt?: string;
}

export interface Region {
  title: string;
  slug: string;
  articles: DestinationArticle[];
}

export const destinations: Region[] = [
  {
    title: 'Gaspésie',
    slug: 'gaspesie',
    articles: [
      {
        title: 'Gaspésie',
        slug: 'gaspesie',
        published: true,
        image: '/images/destinations/parc-gaspesie.avif',
        excerpt: 'La Gaspésie entre mer et montagne',
      },
      {
        title: 'Percé',
        slug: 'perce',
        published: true,
        image: '/images/destinations/perce.avif',
        excerpt: 'Percé et son célèbre rocher',
      },
      {
        title: 'Carleton',
        slug: 'carleton',
        published: true,
        image: '/images/destinations/carleton.avif',
        excerpt: 'Station balnéaire sur la baie',
      },
      {
        title: 'Forillon',
        slug: 'forillon',
        published: true,
        image: '/images/destinations/forillon.avif',
        excerpt: 'Parc national à la pointe de la péninsule.',
      },
    ],
  },
  {
    title: 'Charlevoix',
    slug: 'charlevoix',
    articles: [
      {
        title: 'Baie Saint Paul',
        slug: 'baie-saint-paul',
        published: true,
        image: '/images/destinations/baie-st-paul.avif',
        excerpt: 'Charme artistique au bord du fleuve',
      },
      {
        title: 'Massif',
        slug: 'massif',
        published: true,
        image: '/images/destinations/le-massif.avif',
        excerpt: 'Panorama spectaculaire sur le fleuve Saint-Laurent',
      },
      {
        title: 'Port Au Persil',
        slug: 'port-au-persil',
        published: true,
        image: '/images/destinations/port-au-persil.avif',
        excerpt: 'Petit port paisible au cœur de Charlevoix',
      },
      {
        title: 'Hautes Gorges',
        slug: 'hautes-gorges',
        published: true,
        image: '/images/destinations/hautes-gorges.avif',
        excerpt: 'Randonnées vertigineuses en pleine nature',
      },
    ],
  },
  {
    title: 'Côte-Nord',
    slug: 'cote-nord',
    articles: [
      {
        title: 'Sept Îles',
        slug: 'sept-iles',
        published: true,
        image: '/images/destinations/sept-iles.avif',
        excerpt: 'Découvrez les plages et archipels de Sept-Îles.',
      },
      {
        title: 'Mingan',
        slug: 'mingan',
        published: true,
        image: '/images/destinations/mingan.avif',
        excerpt: 'Le parc national de l’Archipel-de-Mingan et ses monolithes.',
      },
      {
        title: 'Port Cartier',
        slug: 'port-cartier',
        published: true,
        image: '/images/destinations/port-cartier.avif',
        excerpt: 'Nature sauvage et plages tranquilles de la Côte-Nord.',
      },
      {
        title: 'Tadoussac',
        slug: 'tadoussac',
        published: true,
        image: '/images/destinations/hotels/motel-beluga.avif',
        excerpt: 'Observation de baleines et charme maritime.',
      },
    ],
  },
  {
    title: 'Cantons-de-l’Est',
    slug: 'cantons',
    articles: [
      {
        title: 'Magog Orford',
        slug: 'magog-orford',
        published: true,
        image: '/images/destinations/magog.avif',
        excerpt: 'Lac Memphrémagog et randonnées au Mont-Orford.',
      },
      {
        title: 'Bromont Granby',
        slug: 'bromont-granby',
        published: true,
        image: '/images/destinations/bromont.avif',
        excerpt: 'Thermes, montagne et zoo à découvrir en famille.',
      },
      {
        title: 'Sherbrooke',
        slug: 'sherbrooke',
        published: true,
        image: '/images/destinations/sherbrooke.avif',
        excerpt: 'Capitale régionale dynamique entre nature et culture.',
      },
    ],
  },
  {
    title: 'Montréal Rive-Sud',
    slug: 'montreal-rive-sud',
    articles: [
      {
        title: 'Montréal',
        slug: 'montreal',
        published: true,
        image: '/images/destinations/montreal.avif',
        excerpt: 'Ville cosmopolite entre histoire, festivals et gastronomie.',
      },
      {
        title: 'Chambly',
        slug: 'chambly',
        published: false,
        image: '/images/destinations/chambly.avif',
        excerpt: 'Fortifications et promenades au bord du bassin.',
      },
      {
        title: 'Brossard',
        slug: 'brossard',
        published: false,
        image: '/images/destinations/brossard.avif',
        excerpt: 'Quartiers multiculturels et accès rapide à Montréal.',
      },
      {
        title: 'Saint-Jean-sur-Richelieu',
        slug: 'saint-jean-sur-richelieu',
        published: false,
        image: '/images/destinations/st-jean-sur-richelieu.avif',
        excerpt: 'Célèbre pour son festival international de montgolfières.',
      },
    ],
  },
  {
    title: 'Bas-Saint-Laurent',
    slug: 'bas-saint-laurent',
    articles: [
      {
        title: 'Bic',
        slug: 'bic',
        published: true,
        image: '/images/destinations/bic.avif',
        excerpt: 'Parc national du Bic entre caps, baies et phoques.',
      },
      {
        title: 'Kamouraska',
        slug: 'kamouraska',
        published: true,
        image: '/images/destinations/kamouraska.avif',
        excerpt: 'Un des plus beaux couchers de soleil du Québec.',
      },
      {
        title: 'Rivière-du-Loup',
        slug: 'rivieredu-loup',
        published: true,
        image: '/images/destinations/chute-riviere-du-loup.avif',
        excerpt: 'Croisières aux baleines et escapades dans le fjord.',
      },
    ],
  },
  {
    title: 'Ville de Québec',
    slug: 'quebec',
    articles: [
      {
        title: 'Montmorency',
        slug: 'montmorency',
        published: true,
        image: '/images/destinations/chute-montmorency.avif',
        excerpt: 'Chute spectaculaire plus haute que Niagara.',
      },
      {
        title: 'Lévis',
        slug: 'levis',
        published: true,
        image: '/images/destinations/levis.avif',
        excerpt: 'Vue imprenable sur Québec et piste cyclable longeant le fleuve.',
      },
      {
        title: 'Québec',
        slug: 'quebec',
        published: true,
        image: '/images/destinations/quebec.avif',
        excerpt: 'Vieux-Québec, patrimoine UNESCO, entre murs et histoire.',
      },
      {
        title: 'Orléans',
        slug: 'orleans',
        published: true,
        image: '/images/destinations/ile-dorleans.avif',
        excerpt: 'Île d’Orléans, terroir et traditions agricoles.',
      },
    ],
  },
  {
    title: 'Plages de l’Ontario',
    slug: 'ontario',
    articles: [
      {
        title: 'Wasaga Beach',
        slug: 'wasaga-beach',
        published: true,
        image: '/images/destinations/wasaga-beach.avif',
        excerpt: 'La plus longue plage d’eau douce au monde.',
      },
      {
        title: 'Port Dover',
        slug: 'port-dover',
        published: true,
        image: '/images/destinations/port-dover.avif',
        excerpt: 'Plage de sable fin sur le lac Érié.',
      },
      {
        title: 'Grand Bend',
        slug: 'grand-bend',
        published: true,
        image: '/images/destinations/grand-bend.avif',
        excerpt: 'Ambiance festive et plages animées.',
      },
      {
        title: 'Sauble Beach',
        slug: 'sauble-beach',
        published: true,
        image: '/images/destinations/sauble-beach.avif',
        excerpt: 'Destination idéale pour le coucher de soleil.',
      },
      {
        title: 'Sandbanks',
        slug: 'sandbanks',
        published: true,
        image: '/images/destinations/sand-banks.avif',
        excerpt: 'Dunes de sable et eau turquoise en Ontario.',
      },
      {
        title: 'Singing Sands',
        slug: 'singing-sands',
        published: true,
        image: '/images/destinations/singing-sands.avif',
        excerpt: 'Plage chantante du parc national de la Péninsule-Bruce.',
      },
    ],
  },
  {
    title: 'Autres destinations',
    slug: 'autres',
    articles: [
      {
        title: 'Eeyou Istchee',
        slug: 'eeyou-istchee',
        published: true,
        image: '/images/destinations/eeyou-istchee-baiejames.avif',
        excerpt: 'Terres ancestrales cries au nord du Québec.',
      },
      {
        title: 'Kuururjuaq',
        slug: 'kuururjuaq',
        published: true,
        image: '/images/destinations/kuururjuaq.avif',
        excerpt: 'Expédition sauvage dans le parc le plus reculé du Québec.',
      },
      {
        title: 'Sabrevois',
        slug: 'sabrevois',
        published: true,
        image: '/images/destinations/sabrevois.avif',
        excerpt: 'Un petit coin paisible à explorer à vélo.',
      },
      {
        title: 'Canyon',
        slug: 'canyon',
        published: true,
        image: '/images/destinations/canyon.avif',
        excerpt: 'Gorges naturelles spectaculaires à visiter.',
      },
      {
        title: 'Louer Un Vr Au Quebec',
        slug: 'pourquoi-louer-un-vr-au-quebec',
        published: true,
        image: '/images/destinations/vr2.avif',
        excerpt: 'Tout savoir sur la location d’un VR au Québec.',
      },
      {
        title: 'Parc Aquatique',
        slug: 'parc-aquatique',
        published: true,
        image: '/images/destinations/parc-valcartier.avif',
        excerpt: 'Plongez dans les plus beaux parcs aquatiques du Québec.',
      },
    ],
  },
];
