import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'montreal',
  ville: 'Montreal',
  resume: 'Découverte de Montreal et de ses attraits touristiques.',
  activites: ['Vieux-Montréal', 'Mont Royal', 'Biodôme'],
  hebergements: ['Fairmont Le Reine Elizabeth', 'Hôtel Nelligan', 'Le Plateau Hotel'],
  publics: ['amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Building } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Fairmont Le Reine Elizabeth',
    category: 'Luxe',
    description: 'Hôtel historique au cœur du centre-ville',
    price: 'À partir de 299$/nuit',
    link: 'https://www.booking.com/hotel/ca/fairmont-the-queen-elizabeth.html',
    image: '/images/destinations/hotels/fairmont-montreal.avif',
  },
  {
    name: 'Best Western Plus Montréal',
    category: 'Confort',
    description: 'Hôtel moderne proche du métro avec un excellent rapport qualité-prix',
    price: 'À partir de 179$/nuit',
    link: 'https://www.booking.com/hotel/ca/best-western-europa-downtown.fr.html',
    image: '/images/destinations/hotels/best-western-plus.avif',
  },

  {
    name: 'AC Hotel Montréal Centre-Ville',
    category: 'Moderne',
    description: 'Hôtel élégant avec piscine intérieure et vue sur la ville',
    price: 'À partir de 399$/nuit',
    link: 'https://www.booking.com/hotel/ca/ac-by-marriott-montreal-downtown.fr.html',
    image: '/images/destinations/hotels/ac-montreal.avif',
  },
];

const restaurants = [
  {
    name: "L'Express",
    type: 'Bistro Français',
    speciality: 'Cuisine française traditionnelle',
    price: '$$$',
    mustTry: 'Tartare de boeuf et os à moelle',
    schedule: 'Tous les jours',
  },
  {
    name: 'La Banquise',
    type: 'Cantine Québécoise',
    speciality: 'Poutines créatives',
    price: '$$',
    mustTry: 'La Classique ou La T-Rex',
    schedule: '24h/24, 7j/7',
  },
  {
    name: "Schwartz's",
    type: 'Institution',
    speciality: 'Smoked meat',
    price: '$$',
    mustTry: 'Sandwich smoked meat',
    schedule: 'Tous les jours',
  },
];

const activities = [
  {
    name: 'Vieux-Montréal',
    type: 'Culture',
    duration: 'Demi-journée',
    price: 'Gratuit',
    description: 'Quartier historique et attractions culturelles',
  },
  {
    name: 'Mont Royal',
    type: 'Nature',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Parc emblématique avec vue panoramique',
  },
  {
    name: 'Biodôme',
    type: 'Science',
    duration: '2-3 heures',
    price: '25$/adulte',
    description: 'Écosystèmes des Amériques reconstitués',
  },
];

export default function BlogArticleMontreal() {
  return (
    <article className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Montréal - Métropole Culturelle et Festive</H1>
        <p className="text-xl text-gray-600">
          Découvrez la plus grande ville francophone d'Amérique, où histoire, culture et modernité
          se rencontrent
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Montréal, ville vibrante et cosmopolite, est un carrefour unique où se mêlent influences
          européennes et nord-américaines. De ses quartiers historiques à ses festivals
          internationaux, en passant par sa scène gastronomique réputée, Montréal offre une
          expérience urbaine incomparable.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/montreal.avif"
            alt="Montréal"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Montréal ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Culture Vibrante</H3>
            <p className="text-gray-600">
              Festivals internationaux, musées de renom et scène artistique dynamique.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Gastronomie Unique</H3>
            <p className="text-gray-600">
              Du smoked meat aux restaurants étoilés, une destination gourmande.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Histoire et Modernité</H3>
            <p className="text-gray-600">
              Architecture historique côtoyant des quartiers avant-gardistes.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Building className="size-8 text-indigo-600" />
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
          Transport en Commun
        </H2>
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <H3 className="mb-4 text-xl font-semibold text-gray-900">
            REM (Réseau express métropolitain)
          </H3>
          <div className="space-y-4">
            <p className="text-gray-600">Nouveau train léger automatisé reliant :</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Brossard (Rive-Sud) à la Gare Centrale
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Fréquence : toutes les 3-4 minutes en heure de pointe
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Temps de trajet : 15-20 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Intégré au réseau STM (métro et bus)
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Accès Principal</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Aéroport International Trudeau
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Train VIA Rail depuis Toronto/Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Réseau d'autobus interurbain
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Métro et bus (STM)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                BIXI (vélos en libre-service)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxis et services de covoiturage
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
              Juin à septembre pour les festivals. Décembre pour les marchés de Noël.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 189-299$/nuit Activités: 25-75$/jour Repas: 20-75$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Ville très sécuritaire. Transport en commun efficace. Nombreux festivals gratuits.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Montréal ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et vivez l'expérience unique de la métropole
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/montreal.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.mtl.org"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}
