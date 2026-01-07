// src/data/campings.ts

export type ItineraryIdea = {
  title: string;
  description: string;
};

export type NearbyAttraction = {
  name: string;
  description: string;
};

export type BookingLink = {
  label: string;
  href: string;
};

export type InternalLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PracticalInfo = {
  checkIn?: string;
  checkOut?: string;
  distanceFromCity?: string;
  access?: string;
  seasonBest?: string;
  noiseLevel?: string;
  shade?: string;
  wifi?: string;
  cellCoverage?: string;
  animals?: string;
  languages?: string;
  notes?: string;
};

export type CampingPageData = {
  slug: string;
  name: string;
  region: string;
  location: string;
  heroImage: string;
  heroImageAlt: string;
  shortDescription: string;
  longIntro: string;
  tags: string[]; // ex: ["Vue sur l’eau", "Familial", "VR bienvenus"]
  seoKeywords: string[];
  typicalPrice: string;
  openPeriod: string;
  siteTypes: string[];
  idealFor: string[];
  services: string[];
  pros: string[];
  cons: string[];
  rating?: number;
  highlights?: string[]; // pour les cartes du guide
  practical: PracticalInfo;
  itineraryIdeas: ItineraryIdea[];
  nearbyAttractions: NearbyAttraction[];
  bookingLinks: BookingLink[];
  internalLinks: InternalLink[];
  faq?: FaqItem[];
};

const COMMON_INTERNAL_LINKS: InternalLink[] = [
  { label: 'Guide complet des campings au Québec', href: '/camping' },
  { label: 'Planificateur d’itinéraire GoQuébeCAN', href: '/planificateur' },
  { label: 'Carte interactive', href: '/carte-interactive' },
  { label: 'Producteurs locaux à découvrir', href: '/producteurs' },
  { label: 'Objets indispensables pour le camping', href: '/objets-indispensables/camping' },
];

export const CAMPINGS: CampingPageData[] = [
  /* 1. Camping du Fjord — Saguenay */
  {
    slug: 'camping-du-fjord-saguenay',
    name: 'Camping du Fjord du Saguenay',
    region: 'Saguenay–Lac-Saint-Jean',
    location: 'L’Anse-Saint-Jean, Québec',
    heroImage: '/images/destinations/fjord-saguenay.avif',
    heroImageAlt: 'Vue sur le fjord du Saguenay depuis un emplacement de camping en hauteur.',
    shortDescription:
      'Emplacements en terrasse avec vue sur le fjord, ambiance calme et accès facile aux activités nautiques et de randonnée.',
    longIntro:
      'Le Camping du Fjord du Saguenay est l’une des plus belles étapes pour un road trip au Québec. Niché en hauteur, il offre des emplacements avec vue sur le fjord, une ambiance nature et un accès rapide au village de L’Anse-Saint-Jean. On y vient pour les panoramas, le kayak, les randonnées et les fins de journée autour du feu.',
    tags: ['Vue sur le fjord', 'Ambiance calme', 'VR et tentes', 'Road trip'],
    seoKeywords: [
      'camping fjord saguenay',
      'camping anse-saint-jean',
      'camping vue fjord',
      'camping saguenay famille',
    ],
    typicalPrice: 'Environ 45–65 $ / nuit selon emplacement et saison',
    openPeriod: 'En général de fin mai à début octobre (à vérifier chaque année)',
    siteTypes: [
      'Emplacements pour tentes (plateformes ou sol naturel)',
      'Emplacements pour VR avec électricité',
      'Quelques unités rustiques ou prêt-à-camper (selon disponibilité)',
    ],
    idealFor: [
      'Voyageurs en road trip qui veulent une étape “wow”',
      'Couples à la recherche d’un cadre romantique proche de la nature',
      'Familles aimant la randonnée et les points de vue',
    ],
    services: [
      'Bloc sanitaire avec douches chaudes',
      'Eau potable',
      'Certains emplacements avec vue dégagée',
      'Accès rapide au village (commerces et restos)',
    ],
    pros: [
      'Vue exceptionnelle sur le fjord depuis plusieurs emplacements',
      'Ambiance calme, loin des grands campings bruyants',
      'Point de départ idéal pour explorer le Saguenay et Tadoussac',
    ],
    cons: [
      'Chemin d’accès en pente : bien gérer freinage et cales pour le VR',
      'Le vent peut être présent sur les emplacements les plus exposés',
      'Services plus simples qu’un “resort” de camping classique',
    ],
    rating: 4.8,
    highlights: ['Vue sur le fjord', 'Kayak', 'Randonnée', 'Village pittoresque'],
    practical: {
      checkIn: 'Souvent entre 15 h et 20 h (à confirmer auprès du camping)',
      checkOut: 'Généralement avant midi',
      distanceFromCity: 'Environ 3 h 30 de Québec, 2 h 30 de Saguenay (Ville de Saguenay)',
      access:
        'Route asphaltée puis chemin d’accès en pente; roulez doucement, surtout avec une roulotte ou un VR.',
      seasonBest:
        'Juillet–août pour la chaleur; septembre pour les couleurs d’automne et le calme.',
      noiseLevel: 'Plutôt calme; clientèle de randonneurs et de familles tranquilles.',
      shade: 'Mélange d’emplacements ombragés et plus ouverts avec vue.',
      wifi: 'Souvent limité; à considérer comme un bonus.',
      cellCoverage: 'Variable selon opérateur; mieux au village que dans certains secteurs.',
      animals: 'Animaux habituellement acceptés en laisse (vérifier les règles exactes).',
      languages: 'Accueil en français, souvent possible en anglais.',
      notes:
        'Réserver à l’avance en haute saison et durant les vacances de la construction est fortement recommandé.',
    },
    itineraryIdeas: [
      {
        title: '3 jours entre fjord, kayak et villages du Saguenay',
        description:
          'Jour 1 : arrivée et installation, point de vue en fin de journée. Jour 2 : sortie en kayak ou croisière sur le fjord, visite du village de L’Anse-Saint-Jean. Jour 3 : randonnée dans le parc national du Fjord-du-Saguenay, puis route vers Tadoussac ou le Lac-Saint-Jean.',
      },
      {
        title: 'Étape clé d’un road trip Côte-Nord – Saguenay',
        description:
          'Utilisez ce camping comme étape entre Québec / Charlevoix et la Côte-Nord. Il casse la route tout en offrant un décor spectaculaire.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Village de L’Anse-Saint-Jean',
        description:
          'Port pittoresque, cafés, petits restos et magnifiques points de vue sur le fjord.',
      },
      {
        name: 'Parc national du Fjord-du-Saguenay',
        description: 'Réseau de sentiers, falaises, belvédères et activités nautiques encadrées.',
      },
      {
        name: 'Excursions en kayak et croisières',
        description:
          'Plusieurs opérateurs proposent des sorties guidées sur le fjord au départ de la région.',
      },
    ],
    bookingLinks: [
      {
        label: 'Site officiel du camping',
        href: 'https://www.sepaq.com/fr/reservation/camping/parc-national-du-fjord-du-saguenay',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
    faq: [
      {
        question: 'Est-ce adapté aux familles avec jeunes enfants ?',
        answer:
          'Oui, mais il faut garder un œil sur les plus petits près des zones en pente ou avec vue dégagée. Le cadre reste très nature et calme.',
      },
      {
        question: 'Peut-on venir sans voiture ?',
        answer:
          'Ce n’est pas l’idéal. Le camping est surtout pensé pour les voyageurs motorisés; une voiture facilite tous les déplacements.',
      },
    ],
  },

  /* 2. Parc national de la Gaspésie */
  {
    slug: 'camping-parc-national-gaspesie',
    name: 'Camping – Parc national de la Gaspésie',
    region: 'Gaspésie',
    location: 'Mont-Albert, Québec',
    heroImage: '/images/destinations/parc-gaspesie.avif',
    heroImageAlt: 'Tentes et VR au pied des montagnes dans le parc national de la Gaspésie.',
    shortDescription:
      'Au cœur des Chic-Chocs, un camping de montagne parfait pour les randonneurs et amateurs de paysages spectaculaires.',
    longIntro:
      'Le camping du parc national de la Gaspésie est un incontournable pour ceux qui aiment la montagne. Situé près du Mont-Albert, il permet de rayonner vers les sentiers emblématiques, d’observer la faune et de profiter d’un autre visage de la Gaspésie, loin du simple littoral.',
    tags: ['Montagnes', 'Randonnée', 'Parc national'],
    seoKeywords: [
      'camping parc national gaspésie',
      'camping mont-albert',
      'camping chic-chocs',
      'randonnée gaspésie camping',
    ],
    typicalPrice: 'Environ 40–80 $ / nuit selon services et type d’emplacement',
    openPeriod: 'En général de juin à fin septembre (certaines sections selon la neige)',
    siteTypes: [
      'Emplacements pour tentes (secteurs boisés)',
      'Emplacements pour VR avec services de base',
      'Prêt-à-camper (selon disponibilités SEPAQ)',
    ],
    idealFor: [
      'Randonneurs intermédiaires à avancés',
      'Amoureux de paysages de montagne',
      'Road trip Gaspésie combinant côte et intérieur des terres',
    ],
    services: [
      'Bloc sanitaire avec douches chaudes',
      'Poste d’accueil et informations sur les sentiers',
      'Possibilité de location ou info sur activités guidées',
      'Présence d’un centre de découverte (selon secteur)',
    ],
    pros: [
      'Accès direct aux principaux sentiers de la Gaspésie',
      'Cadre de montagne unique au Québec',
      'Bonne base pour plusieurs nuits en randonnée / exploration',
    ],
    cons: [
      'Nuits souvent fraîches, même en été',
      'Peut être très prisé en haute saison',
      'Certains sentiers demandent une bonne forme physique',
    ],
    rating: 4.9,
    highlights: ['Monts Chic-Chocs', 'Orignaux', 'Grands panoramas'],
    practical: {
      seasonBest:
        'Juillet–septembre pour avoir la plupart des sentiers dégagés; début octobre pour les couleurs.',
      noiseLevel: 'Ambiance plutôt calme, surtout axée sur la randonnée.',
      wifi: 'Très limité; parfait pour décrocher.',
      cellCoverage: 'Souvent faible ou inexistante dans certains secteurs.',
      notes:
        'Vérifier les conditions de sentiers et les avis officiels de la SEPAQ avant votre séjour.',
    },
    itineraryIdeas: [
      {
        title: '4 jours Gaspésie côté montagne',
        description:
          'Base au camping pendant 3–4 nuits; alternance entre randonnées (Mont-Albert, mont Xalibu, etc.) et journées plus tranquilles avec observation de la faune.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Mont-Albert',
        description:
          'Randonnée emblématique offrant de magnifiques panoramas sur les Chic-Chocs (niveau exigeant).',
      },
      {
        name: 'Centre de découverte et de services',
        description:
          'Idéal pour s’informer sur les sentiers, la météo et les consignes de sécurité.',
      },
    ],
    bookingLinks: [
      {
        label: 'Réservation via la SEPAQ',
        href: 'https://www.sepaq.com/fr/reservation/camping/parc-national-de-la-gaspesie',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 3. Camping des Érables – Cantons-de-l’Est */
  {
    slug: 'camping-des-erables-cantons-est',
    name: 'Camping des Érables',
    region: 'Cantons-de-l’Est',
    location: 'Cantons-de-l’Est, Québec',
    heroImage: '/images/destinations/lac-brome.avif',
    heroImageAlt: 'Piscine et emplacements de camping dans un environnement boisé.',
    shortDescription:
      'Un camping familial convivial avec piscine, aire de jeux et ambiance accessible à 2 h de route de Montréal.',
    longIntro:
      'Le camping des Érables est un excellent choix pour un week-end ou une première expérience de camping en famille. Les services sont complets, les enfants ont de quoi s’amuser et l’accès aux villages des Cantons-de-l’Est est rapide pour des visites gourmandes.',
    tags: ['Familial', 'Piscine', 'Accessible depuis Montréal'],
    seoKeywords: [
      'camping cantons de lest famille',
      'camping des érables',
      'camping piscine estrie',
      'camping week-end montréal',
    ],
    typicalPrice: 'Environ 30–60 $ / nuit selon services et type de site',
    openPeriod: 'De la fin du printemps au début de l’automne',
    siteTypes: [
      'Emplacements pour tentes et petites roulottes',
      'Emplacements pour VR avec services',
    ],
    idealFor: [
      'Familles avec enfants',
      'Groupes d’amis pour un week-end',
      'Première expérience camping avant un plus grand voyage',
    ],
    services: [
      'Piscine ou jeux d’eau (selon configuration exacte)',
      'Aire de jeux pour enfants',
      'Bloc sanitaire complet',
      'Possibilité d’activités organisées en haute saison',
    ],
    pros: [
      'Ambiance chaleureuse et familiale',
      'Distance raisonnable depuis Montréal',
      'Cadre agréable pour un week-end détente',
    ],
    cons: [
      'Ambiance parfois plus bruyante que dans un parc national',
      'Moins “sauvage” que les campings de montagne ou de bord de mer',
    ],
    rating: 4.6,
    highlights: ['Piscine', 'Ambiance famille', 'Week-end rapide'],
    practical: {
      noiseLevel: 'Familial et animé, surtout en fin de journée et les week-ends.',
      notes:
        'Idéal pour tester votre équipement et le camping avec de jeunes enfants avant un road trip plus long.',
    },
    itineraryIdeas: [
      {
        title: 'Week-end dans les Cantons-de-l’Est',
        description:
          'Deux nuits au camping, visite de villages, arrêt dans des fromageries, vignobles et vergers à proximité.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Villages des Cantons-de-l’Est',
        description:
          'Nombreux villages charmants (Sutton, Magog, etc.) avec cafés, boutiques et restos.',
      },
      {
        name: 'Producteurs locaux',
        description:
          'Fromageries, vignobles et récoltes de petits fruits à découvrir en quelques minutes de route.',
      },
    ],
    bookingLinks: [
      {
        label: 'Camping Domaine des érables Lac Brôme',
        href: 'https://www.campingquebec.com/fr/campings/cantons-de-lest/camping-domaine-des-erables',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 4. Camping du Bic – Bas-Saint-Laurent */
  {
    slug: 'camping-parc-national-bic',
    name: 'Camping – Parc national du Bic',
    region: 'Bas-Saint-Laurent',
    location: 'Parc national du Bic, Québec',
    heroImage: '/images/destinations/bic.avif',
    heroImageAlt: 'Caps rocheux et tentes près du fleuve Saint-Laurent au parc du Bic.',
    shortDescription:
      'Un camping emblématique au bord du fleuve, avec caps rocheux, sentiers côtiers et couchers de soleil spectaculaires.',
    longIntro:
      'Le parc national du Bic est un des joyaux du Bas-Saint-Laurent. Son camping permet de dormir au plus près des caps rocheux et d’admirer des couchers de soleil spectaculaires sur le fleuve. C’est un excellent choix pour les familles, les couples et les photographes.',
    tags: ['Bord de l’eau', 'Couchers de soleil', 'Parc national'],
    seoKeywords: [
      'camping parc national bic',
      'camping bas-saint-laurent',
      'camping vue fleuve',
      'sentiers côtiers bic',
    ],
    typicalPrice: 'Environ 40–80 $ / nuit selon services et secteur',
    openPeriod: 'Généralement de mai à octobre (sections variables)',
    siteTypes: [
      'Sites rustiques près des sentiers',
      'Sites avec services (électricité) selon secteurs',
      'Prêt-à-camper (yourtes / tentes aménagées selon l’offre SEPAQ)',
    ],
    idealFor: [
      'Familles qui aiment marcher sans gros dénivelé',
      'Amateurs de coucher de soleil et de photo',
      'Road trip Bas-Saint-Laurent et Gaspésie',
    ],
    services: [
      'Blocs sanitaires avec douches',
      'Poste d’accueil et informations',
      'Accès direct aux sentiers du parc',
    ],
    pros: [
      'Paysages côtiers uniques au Québec',
      'Magnifiques couchers de soleil sur le fleuve',
      'Nombreux sentiers faciles à intermédiaires',
    ],
    cons: ['Très populaire en haute saison', 'Nuits parfois humides près du fleuve'],
    rating: 4.7,
    highlights: ['Couchers de soleil', 'Sentiers côtiers', 'Observation de la faune'],
    practical: {
      seasonBest: 'Juin–septembre pour la météo; début octobre pour les couleurs.',
      noiseLevel: 'Ambiance familiale mais souvent respectueuse du calme en soirée.',
      notes: 'Prévoir un bon tapis de sol et une protection contre l’humidité; réserver tôt l’été.',
    },
    itineraryIdeas: [
      {
        title: 'Bas-Saint-Laurent & Gaspésie',
        description:
          'Une à deux nuits au Bic, puis continuation vers Rimouski, Sainte-Anne-des-Monts et la Gaspésie.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Rimouski',
        description:
          'Ville à proximité avec restaurants, épiceries, microbrasseries et promenade au bord du fleuve.',
      },
      {
        name: 'Sentiers du parc',
        description: 'Nombreux sentiers offrant belvédères, caps rocheux et baies calmes.',
      },
    ],
    bookingLinks: [
      {
        label: 'Réservation via la SEPAQ',
        href: 'https://www.sepaq.com/fr/reservation/camping/parc-national-du-bic',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 5. Camping Baie-des-Chaleurs – Gaspésie */
  {
    slug: 'camping-baie-des-chaleurs',
    name: 'Camping Baie-des-Chaleurs',
    region: 'Gaspésie',
    location: 'Baie-des-Chaleurs, Québec',
    heroImage: '/images/destinations/baie-des-chaleurs.avif',
    heroImageAlt: 'Tentes et VR au bord de la mer dans la Baie-des-Chaleurs.',
    shortDescription:
      'Un camping au bord de la mer pour profiter de la plage, des activités nautiques et des soirées au feu de camp.',
    longIntro:
      'La Baie-des-Chaleurs est réputée pour sa douceur relative et ses plages. Un camping bien situé dans ce secteur permet de profiter des baignades, des cantines de bord de route et des petits villages côtiers tout en gardant la mer à deux pas.',
    tags: ['Bord de la mer', 'Familial', 'Plage'],
    seoKeywords: [
      'camping baie des chaleurs',
      'camping plage gaspésie',
      'camping bord de mer québec',
    ],
    typicalPrice: 'Environ 38–80 $ / nuit selon type de site et services',
    openPeriod: 'En général de juin à septembre',
    siteTypes: [
      'Sites près de la plage',
      'Sites plus en retrait, parfois plus calmes',
      'Emplacements pour tentes et VR',
    ],
    idealFor: [
      'Familles en vacances d’été',
      'Amateurs de plage et de baignade',
      'Road trip Gaspésie côté sud',
    ],
    services: [
      'Accès à la plage',
      'Blocs sanitaires',
      'Parfois jeux pour enfants et petites animations',
    ],
    pros: [
      'Accès direct ou très proche de la mer',
      'Ambiance vacances très marquée en été',
      'Idéal pour les familles et les groupes d’amis',
    ],
    cons: [
      'Peut être plus bruyant en haute saison',
      'Exposé au vent et au soleil; prévoir abris adaptés',
    ],
    rating: 4.5,
    highlights: ['Plage', 'Baignade', 'Couchers de soleil'],
    practical: {
      seasonBest: 'Juillet–août pour la baignade; juin et septembre plus calmes.',
      notes:
        'Prévoir protection solaire, coupe-vent et vêtements adaptés aux soirées fraîches malgré le nom “Baie-des-Chaleurs”.',
    },
    itineraryIdeas: [
      {
        title: '7 jours Gaspésie côté sud',
        description:
          'Base de quelques nuits à la Baie-des-Chaleurs, avec visites de villages, sorties en mer et découverte des cantines et microbrasseries.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Villages côtiers de la Baie-des-Chaleurs',
        description: 'Plusieurs petits ports, plages et points de vue accessibles en voiture.',
      },
    ],
    bookingLinks: [
      {
        label: 'Camping baie des chaleurs',
        href: 'https://www.campingbaiedeschaleurs.com/le-camping-1',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 6. Camping Tadoussac – Côte-Nord */
  {
    slug: 'camping-tadoussac-cote-nord',
    name: 'Camping Tadoussac & Côte-Nord',
    region: 'Côte-Nord',
    location: 'Tadoussac, Québec',
    heroImage: '/images/destinations/tadoussac-camping.avif',
    heroImageAlt: 'Vue sur le fleuve près d’un camping à Tadoussac.',
    shortDescription:
      'Un camping stratégique pour combiner fjord, baleines et villages de la Côte-Nord.',
    longIntro:
      'Autour de Tadoussac, plusieurs campings permettent de profiter de la vue sur le fleuve et d’accéder rapidement aux excursions d’observation des baleines. C’est une étape presque incontournable pour un premier voyage en Côte-Nord.',
    tags: ['Baleines', 'Vue sur le fleuve', 'Road trip'],
    seoKeywords: ['camping tadoussac', 'camping baleines cote-nord', 'camping fjord saint-laurent'],
    typicalPrice: 'Environ 40–90 $ / nuit selon le camping choisi',
    openPeriod: 'Saison estivale, généralement de juin à septembre',
    siteTypes: [
      'Sites pour tentes et VR (selon camping)',
      'Certains emplacements avec vue sur le fleuve',
    ],
    idealFor: [
      'Amateurs de baleines et de sorties en mer',
      'Road trip Côte-Nord / Saguenay',
      'Voyageurs qui aiment combiner nature et villages',
    ],
    services: [
      'Blocs sanitaires (selon camping)',
      'Proximité du village de Tadoussac',
      'Accès aux croisières d’observation des baleines',
    ],
    pros: [
      'Localisation parfaite pour voir les baleines',
      'Ambiance maritime unique',
      'Étape clé entre Saguenay, Charlevoix et Côte-Nord',
    ],
    cons: [
      'Beaucoup de visiteurs en haute saison',
      'Le vent et le brouillard peuvent être fréquents',
    ],
    rating: 4.7,
    highlights: ['Baleines', 'Fjord', 'Villages côtiers'],
    practical: {
      seasonBest: 'Juillet–septembre pour maximiser les chances d’observation des baleines.',
      notes:
        'Réserver les croisières à l’avance, surtout en fin de semaine et pendant les vacances.',
    },
    itineraryIdeas: [
      {
        title: '3 jours Saguenay – Tadoussac',
        description:
          'Une nuit au Saguenay, deux nuits près de Tadoussac pour combiner fjord, baleines et villages.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Excursions aux baleines',
        description: 'Départs multiples depuis Tadoussac et les environs.',
      },
      {
        name: 'Village de Tadoussac',
        description: 'Charmant village avec plage, sentiers et points de vue sur le fleuve.',
      },
    ],
    bookingLinks: [
      {
        label: 'Informations touristiques Tadoussac',
        href: 'https://vacancesessipit.com/camping/camping-tadoussac/',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 7. Parc national de la Jacques-Cartier – région de Québec */
  {
    slug: 'camping-parc-jacques-cartier',
    name: 'Camping – Parc national de la Jacques-Cartier',
    region: 'Région de Québec',
    location: 'Près de Stoneham, Québec',
    heroImage: '/images/destinations/camping-jacques-cartier.avif',
    heroImageAlt:
      'Vallée encaissée et rivière bordée de forêts dans le parc de la Jacques-Cartier.',
    shortDescription:
      'Un camping de vallée glaciaire à moins d’une heure de Québec, idéal pour la randonnée et les activités en rivière.',
    longIntro:
      'Le parc national de la Jacques-Cartier est l’un des meilleurs compromis entre ville et nature. Son camping permet d’alterner journées en rivière, randonnées et escapades à Québec. C’est une excellente base pour un long week-end actif.',
    tags: ['Rivière', 'Randonnée', 'Proche de Québec'],
    seoKeywords: [
      'camping parc jacques-cartier',
      'camping proche québec',
      'camping rivière québec',
    ],
    typicalPrice: 'Environ 37–82 $ / nuit selon type d’emplacement',
    openPeriod: 'Généralement de mai à octobre',
    siteTypes: [
      'Emplacements pour tentes (sites boisés)',
      'Emplacements avec services pour VR',
      'Prêt-à-camper (selon l’offre SEPAQ)',
    ],
    idealFor: [
      'Familles actives',
      'Groupes d’amis',
      'Voyageurs voulant combiner ville de Québec et nature',
    ],
    services: [
      'Blocs sanitaires avec douches',
      'Poste d’accueil et information sur la rivière',
      'Location d’embarcations (canot, kayak, etc. via la SEPAQ)',
    ],
    pros: [
      'À moins d’une heure de la ville de Québec',
      'Magnifique vallée glaciaire',
      'Nombreuses activités pour tous les niveaux',
    ],
    cons: [
      'Très populaire les fins de semaine et jours fériés',
      'Certaines zones peuvent être plus animées l’été',
    ],
    rating: 4.6,
    highlights: ['Rivière Jacques-Cartier', 'Canot', 'Proximité de Québec'],
    practical: {
      distanceFromCity: 'À environ 45–60 minutes de Québec en voiture.',
      seasonBest: 'Juin–septembre pour les activités nautiques; octobre pour les couleurs.',
      notes:
        'Réserver tôt pour les fins de semaine d’été; vérifier le niveau de la rivière et les consignes de sécurité.',
    },
    itineraryIdeas: [
      {
        title: '3 jours Québec + Jacques-Cartier',
        description:
          'Une journée en ville, deux nuits en camping dans le parc pour alterner culture et plein air.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Ville de Québec',
        description: 'Accès rapide au Vieux-Québec, à ses restaurants et à son patrimoine.',
      },
    ],
    bookingLinks: [
      {
        label: 'Réservation via la SEPAQ',
        href: 'https://www.sepaq.com/fr/reservation/camping/parc-national-de-la-jacques-cartier?from=2025-08-01',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 8. Parc national du Mont-Tremblant – Laurentides */
  {
    slug: 'camping-parc-mont-tremblant',
    name: 'Camping – Parc national du Mont-Tremblant',
    region: 'Laurentides',
    location: 'Région de Mont-Tremblant, Québec',
    heroImage: '/images/destinations/camping-mont-tremblant.avif',
    heroImageAlt: 'Lac, forêt et emplacements de camping dans le parc du Mont-Tremblant.',
    shortDescription:
      'Un camping très complet avec lacs, plages, pistes cyclables et accès à la station de villégiature de Tremblant.',
    longIntro:
      'Le parc national du Mont-Tremblant offre plusieurs secteurs de camping, certains plus familiaux, d’autres plus tranquilles. Entre lacs, plages, sentiers et proximité de la station touristique, c’est un excellent choix pour les familles actives.',
    tags: ['Plage', 'Famille', 'VR', 'Laurentides'],
    seoKeywords: [
      'camping mont-tremblant',
      'camping parc national tremblant',
      'camping famille laurentides',
    ],
    typicalPrice: 'Environ 45–95 $ / nuit selon secteur et services',
    openPeriod: 'Généralement de mai à octobre (certains secteurs peuvent varier)',
    siteTypes: [
      'Emplacements pour tentes en forêt',
      'Emplacements pour VR 2 ou 3 services',
      'Prêt-à-camper en secteurs sélectionnés',
    ],
    idealFor: [
      'Familles qui veulent beaucoup d’activités',
      'Cyclistes, randonneurs, amateurs de lac',
      'Road trip Laurentides',
    ],
    services: [
      'Plages aménagées ou accès lac',
      'Blocs sanitaires complets',
      'Accès à des sentiers de randonnée et de vélo',
      'Proximité de la station touristique de Tremblant',
    ],
    pros: [
      'Beaucoup d’activités pour tous les âges',
      'Cadre de lacs et de montagnes',
      'Proximité de la station de Tremblant (services, restos, etc.)',
    ],
    cons: [
      'Certains secteurs sont très animés en haute saison',
      'Moins adapté si vous cherchez le silence absolu',
    ],
    rating: 4.4,
    highlights: ['Plages', 'Activités familiales', 'Laurentides'],
    practical: {
      seasonBest:
        'Juillet–août pour profiter pleinement des plages; juin et septembre pour plus de calme.',
      notes:
        'Bien choisir le secteur de camping selon que vous cherchez l’animation ou la tranquillité.',
    },
    itineraryIdeas: [
      {
        title: '4 jours dans les Laurentides',
        description:
          'Deux à trois nuits au parc, une journée à la station Tremblant, activités vélo, plage et randonnée.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Station Mont-Tremblant',
        description: 'Village piétonnier avec restaurants, boutiques et activités quatre saisons.',
      },
    ],
    bookingLinks: [
      {
        label: 'Réservation via la SEPAQ',
        href: 'https://www.sepaq.com/en/reservation/camping/parc-national-du-mont-tremblant',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },

  /* 9. Parc national du Mont-Mégantic – Estrie */
  {
    slug: 'camping-parc-mont-megantic',
    name: 'Camping – Parc national du Mont-Mégantic',
    region: 'Estrie',
    location: 'Région du Mont-Mégantic, Québec',
    heroImage: '/images/destinations/mont-megantic.avif',
    heroImageAlt: 'Ciel étoilé au-dessus d’un camping en forêt dans le parc du Mont-Mégantic.',
    shortDescription:
      'Le camping idéal pour les amoureux du ciel étoilé, au cœur de la Réserve internationale de ciel étoilé.',
    longIntro:
      'Le parc national du Mont-Mégantic est une référence mondiale en matière de protection du ciel nocturne. Son camping permet d’allier randonnées, observation des étoiles et visites de l’observatoire. C’est une expérience à part, surtout pour ceux qui fuient la pollution lumineuse.',
    tags: ['Ciel étoilé', 'Calme', 'Randonnée'],
    seoKeywords: ['camping mont megantic', 'camping ciel étoilé', 'camping astronomie québec'],
    typicalPrice: 'Environ 32–70 $ / nuit selon services',
    openPeriod: 'Généralement de la fin du printemps au début de l’automne',
    siteTypes: ['Sites pour tentes en forêt', 'Quelques emplacements pour VR (selon secteur)'],
    idealFor: [
      'Amateurs d’astronomie et de ciel étoilé',
      'Couples et familles calmes',
      'Road trip Estrie / Cantons-de-l’Est',
    ],
    services: [
      'Blocs sanitaires',
      'Accès aux activités liées à l’observatoire (selon programmation)',
      'Sentiers de randonnée en montagne',
    ],
    pros: [
      'Ciel nocturne exceptionnel',
      'Ambiance calme et respectueuse de la noirceur',
      'Idéal pour décrocher des écrans et de la ville',
    ],
    cons: [
      'Lumière limitée la nuit (à la fois contrainte et magie du lieu)',
      'Nuits souvent fraîches; bon équipement nécessaire',
    ],
    rating: 4.8,
    highlights: ['Ciel étoilé', 'Observatoire', 'Randonnée'],
    practical: {
      seasonBest: 'Nuits claires de juin à septembre; certaines activités astro à horaires précis.',
      notes:
        'Prévoir des vêtements très chauds même en été; respecter les règles sur l’éclairage (lampes rouges).',
    },
    itineraryIdeas: [
      {
        title: '4 jours Cantons-de-l’Est & ciel étoilé',
        description:
          'Deux nuits dans un camping plus animé des Cantons-de-l’Est, puis deux nuits à Mégantic pour profiter du ciel nocturne.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Observatoire du Mont-Mégantic',
        description:
          'Activités d’astronomie, soirées d’observation et expositions (selon la programmation).',
      },
    ],
    bookingLinks: [
      {
        label: 'Réservation via la SEPAQ',
        href: 'https://www.sepaq.com/fr/reservation/camping/parc-national-du-mont-megantic',
      },
    ],
    internalLinks: COMMON_INTERNAL_LINKS,
  },
];
