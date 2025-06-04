import React from 'react';
import { Link } from 'react-router-dom';
import campingArticles from '@/data/campings.json';
import type { CampingData } from '@/types/CampingData';

const articles = campingArticles as Record<string, CampingData>;

export default function CampingList() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Campings du Québec</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(articles).map(([slug, camping]) => (
          <div key={slug} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Link to={`/camping/${slug}`}>
              <div className="h-48 overflow-hidden">
                <img
                  src={camping.image}
                  alt={camping.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{camping.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{camping.location}</p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-2">{camping.description}</p>
                <p className="text-indigo-600 font-semibold text-sm">{camping.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
