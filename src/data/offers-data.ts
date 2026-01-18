// src/data/offers-data.ts
import type { OfferInput, Offer } from '@/types/offer';
import { normalizeOffer, sortAndFilterOffers } from '@/types/offer';

// ⚠️ Remplace les "TODO: contentful full path" par tes URLs Contentful complètes
// (tu peux les retrouver dans le back-office ou via l'audit Lighthouse).

const RAW_OFFERS: OfferInput[] = [
  {
    id: 'charlevoix-train',
    title: 'Train de Charlevoix — Vue sur le fleuve',
    slug: 'train-charlevoix-vue-fleuve',
    description: 'Parcours panoramique entre Québec et Baie-Saint-Paul.',
    image: {
      // Extrait de Lighthouse: LG-traincharlevoix-3.jpg
      src: 'https://images.ctfassets.net/60cwygank9pk/5LsVtbMc7BLrpwydx0P4mP/daff7309518e7d30efb02061b54bb394/LG-traincharlevoix-3.jpg?w=1700&fm=webp&q=80', // TODO: contentful full path
      alt: 'Train de Charlevoix longeant le fleuve',
      provider: 'contentful',
    },
    priceFrom: 49,
    categories: ['train', 'activite'],
    vendor: 'Train de Charlevoix',
    url: 'https://www.tuango.ca/fr/deal/unique-experience-quebec-train-charlevoix?utm_source=Direct&utm_campaign=Direct&utm_medium=Tuango+Site',
    utm: { source: 'goquebecan', medium: 'referral', campaign: 'offres' },
  },
  {
    id: 'manoir-des-sables',
    title: 'Hôtel Manoir des Sables — Forfait détente',
    slug: 'manoir-des-sables-forfait-detente',
    description: 'Spa, piscine et vue sur le Mont-Orford.',
    image: {
      // Extrait Lighthouse: LG-manoirdessables-5.jpg
      src: 'https://images.ctfassets.net/60cwygank9pk/679zUxuh8vP1yzg0tSjEqs/84222d717d4d3940e71dfc7419db78cd/LG-manoirdessables-5.jpg?w=1700&fm=webp&q=80', // TODO: contentful full path
      alt: 'Piscine extérieure du Manoir des Sables',
      provider: 'contentful',
    },
    priceFrom: 139,
    categories: ['hotel', 'forfait'],
    vendor: 'Manoir des Sables',
    url: 'https://www.tuango.ca/fr/deal/sejour-golf-petits-dejeuners-manoir-des-sables?utm_source=Direct&utm_campaign=Direct&utm_medium=Tuango+Site',
    utm: { source: 'goquebecan', medium: 'referral', campaign: 'offres' },
  },
  {
    id: 'anamimizen-offre-bienvenue-accompagnement',
    title: 'Besoin de souffler, de retrouver de la clarté et un meilleur équilibre intérieur ?',
    slug: 'anamimizen-offre-bienvenue-accompagnement-bien-etre',
    description:
      'AnamimiZen vous offre un cadre attentif pour apaiser le mental, relâcher les tensions émotionnelles et retrouver plus de sérénité au quotidien.',
    image: {
      // 👉 image locale recommandée
      src: '/images/offers/anamimizen.avif',
      alt: 'Moment de calme et de recentrage — accompagnement bien-être AnamimiZen',
      provider: 'local',
    },
    priceFrom: 80,
    categories: ['autre'],
    vendor: 'AnamimiZen',
    url: 'https://anamimizen.com',
    utm: {
      source: 'goquebecan',
      medium: 'referral',
      campaign: 'offres-bienvenue',
    },
    promo: {
      type: 'percent',
      value: 15,
      code: 'GOQUEBECAN15',
      label: 'Offre de bienvenue – première séance',
    },
  },

  {
    id: 'tuango-au-petit-chalet',
    title: 'Au Petit Chalet — Repas table d’hôte & bières (Tuango)',
    slug: 'au-petit-chalet-table-dhote-bieres-tuango',
    description: 'Repas table d’hôte avec bières artisanales, ambiance chaleureuse.',
    image: {
      // Mets l’URL d’image (OG) quand tu l’as ; en attendant, placeholder local propre
      src: 'https://images.ctfassets.net/60cwygank9pk/3Xw4k4jfo2yKa0OZpv21ou/5b378d81f8064afb358d79e2fb8f9f63/LG-APC-Accueil.jpg?w=1700&fm=webp&q=80',
      alt: 'Repas table d’hôte et bières au Petit Chalet',
      provider: 'local',
    },
    // priceFrom:  — si tu as le prix (ex. 49), dé-commente et mets la valeur
    categories: ['autre'], // ou ['activite'] si tu veux
    vendor: 'Tuango',
    url: 'https://www.tuango.ca/fr/deal/repas-table-dhote-bieres-au-petit-chalet?utm_source=Direct&utm_campaign=Direct&utm_medium=Tuango+Site',
    utm: { source: 'goquebecan', medium: 'referral', campaign: 'offres' },
  },
  {
    id: 'sunwing-dreams-bahia-mita',
    title: 'Dreams Bahia Mita Surf & Spa — Riviera Nayarit (Sunwing)',
    slug: 'sunwing-dreams-bahia-mita-riviera-nayarit',
    description:
      'Resort en bord de mer avec spa, surf et piscines — idéal pour une évasion au soleil.',
    image: {
      src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/337131565.jpg?k=b0f204aaa34747536fd58c657f73fd92c96052759fe508027c319e23ece461a9&o=', // remplace par l’image OG quand tu l’as
      alt: 'Dreams Bahia Mita Surf & Spa, Riviera Nayarit — piscine et plage',
      provider: 'local',
    },
    // priceFrom: ,
    categories: ['hotel', 'forfait'],
    vendor: 'Sunwing',
    url: 'https://www.sunwing.ca/en/hotel/mexico/riviera-nayarit/dreams-bahia-mita-surf-and-spa-resort',
    utm: { source: 'goquebecan', medium: 'referral', campaign: 'offres' },
  },
  {
    id: 'tuango-promenades-fantomes-vieux-quebec',
    title: 'Promenades Fantômes — Visites animées du Vieux-Québec (Tuango)',
    slug: 'promenades-fantomes-visites-animees-vieux-quebec-tuango',
    description:
      'Plongez dans les légendes et mystères du Vieux-Québec lors d’une visite animée en soirée.',
    image: {
      src: 'https://images.ctfassets.net/60cwygank9pk/6KPvk3emMJcXXqNYdApLDj/25695952ecbf6c096cb560dd1a39a59d/LG-fev-promenadefantomes-2.jpg?w=1700&fm=webp&q=80', // remplace par l’image OG quand tu l’as
      alt: 'Visite animée des Promenades Fantômes dans le Vieux-Québec',
      provider: 'local',
    },
    // priceFrom: ,
    categories: ['activite'],
    vendor: 'Tuango',
    url: 'https://www.tuango.ca/fr/deal/promenades-fantomes-visites-animees-vieux-quebec?utm_source=Direct&utm_campaign=Direct&utm_medium=Tuango+Site',
    utm: { source: 'goquebecan', medium: 'referral', campaign: 'offres' },
  },
];

// Normalisation + filtre (publiées / fenêtres de dates) + tri (prix)
const OFFERS: Offer[] = sortAndFilterOffers(RAW_OFFERS.map(normalizeOffer));

export default OFFERS;
