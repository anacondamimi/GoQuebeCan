import React from 'react';

export const metadata = {
  slug: 'bromont-granby',
  ville: 'Bromont Granby',
  resume: 'Découverte de Bromont Granby et de ses attraits touristiques.',
  activites: [
    'Zoo de Granby',
    'Parc aquatique Bromont',
    'Yamaska National Park',
    'Vélo de Montagne',
    'Arbre en Arbre',
    'Ski de Soirée',
  ],
  hebergements: ['St-Martin Bromont', 'Château-Bromont', 'Hôtel Castel & Spa Confort'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'St-Martin Bromont',
    category: 'Luxe',
    description: 'Hôtel & Spa avec vue sur la montagne',
    price: 'À partir de 199$/nuit',
    link: 'https://www.booking.com/hotel/ca/st-martin-bromont.html',
    image: 'https://images.unsplash.com/photo-1582653292481-44c51f429f78?auto=format&fit=crop&q=80',
  },
  {
    name: 'Château-Bromont',
    category: 'Resort',
    description: 'Au pied des pistes avec golf',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/chateau-bromont.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel Castel & Spa Confort',
    category: 'Spa',
    description: 'À proximité du Zoo de Granby',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/castel-granby.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Le Brouemont',
    type: 'Pub Gastronomique',
    speciality: 'Cuisine pub raffinée et bières artisanales',
    price: '$$$',
    mustTry: 'Burger signature et bières locales',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "L'Abordage",
    type: 'Bistro',
    speciality: 'Cuisine bistro créative',
    price: '$$$',
    mustTry: 'Plats du jour et cocktails maison',
    schedule: 'Ouvert du mardi au dimanche',
  },
  {
    name: 'Les Quatre Canards',
    type: 'Gastronomique',
    speciality: 'Cuisine française contemporaine',
    price: '$$$$',
    mustTry: 'Canard du lac Brome',
    schedule: 'Ouvert du mercredi au dimanche',
  },
  {
    name: 'Edgar Hyperlodge',
    type: 'Bistro-Pub',
    speciality: 'Cuisine du terroir et bières locales',
    price: '$$$',
    mustTry: 'Poutine au canard confit',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Les délices du Mont à Shefford',
    type: 'Cantine',
    speciality: 'Cuisine rapide de qualité',
    price: '$$',
    mustTry: 'Poutine maison et hot-dogs',
    schedule: 'Saison estivale',
  },
  {
    name: 'Le restau du 9',
    type: 'Brunch',
    speciality: 'Brunch et déjeuners gourmands',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "L'express à Waterloo",
    type: 'Brunch & Café',
    speciality: 'Déjeuners et cafés spécialisés',
    price: '$$',
    mustTry: 'Oeufs bénédictine',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "C'est Belge",
    type: 'Brunch & Pâtisserie',
    speciality: 'Brunch et pâtisseries belges',
    price: '$$',
    mustTry: 'Gaufres belges',
    schedule: 'Ouvert du mercredi au dimanche',
  },
  {
    name: 'Boulangerie Pâtisserie Canaelle',
    type: 'Boulangerie Pâtisserie',
    speciality: 'Pains artisanaux et pâtisseries fines',
    price: '$$',
    mustTry: 'Viennoiseries maison',
    schedule: 'Ouvert du mardi au dimanche',
  },
];

const summerActivities = [
  {
    name: 'Parc aquatique Bromont',
    type: 'Aquatique',
    duration: 'Journée',
    price: 'À partir de 39$/personne',
    description: "13 glissades d'eau et piscine à vagues",
  },
  {
    name: 'Zoo de Granby',
    type: 'Famille',
    duration: '4-6 heures',
    price: '45$/adulte, 35$/enfant',
    description: 'Plus de 1500 animaux et parc aquatique',
  },
  {
    name: 'Vélo de Montagne Bromont',
    type: 'Sport',
    duration: 'À la journée',
    price: '45$/jour',
    description: 'Plus de 100 km de sentiers tous niveaux',
  },
];

const winterActivities = [
  {
    name: 'Ski Bromont',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 79$/jour',
    description: '141 pistes et ski de soirée',
  },
  {
    name: 'Ski de Fond',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    price: '20$/jour',
    description: 'Réseau de sentiers entretenus',
  },
  {
    name: 'Raquette Nocturne',
    type: 'Aventure',
    duration: '2 heures',
    price: '25$/personne',
    description: 'Sentiers illuminés en soirée',
  },
];

const familyActivities = [
  {
    title: 'Zoo de Granby',
    description: 'Animaux et parc aquatique (tous âges)',
    price: 'Forfaits famille disponibles',
  },
  {
    title: 'Parc aquatique Bromont',
    description: 'Glissades et piscines (tous âges)',
    price: 'À partir de 35$/enfant',
  },
  {
    title: 'Yamaska National Park',
    description: 'Plage et sentiers faciles',
    price: '8.75$/adulte',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes de descente (12+ ans)',
    price: '45$/jour',
    duration: 'Accès journée',
  },
  {
    title: 'Arbre en Arbre',
    description: 'Parcours dans les arbres (12+ ans)',
    price: '35$/personne',
    duration: '2-3 heures',
  },
  {
    title: 'Ski de Soirée',
    description: 'Ski sous les lumières (12+ ans)',
    price: 'À partir de 35$',
    duration: '16h-22h',
  },
];

export default function BlogArticleBromontGranby() {
  return (
    <article id="blog_article_bromont_granby" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Bromont et Granby - Plaisirs Quatre Saisons
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez deux villes complémentaires offrant sports de montagne, attractions familiales
          et plein air
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Bromont et Granby, deux villes voisines des Cantons-de-l'Est, offrent une combinaison
          parfaite d'activités sportives, familiales et de plein air. De la montagne au zoo, en
          passant par les parcs aquatiques, ces destinations promettent des aventures mémorables en
          toute saison.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1582653292481-44c51f429f78?auto=format&fit=crop&q=80"
            alt="Bromont en été"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Bromont et Granby ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités Quatre Saisons</h3>
            <p className="text-gray-600">
              Du ski au vélo de montagne, en passant par les parcs aquatiques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Attractions Familiales</h3>
            <p className="text-gray-600">
              Zoo de Granby, parcs aquatiques et activités pour tous les âges.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Accessible</h3>
            <p className="text-gray-600">Montagnes, lacs et parcs nationaux à proximité.</p>
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
                  <span>Prix: {activity.price}</span>
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
                1h en voiture depuis Montréal
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
                Navettes entre les attractions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Transport en commun limité
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
              Juin à septembre pour les activités estivales. Décembre à mars pour le ski.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 159-199$/nuit Activités: 35-79$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Forfaits multi-activités disponibles.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir Bromont et Granby ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez des activités quatre saisons
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/bromont.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.skibromont.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
