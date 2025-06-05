import React from 'react';

export const metadata = {
  slug: 'quebec',
  ville: 'Quebec',
  resume: 'Découverte de Quebec et de ses attraits touristiques.',
  activites: [
    'Visite guidée du Vieux-Québec',
    'Croisière sur le Saint-Laurent',
    'Musée de la Civilisation',
    'Plaines d',
    'Musée de la Civilisation',
    'Chasse au Trésor dans le Vieux-Québec',
  ],
  hebergements: [
    'Fairmont Le Château Frontenac',
    'Auberge Saint-Antoine',
    'Hôtel Le Germain Québec',
  ],
  publics: ['familles', 'amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Fairmont Le Château Frontenac',
    category: 'Luxe',
    description: 'Hôtel emblématique avec vue sur le Saint-Laurent',
    price: 'À partir de 399$/nuit',
    link: 'https://www.booking.com/hotel/ca/fairmont-le-chateau-frontenac.html',
    image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge Saint-Antoine',
    category: 'Boutique',
    description: 'Hôtel-boutique historique dans le Vieux-Port',
    price: 'À partir de 299$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-saint-antoine.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel Le Germain Québec',
    category: 'Design',
    description: 'Élégance contemporaine au cœur historique',
    price: 'À partir de 279$/nuit',
    link: 'https://www.booking.com/hotel/ca/le-germain-dominion.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Restaurant Champlain',
    type: 'Gastronomique',
    speciality: 'Cuisine québécoise raffinée',
    price: '$$$$',
    mustTry: "Foie gras au sirop d'érable",
  },
  {
    name: 'Aux Anciens Canadiens',
    type: 'Traditionnel',
    speciality: 'Cuisine traditionnelle québécoise',
    price: '$$$',
    mustTry: 'Tourtière du Lac-Saint-Jean',
  },
  {
    name: 'Le Cochon Dingue',
    type: 'Brunch',
    speciality: 'Brunch et cuisine bistro',
    price: '$$',
    mustTry: 'Crêpes aux fruits frais',
  },
];

const activities = [
  {
    name: 'Visite guidée du Vieux-Québec',
    type: 'Culture',
    duration: '2-3 heures',
    price: '30$/personne',
    link: 'https://www.getyourguide.com/quebec-city-l281',
  },
  {
    name: 'Croisière sur le Saint-Laurent',
    type: 'Nature',
    duration: '1.5 heures',
    price: '45$/personne',
    link: 'https://www.getyourguide.com/quebec-city-l281',
  },
  {
    name: 'Musée de la Civilisation',
    type: 'Culture',
    duration: '2-4 heures',
    price: '22$/personne',
    link: 'https://www.getyourguide.com/quebec-city-l281',
  },
];

const familyActivities = [
  {
    title: "Plaines d'Abraham",
    description:
      'Grands espaces verts pour pique-niquer, faire voler des cerfs-volants et participer à des reconstitutions historiques.',
    price: 'Gratuit',
  },
  {
    title: 'Musée de la Civilisation',
    description:
      'Expositions interactives et ateliers créatifs spécialement conçus pour les enfants.',
    price: "Inclus avec l'entrée",
  },
  {
    title: 'Chasse au Trésor dans le Vieux-Québec',
    description:
      "Parcours ludique avec énigmes pour découvrir l'histoire de la ville en s'amusant.",
    price: '10$/famille',
  },
];

export default function BlogArticleQuebec() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet du Vieux-Québec : Que Voir, Que Faire et Où Séjourner
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez les trésors cachés de la seule ville fortifiée d'Amérique du Nord
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Joyau du patrimoine mondial de l'UNESCO, le Vieux-Québec vous transporte dans un voyage
          temporel unique où l'histoire coloniale française rencontre le charme contemporain. Ses
          ruelles pavées, son architecture européenne et sa culture vivante en font une destination
          incontournable au Canada.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter le Vieux-Québec ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Architecture Unique</h3>
            <p className="text-gray-600">
              Seule ville fortifiée au nord du Mexique, avec des remparts et une architecture
              coloniale française préservée.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Vivante</h3>
            <p className="text-gray-600">
              Festivals toute l'année, artistes de rue, galeries d'art et une scène culturelle
              dynamique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie</h3>
            <p className="text-gray-600">
              Des restaurants primés aux cafés historiques, une scène culinaire qui célèbre le
              terroir québécois.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Que Faire et Que Voir ?
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
              <p className="text-gray-700">
                <span className="font-medium">À essayer:</span> {restaurant.mustTry}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour Enfants et Adolescents
        </h2>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pour les Enfants (5-12 ans)
              </h3>
              <ul className="space-y-4">
                {familyActivities.map((activity) => (
                  <li key={activity.title} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Pour les Adolescents (13-17 ans)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Parcours des Légendes</h4>
                    <p className="text-gray-600">
                      Visite guidée nocturne avec histoires de fantômes et légendes urbaines du
                      Vieux-Québec.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Défi-Évasion</h4>
                    <p className="text-gray-600">
                      Jeux d'évasion thématiques sur l'histoire de Québec, parfaits pour les groupes
                      d'ados.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Atelier Photo Instagram</h4>
                    <p className="text-gray-600">
                      Circuit des meilleurs spots photo du Vieux-Québec avec conseils de
                      photographes professionnels.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Bus className="h-8 w-8 text-indigo-600" />
          Comment s'y Rendre ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Depuis Montréal</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Train VIA Rail (3h30)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express (3h)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de voiture (3h)
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Aéroport</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Aéroport international Jean-Lesage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette RTC vers le centre-ville
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi (~35$ jusqu'au Vieux-Québec)
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
              De juin à septembre pour le temps doux et les festivals. Décembre pour les marchés de
              Noël.
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
              <Shield className="h-5 w-5 text-indigo-600" />
              Sécurité
            </h3>
            <p className="text-gray-600">
              Ville très sûre, mais attention aux pickpockets dans les zones touristiques.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir le Vieux-Québec ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/quebec.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hôtel
          </a>
          <a
            href="https://www.getyourguide.com/quebec-city-l281"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
