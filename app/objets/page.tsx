import { Metadata } from 'next';
import TravelEssentials from '@/components/TravelEssentials';

import BlogArticleVoyageHotel from '@/components/blogpost/BlogArticleVoyageHotel';
import BlogArticleVoyageCamping from '@/components/blogpost/BlogArticleVoyageCamping';
import BlogArticleVoyageAvion from '@/components/blogpost/BlogArticleVoyageAvion';
import BlogArticleVoyageVoitureElectrique from '@/components/blogpost/BlogArticleVoyageVoitureElectrique';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Objets Indispensables pour Voyager au Québec et au Canada | GoQuebecan',
  description:
    "Découvrez notre sélection d'équipements essentiels pour voyager au Québec et au Canada. Camping, hôtel, avion ou voiture électrique, trouvez tout ce dont vous avez besoin.",
  openGraph: {
    title: 'Objets Indispensables pour Voyager au Québec et au Canada | GoQuebecan',
    description: 'Équipements essentiels pour réussir votre voyage au Canada',
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
    ],
    url: 'https://goquebecan.com/objets',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goquebecan.com/objets',
  },
};

export const dynamic = 'force-static';

export default function ObjetsPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ Titre pour le SEO, invisible pour l'utilisateur */}
      <h1 className="sr-only">Objets Indispensables pour Voyager au Québec et au Canada</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Section planification rapide */}
        <TravelEssentials />

        {/* Articles objets utiles */}
        <BlogArticleVoyageHotel />
        <BlogArticleVoyageCamping />
        <BlogArticleVoyageAvion />
        <BlogArticleVoyageVoitureElectrique />
      </div>
    </main>
  );
}
