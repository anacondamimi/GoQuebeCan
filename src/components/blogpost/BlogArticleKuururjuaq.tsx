import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'kuururjuaq',
  ville: 'Kuururjuaq',
  resume: 'Découverte de Kuururjuaq et de ses attraits touristiques.',
  activites: ['Mont D', 'Rivière Koroc', 'Randonnée Tundra'],
  hebergements: ['Auberge Kuujjuaq', 'Camps de Base Kuururjuaq'],
  publics: ['amateurs de culture', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Sun,
  Snowflake,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge Kuujjuaq',
    category: 'Confort',
    description: 'Point de départ pour le parc',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-kuujjuaq.html',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
  },
  {
    name: 'Camps de Base Kuururjuaq',
    category: 'Refuge',
    description: 'Hébergement rustique dans le parc',
    price: 'À partir de 89$/nuit',
    link: 'https://www.nunavikparks.ca/fr/parcs/kuururjuaq',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Restaurant Kuujjuaq',
    type: 'Cuisine du Nord',
    speciality: 'Cuisine traditionnelle inuite',
    price: '$$$',
    mustTry: 'Omble chevalier et caribou',
    schedule: "Toute l'année",
  },
  {
    name: 'Café du Nord',
    type: 'Café-Restaurant',
    speciality: 'Cuisine réconfortante',
    price: '$$',
    mustTry: 'Soupe traditionnelle',
    schedule: "Toute l'année",
  },
];

const activities = [
  {
    name: "Mont D'Iberville",
    type: 'Alpinisme',
    duration: '2-3 jours',
    price: 'Guide obligatoire: 350$/jour',
    description: 'Plus haut sommet du Québec (1652m)',
  },
  {
    name: 'Rivière Koroc',
    type: 'Kayak/Canot',
    duration: '3-7 jours',
    price: 'Guide obligatoire: 250$/jour',
    description: 'Descente en eau vive dans un cadre spectaculaire',
  },
  {
    name: 'Randonnée Tundra',
    type: 'Randonnée',
    duration: '1-5 jours',
    price: 'Guide recommandé: 200$/jour',
    description: 'Exploration de la toundra arctique',
  },
];

const summerActivities = [
  {
    name: 'Observation de la Faune',
    type: 'Nature',
    duration: 'Variable',
    price: 'Guide recommandé: 200$/jour',
    description: 'Caribous, loups arctiques et oiseaux migrateurs',
  },
  {
    name: 'Photographie',
    type: 'Art',
    duration: 'Variable',
    price: 'Guide photo: 250$/jour',
    description: 'Paysages arctiques et aurores boréales',
  },
  {
    name: 'Culture Inuite',
    type: 'Culture',
    duration: '1-2 jours',
    price: '150$/jour',
    description: 'Rencontres et traditions locales',
  },
];

const winterActivities = [
  {
    name: 'Ski-Pulka',
    type: 'Aventure',
    duration: '3-7 jours',
    price: 'Guide obligatoire: 300$/jour',
    description: 'Expédition en ski avec pulka',
  },
  {
    name: 'Motoneige',
    type: 'Motorisé',
    duration: '1-3 jours',
    price: 'Guide obligatoire: 275$/jour',
    description: 'Exploration des vastes étendues',
  },
  {
    name: 'Aurores Boréales',
    type: 'Observation',
    duration: 'Soirée',
    price: 'Guide: 150$/soirée',
    description: 'Observation du phénomène naturel',
  },
];

export default function BlogArticleKuururjuaq() {
  return (
    <article id="blog_article_kuururjuaq" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Parc national Kuururjuaq - L'Ultime Aventure Arctique
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez l'un des parcs les plus septentrionaux du Québec, où toundra, montagnes et
          culture inuite créent une expérience unique
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le parc national Kuururjuaq, situé à l'extrême nord du Québec, offre une expérience
          arctique authentique avec le mont D'Iberville, plus haut sommet du Québec, la majestueuse
          rivière Koroc et des paysages de toundra à perte de vue. C'est un territoire où l'aventure
          se mêle à la culture inuite millénaire.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/kuururjuaq.avif"
            alt="Parc Kuururjuaq"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Kuururjuaq ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Arctiques</h3>
            <p className="text-gray-600">
              Toundra, montagnes et rivières sauvages dans un environnement préservé.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Inuite</h3>
            <p className="text-gray-600">
              Immersion dans les traditions et le mode de vie du Grand Nord.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Aventure Extrême</h3>
            <p className="text-gray-600">
              Expéditions uniques dans l'un des derniers territoires sauvages.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités Principales
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
          <Sun className="h-8 w-8 text-indigo-600" />
          Activités d'Été
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
          <Snowflake className="h-8 w-8 text-indigo-600" />
          Activités d'Hiver
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
          <Hotel className="h-8 w-8 text-indigo-600" />
          Où Dormir ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Vol vers Kuujjuaq (4h depuis Montréal)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Accès uniquement par avion
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Vols réguliers avec Air Inuit
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Dans le Parc</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Transport en hydravion ou hélicoptère
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Guide obligatoire pour certaines activités
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Déplacements à pied ou en ski
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
              Juillet-août pour l'été. Mars-avril pour les activités hivernales.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Transport: 1000-2000$/personne Hébergement: 89-189$/nuit Activités: 150-350$/jour
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation obligatoire. Équipement spécialisé nécessaire. Guide obligatoire pour
              certaines activités.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt pour l'Aventure Arctique ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre expédition maintenant et découvrez l'un des derniers territoires sauvages
          du Québec
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.nunavikparks.ca/fr/parcs/kuururjuaq"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Planifier votre Voyage
          </a>
          <a
            href="https://www.airinuit.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Réserver votre Vol
          </a>
        </div>
      </section>
    </article>
  );
}
