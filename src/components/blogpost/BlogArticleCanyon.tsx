import Image from 'next/image';
import React from 'react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_CANYON } from '@/data/hotels/byArticle/canyon';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass } from 'lucide-react';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'canyon',
  ville: 'Canyon',
  resume: 'Découverte de Canyon et de ses attraits touristiques.',
  activites: [
    'Passerelle Suspendue',
    'Sentiers de Randonnée',
    'Via Ferrata',
    'Sentier Découverte',
    'Mini-Passerelle',
    'Rallye Nature',
    'Via Ferrata Découverte',
    'Randonnée Extrême',
    'Photographie Nature',
  ],
  hebergements: ['Hôtel Rimouski', 'Auberge du Portage', 'Motel de la Montagne'],
  publics: ['familles', 'ados', 'aventuriers'],
};

// ✅ Imports déplacés automatiquement

const hotels = pickHotels(HOTEL_IDS_CANYON);

const restaurants = [
  {
    name: 'La Table du Canyon',
    type: 'Bistro',
    speciality: 'Cuisine locale et gibier',
    price: '$$$',
    mustTry: 'Tourtière du Bas-Saint-Laurent',
    schedule: 'Mercredi au Dimanche',
  },
  {
    name: 'Café de la Passerelle',
    type: 'Café-Restaurant',
    speciality: 'Sandwichs et soupes maison',
    price: '$$',
    mustTry: 'Sandwich au saumon fumé',
    schedule: 'Tous les jours en saison',
  },
  {
    name: 'Casse-Croûte du Randonneur',
    type: 'Cantine',
    speciality: 'Cuisine rapide',
    price: '$',
    mustTry: 'Poutine maison',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Passerelle Suspendue',
    type: 'Aventure',
    duration: '30-60 minutes',
    price: '25$/adulte',
    description: 'Traversée spectaculaire à 63 mètres de hauteur',
  },
  {
    name: 'Sentiers de Randonnée',
    type: 'Nature',
    duration: '2-4 heures',
    price: "Inclus avec l'entrée",
    description: '20 km de sentiers balisés',
  },
  {
    name: 'Via Ferrata',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '89$/personne',
    description: 'Parcours sécurisé le long des parois',
  },
];

const familyActivities = [
  {
    title: 'Sentier Découverte',
    description: 'Parcours facile avec panneaux éducatifs (tous âges)',
    price: "Inclus avec l'entrée",
  },
  {
    title: 'Mini-Passerelle',
    description: 'Version adaptée pour les enfants (5-12 ans)',
    price: '15$/enfant',
  },
  {
    title: 'Rallye Nature',
    description: 'Chasse au trésor éducative (7-12 ans)',
    price: '10$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Via Ferrata Découverte',
    description: "Initiation à l'escalade sécurisée (12+ ans)",
    price: '75$/personne',
    duration: '2 heures',
  },
  {
    title: 'Randonnée Extrême',
    description: 'Parcours sportif guidé (14+ ans)',
    price: '45$/personne',
    duration: '3 heures',
  },
  {
    title: 'Photographie Nature',
    description: 'Atelier photo dans le canyon (12+ ans)',
    price: '55$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleCanyon() {
  return (
    <DestinationArticleTemplate
      slug="canyon"
      title="Canyon des Portes de l'Enfer - Aventure Vertigineuse au Bas-Saint-Laurent"
    >
      <article id="blog_article_canyon" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Découvrez ce site naturel spectaculaire avec sa passerelle suspendue et ses sentiers
            d'aventure
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Le Canyon des Portes de l'Enfer, situé près de Rimouski, offre une expérience unique
            avec sa passerelle suspendue à 63 mètres de hauteur - la plus haute au Québec. Ce site
            naturel impressionnant combine randonnée, aventure et vues spectaculaires sur la rivière
            Rimouski.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/canyon.avif"
              alt="Canyon des Portes de l'Enfer"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter le Canyon ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Passerelle Unique</H3>
              <p className="text-gray-600">
                La plus haute passerelle suspendue au Québec avec vue imprenable.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Aventure Nature</H3>
              <p className="text-gray-600">
                Via ferrata, randonnée et activités d'aventure pour tous.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Site Naturel</H3>
              <p className="text-gray-600">
                Formation géologique unique et biodiversité remarquable.
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
            <Compass className="size-8 text-indigo-600" />
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
                  5h en voiture depuis Montréal
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  3h en voiture depuis Québec
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus Orléans Express jusqu'à Rimouski
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Voiture nécessaire pour accéder au site
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Navette disponible depuis Rimouski
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Location de vélos possible
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
                De juin à septembre pour le temps doux. Couleurs spectaculaires en automne.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <DollarSign className="size-5 text-indigo-600" />
                Budget
              </H3>
              <p className="text-gray-600">
                Entrée: 25$/adulte Activités: 45-89$/personne Hébergement: 119-159$/nuit
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation conseillée en haute saison. Bonnes chaussures de marche requises.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt pour l'Aventure ?</H2>
          <p className="mb-6 text-gray-600">
            Réservez votre visite maintenant et découvrez ce site naturel spectaculaire
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={bookingAwin('https://www.booking.com/city/ca/rimouski.html')}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://www.bonjourquebec.com/fr-ca/repertoire/quoi-faire/terfa-canyon-des-portes-de-l-enfer/0q5x"
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Réserver une Activité
            </a>
          </div>
        </section>
      </article>
    </DestinationArticleTemplate>
  );
}
