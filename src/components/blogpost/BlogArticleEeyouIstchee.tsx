import React from 'react';

export const metadata = {
  slug: 'eeyou-istchee',
  ville: 'Eeyou Istchee',
  resume: 'Découverte de Eeyou Istchee et de ses attraits touristiques.',
  activites: [
    'Kayak à Wemindji',
    'Randonnée Taïga',
    'Centre Culturel Cri',
    'Atelier Culture Crie',
    'Mini-Expédition Nature',
    'Initiation Pêche',
    'Survie en Forêt',
    'Kayak Aventure',
    'Photo Safari',
  ],
  hebergements: ['Auberge Radisson', 'Hôtel Matagami', 'Éco-gîtes de Matagami'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Compass,
  Tent,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge Radisson',
    category: 'Confort',
    description: 'Vue sur le lac Matagami',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-radisson.html',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel Matagami',
    category: 'Affaires',
    description: 'Au cœur de Matagami',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/matagami.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Éco-gîtes de Matagami',
    category: 'Écologique',
    description: 'Hébergement durable en nature',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/eco-gites-matagami.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Restaurant du Nord',
    type: 'Cuisine du Terroir',
    speciality: 'Gibier et poisson local',
    price: '$$$',
    mustTry: 'Orignal braisé et poisson fumé',
    schedule: "Toute l'année",
  },
  {
    name: 'Café Wemindji',
    type: 'Café-Restaurant',
    speciality: 'Cuisine crie contemporaine',
    price: '$$',
    mustTry: 'Bannique et ragoût traditionnel',
    schedule: "Toute l'année",
  },
  {
    name: 'Le Relais du Voyageur',
    type: 'Bistro',
    speciality: 'Cuisine réconfortante',
    price: '$$',
    mustTry: 'Pâté chinois du Nord',
    schedule: "Toute l'année",
  },
];

const activities = [
  {
    name: 'Kayak à Wemindji',
    type: 'Nautique',
    duration: '3-4 heures',
    price: '85$/personne',
    description: 'Exploration des baies et observation de la faune',
  },
  {
    name: 'Randonnée Taïga',
    type: 'Nature',
    duration: '4-6 heures',
    price: '65$/personne',
    description: 'Découverte de la forêt boréale avec guide local',
  },
  {
    name: 'Centre Culturel Cri',
    type: 'Culture',
    duration: '2-3 heures',
    price: '25$/personne',
    description: 'Immersion dans la culture et traditions cries',
  },
];

const winterActivities = [
  {
    name: 'Motoneige en Taïga',
    type: 'Aventure',
    duration: 'Journée complète',
    price: '250$/personne',
    description: 'Excursion guidée dans les vastes étendues',
  },
  {
    name: 'Pêche sur Glace',
    type: 'Sport',
    duration: '4 heures',
    price: '125$/personne',
    description: 'Pêche traditionnelle avec guide local',
  },
  {
    name: 'Traîneau à Chiens',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '175$/personne',
    description: 'Expédition en traîneau dans la taïga',
  },
];

const familyActivities = [
  {
    title: 'Atelier Culture Crie',
    description: 'Artisanat et contes traditionnels (tous âges)',
    price: '35$/personne',
  },
  {
    title: 'Mini-Expédition Nature',
    description: 'Découverte de la faune (7+ ans)',
    price: '45$/personne',
  },
  {
    title: 'Initiation Pêche',
    description: 'Apprentissage des techniques (8+ ans)',
    price: '55$/personne',
  },
];

const teenActivities = [
  {
    title: 'Survie en Forêt',
    description: 'Techniques traditionnelles (14+ ans)',
    price: '85$/personne',
    duration: 'Journée',
  },
  {
    title: 'Kayak Aventure',
    description: 'Excursion guidée (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Photo Safari',
    description: 'Observation de la faune (12+ ans)',
    price: '65$/personne',
    duration: '4 heures',
  },
];

export default function BlogArticleEeyouIstchee() {
  return (
    <article id="blog_article_eeyou_istchee" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Eeyou Istchee Baie-James - Immersion dans le Grand Nord Québécois
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce vaste territoire où nature sauvage et culture crie se rencontrent dans une
          aventure unique
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Eeyou Istchee Baie-James, territoire immense du Nord québécois, offre une expérience
          authentique entre taïga sauvage et culture autochtone vivante. Cette région unique combine
          l'aventure en pleine nature avec la découverte des traditions millénaires du peuple cri.
        </p>
        <div className="my-8">
          <img
             src="/images/destinations/eeyou-istchee-baiejames.avif"
            alt="Eeyou Istchee Baie-James"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Eeyou Istchee Baie-James ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Sauvage</h3>
            <p className="text-gray-600">
              Immenses étendues de taïga et lacs majestueux à perte de vue.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Crie</h3>
            <p className="text-gray-600">
              Découverte des traditions millénaires et mode de vie autochtone.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aventure Unique</h3>
            <p className="text-gray-600">Expériences authentiques loin des sentiers battus.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Compass className="h-8 w-8 text-indigo-600" />
          Activités d'Été
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
          <Tent className="h-8 w-8 text-indigo-600" />
          Activités d'Hiver
        </h2>
        <div className="space-y-8">
          {winterActivities.map((activity) => (
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
                Vol vers Matagami (1h depuis Montréal)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                8h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional disponible
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de voiture 4x4 recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Services de guide disponibles
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Transport en hydravion possible
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
              Juin à septembre pour l'été. Décembre à mars pour les activités hivernales.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-159$/nuit Activités: 65-250$/jour Repas: 30-60$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle pour les activités. Prévoir des vêtements adaptés aux
              conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir Eeyou Istchee Baie-James ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et vivez une aventure unique dans le Grand Nord
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/baie-james.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.decrochezcommejamais.com/fr/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Région
          </a>
        </div>
      </section>
    </article>
  );
}
