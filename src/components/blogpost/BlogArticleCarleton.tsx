import React from 'react';

export const metadata = {
  slug: 'carleton',
  ville: 'Carleton',
  resume: 'Découverte de Carleton et de ses attraits touristiques.',
  activites: [
    'Mont Saint-Joseph',
    'Plage de Carleton',
    'Club nautique',
    'Initiation au Kayak',
    'Chasse aux Trésors',
    'Mini-Golf Maritime',
    'École de Voile',
    'Planche à Pagaie',
    'Vélo de Montagne',
  ],
  hebergements: ['Hostellerie Baie Bleue', 'Manoir Belle Plage', 'Auberge du Marchand'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Wind,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hostellerie Baie Bleue',
    category: 'Vue sur Mer',
    description: 'Vue panoramique sur la baie des Chaleurs',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/hostellerie-baie-bleue.html',
    image: 'https://images.unsplash.com/photo-1596238259704-d47dc656b2a7?auto=format&fit=crop&q=80',
  },
  {
    name: 'Manoir Belle Plage',
    category: 'Charme',
    description: 'Établissement historique rénové',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/manoir-belle-plage.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge du Marchand',
    category: 'B&B',
    description: 'Ambiance chaleureuse et familiale',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-du-marchand.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Le Naufrageur',
    type: 'Microbrasserie & Restaurant',
    speciality: 'Bières artisanales et fruits de mer',
    price: '$$$',
    mustTry: 'Plateau de fruits de mer et bière locale',
    schedule: "Toute l'année",
  },
  {
    name: 'La Moulière',
    type: 'Fruits de mer',
    speciality: 'Moules et homard',
    price: '$$$$',
    mustTry: 'Moules marinières',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Dixie Lee',
    type: 'Cantine',
    speciality: 'Fruits de mer frits',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Avril à Octobre',
  },
];

const activities = [
  {
    name: 'Mont Saint-Joseph',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Panorama exceptionnel sur la baie des Chaleurs',
  },
  {
    name: 'Plage de Carleton',
    type: 'Plage',
    duration: 'À votre guise',
    price: 'Gratuit',
    description: 'Une des plus belles plages de la Gaspésie',
  },
  {
    name: 'Club nautique',
    type: 'Sports nautiques',
    duration: 'Variable',
    price: 'À partir de 50$/activité',
    description: 'Location de kayaks, planches à voile et voiliers',
  },
];

const familyActivities = [
  {
    title: 'Initiation au Kayak',
    description: "Cours d'initiation en eau calme (8+ ans)",
    price: '45$/personne',
  },
  {
    title: 'Chasse aux Trésors',
    description: 'Parcours ludique sur la plage (5-12 ans)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Maritime',
    description: 'Parcours thématique sur la mer (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'École de Voile',
    description: "Cours d'initiation à la voile (12+ ans)",
    price: '75$/demi-journée',
    duration: '3 heures',
  },
  {
    title: 'Planche à Pagaie',
    description: 'Location et cours de SUP (12+ ans)',
    price: '35$/heure',
    duration: 'Flexible',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers du Mont Saint-Joseph (13+ ans)',
    price: 'Location: 40$/jour',
    duration: 'À votre rythme',
  },
];

export function BlogArticleCarleton() {
  return (
    <article id="blog_article_carleton" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Carleton-sur-Mer - Perle de la Baie des Chaleurs
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez un paradis balnéaire entre mer et montagnes au cœur de la Gaspésie
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Carleton-sur-Mer, nichée entre la majestueuse baie des Chaleurs et le mont Saint-Joseph,
          offre une expérience unique alliant plages de sable fin, sports nautiques et panoramas à
          couper le souffle.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596238259704-d47dc656b2a7?auto=format&fit=crop&q=80"
            alt="Baie des Chaleurs"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Carleton-sur-Mer ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Plages Exceptionnelles</h3>
            <p className="text-gray-600">
              Kilomètres de plages de sable fin aux eaux les plus chaudes du Québec.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Sports Nautiques</h3>
            <p className="text-gray-600">Paradis pour la voile, le kayak et la planche à pagaie.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Vivante</h3>
            <p className="text-gray-600">Microbrasseries, festivals et arts de la scène.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités Nautiques et Nature
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
          <Wind className="h-8 w-8 text-indigo-600" />
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
            <h3 className="font-semibold text-xl mb-4">Depuis Québec/Montréal</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Avion vers Carleton (escale à Québec)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express (10h depuis Montréal)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture (8h depuis Québec)
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
                Navette locale en saison
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
              De juin à septembre pour profiter de la plage et des activités nautiques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Prévoir 150-200$/jour incluant l'hébergement, les repas et les activités.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison pour les hébergements et activités.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir Carleton-sur-Mer ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la baie des Chaleurs
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/carleton.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://carletonsurmer.com/tourisme/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleCarleton;
