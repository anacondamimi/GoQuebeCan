import React from 'react';

export const metadata = {
  slug: 'orleans',
  ville: 'Orleans',
  resume: 'Découverte de Orleans et de ses attraits touristiques.',
  activites: ['Tour Gourmand de l', 'Location de Vélos', 'Vignobles et Cidreries'],
  hebergements: ['Auberge La Grange de l', 'Le Domaine Orléans', 'Les Chalets de l'],
  publics: ['aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: "Auberge La Grange de l'Île",
    category: 'Charme',
    description: 'Auberge historique avec vue sur le fleuve',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-la-grange.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Le Domaine Orléans',
    category: 'B&B',
    description: 'Gîte champêtre dans une maison ancestrale',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/domaine-orleans.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
  {
    name: "Les Chalets de l'Île",
    category: 'Chalet',
    description: 'Chalets indépendants avec cuisine équipée',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/chalets-ile.html',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Le Relais des Pins',
    type: 'Cabane à sucre',
    speciality: "Repas traditionnel à l'érable",
    price: '$$$',
    mustTry: "Oreilles de crisse et jambon à l'érable",
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Panache Mobile',
    type: 'Gastronomique',
    speciality: 'Cuisine du terroir raffinée',
    price: '$$$$',
    mustTry: 'Tartare de boeuf local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'La Grange',
    type: 'Brunch',
    speciality: 'Brunch fermier',
    price: '$$',
    mustTry: 'Crêpes aux fruits de saison',
    schedule: "Toute l'année, weekends",
  },
];

const activities = [
  {
    name: "Tour Gourmand de l'Île d'Orléans",
    type: 'Gastronomie',
    duration: '6 heures',
    price: '125$/personne',
    link: 'https://www.quebec-cite.com/fr/quoi-faire-quebec/tours-gourmands#tour-gourmand-de-lile-dorleans',
    description: 'Découverte des producteurs locaux et dégustations',
  },
  {
    name: 'Location de Vélos',
    type: 'Activité',
    duration: 'À la journée',
    price: '35$/jour',
    link: 'https://www.locationvelos.com',
    description: "Parcourez l'île à vélo sur 67 km de routes panoramiques",
  },
  {
    name: 'Vignobles et Cidreries',
    type: 'Dégustation',
    duration: '3-4 heures',
    price: '45$/personne',
    link: 'https://www.tourisme.iledorleans.com',
    description: 'Circuit des vignobles avec dégustation',
  },
];

const springActivities = [
  {
    title: 'Temps des Sucres',
    description: 'Visitez les cabanes à sucre traditionnelles et modernes',
    period: 'Mars à Avril',
  },
  {
    title: 'Floraison des Vergers',
    description: 'Spectacle naturel des pommiers en fleurs',
    period: 'Mai',
  },
  {
    title: 'Randonnée Printanière',
    description: "Découverte de la nature qui s'éveille",
    period: 'Avril à Juin',
  },
];

const summerActivities = [
  {
    title: 'Cueillette de Fruits',
    description: 'Fraises, framboises et bleuets selon la saison',
    period: 'Juin à Septembre',
  },
  {
    title: "Tour de l'Île à Vélo",
    description: 'Circuit cyclable avec vues panoramiques',
    period: 'Mai à Octobre',
  },
  {
    title: 'Pique-niques Champêtres',
    description: 'Aires aménagées avec vue sur le fleuve',
    period: 'Juin à Septembre',
  },
];

export default function BlogArticleOrleans() {
  return (
    <article id="blog_article_orleans" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guide de Voyage à l'Île d'Orléans : Le Joyau du Saint-Laurent
        </h1>
        <p className="text-xl text-gray-600">
          Découvrez le berceau de la Nouvelle-France, entre patrimoine, gastronomie et paysages
          enchanteurs
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          À seulement 15 minutes de Québec, l'Île d'Orléans est un véritable havre de paix qui
          conjugue patrimoine historique, traditions agricoles et gastronomie locale. Cette île de
          34 kilomètres de long, surnommée le "Jardin de Québec", vous invite à un voyage dans le
          temps et les saveurs.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi Visiter l'Île d'Orléans ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Terroir d'Exception</h3>
            <p className="text-gray-600">
              Plus de 200 producteurs locaux : fraises, pommes, vins, fromages et produits de
              l'érable.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Patrimoine Historique</h3>
            <p className="text-gray-600">
              Plus de 600 bâtiments historiques, témoins de la Nouvelle-France.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Paysages Uniques</h3>
            <p className="text-gray-600">
              Vues spectaculaires sur le fleuve Saint-Laurent et les Laurentides.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-indigo-600" />
          Activités Saisonnières
        </h2>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Printemps à l'Île</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {springActivities.map((activity) => (
                  <div key={activity.title} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{activity.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                    <span className="text-indigo-600 text-sm">{activity.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Été à l'Île</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summerActivities.map((activity) => (
                  <div key={activity.title} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{activity.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                    <span className="text-indigo-600 text-sm">{activity.period}</span>
                  </div>
                ))}
              </div>
            </div>
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
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour Enfants
        </h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Activités Familiales</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Cueillette de Fruits</h4>
                  <p className="text-gray-600">
                    Fraises en juin-juillet, pommes en septembre-octobre. Une activité ludique et
                    gourmande pour toute la famille.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Visite de la Ferme Pédagogique</h4>
                  <p className="text-gray-600">
                    Rencontre avec les animaux de la ferme et ateliers éducatifs sur l'agriculture.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                <div>
                  <h4 className="font-medium text-gray-900">Chasse aux Trésors de l'Île</h4>
                  <p className="text-gray-600">
                    Parcours ludique à travers les six villages de l'île avec énigmes et
                    découvertes.
                  </p>
                </div>
              </li>
            </ul>
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
            <h3 className="font-semibold text-xl mb-4">Depuis Québec</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                15 minutes en voiture depuis le Vieux-Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus PLUMobile (service régulier)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi (~35$ depuis le centre-ville)
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur l'Île</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Circuit d'autobus touristique
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Voiture recommandée pour plus de flexibilité
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
              De mai à octobre pour les activités extérieures. Mars-avril pour le temps des sucres.
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
              Réservation conseillée pour les restaurants et hébergements en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Prêt à Découvrir l'Île d'Orléans ?
        </h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/ile-d-orleans.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme.iledorleans.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
