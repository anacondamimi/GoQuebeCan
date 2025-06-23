import Image from 'next/image';
import React from 'react';
import { Sunset } from 'lucide-react';

export const metadata = {
  slug: 'kamouraska',
  ville: 'Kamouraska',
  resume: 'Découverte de Kamouraska et de ses attraits touristiques.',
  activites: [
    'Coucher de Soleil sur le Fleuve',
    'Musée régional de Kamouraska',
    'Sentier du Cabouron',
    'Plage de Kamouraska',
    'Centre d',
    'Ferme Gijamika',
    'Location de Kayak',
    'Vélo sur la Route Verte',
    'Atelier Photo',
  ],
  hebergements: ['Auberge des Îles', 'Motel des Mariniers', 'Gîte des Coquillages'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge Akamaraska',
    category: 'Simplicité & authenticité',
    description: 'Chambre avec lit Queen et balcon, à 100 m du centre du village. Note 7,8/10.',
    price: 'Tarif selon la saison',
    link: 'https://www.booking.com/hotel/ca/akamaraska.fr.html',
    image: '/images/destinations/hotels/akamaraska.avif',
  },
  {
    name: 'Motel des Mariniers',
    category: 'Charme',
    description: 'Au cœur du village historique',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/motel-des-mariniers.html',
    image: '/images/destinations/hotels/mariniers.avif',
  },
  {
    name: 'Auberge Comme au premier jour',
    category: 'Charme & piscine',
    description: 'Chambre double avec vue sur la piscine, à 18 km de Kamouraska. Note 8,8/10.',
    price: 'Tarif selon la saison',
    link: 'https://www.booking.com/hotel/ca/auberge-comme-au-premier-jour.fr.html',
    image: '/images/destinations/hotels/auberge saint pacome.avif',
  },
];

const restaurants = [
  {
    name: 'Bistro Côté Est',
    type: 'Gastronomique',
    speciality: 'Cuisine locale et produits du terroir',
    price: '$$$$',
    mustTry: 'Tartare de poisson frais et agneau local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café du Clocher',
    type: 'Café-Bistro',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Toute l'année",
  },
  {
    name: 'Poissonnerie Lauzier',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer frais',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mars à Décembre',
  },
];

const activities = [
  {
    name: 'Coucher de Soleil sur le Fleuve',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Les plus beaux couchers de soleil du Québec',
  },
  {
    name: 'Musée régional de Kamouraska',
    type: 'Culture',
    duration: '1-2 heures',
    price: '10$/personne',
    description: 'Histoire et patrimoine local',
  },
  {
    name: 'Sentier du Cabouron',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Vue panoramique sur le fleuve et les îles',
  },
];

const familyActivities = [
  {
    title: 'Plage de Kamouraska',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: "Centre d'Art de Kamouraska",
    description: 'Ateliers créatifs pour enfants (5-12 ans)',
    price: '15$/enfant',
  },
  {
    title: 'Ferme Gijamika',
    description: 'Visite de la ferme et animaux (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de Kayak',
    description: 'Exploration du fleuve (12+ ans)',
    price: '45$/demi-journée',
    duration: '3-4 heures',
  },
  {
    title: 'Vélo sur la Route Verte',
    description: 'Parcours côtier (12+ ans)',
    price: '35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Atelier Photo',
    description: 'Cours photo coucher de soleil (13+ ans)',
    price: '55$/personne',
    duration: '2 heures',
  },
];

export function BlogArticleKamouraska() {
  return (
    <article id="blog_article_kamouraska" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kamouraska - Le Village aux Plus Beaux Couchers de Soleil
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau du Bas-Saint-Laurent, entre patrimoine historique et paysages
          spectaculaires
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Kamouraska, pittoresque village du Bas-Saint-Laurent, est réputé pour avoir les plus beaux
          couchers de soleil au Québec. Avec son riche patrimoine architectural, sa gastronomie
          locale et ses paysages à couper le souffle, il offre une expérience authentique du Québec
          maritime.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/kamouraska.avif"
            alt="Kamouraska"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Kamouraska ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Couchers de Soleil</h3>
            <p className="text-gray-600">
              Les plus spectaculaires du Québec, avec le fleuve et les îles en toile de fond.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Village Historique</h3>
            <p className="text-gray-600">
              Architecture ancestrale et patrimoine culturel bien préservé.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie Locale</h3>
            <p className="text-gray-600">
              Produits du terroir, poissons frais et spécialités régionales.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Sunset className="h-8 w-8 text-indigo-600" />
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
                5h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                2h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express (arrêt à Saint-Pascal)
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Village accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture recommandée pour explorer les environs
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
              De juin à septembre pour le temps doux. Juillet-août pour les plus beaux couchers de
              soleil.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 119-159$/nuit Activités: 15-55$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir un coupe-vent pour les soirées
              fraîches.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Kamouraska ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez des plus beaux couchers de soleil du Québec
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/kamouraska.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourismekamouraska.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
export default BlogArticleKamouraska;
