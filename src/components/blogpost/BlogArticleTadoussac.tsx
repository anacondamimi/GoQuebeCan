import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'tadoussac',
  ville: 'Tadoussac',
  resume: 'Découverte de Tadoussac et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Sentier de la Pointe-de-l',
    'Centre d',
    'Mini-Croisière',
    'Plage de Tadoussac',
    'Atelier Découverte des Baleines',
    'Kayak de Mer',
    'Randonnée du Fjord',
    'Zodiac Aventure',
  ],
  hebergements: ['Hôtel Tadoussac', 'Auberge La Galouïne', 'Motel Le Beluga'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Scale as Whale,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Tadoussac',
    category: 'En bord de plage – Éco-certifié',
    description:
      'Un hôtel emblématique face au fleuve Saint-Laurent avec une note exceptionnelle de 9.7/10. Certificat de durabilité.',
    price: 'Tarifs variables selon la saison',
    link: 'https://www.booking.com/hotel/ca/tadoussac.fr.html',
    image: '/images/destinations/hotels/hotel tadoussac.avif',
  },
  {
    name: 'Hôtel Motel Le Béluga',
    category: 'Emplacement central',
    description:
      "À seulement 100 mètres du centre de Tadoussac. Idéal pour rejoindre les départs d'excursion aux baleines à pied.",
    price: 'À partir de ~135$/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/le-beluga.fr.html',
    image: '/images/destinations/hotels/motel beluga.avif',
  },
  {
    name: 'Auberge du Café chez Sam',
    category: 'Authentique & convivial',
    description:
      'Située à Baie-Sainte-Catherine, à seulement 4 km de Tadoussac. Note de 8,3/10 par plus de 500 voyageurs.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/auberge-du-cafe-chez-sam.fr.html',
    image: '/images/destinations/hotels/auberge chez sam.avif',
  },
];

const restaurants = [
  {
    name: 'Restaurant Le Bateau',
    type: 'Gastronomique',
    speciality: 'Fruits de mer et poissons locaux',
    price: '$$$$',
    mustTry: 'Tartare de saumon et pétoncles poêlés',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café du Fjord',
    type: 'Bistro',
    speciality: 'Cuisine québécoise contemporaine',
    price: '$$$',
    mustTry: 'Soupe aux fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'La Cantine du Quai',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips et guedille au homard',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '3 heures',
    price: '79$/personne',
    description: 'Observation des baleines et bélugas',
  },
  {
    name: "Sentier de la Pointe-de-l'Islet",
    type: 'Randonnée',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Vue panoramique sur le fjord',
  },
  {
    name: "Centre d'Interprétation des Mammifères Marins",
    type: 'Culture',
    duration: '2-3 heures',
    price: '25$/personne',
    description: 'Exposition interactive sur les baleines',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière',
    description: 'Croisière adaptée aux familles (tous âges)',
    price: '45$/enfant',
  },
  {
    title: 'Plage de Tadoussac',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Atelier Découverte des Baleines',
    description: 'Animation interactive (5-12 ans)',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée sur le fjord (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Randonnée du Fjord',
    description: 'Sentier panoramique (12+ ans)',
    price: 'Gratuit',
    duration: '4-5 heures',
  },
  {
    title: 'Zodiac Aventure',
    description: 'Observation des baleines en zodiac (12+ ans)',
    price: '89$/personne',
    duration: '2.5 heures',
  },
];

export default function BlogArticleTadoussac() {
  return (
    <article id="blog_article_tadoussac" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tadoussac - Le Royaume des Baleines
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce village historique où le fjord du Saguenay rencontre le Saint-Laurent, créant
          un habitat unique pour les baleines
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Tadoussac, premier poste de traite de fourrures en Amérique du Nord, est aujourd'hui
          mondialement reconnu pour l'observation des baleines. Situé à la confluence du fjord du
          Saguenay et du Saint-Laurent, ce village pittoresque offre un mélange unique d'histoire,
          de nature spectaculaire et d'aventures maritimes.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/tadoussac.avif"
            alt="Tadoussac"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Tadoussac ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Observation des Baleines</h3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au monde pour observer les baleines et bélugas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Site Historique</h3>
            <p className="text-gray-600">
              Plus ancien poste de traite en Amérique du Nord, riche en histoire.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Uniques</h3>
            <p className="text-gray-600">
              Rencontre spectaculaire du fjord du Saguenay et du Saint-Laurent.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Whale className="h-8 w-8 text-indigo-600" />
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
                6h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional quotidien
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
                Traversier pour Baie-Sainte-Catherine
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
              De juin à octobre pour l'observation des baleines. Juillet-août pour le temps le plus
              doux.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 139-199$/nuit Activités: 25-89$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds pour les
              croisières.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Tadoussac ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et partez à la rencontre des baleines
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/tadoussac.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.croisieres-aml.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Réserver une Croisière
          </a>
        </div>
      </section>
    </article>
  );
}
