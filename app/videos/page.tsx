import { Metadata } from 'next';
import PopularVideos from '@/components/PopularVideos';
import H1 from '@/components/typography/H1';

export const metadata: Metadata = {
  title: 'Vidéos Populaires sur le Québec et le Canada | GoQuebecan',
  description:
    'Découvrez nos vidéos inspirantes sur les plus belles destinations du Québec et du Canada. Guides visuels, conseils de voyage et paysages à couper le souffle.',
  openGraph: {
    title: 'Vidéos Populaires sur le Québec et le Canada | GoQuebecan',
    description: 'Explorez le Québec et le Canada à travers nos vidéos inspirantes',
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
    ],
    url: 'https://goquebecan.com/videos',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goquebecan.com/videos',
  },
};

export const dynamic = 'force-static';

export default function VideosPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour SEO */}
      <H1 className="sr-only">Vidéos Populaires sur le Québec et le Canada</H1>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PopularVideos />
      </div>
    </main>
  );
}
