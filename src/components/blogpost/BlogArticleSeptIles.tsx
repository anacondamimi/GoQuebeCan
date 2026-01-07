import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'sept-iles',
  ville: 'Sept Iles',
  resume: 'Découverte de Sept Iles et de ses attraits touristiques.',
  activites: [
    'Archipel des Sept Îles',
    'Vieux-Quai',
    'Musée Régional de la Côte-Nord',
    'Plage Monaghan',
    'Centre des Sciences',
    'Mini-Croisière',
    'Kayak de Mer',
    'Randonnée des Falaises',
    'Planche à Pagaie',
  ],
  hebergements: ['Hôtel Sept-Îles', 'Château Arnaud', 'Le Voyageur'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtels Gouverneur Sept-Îles',
    category: 'Familial',
    description: 'Chambre double avec 2 lits, séjour gratuit pour les enfants. Note 8/10.',
    price: 'À partir de 194$/nuit',
    link: 'https://www.booking.com/hotel/ca/gouverneur-sept-iles.fr.html',
    image: '/images/destinations/hotels/gouverneur.avif',
  },
  {
    name: 'Hôtel Le Voyageur',
    category: 'Confort & Calme',
    description: 'Chambre double avec 2 lits. Idéal pour famille. Note 8,3/10.',
    price: 'À partir de 174$/nuit',
    link: 'https://www.booking.com/hotel/ca/le-voyageur-sept-iles.fr.html',
    image: '/images/destinations/hotels/le voyageur.avif',
  },
  {
    name: 'Auberge Internationale Le Tangon',
    category: 'Auberge économique',
    description: 'Dortoir de 6 lits superposés, ambiance conviviale. Note 8,3/10.',
    price: 'À partir de 74$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-internationale-le-tangon.fr.html',
    image: '/images/destinations/hotels/auberge tangon.avif',
  },
];

const restaurants = [
  {
    name: 'Chez Omer',
    type: 'Fruits de mer',
    speciality: 'Fruits de mer et poissons locaux',
    price: '$$$$',
    mustTry: 'Homard et crabe des neiges',
    schedule: "Toute l'année",
  },
  {
    name: "La Cache d'Amélie",
    type: 'Bistro',
    speciality: 'Cuisine québécoise contemporaine',
    price: '$$$',
    mustTry: 'Tartare de saumon',
    schedule: "Toute l'année",
  },
  {
    name: 'Casse-Croûte du Pêcheur',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips et guedille au crabe',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Archipel des Sept Îles',
    type: 'Nature',
    duration: '3-4 heures',
    price: '75$/personne',
    description: "Croisière autour des îles et observation d'oiseaux",
  },
  {
    name: 'Vieux-Quai',
    type: 'Culture',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Promenade historique et vue sur le port',
  },
  {
    name: 'Musée Régional de la Côte-Nord',
    type: 'Culture',
    duration: '2-3 heures',
    price: '12$/personne',
    description: 'Histoire et culture innue',
  },
];

const familyActivities = [
  {
    title: 'Plage Monaghan',
    description: 'Plage surveillée et jeux pour enfants (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Centre des Sciences',
    description: 'Expositions interactives (5-12 ans)',
    price: '10$/enfant',
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux familles (tous âges)',
    price: '35$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Kayak de Mer',
    description: "Excursion guidée dans l'archipel (12+ ans)",
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Randonnée des Falaises',
    description: 'Sentier panoramique (12+ ans)',
    price: 'Gratuit',
    duration: '4 heures',
  },
  {
    title: 'Planche à Pagaie',
    description: 'Location et initiation (12+ ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleSeptIles() {
  return (
    <article id="blog_article_sept_iles" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Sept-Îles - Porte d'entrée de la Côte-Nord</H1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville dynamique où nature sauvage et culture innue se rencontrent
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Sept-Îles, nommée d'après son archipel de sept îles, est une ville portuaire majeure de la
          Côte-Nord qui combine harmonieusement développement industriel, nature préservée et riche
          culture autochtone. Son port en eau profonde et son archipel protégé en font une
          destination unique pour les amateurs de plein air et de culture.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/sept-iles.avif"
            alt="Sept-Îles"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Sept-Îles ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Archipel Unique</H3>
            <p className="text-gray-600">
              Sept îles formant un havre naturel et un sanctuaire d'oiseaux marins.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Culture Innue</H3>
            <p className="text-gray-600">
              Découverte de la culture autochtone et de ses traditions.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Accessible</H3>
            <p className="text-gray-600">Plages, sentiers et activités nautiques à proximité.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Compass className="size-8 text-indigo-600" />
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
                Vol direct depuis Montréal (2h)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                8h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interrégional quotidien
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
                Service de taxi disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Transport en commun limité
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
              De juin à septembre pour le climat doux. Juillet-août pour les activités nautiques.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 35-75$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Sept-Îles ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez la Côte-Nord
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sept-iles.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://tourismeseptiles.ca"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
