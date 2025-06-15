import React from 'react';
import Image from 'next/image';
import HeroBanner from '@/components/ui/HeroBanner';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata = {
  slug: 'sauble-beach',
  ville: 'Sauble Beach',
  resume: 'Découverte de Sauble Beach et de ses attraits touristiques.',
  activites: [
    'Plage de Sauble',
    'Sauble Falls Provincial Park',
    'Sauble Speedway',
    'Zone Familiale de la Plage',
    'Mini-Golf Sauble',
    'Parc Aquatique Gonflable',
    'École de Surf',
    'Location de Jet-Ski',
    'Beach Volleyball',
  ],
  hebergements: ['Sauble Beach Lodge', 'Beach Resort Sauble', 'Sauble River Marina'],
  publics: ['familles', 'ados'],
};
const hotels = [
  {
    name: 'Sauble Beach Lodge',
    category: 'Vue sur Plage',
    description: 'Vue imprenable sur le lac Huron',
    price: 'À partir de 179$/nuit',
    link: 'https://www.booking.com/hotel/ca/sauble-beach-lodge.html',
    image: 'https://images.unsplash.com/photo-1596238686005-38e08058f08f?auto=format&fit=crop&q=80',
  },
  {
    name: 'Beach Resort Sauble',
    category: 'Resort',
    description: 'Accès direct à la plage',
    price: 'À partir de 199$/nuit',
    link: 'https://www.booking.com/hotel/ca/beach-resort-sauble.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Sauble River Marina',
    category: 'Familial',
    description: 'Proche de toutes les activités',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/sauble-river-marina.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'Casero Kitchen',
    type: 'Cuisine Fusion',
    speciality: 'Tacos de poisson et cuisine mexicaine',
    price: '$$$',
    mustTry: 'Tacos au poisson frais',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Two Chicks Café',
    type: 'Café-Restaurant',
    speciality: 'Brunch et café de spécialité',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: "Toute l'année",
  },
  {
    name: "Walker's Fish & Chips",
    type: 'Fruits de mer',
    speciality: 'Fish & Chips traditionnel',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Plage de Sauble',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: '11 km de sable blanc et eau cristalline',
  },
  {
    name: 'Sauble Falls Provincial Park',
    type: 'Nature',
    duration: '2-3 heures',
    price: '12$/véhicule',
    description: 'Cascades et sentiers de randonnée',
  },
  {
    name: 'Sauble Speedway',
    type: 'Divertissement',
    duration: '2-3 heures',
    price: '25$/personne',
    description: 'Course automobile et événements spéciaux',
  },
];

const familyActivities = [
  {
    title: 'Zone Familiale de la Plage',
    description: 'Secteur surveillé et peu profond (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Sauble',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
  {
    title: 'Parc Aquatique Gonflable',
    description: 'Structures flottantes (5+ ans)',
    price: '25$/enfant',
  },
];

const teenActivities = [
  {
    title: 'École de Surf',
    description: 'Cours de surf sur le lac (12+ ans)',
    price: '65$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Location de Jet-Ski',
    description: 'Excursion guidée (16+ ans)',
    price: '85$/heure',
    duration: '1-2 heures',
  },
  {
    title: 'Beach Volleyball',
    description: 'Terrains de volleyball (12+ ans)',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
];

export default function BlogArticleSaubleBeach() {
  return (
    <article id="blog_article_sauble_beach" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <HeroBanner
        image="/images/destinations/sauble-beach.avif"
        title=" Sauble Beach – 11 km de Paradis sur le Lac Huron"
        subtitle="Sable blanc, eau cristalline, ambiance estivale et couchers de soleil inoubliables."
      />

      <section className="prose lg:prose-xl mb-12">
        <p>
          Sauble Beach, deuxième plus longue plage d'eau douce au monde après Wasaga Beach, offre 11
          kilomètres de sable blanc bordant les eaux cristallines du lac Huron. Cette destination
          estivale prisée combine plage de rêve, sports nautiques et ambiance décontractée typique
          des villes balnéaires.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/sauble-beach.avif"
            alt="Sauble Beach"
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle
          title="Activités et Attractions"
          subtitle="Plongez dans toutes les expériences que Sauble Beach peut offrir"
          icon={<Star className="h-6 w-6" />}
        />
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
        <SectionTitle title="Activités pour Enfants" icon={<Star className="h-6 w-6" />} />
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
        <SectionTitle title="Activités pour Adolescents" icon={<Sun className="h-6 w-6" />} />
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
        <SectionTitle
          title="Où Dormir ?"
          subtitle="Découvrez les meilleures options d’hébergement à proximité de la plage."
          icon={<Hotel className="h-6 w-6" />}
        />
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
        <SectionTitle
          title="Où Manger ?"
          subtitle="Restaurants recommandés pour toutes les envies."
          icon={<Utensils className="h-6 w-6" />}
        />
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
        <SectionTitle
          title="Comment s’y Rendre ?"
          subtitle="Infos transport pour accéder facilement à la destination."
          icon={<Bus className="h-6 w-6" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Depuis les Grandes Villes</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                2h30 en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                7h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain disponible en été
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur Place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Navette de plage en haute saison
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Centre-ville accessible à pied
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle
          title="Conseils Pratiques"
          subtitle="Préparez votre séjour en toute sérénité."
          icon={<Calendar className="h-6 w-6" />}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Meilleure Période
            </h3>
            <p className="text-gray-600">
              De juin à septembre pour la baignade. Juillet-août pour les meilleures conditions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement: 149-199$/nuit Activités: 25-85$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À Noter
            </h3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Stationnement payant près de la plage.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Découvrir Sauble Beach ?</h2>
        <p className="text-gray-600 mb-6">
          Réservez votre séjour maintenant et profitez d'une des plus belles plages de l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sauble-beach.html"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.saublebeach.com"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
