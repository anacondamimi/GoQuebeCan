import React from 'react';

export const metadata = {
  slug: 'perce',
  ville: 'Perce',
  resume: 'Découverte de Perce et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Île Bonaventure',
    'Géoparc de Percé',
    'Rallye du Géoparc',
    'Mini-Croisière',
    'Plage de l',
    'Initiation au Kayak de Mer',
    'Atelier Photo Nature',
    'Randonnée Nocturne',
  ],
  hebergements: ['Riotel Percé', 'Hôtel La Normandie', 'Au Pic de l'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Fish } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Riotel Percé',
    category: 'Vue sur Mer',
    description: 'Vue imprenable sur le Rocher Percé',
    price: 'À partir de 199$/nuit',
    link: 'https://www.booking.com/hotel/ca/riotel-perce.html',
    image: 'https://images.unsplash.com/photo-1578607974203-0e5657088821?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel La Normandie',
    category: 'Charme',
    description: 'Au cœur du village historique',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/la-normandie-perce.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: "Au Pic de l'Aurore",
    category: 'Vue Panoramique',
    description: 'Surplombant la baie de Percé',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/au-pic-de-l-aurore.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'La Maison du Pêcheur',
    type: 'Fruits de mer',
    speciality: 'Homard frais et poissons locaux',
    price: '$$$$',
    mustTry: 'Plateau de fruits de mer royal',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Les Sacs à Vin',
    type: 'Bistro-Bar à vin',
    speciality: 'Cuisine du terroir et vins naturels',
    price: '$$$',
    mustTry: 'Tartare de thon aux agrumes',
    schedule: 'Juin à Septembre',
  },
  {
    name: 'Cantine Le Petit Barachois',
    type: 'Cantine de Plage',
    speciality: 'Fruits de mer décontractés',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '2.5-3 heures',
    price: '79$/personne',
    link: 'https://www.croisieresgaspe.ca',
    description: 'Observation des baleines et du Rocher Percé',
  },
  {
    name: 'Île Bonaventure',
    type: 'Nature',
    duration: 'Demi-journée',
    price: '45$/personne',
    link: 'https://www.sepaq.com/pq/bon/',
    description: 'Colonie de fous de Bassan et randonnées',
  },
  {
    name: 'Géoparc de Percé',
    type: 'Aventure',
    duration: '2-4 heures',
    price: '35$/personne',
    link: 'https://geoparcdeperce.com',
    description: 'Plateforme vitrée et sentiers suspendus',
  },
];

const familyActivities = [
  {
    title: 'Rallye du Géoparc',
    description: 'Chasse au trésor éducative sur la géologie (5-12 ans)',
    price: "Inclus avec l'entrée",
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux enfants de 5-12 ans (1h)',
    price: '35$/enfant',
  },
  {
    title: "Plage de l'Anse-à-Beaufils",
    description: 'Baignade et châteaux de sable (tous âges)',
    price: 'Gratuit',
  },
];

const teenActivities = [
  {
    title: 'Initiation au Kayak de Mer',
    description: 'Excursion guidée autour du Rocher Percé (13+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Atelier Photo Nature',
    description: 'Cours de photographie avec un pro local (12-17 ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
  {
    title: 'Randonnée Nocturne',
    description: 'Exploration du Géoparc au crépuscule avec astronome (13+ ans)',
    price: '40$/personne',
    duration: '2.5 heures',
  },
];
export default function BlogArticlePerce() {
  return (
    <article id="blog_article_perce" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Percé en Gaspésie - Le Joyau du Saint-Laurent
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez l'iconique Rocher Percé, l'île Bonaventure et les merveilles de la péninsule
          gaspésienne
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Percé, véritable emblème de la Gaspésie, vous accueille avec son célèbre rocher percé, ses
          falaises majestueuses et sa colonie de fous de Bassan, la plus accessible au monde.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/Perce.avif"
            alt="Rocher Percé"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Percé ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Site Naturel Unique</h3>
            <p className="text-gray-600">
              Le Rocher Percé et l'île Bonaventure forment un des paysages les plus spectaculaires
              du Canada.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paradis Ornithologique</h3>
            <p className="text-gray-600">
              Plus de 200 000 oiseaux marins, dont la plus grande colonie de fous de Bassan en
              Amérique du Nord.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie Maritime</h3>
            <p className="text-gray-600">
              Fruits de mer frais et cuisine locale authentique dans un cadre pittoresque.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Points de Vue Incontournables
        </h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Meilleurs Spots Photos</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Plateforme du Géoparc</h4>
                  <p className="text-gray-600">Vue plongeante sur le Rocher Percé et la baie.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Mont Sainte-Anne</h4>
                  <p className="text-gray-600">Panorama sur toute la région de Percé.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Promenade des Navigateurs</h4>
                  <p className="text-gray-600">
                    Vue rapprochée sur le Rocher au coucher du soleil.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Fish className="h-8 w-8 text-indigo-600" />
          Activités Nautiques et Nature
        </h2>
        <div className="space-y-8">
          {activities.map((activity) => (
            <a
              key={activity.name}
              href={activity.link}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.name}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  <span>Prix: {activity.price}</span>
                </div>
              </div>
            </a>
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
            <h3 className="font-semibold text-xl mb-4">Depuis Québec/Montréal</h3>
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
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette locale gratuite en saison
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos électriques
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Centre-ville facilement accessible à pied
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
              De juin à septembre pour le temps doux et toutes les activités disponibles.
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
            <p className="text-gray-600">Réservation essentielle en haute saison (juillet-août).</p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Percé ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/perce.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.croisieresgaspe.ca"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Réserver une Croisière
          </a>
        </div>
      </section>
    </article>
  );
}
