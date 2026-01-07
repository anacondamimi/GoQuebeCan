import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'port-au-persil',
  ville: 'Port Au Persil',
  resume: 'Découverte de Port Au Persil et de ses attraits touristiques.',
  activites: [
    'Observation des Baleines',
    'Sentier des Caps',
    'Kayak de Mer',
    'Plage de Port-au-Persil',
    'Pêche aux Coques',
    'Mini-Croisière',
    'Randonnée Photo',
    'Kayak Aventure',
    'Vélo de Montagne',
  ],
  hebergements: ['Auberge des Falaises', 'Gîte du Hameau', 'Chalets Port-au-Persil'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Horizon 777',
    category: 'Petit-déjeuner inclus',
    description: 'Chambre double avec salle de bain privée et vue. Note 9,2/10.',
    price: 'À partir de 159$/nuit avec petit-déjeuner',
    link: 'https://www.booking.com/hotel/ca/horizon-777.fr.html',
    image: '/images/destinations/hotels/horizon 777.avif',
  },
  {
    name: 'La Gentilhommière',
    category: 'Vue sur mer',
    description: 'Chambre lit Queen avec vue, notée 9,5/10. Calme et confort assurés.',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/la-gentilhommiere.fr.html',
    image: '/images/destinations/hotels/gentilhommiere.avif',
  },
  {
    name: 'Motel Cofotel',
    category: 'Rapport qualité-prix',
    description: 'Chambre lit Queen, annulation gratuite, situé à 4 km du centre.',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/motel-cofotel.fr.html',
    image: '/images/destinations/hotels/motel cofotel.avif',
  },
];

const restaurants = [
  {
    name: 'La Table du Capitaine',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer locaux',
    price: '$$$',
    mustTry: 'Homard frais et moules marinières',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café du Port',
    type: 'Café-Restaurant',
    speciality: 'Cuisine locale et brunch',
    price: '$$',
    mustTry: 'Brunch du pêcheur',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Quai',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Observation des Baleines',
    type: 'Nature',
    duration: '3-4 heures',
    price: '89$/personne',
    description: "Croisière d'observation des mammifères marins",
  },
  {
    name: 'Sentier des Caps',
    type: 'Randonnée',
    duration: '2-6 heures',
    price: 'Gratuit',
    description: 'Randonnée panoramique le long des falaises',
  },
  {
    name: 'Kayak de Mer',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '65$/personne',
    description: 'Exploration des anses en kayak',
  },
];

const familyActivities = [
  {
    title: 'Plage de Port-au-Persil',
    description: 'Baignade et exploration des marées (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Pêche aux Coques',
    description: 'Activité traditionnelle en famille (5+ ans)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux familles (tous âges)',
    price: '45$/adulte, 25$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Randonnée Photo',
    description: 'Safari photo guidé (12+ ans)',
    price: '55$/personne',
    duration: '3 heures',
  },
  {
    title: 'Kayak Aventure',
    description: 'Excursion guidée (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers côtiers (14+ ans)',
    price: '45$/jour',
    duration: 'À votre rythme',
  },
];

export default function BlogArticlePortAuPersil() {
  return (
    <article id="blog_article_port_au_persil" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Port-au-Persil - Joyau Caché de Charlevoix</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce village pittoresque où falaises escarpées et traditions maritimes créent un
          décor de carte postale
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Port-au-Persil, niché dans les falaises de Charlevoix, est un secret bien gardé qui offre
          l'un des plus beaux paysages côtiers du Québec. Ce hameau historique, avec ses maisons
          ancestrales et son petit port naturel, semble figé dans le temps.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/port-au-persil.avif"
            alt="Port-au-Persil"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Port-au-Persil ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Paysages Uniques</H3>
            <p className="text-gray-600">
              Falaises spectaculaires et vues imprenables sur le Saint-Laurent.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Village Authentique</H3>
            <p className="text-gray-600">
              Architecture traditionnelle et mode de vie maritime préservé.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Sauvage</H3>
            <p className="text-gray-600">Observation des baleines et randonnées côtières.</p>
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
          <Star className="size-8 text-indigo-600" />
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
                4h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus jusqu'à Saint-Siméon puis taxi
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture nécessaire pour explorer
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Services de taxi limités
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
              De juin à septembre pour le climat doux. Juillet-août pour les baleines.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Port-au-Persil ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez ce joyau de Charlevoix
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/port-au-persil.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme-charlevoix.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer la Région
          </a>
        </div>
      </section>
    </article>
  );
}
