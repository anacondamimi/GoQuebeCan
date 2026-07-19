// src/data/partners.ts

export type PartnerCategory = 'entreprise-locale' | 'tourisme' | 'producteur';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  url: string;
  logo?: string;
  image?: string;
  officialPartner?: boolean;
}

export const partners: Partner[] = [
  {
    id: 'anamimizen',
    name: 'AnamimiZen',
    category: 'entreprise-locale',
    description:
      'Entreprise québécoise locale axée sur le bien-être, l’accompagnement et les approches positives.',
    url: 'https://www.anamimizen.com',
    logo: '/images/logo.avif',
    image: '/images/offres/coups-de-coeur-anamimizen.avif',
    officialPartner: true,
  },
];

export const partnerGroups = [
  {
    key: 'entreprise-locale',
    title: 'Entreprises locales',
    description: 'Des entreprises québécoises à découvrir et à soutenir.',
  },
  {
    key: 'tourisme',
    title: 'Tourisme',
    description: 'Des organismes et ressources utiles pour voyager au Québec.',
  },
  {
    key: 'producteur',
    title: 'Producteurs locaux',
    description: 'Des producteurs, artisans et saveurs locales du Québec.',
  },
] as const;
