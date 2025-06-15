import React from 'react';

export const metadata = {
  slug: 'baie-saint-paul',
  ville: 'Baie Saint Paul',
  resume: 'Découverte de Baie Saint Paul et de ses attraits touristiques.',
  activites: [
    'Circuit des Galeries d',
    'Randonnée Le Gouffre',
    'Train de Charlevoix',
    'Parc du Boisé',
    'Atelier de Peinture',
    'Ferme Basque',
    'Location de Vélos',
    'Cours de Photo',
    'Rafting sur la Rivière',
  ],
  hebergements: ['Le Germain Charlevoix', 'Auberge La Grande Maison', 'Maison Otis'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Palette } from 'lucide-react';

export default function BlogArticleBaieSaintPaul() {
  // ✅ Imports déplacés automatiquement

  const hotels = [
    {
      name: 'Le Germain Charlevoix',
      category: 'Luxe',
      description: 'Hôtel design avec spa et vue panoramique',
      price: 'À partir de 259$/nuit',
      link: 'https://www.booking.com/hotel/ca/la-ferme.html',
      image:
        '/images/destinations/hotels/le germain Charlevoix.avif',
    },
    {
      name: 'Auberge La Grande Maison',
      category: 'Charme',
      description: 'Maison historique au cœur du village',
      price: 'À partir de 169$/nuit',
      link: 'https://www.booking.com/hotel/ca/auberge-la-grande-maison.html',
      image:
        '/images/destinations/hotels/auberge la grande maison.avif',
    },
    {
      name: 'La Pignoronde',
  category: 'Appartement de luxe',
  description: 'Appartement 3 chambres avec terrasse et vue panoramique sur Baie-Saint-Paul.',
  price: 'À partir de 880$ pour 4 nuits',
  link: 'https://www.booking.com/hotel/ca/la-pignoronde.html', // à valider si différent
  image: '/images/destinations/hotels/la pignoronde.avif',
    },
  ];

  const restaurants = [
    {
      name: 'Mouton Noir',
      type: 'Gastronomique',
      speciality: 'Cuisine du terroir raffinée',
      price: '$$$$',
      mustTry: 'Tartare de bœuf local et fromages de Charlevoix',
      schedule: "Ouvert toute l'année",
    },
    {
      name: 'Café Bistro Le Saint-Pub',
      type: 'Brasserie artisanale',
      speciality: 'Bières locales et cuisine bistro',
      price: '$$$',
      mustTry: 'Planche de dégustation de bières',
      schedule: "Ouvert toute l'année",
    },
    {
      name: 'Le Café des Artistes',
      type: 'Café-Restaurant',
      speciality: 'Brunch et pâtisseries maison',
      price: '$$',
      mustTry: 'Brunch du dimanche',
      schedule: "Ouvert toute l'année",
    },
  ];

  const activities = [
    {
      name: "Circuit des Galeries d'Art",
      type: 'Culture',
      duration: '2-3 heures',
      price: 'Gratuit',
      description: "Découverte des nombreuses galeries d'art du centre-ville",
    },
    {
      name: 'Randonnée Le Gouffre',
      type: 'Nature',
      duration: '3-4 heures',
      price: 'Gratuit',
      description: 'Sentiers panoramiques surplombant la vallée',
    },
    {
      name: 'Train de Charlevoix',
      type: 'Transport Scénique',
      duration: 'Variable',
      price: 'À partir de 75$/personne',
      description: 'Voyage panoramique le long du Saint-Laurent',
    },
  ];

  const familyActivities = [
    {
      title: 'Parc du Boisé',
      description: 'Aire de jeux et sentiers faciles (tous âges)',
      price: 'Gratuit',
    },
    {
      title: 'Atelier de Peinture',
      description: "Initiation à l'art avec un artiste local (7+ ans)",
      price: '45$/personne',
    },
    {
      title: 'Ferme Basque',
      description: 'Visite de la ferme et dégustation (tous âges)',
      price: '15$/personne',
    },
  ];

  const teenActivities = [
    {
      title: 'Location de Vélos',
      description: 'Exploration de la Route Verte (12+ ans)',
      price: '35$/jour',
      duration: 'À votre rythme',
    },
    {
      title: 'Cours de Photo',
      description: 'Atelier photo dans le village pittoresque (13+ ans)',
      price: '65$/personne',
      duration: '3 heures',
    },
    {
      title: 'Rafting sur la Rivière',
      description: 'Descente en rafting sur le Gouffre (14+ ans)',
      price: '89$/personne',
      duration: '4 heures',
    },
  ];

  return (
    <article id="blog_article_baie_saint_paul" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Baie-Saint-Paul - Le Cœur Artistique de Charlevoix
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce village pittoresque où art, gastronomie et nature se rencontrent dans un
          décor enchanteur
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Nichée dans une vallée spectaculaire entre mer et montagnes, Baie-Saint-Paul est un
          véritable joyau culturel de la région de Charlevoix. Ce village d'artistes, berceau du
          Cirque du Soleil, vous séduira par son charme authentique et sa créativité débordante.
        </p>
        <div className="my-8">
          <img
             src="/images/destinations/baie-st-paul.avif"
            alt="Baie-Saint-Paul"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Baie-Saint-Paul ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Village d'Artistes</h3>
            <p className="text-gray-600">
              Plus de 25 galeries d'art et ateliers d'artistes dans un décor pittoresque.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Terroir d'Exception</h3>
            <p className="text-gray-600">
              Route des Saveurs, microbrasseries et produits du terroir charlevoisien.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Grandiose</h3>
            <p className="text-gray-600">
              Entre fleuve et montagnes, paysages spectaculaires en toute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Palette className="h-8 w-8 text-indigo-600" />
          Art et Culture
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
            <h3 className="font-semibold text-xl mb-4">Depuis Québec</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                4h15 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                1h en voiture depuis Québec
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
                Centre-ville accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette locale en saison
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
              De juin à octobre pour le temps doux. Décembre à mars pour les sports d'hiver.
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
            <p className="text-gray-600">
              Réservation conseillée pour les restaurants et hébergements en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir Baie-Saint-Paul ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/baie-saint-paul.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.getyourguide.com/baie-saint-paul-l32482/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
