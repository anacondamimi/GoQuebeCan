import React from 'react';

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
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Rimouski',
    category: 'Centre-ville',
    description: 'À proximité du canyon',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/rimouski.html',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge du Portage',
    category: 'Charme',
    description: 'Vue sur le fleuve',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-du-portage.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Motel de la Montagne',
    category: 'Nature',
    description: 'Proche des sentiers',
    price: 'À partir de 119$/nuit',
    link: 'https://www.booking.com/hotel/ca/motel-montagne.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

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
    <article id="blog_article_canyon" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Canyon des Portes de l'Enfer - Aventure Vertigineuse au Bas-Saint-Laurent
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce site naturel spectaculaire avec sa passerelle suspendue et ses sentiers
          d'aventure
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le Canyon des Portes de l'Enfer, situé près de Rimouski, offre une expérience unique avec
          sa passerelle suspendue à 63 mètres de hauteur - la plus haute au Québec. Ce site naturel
          impressionnant combine randonnée, aventure et vues spectaculaires sur la rivière Rimouski.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
            alt="Canyon des Portes de l'Enfer"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter le Canyon ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Passerelle Unique</h3>
            <p className="text-gray-600">
              La plus haute passerelle suspendue au Québec avec vue imprenable.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aventure Nature</h3>
            <p className="text-gray-600">
              Via ferrata, randonnée et activités d'aventure pour tous.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Site Naturel</h3>
            <p className="text-gray-600">
              Formation géologique unique et biodiversité remarquable.
            </p>
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
          <Compass className="h-8 w-8 text-indigo-600" />
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
                5h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express jusqu'à Rimouski
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture nécessaire pour accéder au site
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette disponible depuis Rimouski
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos possible
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
              De juin à septembre pour le temps doux. Couleurs spectaculaires en automne.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Entrée: 25$/adulte Activités: 45-89$/personne Hébergement: 119-159$/nuit
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Bonnes chaussures de marche requises.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt pour l'Aventure ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre visite maintenant et découvrez ce site naturel spectaculaire
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/rimouski.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.canyonportesenfer.qc.ca"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Réserver une Activité
          </a>
        </div>
      </section>
    </article>
  );
}
