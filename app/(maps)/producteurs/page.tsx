// ✅ app/producteurs/page.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

// Import dynamique de la carte des producteurs sans SSR
const ProducersMapGlobal = dynamic(() => import('src/components/ProducersMapGlobal'), {
  ssr: false,
});

export default function ProducteursPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <H1 className="text-center text-3xl font-bold text-indigo-700">
        🌿 Producteurs du Québec 2025 : Découvrez les saveurs locales
      </H1>

      <p className="mx-auto max-w-2xl text-justify leading-relaxed text-gray-700">
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
        <H2 className="text-center text-2xl font-semibold text-indigo-600">
          🗺️ Carte interactive des producteurs
        </H2>
        <ProducersMapGlobal />
      </section>

      <section className="space-y-4 rounded-xl bg-indigo-50 p-6 text-center">
        <p className="text-gray-800">
          Vous êtes producteur ou connaissez un producteur qui mérite d’être découvert sur
          <BrandName /> ?
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          📬 Ajouter mon producteur
        </Link>
      </section>

      <div className="text-center">
        <Link
          href="/planificateur"
          className="inline-block min-h-[48px] min-w-[48px] rounded-full bg-green-600 text-white transition hover:bg-green-700"
        >
          📍 Découvrez les producteurs près de chez vous ou lors de vos vacances
        </Link>
      </div>
    </main>
  );
}
