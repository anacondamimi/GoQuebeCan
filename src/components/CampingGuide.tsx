'use client';
import React from 'react';
import { Tent, MapPin, DollarSign, Star } from 'lucide-react';

interface CampingSite {
  name: string;
  location: string;
  nearestCity: string;
  price: string;
  mainAttractions: string[];
  rating: number;
}

const campingSites: CampingSite[] = [
  {
    name: 'Camping Vacances Bromont',
    location: 'Bromont',
    nearestCity: 'Bromont (0 km)',
    price: '35-55$/nuit',
    mainAttractions: ['Piscine chauffée', 'Parc aquatique', 'Proximité pistes cyclables'],
    rating: 4.5,
  },
  {
    name: 'Camping Parc de la Rivière Batiscan',
    location: 'Saint-Narcisse',
    nearestCity: 'Trois-Rivières (40 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Rivière Batiscan', 'Sentiers pédestres', 'Via Ferrata'],
    rating: 4.7,
  },
  {
    name: 'Camping Carleton-Sur-Mer',
    location: 'Carleton-sur-Mer',
    nearestCity: 'Carleton-sur-Mer (0 km)',
    price: '35-50$/nuit',
    mainAttractions: ['Plage', 'Mont Saint-Joseph', 'Sports nautiques'],
    rating: 4.6,
  },
  {
    name: 'Camping Belle-Vie',
    location: 'Saint-Alphonse-Rodriguez',
    nearestCity: 'Joliette (30 km)',
    price: '32-48$/nuit',
    mainAttractions: ['Lac des Français', 'Activités familiales', 'Mini-ferme'],
    rating: 4.4,
  },
  {
    name: 'Camping Aventure Mégantic',
    location: 'Frontenac',
    nearestCity: 'Lac-Mégantic (15 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Observation des étoiles', 'Mont Mégantic', 'Randonnée'],
    rating: 4.8,
  },
  {
    name: 'Camping Amqui',
    location: 'Amqui',
    nearestCity: 'Amqui (0 km)',
    price: '28-42$/nuit',
    mainAttractions: ['Rivière Matapédia', 'Pêche', 'Vélo'],
    rating: 4.3,
  },
  {
    name: "Camping de L'Île",
    location: 'Notre-Dame-des-Prairies',
    nearestCity: 'Joliette (5 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Île naturelle', 'Canot', "Observation d'oiseaux"],
    rating: 4.4,
  },
  {
    name: 'Parc national de la Jacques-Cartier',
    location: 'Stoneham-et-Tewkesbury',
    nearestCity: 'Québec (40 km)',
    price: '42-65$/nuit',
    mainAttractions: ['Vallée glaciaire', 'Kayak', 'Randonnée'],
    rating: 4.9,
  },
  {
    name: 'Parc national du Mont-Tremblant',
    location: 'Mont-Tremblant',
    nearestCity: 'Mont-Tremblant (0 km)',
    price: '45-70$/nuit',
    mainAttractions: ['Lac Monroe', 'Randonnée', 'Canot-camping'],
    rating: 4.8,
  },
  {
    name: 'Camping la Clé des Champs',
    location: 'Saint-Alphonse-de-Granby',
    nearestCity: 'Granby (10 km)',
    price: '32-48$/nuit',
    mainAttractions: ['Piscine', "Jeux d'eau", 'Mini-golf'],
    rating: 4.5,
  },
  {
    name: 'Camping Falaise-sur-Mer',
    location: 'Les Éboulements',
    nearestCity: 'Baie-Saint-Paul (20 km)',
    price: '35-55$/nuit',
    mainAttractions: ['Vue sur le fleuve', 'Observation des baleines', 'Randonnée'],
    rating: 4.7,
  },
  {
    name: 'Camping Etsanha',
    location: 'Saint-Raymond',
    nearestCity: 'Saint-Raymond (0 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Vallée Bras-du-Nord', 'Vélo de montagne', 'Escalade'],
    rating: 4.6,
  },
  {
    name: 'Camping Valcartier',
    location: 'Saint-Gabriel-de-Valcartier',
    nearestCity: 'Québec (30 km)',
    price: '40-60$/nuit',
    mainAttractions: ['Village Vacances Valcartier', 'Parc aquatique', 'Activités familiales'],
    rating: 4.7,
  },
  {
    name: 'Camping Pointe-aux-Oies',
    location: 'Montmagny',
    nearestCity: 'Montmagny (0 km)',
    price: '32-48$/nuit',
    mainAttractions: ['Observation des oies', 'Plage', 'Piste cyclable'],
    rating: 4.5,
  },
  {
    name: 'Camping du Fort De La Martiniere',
    location: 'Lévis',
    nearestCity: 'Lévis (0 km)',
    price: '35-50$/nuit',
    mainAttractions: ['Site historique', 'Vue sur le fleuve', 'Piste cyclable'],
    rating: 4.4,
  },
  {
    name: 'Camping Chalets Lac St-Augustin',
    location: 'Saint-Augustin-de-Desmaures',
    nearestCity: 'Québec (15 km)',
    price: '35-55$/nuit',
    mainAttractions: ['Lac Saint-Augustin', 'Pêche', 'Baignade'],
    rating: 4.5,
  },
  {
    name: 'Camping Parc Bromont',
    location: 'Bromont',
    nearestCity: 'Bromont (0 km)',
    price: '35-52$/nuit',
    mainAttractions: ['Vélo de montagne', 'Ski', 'Randonnée'],
    rating: 4.6,
  },
  {
    name: 'Camping Domaine Tournesol',
    location: 'Drummondville',
    nearestCity: 'Drummondville (10 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Piscine', 'Jeux pour enfants', 'Terrain de volleyball'],
    rating: 4.4,
  },
  {
    name: 'Parc national de la Gaspésie',
    location: 'Sainte-Anne-des-Monts',
    nearestCity: 'Sainte-Anne-des-Monts (30 km)',
    price: '45-65$/nuit',
    mainAttractions: ['Mont Albert', 'Randonnée alpine', 'Observation du caribou'],
    rating: 4.9,
  },
  {
    name: 'Camping De Compton',
    location: 'Compton',
    nearestCity: 'Sherbrooke (20 km)',
    price: '30-45$/nuit',
    mainAttractions: ['Fermes locales', 'Produits du terroir', 'Randonnée'],
    rating: 4.5,
  },
];

export interface HeaderProps {
  onScrollToSection?: (id: string) => void;
}

export function CampingGuide() {
  const [sortBy, setSortBy] = React.useState<'name' | 'price' | 'rating'>('rating');
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortedCampingSites = [...campingSites]
    .filter(
      (site) =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.mainAttractions.some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price')
        return parseInt(a.price.split('-')[0]) - parseInt(b.price.split('-')[0]);
      return b.rating - a.rating;
    });

  return (
    <section id="camping_guide" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Tent className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Guide des Meilleurs Campings au Québec
          </h2>
        </div>

        <p className="text-xl text-center text-gray-600 mb-12">
          Découvrez notre sélection des plus beaux terrains de camping
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Rechercher par nom, lieu ou activité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="rating">Trier par note</option>
            <option value="name">Trier par nom</option>
            <option value="price">Trier par prix</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg text-sm md:text-base">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Camping
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Localisation
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Ville la plus proche
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Attraits principaux
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedCampingSites.map((site) => (
                <tr key={site.name} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{site.name}</div>
                  </td>
                  <td className="px-3 md:px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{site.location}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 hidden md:table-cell">{site.nearestCity}</td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{site.price}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 hidden lg:table-cell">
                    <ul className="list-disc list-inside">
                      {site.mainAttractions.map((attraction, index) => (
                        <li key={index} className="text-gray-600">
                          {attraction}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{site.rating}/5</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Légende des Prix</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>$ = Moins de 35$/nuit</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>$$ = 35-50$/nuit</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>$$$ = Plus de 50$/nuit</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
