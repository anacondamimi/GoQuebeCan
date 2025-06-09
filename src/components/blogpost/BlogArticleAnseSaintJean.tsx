import React from 'react';

export const metadata = {
  slug: 'anse-saint-jean',
  ville: 'Anse Saint Jean',
  resume: 'Découverte de Anse Saint Jean et de ses attraits touristiques.',
  activites: [
    'Croisière sur le Fjord',
    'Mont-Édouard',
    'Kayak de Mer',
    'Via Ferrata du Fjord',
    'Plage municipale',
    'Petit Train du Fjord',
    'Initiation au Kayak',
    'École de Voile',
    'Vélo de Montagne',
    'Randonnée Alpine',
  ],
  hebergements: ['Auberge des Cévennes', 'Chalets sur le Fjord', 'Gîte du Fjord'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

export default function BlogArticleAnseSaintJean() {
  // ✅ Imports déplacés automatiquement

  const hotels = [
    {
      name: 'Auberge des Cévennes',
      category: 'Vue sur Fjord',
      description: 'Vue spectaculaire sur le fjord du Saguenay',
      price: 'À partir de 159$/nuit',
      link: 'https://www.booking.com/hotel/ca/auberge-des-cevennes.html',
      image:
        'https://images.unsplash.com/photo-1572463459372-70c9cf5cb795?auto=format&fit=crop&q=80',
    },
    {
      name: 'Chalets sur le Fjord',
      category: 'Chalet',
      description: 'Chalets indépendants avec vue panoramique',
      price: 'À partir de 189$/nuit',
      link: 'https://www.booking.com/hotel/ca/chalets-sur-le-fjord.html',
      image:
        'https://images.unsplash.com/photo-1583245117386-341b4e73ca88?auto=format&fit=crop&q=80',
    },
    {
      name: 'Gîte du Fjord',
      category: 'B&B',
      description: 'Accueil chaleureux et petit-déjeuner local',
      price: 'À partir de 129$/nuit',
      link: 'https://www.booking.com/hotel/ca/gite-du-fjord.html',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    },
  ];

  const restaurants = [
    {
      name: 'La Cuisine',
      type: 'Gastronomique',
      speciality: 'Cuisine régionale et produits locaux',
      price: '$$$',
      mustTry: 'Tartare de saumon sauvage',
      schedule: 'Mercredi au Dimanche',
    },
    {
      name: 'Café du Quai',
      type: 'Bistro',
      speciality: 'Fruits de mer et cuisine bistro',
      price: '$$',
      mustTry: 'Fish & Chips au poisson local',
      schedule: 'Tous les jours en saison',
    },
    {
      name: 'Boulangerie Artisanale',
      type: 'Boulangerie-Café',
      speciality: 'Pains et viennoiseries maison',
      price: '$',
      mustTry: 'Pain aux noix et raisins',
      schedule: 'Mardi au Dimanche',
    },
  ];

  const activities = [
    {
      name: 'Croisière sur le Fjord',
      type: 'Navigation',
      duration: '2-3 heures',
      price: '69$/personne',
      description: 'Découverte du fjord en bateau avec guide',
    },
    {
      name: 'Mont-Édouard',
      type: 'Montagne',
      duration: 'Variable',
      price: 'À partir de 45$/jour',
      description: 'Ski en hiver, randonnée et vélo en été',
    },
    {
      name: 'Kayak de Mer',
      type: 'Nautique',
      duration: '2-4 heures',
      price: '75$/personne',
      description: 'Exploration du fjord en kayak guidé',
    },
    {
      name: 'Via Ferrata du Fjord',
      type: 'Aventure',
      duration: '3 heures',
      price: '89$/personne',
      description: 'Parcours sécurisé avec vue sur le fjord',
    },
  ];

  const familyActivities = [
    {
      title: 'Plage municipale',
      description: 'Baignade et jeux de plage (tous âges)',
      price: 'Gratuit',
    },
    {
      title: 'Petit Train du Fjord',
      description: 'Tour commenté du village (tous âges)',
      price: '15$/adulte, 8$/enfant',
    },
    {
      title: 'Initiation au Kayak',
      description: 'Cours en eau calme (8+ ans)',
      price: '45$/personne',
    },
  ];

  const teenActivities = [
    {
      title: 'École de Voile',
      description: "Cours d'initiation à la voile (12+ ans)",
      price: '85$/personne',
      duration: '3 heures',
    },
    {
      title: 'Vélo de Montagne',
      description: 'Sentiers du Mont-Édouard (12+ ans)',
      price: '45$/jour',
      duration: 'À votre rythme',
    },
    {
      title: 'Randonnée Alpine',
      description: 'Sentiers panoramiques guidés (14+ ans)',
      price: '55$/personne',
      duration: '4-5 heures',
    },
  ];

  return (
    <article id="blog_article_anse_saint_jean" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           L'Anse-Saint-Jean - Perle du Fjord du Saguenay
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce village pittoresque niché au cœur du fjord, où nature grandiose et traditions
          maritimes se rencontrent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          L'Anse-Saint-Jean, joyau du fjord du Saguenay, est un village pittoresque qui allie
          parfaitement patrimoine maritime et activités de plein air. Avec ses paysages à couper le
          souffle, ses activités quatre saisons et son authenticité préservée, il offre une
          expérience unique aux visiteurs en quête d'aventure et de sérénité.
        </p>
        <div className="my-8">
          <img
            src="/images/destinations/L'anse-Saint-Jean.avif"
            alt="L'Anse-Saint-Jean"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter L'Anse-Saint-Jean ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Fjord Majestueux</h3>
            <p className="text-gray-600">
              Un des plus beaux fjords au monde, avec des falaises vertigineuses.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Village Authentique</h3>
            <p className="text-gray-600">
              Architecture traditionnelle et mode de vie maritime préservé.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités 4 Saisons</h3>
            <p className="text-gray-600">
              Du ski au kayak, en passant par la randonnée et l'escalade.
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
                5h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interrégional jusqu'à Chicoutimi puis navette
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette maritime en saison
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture recommandée pour explorer
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
              Juin à septembre pour l'été. Décembre à mars pour les sports d'hiver.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-189$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir L'Anse-Saint-Jean ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez ce joyau du fjord du Saguenay
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/l-anse-saint-jean.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme-saguenay.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Région
          </a>
        </div>
      </section>
    </article>
  );
}
