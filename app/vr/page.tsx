// app/blog/locationvr/page.tsx
import type { Metadata } from 'next';
import { Skyscanner } from '@/components/Skyscanner'; // Ajuste s’il s’agit d’un export default
import BlogArticleLocationVR from '@/components/blogpost/BlogArticleLocationVR';

export const metadata: Metadata = {
  title: 'Voyager au Canada en VR | GoQuebecan',
  description:
    'Découvrez pourquoi louer un VR au Québec avec GoQuebecan est la meilleure façon d’explorer le pays.',
  openGraph: {
    title: 'Voyager au Canada en VR | GoQuebecan',
    description: 'Découvrez les merveilles du Canada en VR avec GoQuebecan.',
    url: 'https://www.goquebecan.com/blog/locationvr',
    images: [
      {
        url: '/images/locationvr-cover.avif',
        width: 1200,
        height: 630,
        alt: 'Location de VR au Canada',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.goquebecan.com/blog/locationvr',
  },
};

export default function LocationVRPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Si tu veux afficher le composant Skyscanner avant l’article */}
      <Skyscanner />

      {/* Ton article VR */}
      <BlogArticleLocationVR />
    </main>
  );
}
