

import React from 'react';
import Image from 'next/image';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_SAUBLE_BEACH } from '@/data/hotels/byArticle/sauble-beach';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'sauble-beach',
  ville: 'Sauble Beach',
  resume: 'Découverte de Sauble Beach et de ses attraits touristiques.',
  activites: [
    'Plage de Sauble',
    'Sauble Falls Provincial Park',
    'Sauble Speedway',
    'Zone Familiale de la Plage',
    'Mini-Golf Sauble',
    'Parc Aquatique Gonflable',
    'École de Surf',
    'Location de Jet-Ski',
    'Beach Volleyball',
  ],
  hebergements: ['Sauble Beach Lodge', 'Beach Resort Sauble', 'Sauble River Marina'],
  publics: ['familles', 'ados'],
};
const hotels = pickHotels(HOTEL_IDS_SAUBLE_BEACH);

const restaurants = [
  {
    name: 'Casero Kitchen',
    type: 'Cuisine Fusion',
    speciality: 'Tacos de poisson et cuisine mexicaine',
    price: '$$$',
    mustTry: 'Tacos au poisson frais',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Two Chicks Café',
    type: 'Café-Restaurant',
    speciality: 'Brunch et café de spécialité',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: "Toute l'année",
  },
  {
    name: "Walker's Fish & Chips",
    type: 'Fruits de mer',
    speciality: 'Fish & Chips traditionnel',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Plage de Sauble',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: '11 km de sable blanc et eau cristalline',
  },
  {
    name: 'Sauble Falls Provincial Park',
    type: 'Nature',
    duration: '2-3 heures',
    price: '12$/véhicule',
    description: 'Cascades et sentiers de randonnée',
  },
  {
    name: 'Sauble Speedway',
    type: 'Divertissement',
    duration: '2-3 heures',
    price: '25$/personne',
    description: 'Course automobile et événements spéciaux',
  },
];

const familyActivities = [
  {
    title: 'Zone Familiale de la Plage',
    description: 'Secteur surveillé et peu profond (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Sauble',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
  {
    title: 'Parc Aquatique Gonflable',
    description: 'Structures flottantes (5+ ans)',
    price: '25$/enfant',
  },
];

const teenActivities = [
  {
    title: 'École de Surf',
    description: 'Cours de surf sur le lac (12+ ans)',
    price: '65$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Location de Jet-Ski',
    description: 'Excursion guidée (16+ ans)',
    price: '85$/heure',
    duration: '1-2 heures',
  },
  {
    title: 'Beach Volleyball',
    description: 'Terrains de volleyball (12+ ans)',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
];

export default function BlogArticleSaubleBeach() {
  return (
    <DestinationArticleTemplate
      slug="sauble-beach"
      title="Sauble Beach – La grande plage familiale de la Bruce Peninsula"
    >
      <article id="blog/sauble-beach" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Étendue de sable immense, eau claire du lac Huron, ambiance estivale et activités pour
            tous — parfaite pour une journée détente en famille.
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Sauble Beach, deuxième plus longue plage d'eau douce au monde après Wasaga Beach, offre
            11 kilomètres de sable blanc bordant les eaux cristallines du lac Huron. Cette
            destination estivale prisée combine plage de rêve, sports nautiques et ambiance
            décontractée typique des villes balnéaires.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/sauble-beach.avif"
              alt="Sauble Beach"
              width={1200}
              height={600}
              className="h-96 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Activités et Attractions"
            subtitle="Plongez dans toutes les expériences que Sauble Beach peut offrir"
            icon={<Star className="size-6" />}
          />
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
          <SectionTitle title="Activités pour Enfants" icon={<Star className="size-6" />} />
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
          <SectionTitle title="Activités pour Adolescents" icon={<Sun className="size-6" />} />
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
          <SectionTitle
            title="Où Dormir ?"
            subtitle="Découvrez les meilleures options d’hébergement à proximité de la plage."
            icon={<Hotel className="size-6" />}
          />
          {/* MIGRATED_HOTELS_GRID */}
          <HotelGrid items={hotels} />
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Où Manger ?"
            subtitle="Restaurants recommandés pour toutes les envies."
            icon={<Utensils className="size-6" />}
          />
          <RestaurantPremiumGrid items={restaurants} />
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Comment s’y Rendre ?"
            subtitle="Infos transport pour accéder facilement à la destination."
            icon={<Bus className="size-6" />}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Depuis les Grandes Villes</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  2h30 en voiture depuis Toronto
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  7h30 en voiture depuis Montréal
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus interurbain disponible en été
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Location de vélos disponible
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Navette de plage en haute saison
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
          <SectionTitle
            title="Conseils Pratiques"
            subtitle="Préparez votre séjour en toute sérénité."
            icon={<Calendar className="size-6" />}
          />
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
                Hébergement: 149-199$/nuit Activités: 25-85$/jour Repas: 20-50$/personne
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation essentielle en haute saison. Stationnement payant près de la plage.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Sauble Beach ?</H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et profitez d'une des plus belles plages de l'Ontario
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={bookingAwin('https://www.booking.com/city/ca/sauble-beach.html')}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://www.saublebeach.com"
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
