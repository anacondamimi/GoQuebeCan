import Image from 'next/image';
import React from 'react';

export const metadata = {
  slug: 'montmorency',
  ville: 'Montmorency',
  resume: 'Découverte de Montmorency et de ses attraits touristiques.',
  activites: [
    'Via Ferrata de la Chute',
    'Téléphérique Panoramique',
    'Randonnée des Chutes',
    'Tyrolienne Double',
    'Jeux d',
    'Rallye-découverte',
  ],
  hebergements: ['Manoir Montmorency', 'Auberge Baker', 'Comfort Inn Beauport'],
  publics: ['familles', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Manoir Montmorency',
    category: 'Vue Panoramique',
    description: 'Hôtel-boutique surplombant la chute',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/manoir-montmorency.html',
    image: 'https://images.unsplash.com/photo-1595880375338-a78c3a07cef5?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge Baker',
    category: 'Charme',
    description: 'Auberge historique avec vue sur le fleuve',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-baker.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Comfort Inn Beauport',
    category: 'Familial',
    description: 'Hôtel moderne à proximité des attractions',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/comfort-inn-beauport.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Restaurant Le Montmorency',
    type: 'Gastronomique',
    speciality: 'Cuisine québécoise raffinée',
    price: '$$$$',
    mustTry: "Tartare de saumon à l'érable",
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Bistro La Chute',
    type: 'Bistro',
    speciality: 'Cuisine locale décontractée',
    price: '$$$',
    mustTry: 'Poutine au canard confit',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Café du Manoir',
    type: 'Café-Restaurant',
    speciality: 'Brunch et lunch',
    price: '$$',
    mustTry: 'Crêpes aux fruits frais',
    schedule: "Ouvert toute l'année",
  },
];

const activities = [
  {
    name: 'Via Ferrata de la Chute',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '75$/personne',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Parcours sécurisé le long de la falaise',
  },
  {
    name: 'Téléphérique Panoramique',
    type: 'Observation',
    duration: '30 minutes',
    price: '25$/personne',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Vue spectaculaire sur la chute et le fleuve',
  },
  {
    name: 'Randonnée des Chutes',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Sentiers aménagés autour de la chute',
  },
];

const familyActivities = [
  {
    title: 'Tyrolienne Double',
    description: 'Traversez la chute en tyrolienne (minimum 10 ans)',
    price: '45$/personne',
  },
  {
    title: "Jeux d'eau",
    description: 'Aires de jeux aquatiques pour enfants (été)',
    price: "Inclus dans l'entrée",
  },
  {
    title: 'Rallye-découverte',
    description: "Parcours ludique avec énigmes sur l'histoire du site",
    price: '10$/famille',
  },
];

export default function BlogArticleMontmorency() {
  return (
    <article id="blog_article_montmorency" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Chute Montmorency et Chaudière-Appalaches
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez la majestueuse chute de 83 mètres et explorez la région naturelle de
          Chaudière-Appalaches
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          À seulement quelques minutes de Québec, la Chute Montmorency vous impressionnera par sa
          hauteur vertigineuse de 83 mètres (plus haute que les chutes Niagara!).
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/chute-montmorency.avif"
            alt="Chute Montmorency"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>

        <p>
          Combinée à la région pittoresque de Chaudière-Appalaches, elle offre une expérience unique
          entre nature spectaculaire et aventure.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Chute Spectaculaire</h3>
            <p className="text-gray-600">
              Une des plus hautes chutes d'Amérique du Nord, offrant des vues à couper le souffle en
              toute saison.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités d'Aventure</h3>
            <p className="text-gray-600">
              Via ferrata, tyrolienne et randonnées pour tous les niveaux.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Préservée</h3>
            <p className="text-gray-600">
              Parcs naturels et sentiers de la région Chaudière-Appalaches.
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
                  <h4 className="font-medium text-gray-900">Passerelle Suspendue</h4>
                  <p className="text-gray-600">
                    Vue plongeante sur la chute et le fleuve Saint-Laurent.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Escalier Panoramique</h4>
                  <p className="text-gray-600">300 marches offrant différents angles de vue.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Manoir Montmorency</h4>
                  <p className="text-gray-600">
                    Terrasse avec vue imprenable sur la chute et le fleuve.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour Enfants et Familles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          Découvrir Chaudière-Appalaches
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Image
            src="/images/destinations/chaudiere-2.avif"
            alt="Chutes de la Chaudière"
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
            width={800}
            height={600}
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Les Chutes de la Chaudière</h3>
          <p className="text-gray-600">
            Une merveille naturelle impressionnante située dans la région de Chaudière-Appalaches,
            offrant des sentiers de randonnée et des points de vue spectaculaires sur les chutes.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités et Attractions
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
            <h3 className="font-semibold text-xl mb-4">Depuis Québec</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                15 minutes en voiture depuis le Vieux-Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus RTC 800 (service régulier)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi (~30$ depuis le centre-ville)
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Stationnement</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Stationnement payant sur place
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette gratuite entre les stationnements
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Places réservées pour les autobus
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
              Toute l'année : été pour les activités, hiver pour le pain de glace.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Prévoir 100-150$/jour incluant l'hébergement, les repas et les activités.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée pour les activités d'aventure en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Explorer la Chute Montmorency ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.sepaq.com/ct/pcm/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver les Activités
          </a>
          <a
            href="https://www.booking.com/landmark/ca/montmorency-falls.html"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}
