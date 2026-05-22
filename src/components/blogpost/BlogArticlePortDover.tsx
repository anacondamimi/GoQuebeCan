import Image from 'next/image';
import React from 'react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_PORT_DOVER } from '@/data/hotels/byArticle/port-dover';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'port-dover',
  ville: 'Port Dover',
  resume: 'Découverte de Port Dover et de ses attraits touristiques.',
  activites: [
    'Port Dover Beach',
    'Port Dover Harbour Museum',
    'Long Point Eco-Adventures',
    'Plage Principale',
    'Mini-Golf Pirates',
    'Port Dover Harbour Museum',
    'Location de SUP',
    'Surf sur le Lac',
    'Tyrolienne',
  ],
  hebergements: ['Erie Beach Hotel', 'Dover Coast Resort', 'Lighthouse Festival Theatre Inn'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};

// ✅ Imports déplacés automatiquement

const hotels = pickHotels(HOTEL_IDS_PORT_DOVER);

const restaurants = [
  {
    name: 'The Beach House',
    type: 'Fruits de mer',
    speciality: 'Perche du lac Érié et fruits de mer',
    price: '$$$',
    mustTry: 'Fish & Chips au perche frais',
    schedule: "Toute l'année",
  },
  {
    name: "Knechtel's",
    type: 'Restaurant Familial',
    speciality: 'Cuisine locale et fruits de mer',
    price: '$$',
    mustTry: 'Perche frit style Lake Erie',
    schedule: "Toute l'année",
  },
  {
    name: "David's Restaurant",
    type: 'Bistro',
    speciality: 'Cuisine internationale',
    price: '$$$',
    mustTry: 'Fruits de mer grillés',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Port Dover Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: 'Plage de sable doré avec eaux cristallines',
  },
  {
    name: 'Port Dover Harbour Museum',
    type: 'Culture',
    duration: '1-2 heures',
    price: '8$/personne',
    description: 'Histoire maritime et culture locale',
  },
  {
    name: 'Long Point Eco-Adventures',
    type: 'Aventure',
    duration: '2-3 heures',
    price: 'À partir de 45$/personne',
    description: 'Tyrolienne et parcours dans les arbres',
  },
];

const familyActivities = [
  {
    title: 'Plage Principale',
    description: 'Zone surveillée et eaux peu profondes (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Pirates',
    description: 'Parcours thématique maritime (tous âges)',
    price: '12$/personne',
  },
  {
    title: 'Port Dover Harbour Museum',
    description: 'Activités interactives pour enfants (5-12 ans)',
    price: 'Gratuit -12 ans',
  },
];

const teenActivities = [
  {
    title: 'Location de SUP',
    description: 'Planche à pagaie sur le lac (12+ ans)',
    price: '35$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Surf sur le Lac',
    description: 'Initiation au surf lacustre (14+ ans)',
    price: '75$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Tyrolienne',
    description: 'Parcours aérien (12+ ans)',
    price: '45$/personne',
    duration: '2-3 heures',
  },
];

export default function BlogArticlePortDover() {
  return (
    <DestinationArticleTemplate
      slug="port-dover"
      title="Port Dover - Charme Balnéaire sur le Lac Érié"
    >
      <article id="blog_article_port_dover" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Découvrez cette charmante ville portuaire de l'Ontario, réputée pour ses plages dorées,
            sa culture maritime et sa gastronomie locale
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Port Dover, pittoresque ville portuaire sur les rives du lac Érié, combine le charme
            d'un village de pêcheurs avec l'ambiance animée d'une station balnéaire. Réputée pour
            ses plages dorées, ses fruits de mer frais et son riche patrimoine maritime, elle offre
            une expérience authentique de la vie au bord du lac.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/port-dover.avif"
              alt="Port Dover"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter Port Dover ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Plages Dorées</H3>
              <p className="text-gray-600">Sable fin et eaux cristallines du lac Érié.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Gastronomie Maritime</H3>
              <p className="text-gray-600">
                Meilleurs fish & chips et fruits de mer frais de l'Ontario.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Culture Portuaire</H3>
              <p className="text-gray-600">Riche histoire maritime et festivals traditionnels.</p>
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
          {/* MIGRATED_HOTELS_GRID */}
          <HotelGrid items={hotels} />
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Utensils className="size-8 text-indigo-600" />
            Où Manger ?
          </H2>
          <RestaurantPremiumGrid items={restaurants} />
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
                  6h30 en voiture depuis Montréal
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
                  Centre-ville accessible à pied
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Location de vélos disponible
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Taxi et services de transport local
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
                De juin à septembre pour la baignade. Festivals et événements tout l'été.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <DollarSign className="size-5 text-indigo-600" />
                Budget
              </H3>
              <p className="text-gray-600">
                Hébergement: 139-189$/nuit Activités: 8-75$/jour Repas: 15-45$/personne
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation conseillée en haute saison. Très animé les week-ends d'été.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Port Dover ?</H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et profitez du charme balnéaire de l'Ontario
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={bookingAwin('https://www.booking.com/city/ca/port-dover.html')}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://www.portdover.ca"
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Explorer les Activités
            </a>
          </div>
        </section>
      </article>
    </DestinationArticleTemplate>
  );
}
