import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'wasaga-beach',
  ville: 'Wasaga Beach',
  resume: 'Découverte de Wasaga Beach et de ses attraits touristiques.',
  activites: [
    'Plage Principale',
    'Wasaga Beach Provincial Park',
    'Nancy Island Historic Site',
    'Plage Zone 1',
    'Location de Pédalos',
    'Mini-Golf Pirates',
    'Location de SUP',
    'Beach Volleyball',
    'Surf sur la Baie',
  ],
  hebergements: ['Wasaga Riverdocks Hotel', 'Beach Front Resort', 'Wasaga Motel'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Saga Resort',
    category: 'Familial près de la plage',
    description:
      'Complexe avec chambres et petits appartements, piscine extérieure et aire de jeux, parfait pour profiter de Wasaga Beach à pied.',
    price: 'À partir de 120 $/nuit',
    link: 'https://www.expedia.ca/fr/Wasaga-Beach-Hotels-SAGA-RESORT.h17405117.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763713351541&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=181914&destination=Wasaga+Beach%2C+Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=44.520741%2C-80.016067&sort=REVIEW_RELEVANT&top_dp=120&top_cur=CAD&userIntent=&selectedRoomType=201838547&selectedRatePlan=400296313&searchId=527dc4aa-81cc-404f-a4c7-9516c75cd205',
    image: '/images/destinations/hotels/wasaga-beach.avif',
  },
  {
    name: 'Hidden Gem',
    category: 'Maison de vacances',
    description:
      'Grande maison entièrement équipée, idéale pour un séjour en famille ou entre amis à quelques minutes de la plage de Wasaga.',
    price: 'À partir de 340 $/nuit',
    link: 'https://www.expedia.ca/fr/Wasaga-Beach-Hotels-Hidden-Gem.h94741293.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763713561441&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=181914&destination=Wasaga+Beach%2C+Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=44.520741%2C-80.016067&sort=REVIEW_RELEVANT&top_dp=340&top_cur=CAD&userIntent=&selectedRoomType=94741293&selectedRatePlan=00009ac40984a33c4dc49c8c118db165efd7&searchId=adb0bdb1-4661-49b9-8edf-ea8f29e81d85',
    image: '/images/destinations/hotels/hotel-hidden-wasagabeach.avif',
  },
  {
    name: 'Sandpiper Beach Resort - Cottage 10',
    category: 'Cottage en bord de plage',
    description:
      'Cottage confortable avec accès direct à la plage, parfait pour vivre l’expérience Wasaga Beach les pieds dans le sable.',
    price: 'À partir de 375 $/nuit',
    link: 'https://www.expedia.ca/fr/Barrie-Orillia-Hotels-SANDPIPER-BEACH-RESORT-Cottage-10.h38854991.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763713561429&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=181914&destination=Wasaga+Beach%2C+Ontario%2C+Canada&destType=BOUNDING_BOX&latLong=44.520741%2C-80.016067&sort=REVIEW_RELEVANT&top_dp=375&top_cur=CAD&userIntent=&selectedRoomType=38854991&selectedRatePlan=0000b518e7a24aeb4c6d970c57cb3170df8c&searchId=adb0bdb1-4661-49b9-8edf-ea8f29e81d85',
    image: '/images/destinations/hotels/cottage-wasagabeach.avif',
  },
];

const restaurants = [
  {
    name: 'Beach House Grill',
    type: 'Grill & Fruits de mer',
    speciality: 'Fruits de mer frais et grillades',
    price: '$$$',
    mustTry: 'Fish tacos et crevettes grillées',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Wasaga Bistro',
    type: 'Bistro',
    speciality: 'Cuisine internationale',
    price: '$$',
    mustTry: 'Burgers gourmet',
    schedule: "Toute l'année",
  },
  {
    name: 'Beach Bar',
    type: 'Bar & Grill',
    speciality: 'Cuisine de plage',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Plage Principale',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: "La plus longue plage d'eau douce au monde",
  },
  {
    name: 'Wasaga Beach Provincial Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '15$/véhicule',
    description: "Sentiers de randonnée et observation d'oiseaux",
  },
  {
    name: 'Nancy Island Historic Site',
    type: 'Culture',
    duration: '1-2 heures',
    price: '8$/personne',
    description: 'Histoire maritime et guerre de 1812',
  },
];

const familyActivities = [
  {
    title: 'Plage Zone 1',
    description: 'Zone familiale surveillée (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Location de Pédalos',
    description: 'Activité nautique familiale (5+ ans)',
    price: '25$/heure',
  },
  {
    title: 'Mini-Golf Pirates',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de SUP',
    description: 'Planche à pagaie sur la baie (12+ ans)',
    price: '35$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Beach Volleyball',
    description: 'Terrains de volleyball (12+ ans)',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
  {
    title: 'Surf sur la Baie',
    description: 'Initiation au surf (14+ ans)',
    price: '75$/2 heures',
    duration: '2 heures',
  },
];

export default function BlogArticleWasagaBeach() {
  return (
    <article id="blog_article_wasaga_beach" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Wasaga Beach - La Plus Longue Plage d'Eau Douce au Monde</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce paradis balnéaire de l'Ontario, avec ses 14 kilomètres de sable fin et ses
          activités pour toute la famille
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Wasaga Beach, située sur les rives de la baie Georgienne, est réputée pour être la plus
          longue plage d'eau douce au monde. Cette destination estivale par excellence combine
          plages de sable fin, sports nautiques et attractions familiales dans un cadre naturel
          exceptionnel.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/wasaga-beach.avif"
            alt="Wasaga Beach"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Wasaga Beach ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Plage Exceptionnelle</H3>
            <p className="text-gray-600">
              14 km de sable fin et d'eaux cristallines de la baie Georgienne.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Sports Nautiques</H3>
            <p className="text-gray-600">
              Large choix d'activités aquatiques pour tous les niveaux.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Ambiance Estivale</H3>
            <p className="text-gray-600">
              Restaurants en bord de plage et divertissements pour toute la famille.
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
                2h en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                7h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interurbain disponible
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette de plage gratuite
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Centre-ville accessible à pied
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
              De juin à septembre pour la baignade. Juillet-août pour les meilleures conditions.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 129-209$/nuit Activités: 15-75$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Plage surveillée dans les zones principales.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Wasaga Beach ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez de la plus longue plage d'eau douce au monde
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/wasaga-beach.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.wasagabeach.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
