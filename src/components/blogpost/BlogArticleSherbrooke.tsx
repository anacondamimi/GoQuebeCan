import React from 'react';

export const metadata = {
  slug: 'sherbrooke',
  ville: 'Sherbrooke',
  resume: 'Découverte de Sherbrooke et de ses attraits touristiques.',
  activites: [
    'Musée de la Nature et des Sciences',
    'Parc Jacques-Cartier',
    'Centre de Sciences',
    'Vélo de Montagne',
    'Escalade Intérieure',
    'Skateparc',
  ],
  hebergements: ['OTL Gouverneur Sherbrooke', 'Grand Times Hotel', 'Hôtel Le Président'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Palette, } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'OTL Gouverneur Sherbrooke',
    category: 'Luxe',
    description: 'Au cœur du centre-ville avec vue panoramique',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/gouverneur-sherbrooke.html',
    image: 'https://images.unsplash.com/photo-1595880375338-a78c3a07cef5?auto=format&fit=crop&q=80',
  },
  {
    name: 'Grand Times Hotel',
    category: 'Moderne',
    description: 'Design contemporain et confort',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/grand-times-sherbrooke.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel Le Président',
    category: 'Affaires',
    description: "Idéal pour les voyages d'affaires",
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/le-president-sherbrooke.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Auguste Restaurant',
    type: 'Gastronomique',
    speciality: 'Cuisine française contemporaine',
    price: '$$$$',
    mustTry: 'Foie gras maison',
    schedule: 'Ouvert du mardi au samedi',
  },
  {
    name: 'OMG Restaurant',
    type: 'Fusion',
    speciality: 'Cuisine asiatique fusion',
    price: '$$$',
    mustTry: 'Tataki de thon',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Café Pierre Jean Jase',
    type: 'Bistro',
    speciality: 'Cuisine bistro et brunch',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Ouvert tous les jours',
  },
];

const culturalActivities = [
  {
    name: 'Circuit des Murales',
    type: 'Art Urbain',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: '16 murales géantes dans le centre-ville',
  },
  {
    name: 'Musée des Beaux-Arts',
    type: 'Culture',
    duration: '1-2 heures',
    price: '15$/personne',
    description: 'Collections permanentes et expositions temporaires',
  },
  {
    name: 'Théâtre Granada',
    type: 'Spectacle',
    duration: 'Variable',
    price: 'À partir de 25$',
    description: 'Salle de spectacle historique',
  },
];

const outdoorActivities = [
  {
    name: 'Parc du Mont-Bellevue',
    type: 'Nature',
    duration: '2-4 heures',
    price: 'Gratuit',
    description: 'Randonnée et vélo de montagne en plein cœur de la ville',
  },
  {
    name: 'Gorge de la Rivière Magog',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Sentiers panoramiques le long de la rivière',
  },
  {
    name: 'Marais Réal-D.-Carbonneau',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: "Observation d'oiseaux et passerelles sur l'eau",
  },
];

const familyActivities = [
  {
    title: 'Musée de la Nature et des Sciences',
    description: 'Expositions interactives pour tous les âges',
    price: '12$/enfant',
  },
  {
    title: 'Parc Jacques-Cartier',
    description: "Jeux d'eau et aires de jeux",
    price: 'Gratuit',
  },
  {
    title: 'Centre de Sciences',
    description: 'Ateliers scientifiques pour enfants',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes au Mont-Bellevue (12+ ans)',
    price: 'Accès gratuit',
    duration: 'À votre rythme',
  },
  {
    title: 'Escalade Intérieure',
    description: "Centre d'escalade moderne (12+ ans)",
    price: '25$/personne',
    duration: '2-3 heures',
  },
  {
    title: 'Skateparc',
    description: 'Modules pour tous les niveaux',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
];

export default function BlogArticleSherbrooke() {
  return (
    <article id="blog_article_sherbrooke" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Sherbrooke - La Ville des Murales et de la Culture
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez la capitale culturelle des Cantons-de-l'Est, entre art urbain, nature et
          histoire
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Sherbrooke, ville dynamique des Cantons-de-l'Est, se distingue par son patrimoine culturel
          riche, ses murales urbaines spectaculaires et son cadre naturel enchanteur. Ville
          universitaire vibrante, elle offre un mélange unique d'histoire, d'art contemporain et
          d'activités de plein air.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1595880375338-a78c3a07cef5?auto=format&fit=crop&q=80"
            alt="Sherbrooke"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Sherbrooke ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Art Urbain Unique</h3>
            <p className="text-gray-600">
              Plus grande concentration de murales au Québec, créant un musée à ciel ouvert.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Vivante</h3>
            <p className="text-gray-600">Musées, galeries d'art et vie nocturne animée.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature en Ville</h3>
            <p className="text-gray-600">
              Parcs, sentiers et rivières accessibles en plein cœur urbain.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Palette className="h-8 w-8 text-indigo-600" />
          Culture et Art
        </h2>
        <div className="space-y-8">
          {culturalActivities.map((activity) => (
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
          Plein Air et Nature
        </h2>
        <div className="space-y-8">
          {outdoorActivities.map((activity) => (
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
                1h45 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                2h30 en voiture depuis Québec
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
                Transport en commun efficace (STS)
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
              Mai à octobre pour les activités extérieures. Festivals tout au long de l'année.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 139-189$/nuit Activités: 0-25$/jour Repas: 15-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Ville étudiante animée. Nombreux événements culturels. Circuit des murales accessible
              toute l'année.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Sherbrooke ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez la capitale culturelle des Cantons-de-l'Est
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sherbrooke.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.destinationsherbrooke.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}


