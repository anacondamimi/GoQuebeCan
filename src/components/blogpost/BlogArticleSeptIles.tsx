import React from 'react';

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
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Sept-Îles',
    category: 'Vue sur Mer',
    description: "Vue panoramique sur l'archipel",
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/sept-iles.html',
    image: 'https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Château Arnaud',
    category: 'Charme',
    description: 'Au cœur du centre-ville',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/chateau-arnaud.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Le Voyageur',
    category: 'Économique',
    description: 'Proche des attractions',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/le-voyageur-sept-iles.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
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
    <article id="blog_article_sept_iles" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Sept-Îles - Porte d'entrée de la Côte-Nord
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville dynamique où nature sauvage et culture innue se rencontrent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Sept-Îles, nommée d'après son archipel de sept îles, est une ville portuaire majeure de la
          Côte-Nord qui combine harmonieusement développement industriel, nature préservée et riche
          culture autochtone. Son port en eau profonde et son archipel protégé en font une
          destination unique pour les amateurs de plein air et de culture.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80"
            alt="Sept-Îles"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Sept-Îles ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Archipel Unique</h3>
            <p className="text-gray-600">
              Sept îles formant un havre naturel et un sanctuaire d'oiseaux marins.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Innue</h3>
            <p className="text-gray-600">
              Découverte de la culture autochtone et de ses traditions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Accessible</h3>
            <p className="text-gray-600">Plages, sentiers et activités nautiques à proximité.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Compass className="h-8 w-8 text-indigo-600" />
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
                Vol direct depuis Montréal (2h)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                8h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional quotidien
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
                Service de taxi disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Transport en commun limité
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
              De juin à septembre pour le climat doux. Juillet-août pour les activités nautiques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 35-75$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Sept-Îles ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez la Côte-Nord
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sept-iles.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://tourismeseptiles.ca"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}


