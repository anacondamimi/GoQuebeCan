import React from 'react';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata = {
  slug: 'sandbanks',
  ville: 'Sandbanks',
  resume: 'Découverte de Sandbanks et de ses attraits touristiques.',
  activites: [
    'Dunes de Sandbanks',
    'Outlet Beach',
    'West Lake',
    'Plage Outlet',
    'Exploration des Dunes',
    'Location de Pédalos',
    'Planche à Voile',
    'Vélo de Montagne',
    'Surf sur le Lac',
  ],
  hebergements: ['Sandbanks Summer Village', 'The June Motel', 'Picton Harbour Inn'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Beer, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Sandbanks Summer Village',
    category: 'Resort',
    description: 'Cottages de luxe près du parc',
    price: 'À partir de 229$/nuit',
    link: 'https://www.booking.com/hotel/ca/sandbanks-summer-village.html',
    image: 'https://images.unsplash.com/photo-1595880238394-5b606a6ee1e8?auto=format&fit=crop&q=80',
  },
  {
    name: 'The June Motel',
    category: 'Boutique',
    description: 'Motel rénové avec style rétro',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/the-june-motel.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Picton Harbour Inn',
    category: 'Vue sur Eau',
    description: 'Vue sur la baie de Picton',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/picton-harbour-inn.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'The Sand & Surf',
    type: 'Grill & Fruits de mer',
    speciality: 'Poissons frais et grillades',
    price: '$$$',
    mustTry: 'Perche du lac Ontario',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Dunes Beach Café',
    type: 'Café-Restaurant',
    speciality: 'Brunch et sandwichs',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: "Toute l'année",
  },
  {
    name: 'Outlet Beach Canteen',
    type: 'Cantine de Plage',
    speciality: 'Fast-food de qualité',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Dunes de Sandbanks',
    type: 'Nature',
    duration: '2-3 heures',
    price: '18$/véhicule',
    description: "Plus grandes dunes de sable d'eau douce au monde",
  },
  {
    name: 'Outlet Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Inclus avec accès parc',
    description: 'Plage de sable blanc avec eaux turquoise',
  },
  {
    name: 'West Lake',
    type: 'Sports Nautiques',
    duration: 'Variable',
    price: 'Location à partir de 25$/heure',
    description: 'Kayak, SUP et voile',
  },
];

const familyActivities = [
  {
    title: 'Plage Outlet',
    description: 'Eaux peu profondes et sable doux (tous âges)',
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Exploration des Dunes',
    description: 'Sentiers faciles et jeux de sable (tous âges)',
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Location de Pédalos',
    description: 'Activité nautique familiale (5+ ans)',
    price: '35$/heure',
  },
];

const teenActivities = [
  {
    title: 'Planche à Voile',
    description: 'Initiation et location (12+ ans)',
    price: '75$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers dans les dunes (12+ ans)',
    price: '45$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Surf sur le Lac',
    description: "Cours d'initiation (14+ ans)",
    price: '85$/2 heures',
    duration: '2 heures',
  },
];

export default function BlogArticleSandbanks() {
  return (
    <article id="blog_article_sandbanks" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <HeroBanner
        image="/images/destinations/Sand banks.avif"
        title=" Sandbanks - Dunes, Plages et Plaisirs en Famille"
        subtitle="Découvrez un joyau naturel au cœur du Prince Edward County, idéal pour les familles, les amateurs de plein air et les épicuriens."
      />

      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Sandbanks - Les Plus Grandes Dunes de Sable d'Eau Douce au Monde
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce parc provincial unique de l'Ontario, avec ses dunes spectaculaires, ses
          plages de sable blanc et ses eaux turquoise.
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le parc provincial Sandbanks, situé dans le comté de Prince Edward, est un joyau naturel
          unique abritant les plus grandes dunes et barrières de sable d'eau douce au monde. Avec
          ses trois plages spectaculaires et son écosystème dunaire rare, il offre une expérience
          balnéaire incomparable en Ontario.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/Sand banks.avif"
            alt="Sandbanks"
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Sandbanks ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Dunes Spectaculaires</h3>
            <p className="text-gray-600">
              Les plus grandes formations de dunes d'eau douce au monde.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Plages Exceptionnelles</h3>
            <p className="text-gray-600">
              Trois plages distinctes avec sable blanc et eaux cristallines.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Écosystème Unique</h3>
            <p className="text-gray-600">
              Habitat rare abritant une flore et une faune diversifiées.
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
          <Sun className="h-8 w-8 text-indigo-600" />
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
                2h45 en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                4h en voiture depuis Ottawa
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain jusqu'à Picton
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture nécessaire pour accéder au parc
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette saisonnière depuis Picton
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
              De juin à septembre pour la baignade. Mai et octobre pour éviter les foules.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 169-229$/nuit Activités: 18-85$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Parc souvent complet les week-ends d'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Sandbanks ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et explorez les plus grandes dunes de sable d'eau douce
          au monde
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/sandbanks.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.ontarioparks.com/park/sandbanks"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer le Parc
          </a>
        </div>
      </section>

      <SectionTitle
        title="Producteurs Locaux à Découvrir"
        subtitle="Savourez les trésors artisanaux du comté de Prince Edward."
        icon={<Beer className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Waupoos Winery</h3>
          <p className="text-gray-700">
            Vignoble emblématique avec vue sur le lac Ontario, dégustations de vins biologiques et
            table fermière sur place.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">County Cider Company</h3>
          <p className="text-gray-700">
            Cidrerie artisanale avec terrasse panoramique, parfaite pour un lunch après la plage.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Bloomfield Public House Market
          </h3>
          <p className="text-gray-700">
            Épicerie locale avec produits artisanaux, boulangerie maison et plats prêts à emporter.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Parsons Brewing Company</h3>
          <p className="text-gray-700">
            Microbrasserie familiale offrant bières de caractère, aire de jeux pour enfants et
            ambiance conviviale.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fifth Town Artisan Cheese</h3>
          <p className="text-gray-700">
            Fromagerie durable proposant une sélection de fromages fins faits sur place à partir de
            lait de chèvre et de brebis.
          </p>
        </div>
      </div>
    </article>
  );
}
