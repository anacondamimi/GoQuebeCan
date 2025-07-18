import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'forillon',
  ville: 'Forillon',
  resume: 'Découverte de Forillon et de ses attraits touristiques.',
  activites: [
    'Randonnée Les Graves',
    'Observation des Baleines',
    'Phare de Cap-des-Rosiers',
    'Plage de Cap-Bon-Ami',
    'Xplorateurs du Parc',
    'Initiation à la Pêche',
    'Découverte des Marées',
    'Randonnée Mont Saint-Alban',
    'Vélo de Montagne',
    'Kayak de Mer',
  ],
  hebergements: ['Hôtel Baker', 'Auberge Gaspé', 'Motel Adams'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Tent } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Griffon Aventure',
    category: 'Chalet nature',
    description: 'Chalet pour 5 pers. avec salon et vue sur la mer, idéal pour les aventuriers.',
    price: 'À partir de 946$ pour 4 nuits',
    link: 'https://www.booking.com/hotel/ca/griffon-aventure.html', // lien à valider
    image: '/images/destinations/hotels/auberge griffon.avif',
  },
  {
    name: 'Motel du Haut Phare',
    category: 'Vue exceptionnelle',
    description: 'Chalet avec 2 lits superposés, proche du Cap-des-Rosiers et du phare.',
    price: 'À partir de 713$ pour 4 nuits',
    link: 'https://www.booking.com/hotel/ca/motel-du-haut-phare.html', // lien à valider
    image: '/images/destinations/hotels/motel haut phare.avif',
  },
  {
    name: 'Auberge La Petite École',
    category: 'Confort abordable',
    description: 'Auberge familiale bien notée à Gaspé, parfaite pour explorer Forillon.',
    price: 'Note : 8,7/10 sur 300+ avis',
    link: 'https://www.booking.com/hotel/ca/auberge-la-petite-ecole.html', // lien à valider
    image: '/images/destinations/hotels/auberge petite ecole.avif',
  },
];

const camping = [
  {
    name: 'Camping Des-Rosiers',
    type: 'Camping aménagé',
    description: 'Vue sur le phare de Cap-des-Rosiers',
    price: 'À partir de 30$/nuit',
    facilities: ['Douches', 'Électricité', 'Bloc sanitaire'],
  },
  {
    name: 'Camping Cap-Bon-Ami',
    type: 'Camping rustique',
    description: 'Au pied des falaises',
    price: 'À partir de 25$/nuit',
    facilities: ['Tables de pique-nique', 'Toilettes sèches'],
  },
  {
    name: 'Camping Petit-Gaspé',
    type: 'Camping en bord de mer',
    description: 'Accès direct à la plage',
    price: 'À partir de 28$/nuit',
    facilities: ['Douches', 'Cuisine commune', 'Bloc sanitaire'],
  },
];

const restaurants = [
  {
    name: 'Bistro Le Clapotis',
    type: 'Fruits de mer',
    speciality: 'Poissons frais et fruits de mer locaux',
    price: '$$$',
    mustTry: 'Morue fraîche du jour',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café des Artistes',
    type: 'Café-Restaurant',
    speciality: 'Cuisine locale et sandwichs',
    price: '$$',
    mustTry: 'Sandwich au homard',
    schedule: "Toute l'année",
  },
  {
    name: 'La Cantina du Pêcheur',
    type: 'Cantine',
    speciality: 'Fish & Chips et fruits de mer',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Randonnée Les Graves',
    type: 'Randonnée',
    duration: '4-5 heures',
    difficulty: 'Intermédiaire',
    description: 'Sentier côtier avec vues spectaculaires',
  },
  {
    name: 'Observation des Baleines',
    type: 'Nature',
    duration: '3 heures',
    price: '85$/personne',
    description: "Croisière d'observation des mammifères marins",
  },
  {
    name: 'Phare de Cap-des-Rosiers',
    type: 'Culture',
    duration: '1-2 heures',
    price: '12$/personne',
    description: 'Plus haut phare du Canada',
  },
  {
    name: 'Plage de Cap-Bon-Ami',
    type: 'Plage',
    duration: 'Libre',
    price: 'Gratuit',
    description: 'Baignade et détente au pied des falaises',
  },
];

const familyActivities = [
  {
    title: 'Xplorateurs du Parc',
    description: "Programme d'activités éducatives (6-12 ans)",
    price: "Gratuit avec l'entrée",
  },
  {
    title: 'Initiation à la Pêche',
    description: 'Atelier de pêche en famille (8+ ans)',
    price: '25$/personne',
  },
  {
    title: 'Découverte des Marées',
    description: 'Exploration des bassins à marée basse (tous âges)',
    price: "Gratuit avec l'entrée",
  },
];

const teenActivities = [
  {
    title: 'Randonnée Mont Saint-Alban',
    description: "Ascension jusqu'à la tour d'observation (13+ ans)",
    price: "Gratuit avec l'entrée",
    duration: '3-4 heures',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Parcours techniques en forêt (14+ ans)',
    price: 'Location vélo: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée le long des falaises (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
];

export function BlogArticleForillon() {
  return (
    <article id="blog_article_forillon" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Parc national Forillon - Joyau naturel de la Gaspésie
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez un territoire préservé où la mer, la montagne et la forêt se rencontrent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le parc national Forillon, situé à la pointe de la péninsule gaspésienne, offre un
          spectacle naturel unique où falaises vertigineuses, forêts denses et plages sauvages se
          côtoient dans une harmonie parfaite.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/forillon.avif"
            alt="Parc national Forillon"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Forillon ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Biodiversité Unique</h3>
            <p className="text-gray-600">
              Observation de baleines, phoques, ours noirs et plus de 225 espèces d'oiseaux.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Patrimoine Historique</h3>
            <p className="text-gray-600">
              Phare historique, sites archéologiques et maisons d'époque.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités Quatre Saisons</h3>
            <p className="text-gray-600">
              Randonnée, kayak, ski de fond et raquette selon la saison.
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
          <Tent className="h-8 w-8 text-indigo-600" />
          Camping
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <Hotel className="h-8 w-8 text-indigo-600" />
          Où Dormir à Proximité ?
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
                Avion vers Gaspé (1h30 depuis Québec)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express (12h depuis Montréal)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture (9h depuis Montréal)
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
              Entrée au parc: 8$/jour Camping: 25-30$/nuit Activités: 50-100$/jour
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation obligatoire pour le camping en haute saison. Prévoir des vêtements chauds
              même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Explorer Forillon ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de la nature préservée
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.pc.gc.ca/fr/pn-np/qc/forillon"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver votre visite
          </a>
          <a
            href="https://www.booking.com/landmark/ca/parc-national-forillon.html"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleForillon;
