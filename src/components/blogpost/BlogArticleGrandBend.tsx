import React from 'react';

export const metadata = {
  slug: 'grand-bend',
  ville: 'Grand Bend',
  resume: 'Découverte de Grand Bend et de ses attraits touristiques.',
  activites: [
    'Main Beach',
    'Pinery Provincial Park',
    'Grand Bend Marina',
    'Plage Familiale',
    'Grand Bend Splash Pad',
    'Mini-Golf Adventure',
    'École de Surf',
    'Location de Jet-Ski',
    'Parasailing',
  ],
  hebergements: ['Pine Dale Motor Inn', 'Oakwood Resort', 'Colonial Hotel'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Pine Dale Motor Inn',
    category: 'Vue sur Lac',
    description: 'Vue imprenable sur le lac Huron',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/pine-dale-motor-inn.html',
    image: 'https://images.unsplash.com/photo-1595880238394-5b606a6ee1e8?auto=format&fit=crop&q=80',
  },
  {
    name: 'Oakwood Resort',
    category: 'Resort',
    description: 'Resort avec golf et spa',
    price: 'À partir de 209$/nuit',
    link: 'https://www.booking.com/hotel/ca/oakwood-resort.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Colonial Hotel',
    category: 'Charme',
    description: 'Au cœur de Grand Bend',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/colonial-grand-bend.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'F.I.N.E. A Restaurant',
    type: 'Gastronomique',
    speciality: 'Cuisine raffinée et fruits de mer',
    price: '$$$$',
    mustTry: 'Poisson frais du lac Huron',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Smackwater Jacks',
    type: 'Pub & Grill',
    speciality: 'Burgers et fruits de mer',
    price: '$$$',
    mustTry: 'Fish tacos',
    schedule: "Toute l'année",
  },
  {
    name: 'Highway Girl',
    type: 'Café-Restaurant',
    speciality: 'Brunch et cuisine locale',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Main Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: 'Plage de sable fin avec couchers de soleil spectaculaires',
  },
  {
    name: 'Pinery Provincial Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '15$/véhicule',
    description: 'Dunes de sable et forêt de chênes rares',
  },
  {
    name: 'Grand Bend Marina',
    type: 'Nautique',
    duration: 'Variable',
    price: 'Location à partir de 35$/heure',
    description: 'Location de bateaux et sports nautiques',
  },
];

const familyActivities = [
  {
    title: 'Plage Familiale',
    description: 'Zone surveillée avec eaux peu profondes (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Grand Bend Splash Pad',
    description: "Jeux d'eau pour enfants (2-12 ans)",
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Adventure',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'École de Surf',
    description: 'Cours de surf sur le lac (12+ ans)',
    price: '65$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Location de Jet-Ski',
    description: 'Excursion guidée (16+ ans)',
    price: '85$/heure',
    duration: '1-2 heures',
  },
  {
    title: 'Parasailing',
    description: 'Vol panoramique (12+ ans)',
    price: '75$/personne',
    duration: '30 minutes',
  },
];

export function BlogArticleGrandBend() {
  return (
    <article id="blog_article_grand_bend" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Grand Bend - Paradis des Couchers de Soleil sur le Lac Huron
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette station balnéaire animée de l'Ontario, réputée pour ses plages de sable
          fin et ses couchers de soleil spectaculaires
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Grand Bend, joyau du lac Huron, est une destination estivale prisée qui combine plages
          magnifiques, sports nautiques et vie nocturne animée. Réputée pour avoir les plus beaux
          couchers de soleil de l'Ontario, cette ville balnéaire offre une expérience unique entre
          détente et divertissement.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1595880238394-5b606a6ee1e8?auto=format&fit=crop&q=80"
            alt="Grand Bend"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Grand Bend ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Couchers de Soleil</h3>
            <p className="text-gray-600">Les plus spectaculaires de l'Ontario sur le lac Huron.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Plages de Rêve</h3>
            <p className="text-gray-600">Sable fin et eaux cristallines du lac Huron.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Ambiance Festive</h3>
            <p className="text-gray-600">Vie nocturne animée et festivals tout l'été.</p>
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
                2h30 en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                7h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain disponible en été
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
                Service de navette en haute saison
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
              De juin à septembre pour la baignade. Juillet-août pour l'ambiance estivale.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 149-209$/nuit Activités: 15-85$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Stationnement payant près de la plage.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Grand Bend ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez des plus beaux couchers de soleil de
          l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/grand-bend.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.grandbend.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleGrandBend;
