import { Metadata } from 'next';
import PopularDestinations from '@/components/PopularDestinations';

export const metadata: Metadata = {
  title: 'Destinations Populaires au Québec et au Canada | GoQuebecan',
  description:
    "Découvrez les plus belles destinations du Québec et du Canada. Guides détaillés, conseils d'experts et itinéraires pour votre prochain voyage.",
  openGraph: {
    title: 'Destinations Populaires au Québec et au Canada | GoQuebecan',
    description: 'Explorez les plus beaux endroits à visiter au Québec et au Canada',
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
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
      <h1 className="sr-only">
        Destinations Populaires au Québec et au Canada
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PopularDestinations />
      </div>
    </main>
  );
}
