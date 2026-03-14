// app/camping/page.tsx
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';

import CampingGuideWrapper from './CampingGuideWrapper';

// ─────────────────────────────
// 🔍 MÉTADONNÉES SEO (2025)
// ─────────────────────────────
export const metadata: Metadata = buildMetadata2025({
  title: 'Camping au Québec | GoQuébeCAN',
  description:
    'Découvrez les plus beaux campings du Québec : emplacements nature, lacs, forêts, glamping et panoramas uniques pour des vacances inoubliables.',
  canonical: 'https://goquebecan.com/camping',
  image: 'https://goquebecan.com/images/og/camping-quebec.jpg',
  keywords: [
    'camping québec',
    'glamping',
    'camping nature',
    'camping famille',
    'camping VR',
    'meilleurs campings du québec',
  ],
  type: 'article',
});

// ─────────────────────────────
// 🏕️ STRUCTURED DATA JSON-LD
// ─────────────────────────────
const jsonLd = buildGenericJsonLd({
  type: 'article',
  title: 'Guide des campings au Québec',
  description:
    'Sélection des plus beaux campings du Québec : nature, bord de lac, glamping et emplacements VR.',
  canonical: 'https://goquebecan.com/camping',
  image: 'https://goquebecan.com/images/og/camping-quebec.jpg',
  published: '2025-05-01',
  modified: '2025-11-05',
  author: 'GoQuébeCAN',
  faq: [
    {
      question: 'Quels sont les meilleurs campings familiaux au Québec ?',
      answer:
        'Le Parc du Bic, le Fjord du Saguenay et la Baie-des-Chaleurs figurent parmi les campings les plus appréciés des familles.',
    },
    {
      question: 'Où camper au bord de l’eau au Québec ?',
      answer:
        'Les campings du Fjord du Saguenay et de la Baie-des-Chaleurs offrent plusieurs emplacements spectaculaires au bord de l’eau.',
    },
  ],
  places: [
    'Camping du Fjord du Saguenay',
    'Camping de la Baie-des-Chaleurs',
    'Camping du Mont-Orford',
  ],
});

// ─────────────────────────────
// 🏕️ PAGE PRINCIPALE
// ─────────────────────────────
export default function CampingPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <H1 className="sr-only">Guide des campings au Québec</H1>

      <HeadExtras />
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CampingGuideWrapper />
      </section>

      {/* CTA de fin de page */}
      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-gray-50 px-6 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Préparer votre séjour camping
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
            Complétez votre lecture avec notre guide pratique, le planificateur d’itinéraire et des
            idées de découvertes locales pour rendre votre voyage encore plus agréable.
          </p>

          <nav
            aria-label="Navigation complémentaire"
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/#destinations-populaires"
              aria-label="Retourner aux destinations populaires"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-white"
            >
              ← Retour aux destinations
            </Link>

            <Link
              href="/blog/voyage-camping"
              aria-label="Découvrir le guide voyage camping"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-white"
            >
              🏕️ Guide voyage camping
            </Link>

            <Link
              href="/planificateur"
              aria-label="Ouvrir le planificateur d’itinéraire"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              🗺️ Planifier mon itinéraire
            </Link>

            <Link
              href="/producteurs"
              aria-label="Découvrir les producteurs locaux"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-white"
            >
              🧺 Producteurs locaux
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
