import React from 'react';

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
    name: 'Hôtel Port-Cartier',
    category: 'Vue sur Mer',
    description: 'Vue sur le Saint-Laurent',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/port-cartier.html',
    image: 'https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Motel du Havre',
    category: 'Économique',
    description: 'Proche du centre-ville',
    price: 'À partir de 119$/nuit',
    link: 'https://www.booking.com/hotel/ca/motel-du-havre.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge de la Rivière',
    category: 'Charme',
    description: 'Au bord de la rivière aux Rochers',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-riviere.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
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
    <article id="blog_article_port_cartier" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Port-Cartier - Entre Mer et Forêt sur la Côte-Nord
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville dynamique où activités maritimes et plein air se rencontrent dans un
          cadre naturel exceptionnel
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Port-Cartier, ville portuaire de la Côte-Nord, offre une expérience unique entre mer et
          forêt. Reconnue pour son port en eau profonde, sa rivière à saumon de classe mondiale et
          ses activités de plein air, elle combine harmonieusement industrie maritime et nature
          préservée.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80"
            alt="Port-Cartier"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Port-Cartier ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Pêche au Saumon</h3>
            <p className="text-gray-600">
              Rivière aux Rochers, l'une des meilleures rivières à saumon du Québec.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Accessible</h3>
            <p className="text-gray-600">
              Sentiers pédestres, plages et activités de plein air à proximité.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Patrimoine Maritime</h3>
            <p className="text-gray-600">Port industriel majeur et histoire maritime riche.</p>
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
                8h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Vol vers Sept-Îles puis transport terrestre
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express quotidien
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Centre-ville accessible à pied
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
              Juin à septembre pour les activités estivales. Juillet-août pour la pêche au saumon.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 119-159$/nuit Activités: 15-85$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Permis nécessaire pour la pêche. Réservation conseillée en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Port-Cartier ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez cette ville unique de la Côte-Nord
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/port-cartier.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://villeport-cartier.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}
