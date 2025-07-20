// ✅ app/producteurs/page.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Import dynamique de la carte des producteurs sans SSR
const ProducersMapGlobal = dynamic(() => import('src/components/ProducersMapGlobal'), {
  ssr: false,
});

export default function ProducteursPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">
        🌿 Producteurs du Québec 2025 : Découvrez les saveurs locales
      </h1>

      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-justify">
        Le Québec regorge de producteurs passionnés qui façonnent le terroir québécois avec talent,
        tradition et innovation. En 2025, découvrir les producteurs du Québec est devenu une
        expérience incontournable pour les voyageurs en quête d’authenticité, de rencontres humaines
        et de saveurs locales. Que vous soyez amateur de cidres artisanaux, de vins québécois, de
        fromages fermiers ou de fruits frais, le Québec vous ouvre ses portes pour des découvertes
        gustatives inoubliables. [...] Planifiez dès maintenant vos découvertes gourmandes grâce à
        notre planificateur d’itinéraire et découvrez les producteurs près de chez vous ou lors de
        vos vacances au Québec.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center">
          🗺️ Carte interactive des producteurs
        </h2>
        <ProducersMapGlobal />
      </section>

      <section className="bg-indigo-50 rounded-xl p-6 text-center space-y-4">
        <p className="text-gray-800">
          Vous êtes producteur ou connaissez un producteur qui mérite d’être découvert sur
          GoQuébeCan ?
        </p>
        <Link
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          📬 Ajouter mon producteur
        </Link>
      </section>

      <div className="text-center">
        <Link
          href="/planificateur"
          className="inline-block bg-green-600 text-white min-w-[48px] min-h-[48px] rounded-full hover:bg-green-700 transition"
        >
          📍 Découvrez les producteurs près de chez vous ou lors de vos vacances
        </Link>
      </div>
    </main>
  );
}
