import React from 'react';

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
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Erie Beach Hotel',
    category: 'Vue sur Lac',
    description: 'Vue imprenable sur le lac Érié',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/erie-beach.html',
    image: 'https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Dover Coast Resort',
    category: 'Resort',
    description: 'Resort avec golf et spa',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/dover-coast.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Lighthouse Festival Theatre Inn',
    category: 'Charme',
    description: 'Au cœur du centre historique',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/lighthouse-festival.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

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
    <article id="blog_article_port_dover" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Port Dover - Charme Balnéaire sur le Lac Érié
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette charmante ville portuaire de l'Ontario, réputée pour ses plages dorées, sa
          culture maritime et sa gastronomie locale
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Port Dover, pittoresque ville portuaire sur les rives du lac Érié, combine le charme d'un
          village de pêcheurs avec l'ambiance animée d'une station balnéaire. Réputée pour ses
          plages dorées, ses fruits de mer frais et son riche patrimoine maritime, elle offre une
          expérience authentique de la vie au bord du lac.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80"
            alt="Port Dover"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Port Dover ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Plages Dorées</h3>
            <p className="text-gray-600">Sable fin et eaux cristallines du lac Érié.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie Maritime</h3>
            <p className="text-gray-600">
              Meilleurs fish & chips et fruits de mer frais de l'Ontario.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Portuaire</h3>
            <p className="text-gray-600">Riche histoire maritime et festivals traditionnels.</p>
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
          <Sun className="h-8 w-8 text-indigo-600" />
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
                2h en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                6h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain disponible
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Centre-ville accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi et services de transport local
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
              De juin à septembre pour la baignade. Festivals et événements tout l'été.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 139-189$/nuit Activités: 8-75$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Très animé les week-ends d'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Port Dover ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez du charme balnéaire de l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/port-dover.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.portdover.ca"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}


