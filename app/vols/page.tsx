// app/vols/page.tsx
import * as React from 'react';
import VolsWrapper from './VolsWrapper';
import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';
import type { Metadata } from 'next';

const CANONICAL = 'https://www.goquebecan.com/vols';
const OG_IMAGE = 'https://www.goquebecan.com/images/og/vols-montreal-france.jpg';

// ─────────────────────────────
// 🔍 MÉTADONNÉES SEO 2025/2026
// ─────────────────────────────
export const metadata: Metadata = buildMetadata2025({
  title: 'Vols pas chers & conseils pour voyager en avion | GoQuébeCAN',
  description:
    'Comparer les vols, réserver au meilleur moment et voyager sereinement. Conseils réservation, comparatifs, points Aeroplan, assurances, salons d’aéroport et objets indispensables.',
  canonical: CANONICAL,
  image: OG_IMAGE, // ✅ OBLIGATOIRE dans ton buildMetadata2025
  keywords: [
    'vols pas chers',
    'billets avion pas chers',
    'vol Montréal France',
    'meilleur moment réserver vol',
    'points Aeroplan',
    'Amex Cobalt voyage',
    'salon aéroport Aventura',
    'objets indispensables avion',
    'GoQuébeCAN',
  ],
  type: 'article',
});

// ─────────────────────────────
// 🧭 STRUCTURED DATA JSON-LD
// ─────────────────────────────
const jsonLd = buildGenericJsonLd({
  type: 'guide',
  title: 'Vols pas chers & conseils pour voyager en avion',
  description:
    'Guide pratique pour comparer les vols, réserver au bon moment, préparer son voyage et optimiser les points (Aeroplan) et le confort (salons d’aéroport).',
  canonical: CANONICAL,
  image: OG_IMAGE,
  published: '2025-12-16',
  modified: '2025-12-16',
  author: 'GoQuébeCAN',
  steps: [
    'Comparer plusieurs dates (±1 à 3 jours) avant de réserver',
    'Vérifier bagage cabine / bagage en soute selon la compagnie',
    'Activer des alertes de prix sur les itinéraires clés',
    'Préparer un kit confort (casque, coussin, batterie externe)',
    'Optimiser points et protections (selon cartes et conditions)',
  ],
  faq: [
    {
      question: 'Quel est le meilleur moment pour réserver un vol moins cher ?',
      answer:
        'En général, viser le milieu de semaine et réserver plusieurs semaines à l’avance (selon destination) donne souvent de meilleurs prix. La flexibilité de dates est un gros levier.',
    },
    {
      question: 'Est-ce que bouger mes dates de 1 à 3 jours change vraiment le prix ?',
      answer:
        'Oui, très souvent. Tester plusieurs combinaisons autour de tes dates peut faire baisser le tarif, surtout sur les périodes chargées.',
    },
    {
      question: 'Comment voyager moins cher avec les points Aeroplan ?',
      answer:
        'Aeroplan permet de payer une partie ou la totalité d’un billet selon disponibilité. Certaines cartes permettent aussi d’accumuler des points rapidement et de transférer vers Aeroplan.',
    },
    {
      question: 'Les salons d’aéroport, est-ce utile ?',
      answer:
        'Pour les longues attentes, correspondances ou retards, les salons apportent calme, wifi, prises et souvent collations/boissons. Certaines cartes offrent des entrées incluses.',
    },
  ],
});

// ─────────────────────────────
// 🛫 PAGE PRINCIPALE
// ─────────────────────────────
export default function VolsPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      {/* ✅ H1 masqué pour SEO */}
      <H1 className="sr-only">Vols pas chers & conseils pour voyager en avion</H1>

      {/* ✅ Meta extra et JSON-LD */}
      <HeadExtras />
      <JsonLd data={jsonLd} />

      {/* ✅ Contenu */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <VolsWrapper />
      </section>
    </main>
  );
}
