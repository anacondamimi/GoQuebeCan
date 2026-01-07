// app/planificateur/page.tsx
import * as React from 'react';
import ItineraryPlannerWrapper from './ItineraryPlannerWrapper';
import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';

import type { Metadata } from 'next';

// ─────────────────────────────
// 🔍 MÉTADONNÉES SEO 2025
// ─────────────────────────────
export const metadata: Metadata = buildMetadata2025({
  title: 'Planificateur d’itinéraire au Québec | GoQuébeCAN',
  description:
    'Créez votre itinéraire de voyage au Québec : sélectionnez vos étapes, calculez les distances, découvrez les producteurs locaux et exportez votre parcours en PDF.',
  canonical: 'https://goquebecan.com/planificateur',
  image: 'https://goquebecan.com/images/og/planificateur-quebec.jpg',
  keywords: [
    'planificateur itinéraire',
    'road trip Québec',
    'itinéraire voyage Canada',
    'producteurs locaux Québec',
    'carte interactive Québec',
    'GoQuébeCAN planificateur',
  ],
  type: 'article',
});

// ─────────────────────────────
// 🗺️ STRUCTURED DATA JSON-LD
// ─────────────────────────────
const jsonLd = buildGenericJsonLd({
  type: 'guide',
  title: 'Planificateur d’itinéraire au Québec',
  description:
    'Créez un itinéraire sur mesure à travers les plus belles régions du Québec : ajoutez des étapes, trouvez des campings, restaurants, producteurs et exportez votre road trip complet.',
  canonical: 'https://goquebecan.com/planificateur',
  image: 'https://goquebecan.com/images/og/planificateur-quebec.jpg',
  published: '2025-05-01',
  modified: '2025-11-05',
  author: 'GoQuébeCAN',
  steps: [
    'Choisissez votre point de départ et votre destination.',
    'Ajoutez des étapes intermédiaires selon vos envies.',
    'Visualisez le trajet, les distances et les temps de route.',
    'Découvrez les producteurs, hébergements et activités à proximité.',
    'Exportez votre itinéraire en PDF ou partagez-le avec vos amis.',
  ],
  faq: [
    {
      question: 'Puis-je ajouter plusieurs étapes à mon itinéraire ?',
      answer:
        'Oui, le planificateur vous permet d’ajouter plusieurs étapes et de les réorganiser facilement selon votre parcours.',
    },
    {
      question: 'Comment sauvegarder mon itinéraire ?',
      answer:
        'Une fois terminé, vous pouvez exporter votre itinéraire en PDF ou l’enregistrer dans votre compte GoQuébeCAN.',
    },
  ],
});

// ─────────────────────────────
// ⚡ PAGE PRINCIPALE
// ─────────────────────────────
export default function PlanificateurPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8">
      {/* ✅ H1 masqué pour SEO */}
      <H1 className="sr-only">Planificateur d’itinéraire au Québec</H1>

      {/* ✅ Injection des meta OG et JSON-LD */}
      <HeadExtras />
      <JsonLd data={jsonLd} />

      {/* ✅ Section principale */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ItineraryPlannerWrapper />
      </section>

      {/* ✅ Liens internes SEO-friendly */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <a
          href="/vidéos"
          className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
          aria-label="Découvrir les meilleurs campings du Québec"
        >
          🏕️ Regarder les vidéos des destinations
        </a>
        <a
          href="/voyage-hotel"
          className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
          aria-label="Découvrire les objets indispensables pour un séjour à l'hotel"
        >
          ✈️ Objets indispensables
        </a>
      </div>
    </main>
  );
}
