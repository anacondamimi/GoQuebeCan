import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'singing-sands',
  ville: 'Singing Sands',
  resume: 'Découverte de Singing Sands et de ses attraits touristiques.',
  activites: [
    'Singing Sands Beach',
    'Bruce Peninsula National Park',
    'Fathom Five Marine Park',
    'Plage Singing Sands',
    'Sentier des Orchidées',
    'Centre des Visiteurs',
    'Randonnée Bruce Trail',
    'Kayak sur le Lac',
    'Plongée en Apnée',
  ],
  hebergements: ['Bruce Anchor Motel', 'Tobermory Princess Hotel', 'Cedar Vista Motel'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Stone Cove Waterfront Adults Only B&B',
    category: 'Romantique • Bord de l’eau',
    description:
      'B&B réservé aux adultes, directement au bord de l’eau, idéal pour un séjour calme à deux près de Singing Beach.',
    price: 'À partir de 208 $/nuit',
    link: 'https://www.expedia.ca/fr/Northern-Bruce-Peninsula-Hotels-Stone-Cove-Waterfront-Adults-Only-BB.h69567566.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763709635564&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=208&top_cur=CAD&userIntent=&selectedRoomType=322355851&selectedRatePlan=390870828&searchId=227769ba-4939-4a9e-90ba-897d97517b01',
    image: '/images/destinations/hotels/northern-bruce-peninsula-singingbeach.avif',
  },
  {
    name: 'The Sands',
    category: 'Près de la plage',
    description:
      'Hôtel moderne et confortable à South Bruce Peninsula, pratique pour profiter de Singing Beach et des environs.',
    price: 'À partir de 241 $/nuit',
    link: 'https://www.expedia.ca/fr/South-Bruce-Peninsula-Hotels-The-Sands.h106853214.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763709635574&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=241&top_cur=CAD&userIntent=&selectedRoomType=326825590&selectedRatePlan=402936326&searchId=227769ba-4939-4a9e-90ba-897d97517b01',
    image: '/images/destinations/hotels/south-bruce-singingbeach.avif',
  },
  {
    name: 'The Inn at Cobble Beach',
    category: 'Golf & vue sur la baie',
    description:
      'Auberge de charme au bord de l’eau avec terrain de golf, idéale pour une escapade plus chic après une journée à la plage.',
    price: 'À partir de 269 $/nuit',
    link: 'https://www.expedia.ca/fr/Owen-Sound-Hotels-The-Inn-At-Cobble-Beach.h10988635.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763709635642&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=269&top_cur=CAD&userIntent=&selectedRoomType=201381901&selectedRatePlan=206817993&searchId=227769ba-4939-4a9e-90ba-897d97517b01',
    image: '/images/destinations/hotels/owen-soundhotel-singingbeach.avif',
  },
];

const restaurants = [
  {
    name: 'Tobermory Brewing Co.',
    type: 'Pub & Restaurant',
    speciality: 'Bières artisanales et fruits de mer',
    price: '$$$',
    mustTry: 'Fish & Chips au poisson local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'The Fish & Chip Place',
    type: 'Fruits de mer',
    speciality: 'Poisson frais local',
    price: '$$',
    mustTry: 'Fish & Chips traditionnel',
    schedule: 'Mai à Septembre',
  },
  {
    name: 'The Sweet Shop',
    type: 'Café & Desserts',
    speciality: 'Glaces et pâtisseries maison',
    price: '$$',
    mustTry: 'Glace aux fruits locaux',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Singing Sands Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Entrée au parc: 12$/personne',
    description: 'Plage unique avec sable chantant et eaux peu profondes',
  },
  {
    name: 'Bruce Peninsula National Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '12$/personne',
    description: 'Sentiers côtiers et formations rocheuses',
  },
  {
    name: 'Fathom Five Marine Park',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Excursions en bateau à fond de verre',
  },
];

const familyActivities = [
  {
    title: 'Plage Singing Sands',
    description: 'Eaux peu profondes et sable doux (tous âges)',
    price: 'Inclus avec entrée au parc',
  },
  {
    title: 'Sentier des Orchidées',
    description: 'Promenade facile sur passerelles (tous âges)',
    price: 'Inclus avec entrée au parc',
  },
  {
    title: 'Centre des Visiteurs',
    description: 'Expositions interactives (5-12 ans)',
    price: 'Gratuit avec entrée au parc',
  },
];

const teenActivities = [
  {
    title: 'Randonnée Bruce Trail',
    description: 'Sentiers côtiers spectaculaires (12+ ans)',
    price: 'Inclus avec entrée au parc',
    duration: '2-4 heures',
  },
  {
    title: 'Kayak sur le Lac',
    description: 'Location et excursions guidées (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Plongée en Apnée',
    description: 'Découverte des eaux cristallines (14+ ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleSingingSands() {
  return (
    <article id="blog_article_singing_sands" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Singing Sands Beach - La Plage au Sable Chantant</H1>
        <p className="text-xl text-gray-600">
          Découvrez cette plage unique de la péninsule Bruce, où le sable émet un son mystérieux
          sous vos pas
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Singing Sands Beach, située dans le parc national de la Péninsule-Bruce, est un joyau
          naturel unique où le sable fin émet un son particulier lorsqu'on marche dessus. Avec ses
          eaux peu profondes et cristallines, sa flore rare et ses couchers de soleil
          spectaculaires, elle offre une expérience balnéaire incomparable.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/singing-sands.avif"
            alt="Singing Sands Beach"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Singing Sands ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Sable Chantant</H3>
            <p className="text-gray-600">
              Phénomène naturel unique où le sable émet un son sous vos pas.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Eaux Cristallines</H3>
            <p className="text-gray-600">
              Eaux peu profondes et transparentes idéales pour la baignade.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Écosystème Unique</H3>
            <p className="text-gray-600">
              Orchidées rares et plantes carnivores dans les marais côtiers.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Activités et Attractions
        </H2>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.name} className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.name}</H3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  <span>Prix: {activity.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour Enfants
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {familyActivities.map((activity) => (
            <div key={activity.title} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.title}</H3>
              <p className="mb-2 text-gray-600">{activity.description}</p>
              <p className="font-medium text-indigo-600">{activity.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Sun className="size-8 text-indigo-600" />
          Activités pour Adolescents
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {teenActivities.map((activity) => (
            <div key={activity.title} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.title}</H3>
              <p className="mb-2 text-gray-600">{activity.description}</p>
              <div className="mt-4 flex flex-col gap-1">
                <p className="font-medium text-indigo-600">{activity.price}</p>
                <p className="text-sm text-gray-500">Durée: {activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Hotel className="size-8 text-indigo-600" />
          Où Dormir ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.link}
              className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  className="size-full object-cover"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <H3 className="text-xl font-semibold text-gray-900">{hotel.name}</H3>
                  <span className="rounded bg-indigo-100 px-2 py-1 text-sm text-indigo-700">
                    {hotel.category}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{hotel.description}</p>
                <p className="font-semibold text-indigo-600">{hotel.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Utensils className="size-8 text-indigo-600" />
          Où Manger ?
        </H2>
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.name} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <H3 className="mb-1 text-xl font-semibold text-gray-900">{restaurant.name}</H3>
                  <p className="text-gray-600">{restaurant.type}</p>
                </div>
                <span className="font-semibold text-indigo-600">{restaurant.price}</span>
              </div>
              <p className="mb-2 text-gray-700">
                <span className="font-medium">Spécialité:</span> {restaurant.speciality}
              </p>
              <p className="mb-2 text-gray-700">
                <span className="font-medium">À essayer:</span> {restaurant.mustTry}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Horaires:</span> {restaurant.schedule}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Bus className="size-8 text-indigo-600" />
          Comment s'y Rendre ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Depuis les Grandes Villes</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                4h en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                8h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus jusqu'à Tobermory puis navette
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture nécessaire pour accéder au parc
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette depuis Tobermory en été
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-8 text-indigo-600" />
          Conseils Pratiques
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Calendar className="size-5 text-indigo-600" />
              Meilleure Période
            </H3>
            <p className="text-gray-600">
              De juin à septembre pour la baignade. Mai et septembre pour éviter les foules.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 149-179$/nuit Activités: 12-65$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Arrivez tôt car le stationnement est limité.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Singing Sands ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez cette plage unique de l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/bruce-peninsula.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.pc.gc.ca/en/pn-np/on/bruce"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
