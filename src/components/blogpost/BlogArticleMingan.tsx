import React from 'react';

export const metadata = {
  slug: 'mingan',
  ville: 'Mingan',
  resume: 'Découverte de Mingan et de ses attraits touristiques.',
  activites: [
    'Excursion aux Monolithes',
    'Randonnée Île Niapiskau',
    'Observation des Oiseaux',
    'Découverte des Fossiles',
    'Mini-Croisière',
    'Centre d',
    'Kayak de Mer',
    'Randonnée Photo',
    'Zodiac Aventure',
  ],
  hebergements: ['Auberge de l', 'Gîte Chez Marie', 'Chalets des Îles'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: "Auberge de l'Archipel",
    category: 'Vue sur Mer',
    description: 'Vue imprenable sur les monolithes',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-archipel-mingan.html',
    image: 'https://images.unsplash.com/photo-1596238259704-d47dc656b2a7?auto=format&fit=crop&q=80',
  },
  {
    name: 'Gîte Chez Marie',
    category: 'B&B',
    description: 'Accueil chaleureux et petit-déjeuner local',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/gite-chez-marie.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Chalets des Îles',
    category: 'Chalet',
    description: 'Hébergement rustique près du parc',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/chalets-iles-mingan.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'La Table des Îles',
    type: 'Fruits de mer',
    speciality: 'Fruits de mer et poissons locaux',
    price: '$$$',
    mustTry: 'Homard de la Côte-Nord',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café de la Mer',
    type: 'Café-Restaurant',
    speciality: 'Cuisine bistro et produits locaux',
    price: '$$',
    mustTry: 'Soupe aux fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Port',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Excursion aux Monolithes',
    type: 'Nature',
    duration: '4-6 heures',
    price: '89$/personne',
    description: 'Découverte en bateau des îles et monolithes',
  },
  {
    name: 'Randonnée Île Niapiskau',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Inclus avec accès parc',
    description: "Sentier d'interprétation des monolithes",
  },
  {
    name: 'Observation des Oiseaux',
    type: 'Nature',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Plus de 50 000 oiseaux marins nicheurs',
  },
];

const familyActivities = [
  {
    title: 'Découverte des Fossiles',
    description: "Atelier d'interprétation (7-12 ans)",
    price: '15$/enfant',
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux familles (tous âges)',
    price: '45$/enfant',
  },
  {
    title: "Centre d'Interprétation",
    description: 'Expositions interactives (tous âges)',
    price: 'Gratuit avec accès parc',
  },
];

const teenActivities = [
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée entre les îles (14+ ans)',
    price: '85$/personne',
    duration: '4 heures',
  },
  {
    title: 'Randonnée Photo',
    description: 'Safari photo des monolithes (12+ ans)',
    price: '55$/personne',
    duration: '3 heures',
  },
  {
    title: 'Zodiac Aventure',
    description: 'Tour rapide en zodiac (12+ ans)',
    price: '75$/personne',
    duration: '2 heures',
  },
];

export function BlogArticleMingan() {
  return (
    <article id="blog_article_mingan" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Mingan - L'Archipel aux Monolithes Légendaires
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez un paysage unique au monde avec ses sculptures naturelles et sa biodiversité
          exceptionnelle
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          L'archipel de Mingan, joyau naturel de la Côte-Nord, offre un spectacle géologique unique
          avec ses monolithes sculptés par la mer et le temps. Ce parc national abrite également une
          faune marine exceptionnelle et des milliers d'oiseaux marins, faisant de chaque visite une
          expérience inoubliable.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596239223210-1bfe71b87817?auto=format&fit=crop&q=80"
            alt="Monolithes de Mingan"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Mingan ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Monolithes Uniques</h3>
            <p className="text-gray-600">
              Formations rocheuses spectaculaires sculptées par l'érosion marine.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Biodiversité Marine</h3>
            <p className="text-gray-600">Sanctuaire d'oiseaux marins et habitat de phoques.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aventure Maritime</h3>
            <p className="text-gray-600">Kayak, croisières et exploration des îles.</p>
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
                Vol vers Sept-Îles puis location de voiture
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                10h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional jusqu'à Havre-Saint-Pierre
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navettes maritimes vers les îles
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de kayaks disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture nécessaire pour accéder au parc
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
              De juin à septembre pour le climat doux. Juillet-août pour les meilleures conditions
              maritimes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Mingan ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez ce joyau naturel unique au monde
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/mingan.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.pc.gc.ca/fr/pn-np/qc/mingan"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleMingan;
