import React from 'react';

export const metadata = {
  slug: 'sabrevois',
  ville: 'Sabrevois',
  resume: 'Découverte de Sabrevois et de ses attraits touristiques.',
  activites: [
    'Nuitée en Hutte Flottante',
    'Kayak sur le Richelieu',
    'Pêche Sportive',
    'Mini-Croisière',
    'Plage du Richelieu',
    'Ferme Pédagogique',
    'Location de SUP',
    'Vélo le long du Richelieu',
    'Cours de Voile',
  ],
  hebergements: ['Les Huttes du Richelieu', 'Auberge du Richelieu', 'Gîte des Îles'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun,  } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Les Huttes du Richelieu',
    category: 'Insolite',
    description: 'Huttes flottantes avec vue sur la rivière',
    price: 'À partir de 199$/nuit',
    link: 'https://www.booking.com/hotel/ca/les-huttes-du-richelieu.html',
    image: 'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?auto=format&fit=crop&q=80',
  },
  {
    name: 'Auberge du Richelieu',
    category: 'Charme',
    description: 'Au bord de la rivière Richelieu',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-du-richelieu.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Gîte des Îles',
    category: 'B&B',
    description: 'Maison ancestrale avec jardin',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/gite-des-iles.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'La Table du Richelieu',
    type: 'Gastronomique',
    speciality: 'Cuisine locale et poissons de rivière',
    price: '$$$',
    mustTry: 'Doré du Richelieu',
    schedule: 'Mercredi au Dimanche',
  },
  {
    name: 'Bistro des Huttes',
    type: 'Bistro',
    speciality: 'Cuisine bistro et terrasse',
    price: '$$',
    mustTry: 'Planche de charcuteries locales',
    schedule: 'Tous les jours en saison',
  },
  {
    name: 'Café de la Rive',
    type: 'Café-Restaurant',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: 'Tous les jours',
  },
];

const activities = [
  {
    name: 'Nuitée en Hutte Flottante',
    type: 'Hébergement Insolite',
    duration: '24 heures',
    price: 'À partir de 199$/nuit',
    description: "Expérience unique dans une hutte polynésienne sur l'eau",
  },
  {
    name: 'Kayak sur le Richelieu',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Exploration de la rivière en kayak',
  },
  {
    name: 'Pêche Sportive',
    type: 'Sport',
    duration: 'Demi-journée',
    price: '85$/personne',
    description: 'Pêche guidée sur la rivière Richelieu',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière',
    description: 'Tour guidé en bateau (tous âges)',
    price: '35$/adulte, 20$/enfant',
  },
  {
    title: 'Plage du Richelieu',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Ferme Pédagogique',
    description: 'Visite de ferme interactive (3+ ans)',
    price: '15$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de SUP',
    description: 'Planche à pagaie sur la rivière (12+ ans)',
    price: '35$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Vélo le long du Richelieu',
    description: 'Piste cyclable panoramique (12+ ans)',
    price: '25$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Cours de Voile',
    description: 'Initiation à la voile (14+ ans)',
    price: '75$/demi-journée',
    duration: '3 heures',
  },
];

export default function BlogArticleSabrevois() {
  return (
    <article id="blog_article_sabrevois" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Sainte-Anne-de-Sabrevois - L'Expérience Unique des Huttes sur l'Eau
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce village unique de la Montérégie où des huttes polynésiennes flottantes
          offrent une expérience d'hébergement inoubliable
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Sainte-Anne-de-Sabrevois, nichée le long de la rivière Richelieu, se distingue par son
          concept unique d'hébergement : des huttes polynésiennes flottantes. Ce village paisible de
          la Montérégie combine parfaitement nature, activités nautiques et expériences insolites.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?auto=format&fit=crop&q=80"
            alt="Huttes flottantes"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter Sainte-Anne-de-Sabrevois ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Hébergement Unique</h3>
            <p className="text-gray-600">
              Huttes polynésiennes flottantes, une première au Québec.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Activités Nautiques</h3>
            <p className="text-gray-600">Kayak, SUP et pêche sur la rivière Richelieu.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Préservée</h3>
            <p className="text-gray-600">Faune et flore riches le long de la rivière.</p>
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
                45 minutes en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain jusqu'à Saint-Jean-sur-Richelieu
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Service de navette sur demande
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
              De mai à octobre pour les huttes. Juillet-août pour les activités nautiques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 129-199$/nuit Activités: 25-85$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle pour les huttes. Prévoir anti-moustiques en été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Vivre une Expérience Unique ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et découvrez le charme des huttes flottantes
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sainte-anne-de-sabrevois.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme-monteregie.qc.ca"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer la Région
          </a>
        </div>
      </section>
    </article>
  );
}


