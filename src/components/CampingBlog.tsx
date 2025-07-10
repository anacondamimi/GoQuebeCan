import React from 'react';
import Image from 'next/image';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { addToItinerary } from '@/utils/itineraryStorage.client';
import type { CampingData } from '@/types/CampingData';
import campingArticles from '@/data/campings.json';
import destinationsWithCoords from '@/data/destinationsWithCoords.json'; // ✅ JSON public

const articles = campingArticles as Record<string, CampingData>;
const destinations = destinationsWithCoords as Array<{
  slug: string;
  lat: number;
  lng: number;
}>;

const CampingBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const camping = articles[slug ?? ''];

  const getCoordinatesFromSlug = (slug: string): [number, number] | null => {
    const match = destinations.find((d) => d.slug === slug);
    return match ? [match.lat, match.lng] : null;
  };

  const handleAddToItinerary = () => {
    if (!camping || !slug) return;

    const coords = getCoordinatesFromSlug(slug);
    if (coords) {
      addToItinerary({
        id: slug,
        name: camping.title,
        coordinates: coords,
      });
      alert(`${camping.title} ajouté à ton itinéraire !`);
    } else {
      alert("Ce camping n'a pas de coordonnées disponibles.");
    }
  };

  if (!camping) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700">
            ← Retour au comparatif
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{camping.title} | Guide des Campings au Québec</title>
        <meta name="description" content={camping.description} />
      </Helmet>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-96">
          <Image
            src={camping.image}
            alt={camping.title}
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{camping.title}</h1>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{camping.location}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* ✅ Bouton en haut */}
          <button
            onClick={handleAddToItinerary}
            className="mb-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
          >
            ➕ Ajouter à mon itinéraire
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">{camping.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Saison: {camping.season}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>Capacité: {camping.capacity}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Idéal pour</h2>
              <p className="text-gray-600">{camping.bestFor}</p>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2>Description</h2>
            <p>{camping.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Installations</h2>
              <ul className="space-y-2">
                {camping.facilities.map((facility: string) => (
                  <li key={facility} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    {facility}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Activités</h2>
              <ul className="space-y-2">
                {camping.activities.map((activity: string) => (
                  <li key={activity} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Bouton en bas */}
          <button
            onClick={handleAddToItinerary}
            className="mb-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
          >
            ➕ Ajouter à mon itinéraire
          </button>

          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
            ← Retour au comparatif
          </Link>
        </div>
      </article>
    </main>
  );
};

export default CampingBlog;
