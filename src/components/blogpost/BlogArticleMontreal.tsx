import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'montreal',
  ville: 'Montreal',
  resume: 'Découverte de Montreal et de ses attraits touristiques.',
  activites: ['Vieux-Montréal', 'Mont Royal', 'Biodôme'],
  hebergements: ['Fairmont Le Reine Elizabeth', 'Hôtel Nelligan', 'Le Plateau Hotel'],
  publics: ['amateurs de culture'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Building } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Fairmont Le Reine Elizabeth',
    category: 'Luxe',
    description: 'Hôtel historique au cœur du centre-ville',
    price: 'À partir de 299$/nuit',
    link: 'https://www.booking.com/hotel/ca/fairmont-the-queen-elizabeth.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Hôtel Nelligan',
    category: 'Boutique',
    description: 'Charme du Vieux-Montréal',
    price: 'À partir de 259$/nuit',
    link: 'https://www.booking.com/hotel/ca/nelligan.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
  {
    name: 'Le Plateau Hotel',
    category: 'Charme',
    description: 'Au cœur du quartier branché',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/le-plateau.html',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: "L'Express",
    type: 'Bistro Français',
    speciality: 'Cuisine française traditionnelle',
    price: '$$$',
    mustTry: 'Tartare de boeuf et os à moelle',
    schedule: 'Tous les jours',
  },
  {
    name: 'La Banquise',
    type: 'Cantine Québécoise',
    speciality: 'Poutines créatives',
    price: '$$',
    mustTry: 'La Classique ou La T-Rex',
    schedule: '24h/24, 7j/7',
  },
  {
    name: "Schwartz's",
    type: 'Institution',
    speciality: 'Smoked meat',
    price: '$$',
    mustTry: 'Sandwich smoked meat',
    schedule: 'Tous les jours',
  },
];

const activities = [
  {
    name: 'Vieux-Montréal',
    type: 'Culture',
    duration: 'Demi-journée',
    price: 'Gratuit',
    description: 'Quartier historique et attractions culturelles',
  },
  {
    name: 'Mont Royal',
    type: 'Nature',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Parc emblématique avec vue panoramique',
  },
  {
    name: 'Biodôme',
    type: 'Science',
    duration: '2-3 heures',
    price: '25$/adulte',
    description: 'Écosystèmes des Amériques reconstitués',
  },
];

export default function BlogArticleMontreal() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Montréal - Métropole Culturelle et Festive
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez la plus grande ville francophone d'Amérique, où histoire, culture et modernité
          se rencontrent
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Montréal, ville vibrante et cosmopolite, est un carrefour unique où se mêlent influences
          européennes et nord-américaines. De ses quartiers historiques à ses festivals
          internationaux, en passant par sa scène gastronomique réputée, Montréal offre une
          expérience urbaine incomparable.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/montreal.avif"
            alt="Montréal"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Montréal ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Culture Vibrante</h3>
            <p className="text-gray-600">
              Festivals internationaux, musées de renom et scène artistique dynamique.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Gastronomie Unique</h3>
            <p className="text-gray-600">
              Du smoked meat aux restaurants étoilés, une destination gourmande.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Histoire et Modernité</h3>
            <p className="text-gray-600">
              Architecture historique côtoyant des quartiers avant-gardistes.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Building className="h-8 w-8 text-indigo-600" />
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
          Transport en Commun
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            REM (Réseau express métropolitain)
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">Nouveau train léger automatisé reliant :</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Brossard (Rive-Sud) à la Gare Centrale
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Fréquence : toutes les 3-4 minutes en heure de pointe
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Temps de trajet : 15-20 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Intégré au réseau STM (métro et bus)
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Accès Principal</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Aéroport International Trudeau
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Train VIA Rail depuis Toronto/Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Réseau d'autobus interurbain
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Métro et bus (STM)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                BIXI (vélos en libre-service)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxis et services de covoiturage
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
              Juin à septembre pour les festivals. Décembre pour les marchés de Noël.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 189-299$/nuit Activités: 25-75$/jour Repas: 20-75$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Ville très sécuritaire. Transport en commun efficace. Nombreux festivals gratuits.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Montréal ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et vivez l'expérience unique de la métropole
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/montreal.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.mtl.org"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}
