import React from 'react';

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
    <article id="blog_article_port_au_persil" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Port-au-Persil - Joyau Caché de Charlevoix
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce village pittoresque où falaises escarpées et traditions maritimes créent un
          décor de carte postale
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Port-au-Persil, niché dans les falaises de Charlevoix, est un secret bien gardé qui offre
          l'un des plus beaux paysages côtiers du Québec. Ce hameau historique, avec ses maisons
          ancestrales et son petit port naturel, semble figé dans le temps.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/port-au-persil.avif"
            alt="Port-au-Persil"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Port-au-Persil ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Uniques</h3>
            <p className="text-gray-600">
              Falaises spectaculaires et vues imprenables sur le Saint-Laurent.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Village Authentique</h3>
            <p className="text-gray-600">
              Architecture traditionnelle et mode de vie maritime préservé.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Sauvage</h3>
            <p className="text-gray-600">Observation des baleines et randonnées côtières.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités et Attractions
        </h2>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour Enfants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {familyActivities.map((activity) => (
            <div key={activity.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-2">{activity.description}</p>
              <p className="text-indigo-600 font-medium">{activity.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour Adolescents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teenActivities.map((activity) => (
            <div key={activity.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-2">{activity.description}</p>
              <div className="flex flex-col gap-1 mt-4">
                <p className="text-indigo-600 font-medium">{activity.price}</p>
                <p className="text-sm text-gray-500">Durée: {activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Hotel className="h-8 w-8 text-indigo-600" />
          Où Dormir ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.link}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                    {hotel.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <p className="text-indigo-600 font-semibold">{hotel.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Utensils className="h-8 w-8 text-indigo-600" />
          Où Manger ?
        </h2>
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.name} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.type}</p>
                </div>
                <span className="text-indigo-600 font-semibold">{restaurant.price}</span>
              </div>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Spécialité:</span> {restaurant.speciality}
              </p>
              <p className="text-gray-700 mb-2">
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Bus className="h-8 w-8 text-indigo-600" />
          Comment s'y Rendre ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Depuis les Grandes Villes</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                4h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus jusqu'à Saint-Siméon puis taxi
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture nécessaire pour explorer
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Services de taxi limités
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-indigo-600" />
          Conseils Pratiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Meilleure Période
            </h3>
            <p className="text-gray-600">
              De juin à septembre pour le climat doux. Juillet-août pour les baleines.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Port-au-Persil ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez ce joyau de Charlevoix
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/port-au-persil.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme-charlevoix.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Région
          </a>
        </div>
      </section>
    </article>
  );
}
