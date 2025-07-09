import { Metadata } from 'next';
import PopularDestinations from '@/components/PopularDestinations';

export const metadata: Metadata = {
  title: 'Destinations Populaires au Québec et au Canada en 2025 | GoQuebecan',
  description:
    "Découvrez les plus belles destinations du Québec et du Canada. Guides détaillés, conseils d'experts et itinéraires pour votre prochain voyage.",
  openGraph: {
    title: 'Destinations Populaires au Québec et au Canada en 2025 | GoQuebecan',
    description: 'Explorez les plus beaux endroits à visiter au Québec et au Canada',
    images: [
      {
        url: '/images/parc-gaspesie.avif',
        width: 1200,
        height: 630,
        alt: 'Location de VR au Canada',
      },
    ],
    url: 'https://goquebecan.com/destinations',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goquebecan.com/destinations',
  },
};

export const dynamic = 'force-static';

export default function DestinationsPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour les moteurs de recherche */}
      <h1 className="sr-only">Destinations Populaires au Québec et au Canada en 2025</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PopularDestinations />
      </div>
    </main>
  );
}
