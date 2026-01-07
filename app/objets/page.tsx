import { Metadata } from 'next';
import H1 from '@/components/typography/H1';

import BlogArticleVoyageHotel from '@/components/blogpost/BlogArticleVoyageHotel';
import BlogArticleVoyageCamping from '@/components/blogpost/BlogArticleVoyageCamping';
import BlogArticleVoyageAvion from '@/components/blogpost/BlogArticleVoyageAvion';
import BlogArticleVoyageVoiture from '@/components/blogpost/BlogArticleVoyageVoiture';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: { absolute: 'Produits de voyage — Guide 2025 Québec & Canada' },
  description:
    "Découvrez notre sélection d'équipements essentiels pour voyager au Québec et au Canada. Camping, hôtel, avion ou voiture électrique, trouvez tout ce dont vous avez besoin.",
  openGraph: {
    title: 'Produits de voyage — Guide 2025 Québec & Canada',
    description: 'Équipements essentiels pour réussir votre voyage au Canada',
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
    ],
    url: 'https://goquebecan.com/objets',
    type: 'website',
  },
  alternates: { canonical: 'https://goquebecan.com/objets' },
};

export const dynamic = 'force-static';

export default function ObjetsPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ Titre pour le SEO, invisible pour l'utilisateur */}
      <H1 className="sr-only">Objets Indispensables pour Voyager au Québec et au Canada</H1>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-12 sm:px-6 lg:px-8">
        {/* Section planification rapide */}

        {/* Articles objets utiles */}
        <BlogArticleVoyageHotel />
        <BlogArticleVoyageCamping />
        <BlogArticleVoyageAvion />
        <BlogArticleVoyageVoiture />
      </div>
    </main>
  );
}
