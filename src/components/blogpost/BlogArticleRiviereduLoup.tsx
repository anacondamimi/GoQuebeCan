import React from 'react';
import Image from 'next/image';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

export const metadata = {
  slug: 'riviere-du-loup',
  ville: 'Riviere-du Loup',
  resume: 'Découverte de Rivieredu Loup et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Parc des Chutes',
    'Manoir Fraser',
    'Centre Premier Tech',
    'Parc des Chutes',
    'Mini-Croisière',
    'Vélo sur la Route Verte',
    'Kayak de Mer',
    'Escalade Intérieure',
  ],
  hebergements: ['Hôtel Universel', 'Quality Inn', 'Auberge de la Pointe'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};


// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Universel',
    category: '4 étoiles',
    description: 'Vue sur le fleuve et piscine intérieure',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/universel-riviere-du-loup.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Quality Inn',
    category: '3 étoiles',
    description: 'Proche du centre-ville',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/quality-inn-riviere-du-loup.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge de la Pointe',
    category: 'Vue sur Mer',
    description: 'Site exceptionnel sur le Saint-Laurent',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-de-la-pointe.html',
    image: 'https://images.unsplash.com/photo-1596238259704-d47dc656b2a7?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: "Resto-Pub l'Estaminet",
    type: 'Pub Gastronomique',
    speciality: 'Cuisine du terroir et bières locales',
    price: '$$$',
    mustTry: 'Tartare de saumon et poutine maison',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Restaurant Bon Voyage',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer locaux',
    price: '$$$$',
    mustTry: 'Plateau de fruits de mer',
    schedule: 'Ouvert du mardi au dimanche',
  },
  {
    name: "Cantine d'Amours",
    type: 'Cantine',
    speciality: 'Fast-food québécois',
    price: '$$',
    mustTry: 'Poutine et hot-dogs',
    schedule: 'Saison estivale',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '3-4 heures',
    price: '79$/personne',
    description: "Observation des baleines dans l'estuaire",
  },
  {
    name: 'Parc des Chutes',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Sentiers et chute spectaculaire de 33 mètres',
  },
  {
    name: 'Manoir Fraser',
    type: 'Culture',
    duration: '1-2 heures',
    price: '12$/personne',
    description: 'Maison historique du 19e siècle',
  },
];

const familyActivities = [
  {
    title: 'Centre Premier Tech',
    description: "Centre sportif avec piscine et jeux d'eau (tous âges)",
    price: 'Entrée: 8$/enfant',
  },
  {
    title: 'Parc des Chutes',
    description: 'Sentiers faciles et aires de pique-nique (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Croisière',
    description: 'Excursion adaptée aux familles (5+ ans)',
    price: '45$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Vélo sur la Route Verte',
    description: 'Piste cyclable panoramique (12+ ans)',
    price: 'Location vélo: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée sur le fleuve (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Escalade Intérieure',
    description: "Centre d'escalade moderne (12+ ans)",
    price: '25$/personne',
    duration: '2-3 heures',
  },
];

export default function BlogArticleRiviereduLoup() {
  return (
    <article id="blog_article_riviere_du_loup" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Rivière-du-Loup - Porte d'entrée du Bas-Saint-Laurent
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville historique où le fleuve Saint-Laurent rencontre la nature sauvage
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Située stratégiquement sur la rive sud du Saint-Laurent, Rivière-du-Loup est une ville
          dynamique qui combine patrimoine historique, attractions naturelles et activités
          maritimes. Point de départ idéal pour l'observation des baleines et porte d'entrée vers
          les Maritimes, elle offre une expérience authentique du Bas-Saint-Laurent.
        </p>
        <div className="my-8">
          <Image
  src="/images/destinations/chute-riviere-du-loup.avif"
  alt="Rivière-du-Loup"
  width={1200}
  height={500}
  className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Rivière-du-Loup ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Observation des Baleines</h3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au Québec pour observer les baleines dans leur habitat
              naturel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Patrimoine Historique</h3>
            <p className="text-gray-600">
              Architecture victorienne et sites historiques bien préservés.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Accessible</h3>
            <p className="text-gray-600">
              Parcs, sentiers et activités de plein air à proximité du centre-ville.
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
                2h en voiture depuis Québec
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
                Centre-ville accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi pour les excursions
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
              De juin à septembre pour les croisières aux baleines et activités extérieures.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 25-79$/jour Repas: 15-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée pour les croisières en haute saison. Prévoir des vêtements
              chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir Rivière-du-Loup ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de cette destination unique
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/riviere-du-loup.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.croisieres-aml.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Réserver une Croisière
          </a>
        </div>
      </section>
    </article>
  );
}
