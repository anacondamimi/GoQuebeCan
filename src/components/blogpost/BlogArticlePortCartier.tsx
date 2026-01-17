import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'port-cartier',
  ville: 'Port Cartier',
  resume: 'Découverte de Port Cartier et de ses attraits touristiques.',
  activites: [
    'Parc de la Taïga',
    'Rivière aux Rochers',
    'Port Industriel',
    'Plage Rochelois',
    'Centre d',
    'Parc Récréotouristique',
    'Vélo de Montagne',
    'Kayak de Mer',
    'Pêche au Saumon',
  ],
  hebergements: ['Hôtel Port-Cartier', 'Motel du Havre', 'Auberge de la Rivière'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Chalets Lac Walker & Lac Arthur',
    category: 'Nature sauvage & tranquillité',
    description:
      'Séjour dans la réserve faunique : pêche, canot et randonnées. Idéal pour se ressourcer.',
    price: 'Tarifs via Sépaq',
    link: 'https://www.sepaq.com/pq/rpc/hebergement/chalet.dot',
    image: '/images/destinations/hotels/reserve-faunique-port-cartier.avif',
  },
  {
    name: 'Camping municipal Le Paradis',
    category: 'Avec et sans services',
    description:
      '39 emplacements bien situés, en bordure du boulevard du Portage-des-Mousses. Parfait pour VR ou tente.',
    price: 'À partir de ~25$/nuit (info à confirmer)',
    link: 'https://www.villeport-cartier.com/tourisme/camping-municipal',
    image: '/images/destinations/hotels/camping-deux-port-cartier.avif',
  },
  {
    name: 'Camping municipal Patterson',
    category: 'Sans service - Nature pure',
    description:
      '17 emplacements rustiques en pleine nature sur l’Île Patterson Sud. Déconnexion garantie.',
    price: 'Tarif accessible (info locale)',
    link: 'https://www.villeport-cartier.com/tourisme/camping-municipal',
    image: '/images/destinations/hotels/camping-un-port-cartier.avif',
  },
];

const restaurants = [
  {
    name: 'Le Marin Gourmet',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer locaux',
    price: '$$$',
    mustTry: 'Plateau de fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'Café du Port',
    type: 'Bistro',
    speciality: 'Cuisine québécoise',
    price: '$$',
    mustTry: 'Poutine aux fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Quai',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Parc de la Taïga',
    type: 'Nature',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: "Sentiers pédestres et observation d'oiseaux",
  },
  {
    name: 'Rivière aux Rochers',
    type: 'Pêche',
    duration: 'Demi-journée',
    price: 'À partir de 75$/personne',
    description: 'Pêche au saumon de renommée mondiale',
  },
  {
    name: 'Port Industriel',
    type: 'Culture',
    duration: '1-2 heures',
    price: '15$/personne',
    description: 'Visite guidée des installations portuaires',
  },
];

const familyActivities = [
  {
    title: 'Plage Rochelois',
    description: 'Plage surveillée et aires de jeux (tous âges)',
    price: 'Gratuit',
  },
  {
    title: "Centre d'Interprétation",
    description: 'Histoire locale et maritime (5-12 ans)',
    price: '8$/enfant',
  },
  {
    title: 'Parc Récréotouristique',
    description: 'Activités de plein air (tous âges)',
    price: 'Gratuit',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers adaptés (12+ ans)',
    price: 'Location: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Pêche au Saumon',
    description: 'Initiation avec guide (14+ ans)',
    price: '85$/personne',
    duration: '4 heures',
  },
];

export default function BlogArticlePortCartier() {
  return (
    <article id="blog_article_port_cartier" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Port-Cartier - Entre Mer et Forêt sur la Côte-Nord</H1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville dynamique où activités maritimes et plein air se rencontrent dans un
          cadre naturel exceptionnel
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Port-Cartier, ville portuaire de la Côte-Nord, offre une expérience unique entre mer et
          forêt. Reconnue pour son port en eau profonde, sa rivière à saumon de classe mondiale et
          ses activités de plein air, elle combine harmonieusement industrie maritime et nature
          préservée.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/port-cartier.avif"
            alt="Port-Cartier"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Port-Cartier ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Pêche au Saumon</H3>
            <p className="text-gray-600">
              Rivière aux Rochers, l'une des meilleures rivières à saumon du Québec.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Accessible</H3>
            <p className="text-gray-600">
              Sentiers pédestres, plages et activités de plein air à proximité.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Patrimoine Maritime</H3>
            <p className="text-gray-600">Port industriel majeur et histoire maritime riche.</p>
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
                8h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Vol vers Sept-Îles puis transport terrestre
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express quotidien
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxi disponible
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
              Juin à septembre pour les activités estivales. Juillet-août pour la pêche au saumon.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 119-159$/nuit Activités: 15-85$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Permis nécessaire pour la pêche. Réservation conseillée en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Port-Cartier ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez cette ville unique de la Côte-Nord
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/port-cartier.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://villeport-cartier.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}
