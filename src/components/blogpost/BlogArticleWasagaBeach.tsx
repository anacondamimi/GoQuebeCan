import React from 'react';

export const metadata = {
  slug: 'wasaga-beach',
  ville: 'Wasaga Beach',
  resume: 'Découverte de Wasaga Beach et de ses attraits touristiques.',
  activites: [
    'Plage Principale',
    'Wasaga Beach Provincial Park',
    'Nancy Island Historic Site',
    'Plage Zone 1',
    'Location de Pédalos',
    'Mini-Golf Pirates',
    'Location de SUP',
    'Beach Volleyball',
    'Surf sur la Baie',
  ],
  hebergements: ['Wasaga Riverdocks Hotel', 'Beach Front Resort', 'Wasaga Motel'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Wasaga Riverdocks Hotel',
    category: 'Vue sur Plage',
    description: 'Vue imprenable sur la baie Georgienne',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/wasaga-riverdocks.html',
    image: 'https://images.unsplash.com/photo-1595880238394-5b606a6ee1e8?auto=format&fit=crop&q=80',
  },
  {
    name: 'Beach Front Resort',
    category: 'Resort',
    description: 'Accès direct à la plage',
    price: 'À partir de 209$/nuit',
    link: 'https://www.booking.com/hotel/ca/beach-front-resort.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Wasaga Motel',
    category: 'Économique',
    description: 'À quelques pas de la plage',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/wasaga-motel.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Beach House Grill',
    type: 'Grill & Fruits de mer',
    speciality: 'Fruits de mer frais et grillades',
    price: '$$$',
    mustTry: 'Fish tacos et crevettes grillées',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Wasaga Bistro',
    type: 'Bistro',
    speciality: 'Cuisine internationale',
    price: '$$',
    mustTry: 'Burgers gourmet',
    schedule: "Toute l'année",
  },
  {
    name: 'Beach Bar',
    type: 'Bar & Grill',
    speciality: 'Cuisine de plage',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Plage Principale',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: "La plus longue plage d'eau douce au monde",
  },
  {
    name: 'Wasaga Beach Provincial Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '15$/véhicule',
    description: "Sentiers de randonnée et observation d'oiseaux",
  },
  {
    name: 'Nancy Island Historic Site',
    type: 'Culture',
    duration: '1-2 heures',
    price: '8$/personne',
    description: 'Histoire maritime et guerre de 1812',
  },
];

const familyActivities = [
  {
    title: 'Plage Zone 1',
    description: 'Zone familiale surveillée (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Location de Pédalos',
    description: 'Activité nautique familiale (5+ ans)',
    price: '25$/heure',
  },
  {
    title: 'Mini-Golf Pirates',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de SUP',
    description: 'Planche à pagaie sur la baie (12+ ans)',
    price: '35$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Beach Volleyball',
    description: 'Terrains de volleyball (12+ ans)',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
  {
    title: 'Surf sur la Baie',
    description: 'Initiation au surf (14+ ans)',
    price: '75$/2 heures',
    duration: '2 heures',
  },
];

export default function BlogArticleWasagaBeach() {
  return (
    <article id="blog_article_wasaga_beach" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Wasaga Beach - La Plus Longue Plage d'Eau Douce au Monde
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce paradis balnéaire de l'Ontario, avec ses 14 kilomètres de sable fin et ses
          activités pour toute la famille
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Wasaga Beach, située sur les rives de la baie Georgienne, est réputée pour être la plus
          longue plage d'eau douce au monde. Cette destination estivale par excellence combine
          plages de sable fin, sports nautiques et attractions familiales dans un cadre naturel
          exceptionnel.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/wasaga-beach.avif"
            alt="Wasaga Beach"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Wasaga Beach ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Plage Exceptionnelle</h3>
            <p className="text-gray-600">
              14 km de sable fin et d'eaux cristallines de la baie Georgienne.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Sports Nautiques</h3>
            <p className="text-gray-600">
              Large choix d'activités aquatiques pour tous les niveaux.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Ambiance Estivale</h3>
            <p className="text-gray-600">
              Restaurants en bord de plage et divertissements pour toute la famille.
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
                7h en voiture depuis Montréal
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
                Navette de plage gratuite
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
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
              De juin à septembre pour la baignade. Juillet-août pour les meilleures conditions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-209$/nuit Activités: 15-75$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Plage surveillée dans les zones principales.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Wasaga Beach ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la plus longue plage d'eau douce au monde
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/wasaga-beach.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.wasagabeach.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
