// app/camping/page.tsx

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Guide Camping au Québec | GoQuebecan',
  description:
    'Découvrez les meilleurs campings du Québec. Guide complet avec emplacements, tarifs, équipements et conseils pour une expérience de camping réussie.',
};

const CampingGuideClient = dynamic(
  () =>
    import('@/components/CampingGuide').then((mod) => ({
      default: mod.CampingGuide,
    })),
  {
    ssr: false,
    loading: () => <p>Chargement du guide…</p>,
  }
);

export default function CampingPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour le SEO */}
      <h1 className="sr-only">Guide Camping au Québec</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CampingGuideClient />
      </div>
    </main>
  );
}
