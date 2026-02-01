// app/camping/page.tsx
import * as React from 'react';
import type { Metadata } from 'next';
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
    'Découvrez les plus beaux campings du Québec : emplacements nature, lacs, forêts et panoramas uniques pour des vacances inoubliables.',
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
  title: 'Guide des Campings au Québec',
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
        'Le Parc du Bic, le Fjord du Saguenay et la Baie-des-Chaleurs sont parmi les plus appréciés des familles.',
    },
    {
      question: 'Où camper au bord de l’eau ?',
      answer:
        'Les campings du Fjord du Saguenay et de la Baie-des-Chaleurs offrent des emplacements spectaculaires au bord de l’eau.',
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
      {/* ✅ H1 masqué pour SEO (visible pour les moteurs de recherche) */}
      <H1 className="sr-only">Guide des campings au Québec</H1>

      {/* 🔗 Métadonnées & Données structurées */}
      <HeadExtras />
      <JsonLd data={jsonLd} />

      {/* 🏕️ Contenu principal */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CampingGuideWrapper />
      </section>

      {/* 🧭 CTA SEO-friendly */}
      <nav
        aria-label="Navigation complémentaire"
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        <a
          href="/#destinations-populaires"
          aria-label="Voir toutes les destinations populaires"
          className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          ← Retourner aux destinations populaires
        </a>
        <a
          href="/#objets"
          aria-label="Découvrir les objets utiles pour le camping"
          className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
        >
          🏕️ Objets utiles pour le camping
        </a>
      </nav>
    </main>
  );
}
