import React from 'react';

export const metadata = {
  slug: 'bic',
  ville: 'Bic',
  resume: 'Découverte de Bic et de ses attraits touristiques.',
  activites: [
    'Observation des Phoques',
    'Randonnée Pic Champlain',
    'Kayak de Mer',
    'Sentier Le Chemin du Nord',
    'Centre de Découverte',
    'Plage du Havre du Bic',
    'Vélo de Montagne',
    'Kayak Aventure',
    'Randonnée Photo',
  ],
  hebergements: ['Auberge du Mange Grenouille', 'Gîte du Bic', 'Camping du Bic'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Mountain,
  Binary as Binoculars,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge du Mange Grenouille',
    category: 'Charme',
    description: 'Auberge historique avec vue sur le parc',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-du-mange-grenouille.html',
    image: 'https://images.unsplash.com/photo-1596472195295-9e0cb3799405?auto=format&fit=crop&q=80',
  },
  {
    name: 'Gîte du Bic',
    category: 'B&B',
    description: 'Accueil chaleureux et petit-déjeuner local',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/gite-du-bic.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Camping du Bic',
    category: 'Plein Air',
    description: 'Sites de camping avec vue sur mer',
    price: 'À partir de 30$/nuit',
    link: 'https://www.sepaq.com/pq/bic/',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Café-Bar Le Mange-Grenouille',
    type: 'Bistro',
    speciality: 'Cuisine du terroir et fruits de mer',
    price: '$$$',
    mustTry: 'Tartare de saumon et produits locaux',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'La Cabane à Manger',
    type: 'Café-Restaurant',
    speciality: 'Brunch et cuisine locale',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Parc',
    type: 'Cantine',
    speciality: 'Fast-food de qualité',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Observation des Phoques',
    type: 'Nature',
    duration: '2-3 heures',
    price: 'Inclus avec accès parc',
    description: 'Observation des phoques communs et gris',
  },
  {
    name: 'Randonnée Pic Champlain',
    type: 'Randonnée',
    duration: '3-4 heures',
    price: 'Inclus avec accès parc',
    description: 'Vue panoramique sur le Saint-Laurent',
  },
  {
    name: 'Kayak de Mer',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '75$/personne',
    description: 'Excursion guidée le long des côtes',
  },
];

const familyActivities = [
  {
    title: 'Sentier Le Chemin du Nord',
    description: "Randonnée facile avec points d'observation (tous âges)",
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Centre de Découverte',
    description: 'Expositions interactives sur la faune (5-12 ans)',
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Plage du Havre du Bic',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Inclus avec accès parc',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers techniques (12+ ans)',
    price: 'Location: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak Aventure',
    description: 'Excursion guidée (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Randonnée Photo',
    description: 'Safari photo guidé (12+ ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleBic() {
  return (
    <article id="blog_article_bic" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide Complet : Parc national du Bic - Paradis des Phoques et des Randonneurs
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau naturel du Bas-Saint-Laurent, où montagnes et mer se rencontrent dans
          un décor spectaculaire
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Le Parc national du Bic, niché sur les rives du Saint-Laurent, est un sanctuaire naturel
          où les phoques se prélassent sur les rochers et où les sentiers de randonnée offrent des
          vues imprenables sur le fleuve. Ce parc unique combine harmonieusement paysages maritimes,
          montagnes et une riche biodiversité.
        </p>
        <div className="my-8">
          <img
            src="https://images.unsplash.com/photo-1596472195295-9e0cb3799405?auto=format&fit=crop&q=80"
            alt="Parc national du Bic"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter le Parc du Bic ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Observation des Phoques</h3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au Québec pour observer les phoques dans leur habitat
              naturel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Uniques</h3>
            <p className="text-gray-600">
              Mélange spectaculaire de caps rocheux, anses et montagnes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Randonnées Panoramiques</h3>
            <p className="text-gray-600">
              Plus de 25 km de sentiers avec vues imprenables sur le Saint-Laurent.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Binoculars className="h-8 w-8 text-indigo-600" />
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
          <Mountain className="h-8 w-8 text-indigo-600" />
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
                5h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                3h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus Orléans Express (arrêt à Rimouski)
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
                Navette depuis Rimouski en été
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
              De juin à septembre pour le climat doux. Mai-juin et septembre pour l'observation des
              phoques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 30-169$/nuit Activités: 8.75$/jour (accès parc) Repas: 15-45$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir le Parc du Bic ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et partez à la rencontre des phoques
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/le-bic.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.sepaq.com/pq/bic/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
