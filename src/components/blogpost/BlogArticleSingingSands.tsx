import React from 'react';

export const metadata = {
  slug: 'singing-sands',
  ville: 'Singing Sands',
  resume: 'Découverte de Singing Sands et de ses attraits touristiques.',
  activites: [
    'Singing Sands Beach',
    'Bruce Peninsula National Park',
    'Fathom Five Marine Park',
    'Plage Singing Sands',
    'Sentier des Orchidées',
    'Centre des Visiteurs',
    'Randonnée Bruce Trail',
    'Kayak sur le Lac',
    'Plongée en Apnée',
  ],
  hebergements: ['Bruce Anchor Motel', 'Tobermory Princess Hotel', 'Cedar Vista Motel'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Bruce Anchor Motel',
    category: 'Vue sur Lac',
    description: 'Vue sur la baie de Tobermory',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/bruce-anchor-motel.html',
    image: 'https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Tobermory Princess Hotel',
    category: 'Charme',
    description: 'Au cœur de Tobermory',
    price: 'À partir de 179$/nuit',
    link: 'https://www.booking.com/hotel/ca/tobermory-princess.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Cedar Vista Motel',
    category: 'Familial',
    description: 'Proche du parc national',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/cedar-vista-motel.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Tobermory Brewing Co.',
    type: 'Pub & Restaurant',
    speciality: 'Bières artisanales et fruits de mer',
    price: '$$$',
    mustTry: 'Fish & Chips au poisson local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'The Fish & Chip Place',
    type: 'Fruits de mer',
    speciality: 'Poisson frais local',
    price: '$$',
    mustTry: 'Fish & Chips traditionnel',
    schedule: 'Mai à Septembre',
  },
  {
    name: 'The Sweet Shop',
    type: 'Café & Desserts',
    speciality: 'Glaces et pâtisseries maison',
    price: '$$',
    mustTry: 'Glace aux fruits locaux',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Singing Sands Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Entrée au parc: 12$/personne',
    description: 'Plage unique avec sable chantant et eaux peu profondes',
  },
  {
    name: 'Bruce Peninsula National Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '12$/personne',
    description: 'Sentiers côtiers et formations rocheuses',
  },
  {
    name: 'Fathom Five Marine Park',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Excursions en bateau à fond de verre',
  },
];

const familyActivities = [
  {
    title: 'Plage Singing Sands',
    description: 'Eaux peu profondes et sable doux (tous âges)',
    price: 'Inclus avec entrée au parc',
  },
  {
    title: 'Sentier des Orchidées',
    description: 'Promenade facile sur passerelles (tous âges)',
    price: 'Inclus avec entrée au parc',
  },
  {
    title: 'Centre des Visiteurs',
    description: 'Expositions interactives (5-12 ans)',
    price: 'Gratuit avec entrée au parc',
  },
];

const teenActivities = [
  {
    title: 'Randonnée Bruce Trail',
    description: 'Sentiers côtiers spectaculaires (12+ ans)',
    price: 'Inclus avec entrée au parc',
    duration: '2-4 heures',
  },
  {
    title: 'Kayak sur le Lac',
    description: 'Location et excursions guidées (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Plongée en Apnée',
    description: 'Découverte des eaux cristallines (14+ ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleSingingSands() {
  return (
    <article id="blog_article_singing_sands" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Singing Sands Beach - La Plage au Sable Chantant
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez cette plage unique de la péninsule Bruce, où le sable émet un son mystérieux
          sous vos pas
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Singing Sands Beach, située dans le parc national de la Péninsule-Bruce, est un joyau
          naturel unique où le sable fin émet un son particulier lorsqu'on marche dessus. Avec ses
          eaux peu profondes et cristallines, sa flore rare et ses couchers de soleil
          spectaculaires, elle offre une expérience balnéaire incomparable.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/singing-sands.avif"
            alt="Singing Sands Beach"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Singing Sands ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Sable Chantant</h3>
            <p className="text-gray-600">
              Phénomène naturel unique où le sable émet un son sous vos pas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Eaux Cristallines</h3>
            <p className="text-gray-600">
              Eaux peu profondes et transparentes idéales pour la baignade.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Écosystème Unique</h3>
            <p className="text-gray-600">
              Orchidées rares et plantes carnivores dans les marais côtiers.
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
                4h en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                8h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus jusqu'à Tobermory puis navette
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture nécessaire pour accéder au parc
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette depuis Tobermory en été
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
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
              De juin à septembre pour la baignade. Mai et septembre pour éviter les foules.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 149-179$/nuit Activités: 12-65$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Arrivez tôt car le stationnement est limité.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Singing Sands ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez cette plage unique de l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/bruce-peninsula.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.pc.gc.ca/en/pn-np/on/bruce"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
