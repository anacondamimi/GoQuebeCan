import Image from 'next/image';
import React from 'react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_CARLETON } from '@/data/hotels/byArticle/carleton';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Wind } from 'lucide-react';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'carleton-sur-mer',
  ville: 'Carleton',
  resume: 'Découverte de Carleton et de ses attraits touristiques.',
  activites: [
    'Mont Saint-Joseph',
    'Plage de Carleton',
    'Club nautique',
    'Initiation au Kayak',
    'Chasse aux Trésors',
    'Mini-Golf Maritime',
    'École de Voile',
    'Planche à Pagaie',
    'Vélo de Montagne',
  ],
  hebergements: ['Hostellerie Baie Bleue', 'Manoir Belle Plage', 'Auberge du Marchand'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};

// ✅ Imports déplacés automatiquement

const hotels = pickHotels(HOTEL_IDS_CARLETON);

const restaurants = [
  {
    name: 'Le Naufrageur',
    type: 'Microbrasserie & Restaurant',
    speciality: 'Bières artisanales et fruits de mer',
    price: '$$$',
    mustTry: 'Plateau de fruits de mer et bière locale',
    schedule: "Toute l'année",
  },
  {
    name: 'La Moulière',
    type: 'Fruits de mer',
    speciality: 'Moules et homard',
    price: '$$$$',
    mustTry: 'Moules marinières',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Dixie Lee',
    type: 'Cantine',
    speciality: 'Fruits de mer frits',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Avril à Octobre',
  },
];

const activities = [
  {
    name: 'Mont Saint-Joseph',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Panorama exceptionnel sur la baie des Chaleurs',
  },
  {
    name: 'Plage de Carleton',
    type: 'Plage',
    duration: 'À votre guise',
    price: 'Gratuit',
    description: 'Une des plus belles plages de la Gaspésie',
  },
  {
    name: 'Club nautique',
    type: 'Sports nautiques',
    duration: 'Variable',
    price: 'À partir de 50$/activité',
    description: 'Location de kayaks, planches à voile et voiliers',
  },
];

const familyActivities = [
  {
    title: 'Initiation au Kayak',
    description: "Cours d'initiation en eau calme (8+ ans)",
    price: '45$/personne',
  },
  {
    title: 'Chasse aux Trésors',
    description: 'Parcours ludique sur la plage (5-12 ans)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Maritime',
    description: 'Parcours thématique sur la mer (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'École de Voile',
    description: "Cours d'initiation à la voile (12+ ans)",
    price: '75$/demi-journée',
    duration: '3 heures',
  },
  {
    title: 'Planche à Pagaie',
    description: 'Location et cours de SUP (12+ ans)',
    price: '35$/heure',
    duration: 'Flexible',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers du Mont Saint-Joseph (13+ ans)',
    price: 'Location: 40$/jour',
    duration: 'À votre rythme',
  },
];

export function BlogArticleCarleton() {
  return (
    <DestinationArticleTemplate
      slug="carleton-sur-mer"
      title="Carleton-sur-Mer - Perle de la Baie des Chaleurs"
    >
      <article id="blog_article_carleton" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Découvrez un paradis balnéaire entre mer et montagnes au cœur de la Gaspésie
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Carleton-sur-Mer, nichée entre la majestueuse baie des Chaleurs et le mont Saint-Joseph,
            offre une expérience unique alliant plages de sable fin, sports nautiques et panoramas à
            couper le souffle.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/carleton-sur-mer.avif"
              alt="Baie des Chaleurs"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter Carleton-sur-Mer ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Plages Exceptionnelles</H3>
              <p className="text-gray-600">
                Kilomètres de plages de sable fin aux eaux les plus chaudes du Québec.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Sports Nautiques</H3>
              <p className="text-gray-600">
                Paradis pour la voile, le kayak et la planche à pagaie.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Culture Vivante</H3>
              <p className="text-gray-600">Microbrasseries, festivals et arts de la scène.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            Activités Nautiques et Nature
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
            <Wind className="size-8 text-indigo-600" />
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
              <H3 className="mb-4 text-xl font-semibold">Depuis Québec/Montréal</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Avion vers Carleton (escale à Québec)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus Orléans Express (10h depuis Montréal)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Voiture (8h depuis Québec)
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
                  Navette locale en saison
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
                De juin à septembre pour profiter de la plage et des activités nautiques.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <DollarSign className="size-5 text-indigo-600" />
                Budget
              </H3>
              <p className="text-gray-600">
                Prévoir 150-200$/jour incluant l'hébergement, les repas et les activités.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation conseillée en haute saison pour les hébergements et activités.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">
            Prêt à Découvrir Carleton-sur-Mer ?
          </H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et profitez de la baie des Chaleurs
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={bookingAwin('https://www.booking.com/city/ca/carleton.html')}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://carletonsurmer.com/tourisme/"
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

export default BlogArticleCarleton;
