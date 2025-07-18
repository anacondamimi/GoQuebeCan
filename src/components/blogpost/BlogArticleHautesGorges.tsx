import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'hautes-gorges',
  ville: 'Hautes Gorges',
  resume: 'Découverte de Hautes Gorges et de ses attraits touristiques.',
  activites: [
    'Croisière sur la Rivière Malbaie',
    'Sentier des Érables',
    'Via Ferrata de la Charlevoix',
    'Mini-Croisière Découverte',
    'Rallye Nature',
    'Atelier Junior Ranger',
    'Initiation à l',
    'Location de Kayak',
    'Randonnée L',
  ],
  hebergements: ['Auberge des Hautes-Gorges', 'Fairmont Le Manoir Richelieu', 'Auberge La Marmite'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge La Châtelaine',
    category: 'Vue exceptionnelle',
    description: 'Chambre double avec salle de bain privée, petit-déjeuner inclus. Note 9,5/10.',
    price: 'À partir de 156$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-la-chatelaine.fr.html',
    image: '/images/destinations/hotels/auberge chatelaine.avif',
  },
  {
    name: 'Auberge Les Sources',
    category: 'Tranquillité',
    description: 'Petite chambre double au charme rustique, avec annulation gratuite.',
    price: 'À partir de 115$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-les-sources.fr.html',
    image: '/images/destinations/hotels/auberge les sources.avif',
  },
  {
    name: 'Auberge La Marmite',
    category: 'Confort & Cuisine',
    description: 'Chambre double standard avec petit-déjeuner inclus. Note 8,6/10.',
    price: 'À partir de 155$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-la-marmite.fr.html',
    image: '/images/destinations/hotels/auberge la marmite.avif',
  },
];

const camping = [
  {
    name: 'Camping des Érables',
    type: 'Camping aménagé',
    description: 'Sites avec services complets',
    price: 'À partir de 35$/nuit',
    facilities: ['Douches', 'Électricité', 'Bloc sanitaire'],
  },
  {
    name: 'Camping de la Rivière',
    type: 'Camping rustique',
    description: 'Sites en bordure de rivière',
    price: 'À partir de 25$/nuit',
    facilities: ['Tables de pique-nique', 'Toilettes sèches'],
  },
];

const restaurants = [
  {
    name: 'Restaurant du Parc',
    type: 'Cuisine locale',
    speciality: 'Produits du terroir de Charlevoix',
    price: '$$$',
    mustTry: 'Tourtière de Charlevoix',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café de la Rivière',
    type: 'Café-Restaurant',
    speciality: 'Sandwichs et soupes maison',
    price: '$$',
    mustTry: 'Sandwich au saumon fumé local',
    schedule: "Toute l'année",
  },
  {
    name: 'Casse-Croûte des Randonneurs',
    type: 'Restauration rapide',
    speciality: 'Menus pour randonneurs',
    price: '$',
    mustTry: 'Poutine du randonneur',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Croisière sur la Rivière Malbaie',
    type: 'Navigation',
    duration: '1h30-3h30',
    price: 'À partir de 49$/adulte',
    description: "Découverte des plus hautes parois à l'est des Rocheuses",
  },
  {
    name: 'Sentier des Érables',
    type: 'Randonnée',
    duration: '3-4 heures',
    difficulty: 'Intermédiaire',
    description: 'Vue panoramique sur la vallée',
  },
  {
    name: 'Via Ferrata de la Charlevoix',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '89$/personne',
    description: 'Parcours sécurisé sur les parois',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière Découverte',
    description: 'Croisière adaptée aux familles (1h, tous âges)',
    price: '29$/enfant, 39$/adulte',
  },
  {
    title: 'Rallye Nature',
    description: "Parcours d'observation de la faune (5-12 ans)",
    price: "Gratuit avec l'entrée",
  },
  {
    title: 'Atelier Junior Ranger',
    description: 'Programme éducatif sur la nature (7-12 ans)',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: "Initiation à l'Escalade",
    description: "Cours d'escalade sur paroi naturelle (12+ ans)",
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Location de Kayak',
    description: 'Exploration de la rivière en kayak (12+ ans)',
    price: '45$/demi-journée',
    duration: '4 heures',
  },
  {
    title: "Randonnée L'Acropole",
    description: 'Randonnée sportive avec guide (14+ ans)',
    price: '55$/personne',
    duration: '6 heures',
  },
];

export function BlogArticleHautesGorges() {
  return (
    <article id="blog_article_hautes_gorges" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Parc national des Hautes-Gorges-de-la-Rivière-Malbaie
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez l'un des plus beaux parcs du Québec, où fjord, montagnes et rivière créent un
          spectacle naturel unique
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le parc national des Hautes-Gorges-de-la-Rivière-Malbaie abrite les parois les plus hautes
          à l'est des Rocheuses. Ce joyau naturel de Charlevoix offre des paysages à couper le
          souffle et des expériences uniques en toute saison.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/hautes-gorges.avif"
            alt="Hautes-Gorges"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter les Hautes-Gorges ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Spectaculaires</h3>
            <p className="text-gray-600">
              Parois vertigineuses de 800 mètres et vues panoramiques exceptionnelles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités Nautiques</h3>
            <p className="text-gray-600">Croisières, kayak et découverte de la rivière Malbaie.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aventure Quatre Saisons</h3>
            <p className="text-gray-600">
              Randonnée, escalade, ski de fond et raquette selon la saison.
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
          <Compass className="h-8 w-8 text-indigo-600" />
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
          <Compass className="h-8 w-8 text-indigo-600" />
          Camping
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {camping.map((site) => (
            <div key={site.name} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{site.name}</h3>
              <p className="text-gray-600 mb-4">{site.description}</p>
              <div className="space-y-2">
                <p className="text-indigo-600 font-medium">{site.price}</p>
                <div className="flex flex-wrap gap-2">
                  {site.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
                4h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional jusqu'à La Malbaie
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Dans le Parc</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette gratuite en haute saison
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture recommandée hors saison
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
              Juin à septembre pour les activités estivales. Décembre à mars pour les sports
              d'hiver.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Entrée au parc: 9$/jour Camping: 25-35$/nuit Activités: 40-90$/jour
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation obligatoire pour le camping et les activités guidées. Prévoir des
              vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Explorer les Hautes-Gorges ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la nature préservée
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.sepaq.com/pq/hgo/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver votre visite
          </a>
          <a
            href="https://www.booking.com/landmark/ca/parc-national-des-hautes-gorges.html"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleHautesGorges;
