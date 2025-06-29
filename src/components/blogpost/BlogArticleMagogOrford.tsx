import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'magog-orford',
  ville: 'Magog Orford',
  resume: 'Découverte de Magog Orford et de ses attraits touristiques.',
  activites: [
    'Parc de la Plage-des-Cantons',
    'École de Voile',
    'Marais de la Rivière aux Cerises',
    'Vélo de Montagne',
    'Location de Kayak',
    'Escalade',
  ],
  hebergements: ['Manoir Hovey', 'Estrimont Suites & Spa', 'Auberge du Grand Lac'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Manoir Hovey',
    category: 'Luxe',
    description: 'Relais & Châteaux au bord du lac',
    price: 'À partir de 399$/nuit',
    link: 'https://www.booking.com/hotel/ca/manoir-hovey.html',
    image: '/images/destinations/hotels/manoir hovey.avif',
  },
  {
    name: 'Estrimont Suites & Spa',
    category: 'Spa',
    description: 'Vue sur le Mont Orford',
    price: 'À partir de 229$/nuit',
    link: 'https://www.booking.com/hotel/ca/estrimont-suites-spa.html',
    image: '/images/destinations/hotels/estrimont.avif',
  },
  {
    name: 'Appartement ',
    category: 'Nature & confort',
    description:
      'Chalet très bien noté (9.3/10) à Magog-Orford, à proximité du lac Memphrémagog, des plages et du Mont-Orford.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/nouveaute-foyer-au-bois-plage-montagne-et-plus.fr.html',
    image: '/images/destinations/hotels/appartement orford.avif',
  },
];

const restaurants = [
  {
    name: 'Le Hatley',
    type: 'Gastronomique',
    speciality: 'Cuisine du terroir raffinée',
    price: '$$$$',
    mustTry: 'Omble chevalier du lac Memphrémagog',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Bistro 4 Saisons',
    type: 'Bistro',
    speciality: 'Cuisine locale et vins québécois',
    price: '$$$',
    mustTry: 'Tartare de bison',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Café Orford',
    type: 'Café-Restaurant',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Ouvert toute l'année",
  },
];

const summerActivities = [
  {
    name: 'Croisière sur le Lac Memphrémagog',
    type: 'Navigation',
    duration: '1.5-3 heures',
    price: 'À partir de 45$/adulte',
    description: 'Découverte des légendes du lac et observation de la nature',
  },
  {
    name: 'Randonnée Mont Orford',
    type: 'Nature',
    duration: '2-6 heures',
    difficulty: 'Tous niveaux',
    description: 'Plus de 50 km de sentiers balisés',
  },
  {
    name: 'Plage du Lac Stukely',
    type: 'Baignade',
    duration: 'À la journée',
    price: "Inclus dans l'accès au parc",
    description: "Plage surveillée avec location d'équipements nautiques",
  },
];

const winterActivities = [
  {
    name: 'Ski Alpin Mont Orford',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 79$/jour',
    description: '61 pistes sur 3 montagnes',
  },
  {
    name: 'Ski de Fond',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    price: '25$/jour',
    description: 'Plus de 30 km de pistes tracées',
  },
  {
    name: 'Raquette Nocturne',
    type: 'Aventure',
    duration: '2 heures',
    price: '35$/personne',
    description: 'Randonnée guidée sous les étoiles',
  },
];

const familyActivities = [
  {
    title: 'Parc de la Plage-des-Cantons',
    description: "Plage familiale avec jeux d'eau (tous âges)",
    price: '15$/famille',
  },
  {
    title: 'École de Voile',
    description: 'Initiation à la voile (8-12 ans)',
    price: '75$/demi-journée',
  },
  {
    title: 'Marais de la Rivière aux Cerises',
    description: 'Sentiers sur pilotis et observation (tous âges)',
    price: 'Gratuit',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes de descente au Mont Orford (12+ ans)',
    price: '45$/jour',
    duration: 'Accès journée',
  },
  {
    title: 'Location de Kayak',
    description: 'Exploration du lac en kayak (12+ ans)',
    price: '35$/2 heures',
    duration: '2-4 heures',
  },
  {
    title: 'Escalade',
    description: 'Parois naturelles avec guide (14+ ans)',
    price: '85$/personne',
    duration: '3 heures',
  },
];

export default function BlogArticleMagogOrford() {
  return (
    <article id="blog_article_magog_orford" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Magog-Orford - Entre Lacs et Montagnes
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau des Cantons-de-l'Est où nature, gastronomie et activités de plein air
          se rencontrent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          La région de Magog-Orford, nichée entre le majestueux lac Memphrémagog et le parc national
          du Mont-Orford, offre un cadre enchanteur pour des vacances actives en toute saison. Cette
          destination prisée des Cantons-de-l'Est combine harmonieusement activités nautiques,
          randonnées en montagne et expériences gastronomiques.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/magog.avif"
            alt="Lac Memphrémagog"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Magog-Orford ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Exceptionnelle</h3>
            <p className="text-gray-600">
              Entre lac majestueux et montagne accessible, un terrain de jeu naturel unique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités 4 Saisons</h3>
            <p className="text-gray-600">
              Du ski au kayak, en passant par la randonnée et le vélo.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie Locale</h3>
            <p className="text-gray-600">
              Route des vins, restaurants gastronomiques et produits du terroir.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités Estivales
        </h2>
        <div className="space-y-8">
          {summerActivities.map((activity) => (
            <div key={activity.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  {activity.price && <span>Prix: {activity.price}</span>}
                  {activity.difficulty && <span>Difficulté: {activity.difficulty}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités Hivernales
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
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
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
                1h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                2h45 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Limocar quotidien
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette vers le Mont Orford
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi et location de voiture
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
              Juin à septembre pour les activités nautiques. Décembre à mars pour les sports
              d'hiver.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 169-399$/nuit Activités: 35-85$/jour Repas: 25-75$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Location d'équipement disponible sur place.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Magog-Orford ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez des activités quatre saisons
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/magog.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.sepaq.com/pq/mor/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
