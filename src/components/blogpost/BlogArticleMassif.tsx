import React from 'react';

export const metadata = {
  slug: 'massif',
  ville: 'Massif',
  resume: 'Découverte de Massif et de ses attraits touristiques.',
  activites: [
    'École de Ski Junior',
    'Parc d',
    'Chasse au Trésor',
    'Snowpark',
    'Camp Ados Freeride',
    'Descente en Fat Bike',
  ],
  hebergements: ['Hôtel Le Massif', 'Refuge Le Massif', 'Chalets du Massif'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Snowflake } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
     name: 'Au Grand Merisier',
  category: 'Chalet alpin',
  description: 'Chalet 4 chambres avec vue, 3 salles de bain, grande cuisine et espace familial chaleureux.',
  price: 'À partir de 465$/nuit',
  link: 'https://www.booking.com/hotel/ca/au-grand-merisier.html', // ou le lien exact selon URL finale
  image: '/images/destinations/hotels/chalet alpin.avif',
  },
  {
    name: 'Cottage Québec - Olivine',
  category: 'Chalet nature',
  description: 'Chalet tout équipé avec 3 chambres, cuisine, terrasse et spa, parfait pour familles ou amis.',
  price: 'À partir de 227$/nuit',
  link: 'https://www.booking.com/hotel/ca/cottage-quebec-olivine.fr.html',
  image: '/images/destinations/hotels/cottage olivine.avif',
  },
  {
    name: 'Cottage Québec - La Zéolite',
  category: 'Appartement spacieux',
  description: 'Appartement 4 chambres avec grande cuisine et vue panoramique, parfait pour groupes ou familles.',
  price: 'À partir de 313$/nuit',
  link: 'https://www.booking.com/hotel/ca/cottage-quebec-la-zeolite.fr.html',
  image: '/images/destinations/hotels/cottage zeolite.avif',
  },
];

const restaurants = [
  {
    name: 'Le Bistro Le Charlevoix',
    type: 'Gastronomique',
    speciality: 'Cuisine régionale raffinée',
    price: '$$$$',
    mustTry: 'Tartare de cerf et fromages locaux',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Le Camp de Base',
    type: 'Bistro-Bar',
    speciality: 'Cuisine réconfortante',
    price: '$$$',
    mustTry: 'Poutine du bûcheron',
    schedule: 'Saison de ski',
  },
  {
    name: 'Le Café du Sommet',
    type: 'Café-Restaurant',
    speciality: 'Sandwichs et soupes maison',
    price: '$$',
    mustTry: "Grilled cheese au fromage d'ici",
    schedule: "Toute l'année",
  },
];

const winterActivities = [
  {
    name: 'Ski Alpin',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 89$/jour',
    description: '52 pistes avec vue sur le Saint-Laurent',
  },
  {
    name: 'Ski de Randonnée',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    difficulty: 'Intermédiaire-Avancé',
    description: 'Sentiers balisés en forêt',
  },
  {
    name: 'Raquette',
    type: "Sport d'hiver",
    duration: '1-3 heures',
    price: '25$/personne',
    description: '12 km de sentiers panoramiques',
  },
];

const summerActivities = [
  {
    name: 'Vélo de Montagne',
    type: "Sport d'été",
    duration: 'À la journée',
    price: 'À partir de 45$/jour',
    description: '20 pistes de descente tous niveaux',
  },
  {
    name: 'Randonnée Pédestre',
    type: 'Nature',
    duration: '1-6 heures',
    difficulty: 'Tous niveaux',
    description: 'Plus de 30 km de sentiers',
  },
  {
    name: 'Via Ferrata',
    type: 'Aventure',
    duration: '3 heures',
    price: '89$/personne',
    description: 'Parcours sécurisé avec vue sur le fleuve',
  },
];

const familyActivities = [
  {
    title: 'École de Ski Junior',
    description: 'Cours adaptés aux enfants (4-12 ans)',
    price: '75$/demi-journée',
  },
  {
    title: "Parc d'Aventure",
    description: 'Parcours dans les arbres (7+ ans)',
    price: '39$/enfant',
  },
  {
    title: 'Chasse au Trésor',
    description: "Activité d'orientation en famille",
    price: 'Gratuit avec forfait',
  },
];

const teenActivities = [
  {
    title: 'Snowpark',
    description: 'Modules pour tous les niveaux (12+ ans)',
    price: 'Inclus dans forfait ski',
    duration: 'Accès journée',
  },
  {
    title: 'Camp Ados Freeride',
    description: 'Stage de perfectionnement ski/snow (13-17 ans)',
    price: '299$/3 jours',
    duration: '3 jours',
  },
  {
    title: 'Descente en Fat Bike',
    description: 'Vélo sur neige encadré (14+ ans)',
    price: '65$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleMassif() {
  return (
    <article id="blog_article_massif" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Le Massif de Charlevoix - Entre Montagne et Fleuve
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez la plus haute station de ski à l'est des Rocheuses canadiennes, où les pistes
          plongent vers le Saint-Laurent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le Massif de Charlevoix offre une expérience unique où la montagne rencontre le fleuve.
          Avec le plus grand dénivelé à l'est des Rocheuses canadiennes (770 mètres), la station
          propose des panoramas à couper le souffle et des activités quatre saisons.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/Le massif.avif"
            alt="Le Massif en hiver"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Le Massif ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Vue Spectaculaire</h3>
            <p className="text-gray-600">
              Skier face au Saint-Laurent, une expérience unique en Amérique du Nord.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Terrain Varié</h3>
            <p className="text-gray-600">52 pistes pour tous les niveaux et un snowpark renommé.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités Quatre Saisons</h3>
            <p className="text-gray-600">
              Ski, vélo de montagne, randonnée et via ferrata selon la saison.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Snowflake className="h-8 w-8 text-indigo-600" />
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
                1h15 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Train de Charlevoix depuis Québec
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette gratuite entre les secteurs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Service de navette depuis Québec
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
              Décembre à avril pour le ski. Juin à octobre pour les activités estivales.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Forfait ski: 89-129$/jour Hébergement: 189-399$/nuit Repas: 30-75$/personne
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Le Massif ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la vue imprenable sur le Saint-Laurent
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.lemassif.com"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver vos Forfaits
          </a>
          <a
            href="https://www.booking.com/landmark/ca/le-massif-de-charlevoix.html"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}
