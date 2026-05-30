import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import CampingGuideWrapper from './CampingGuideWrapper';

const CANONICAL = 'https://www.goquebecan.com/camping';
const OG_IMAGE = 'https://www.goquebecan.com/images/og/camping-quebec.jpg';

export const metadata: Metadata = buildMetadata2025({
  title: 'Camping au Québec | Guide nature, famille, VR et glamping | GoQuébeCAN',
  description:
    'Découvrez les plus beaux campings du Québec : emplacements en nature, bord de lac, camping familial, VR, glamping, conseils pratiques et idées d’itinéraires.',
  canonical: CANONICAL,
  image: OG_IMAGE,
  keywords: [
    'camping Québec',
    'camping au Québec',
    'meilleurs campings Québec',
    'camping famille Québec',
    'camping VR Québec',
    'glamping Québec',
    'camping bord de lac Québec',
    'camping nature Québec',
    'GoQuébeCAN',
  ],
  type: 'article',
});

const jsonLd = buildGenericJsonLd({
  type: 'article',
  title: 'Camping au Québec : guide nature, famille, VR et glamping',
  description:
    'Guide pratique pour choisir un camping au Québec : nature, bord de lac, camping familial, VR, glamping, conseils de réservation et idées d’itinéraires.',
  canonical: CANONICAL,
  image: OG_IMAGE,
  published: '2025-05-01',
  modified: '2026-04-05',
  author: 'GoQuébeCAN',
  faq: [
    {
      question: 'Quels sont les meilleurs endroits pour faire du camping au Québec ?',
      answer:
        'Les régions comme la Gaspésie, Charlevoix, le Saguenay, le Bas-Saint-Laurent, les Cantons-de-l’Est et les Laurentides offrent de très belles options pour camper en nature.',
    },
    {
      question: 'Où faire du camping familial au Québec ?',
      answer:
        'Pour un séjour familial, privilégiez les campings avec accès à l’eau, sentiers faciles, activités pour enfants, blocs sanitaires propres et services à proximité.',
    },
    {
      question: 'Peut-on voyager en VR facilement au Québec ?',
      answer:
        'Oui, plusieurs campings accueillent les VR au Québec. Il est conseillé de vérifier la taille des emplacements, les branchements, l’accès à l’eau, l’électricité et les services de vidange.',
    },
    {
      question: 'Quelle est la meilleure période pour camper au Québec ?',
      answer:
        'La période la plus populaire va de juin à septembre. Mai, septembre et début octobre peuvent aussi être très agréables pour éviter les foules, selon la région et la météo.',
    },
  ],
  places: [
    'Camping au Québec',
    'Camping familial au Québec',
    'Camping VR au Québec',
    'Glamping au Québec',
    'Camping en nature',
    'Camping bord de lac',
  ],
});

export default function CampingPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <HeadExtras />
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CampingGuideWrapper />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-6 py-10 text-center shadow-sm sm:px-10">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Préparer votre séjour camping au Québec
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Complétez votre lecture avec notre guide pratique, le planificateur d’itinéraire et les
            producteurs locaux pour transformer votre séjour camping en vraie escapade québécoise.
          </p>

          <nav
            aria-label="Navigation complémentaire camping"
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/#destinations-populaires"
              aria-label="Retourner aux destinations populaires"
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            >
              ← Retour aux destinations
            </Link>

            <Link
              href="/blog/voyage-camping"
              aria-label="Découvrir le guide voyage camping"
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
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
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            >
              🧺 Producteurs locaux
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
