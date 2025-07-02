'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import AddProducteur from '@/components/admin/AddProducteur';
import TravelEssentials from '@/components/TravelEssentials';
import ComingSoonBanner from '@/components/ComingSoonBanner';

import BlogArticleVoyageHotel from '@/components/blogpost/BlogArticleVoyageHotel';
import BlogArticleVoyageCamping from '@/components/blogpost/BlogArticleVoyageCamping';
import BlogArticleVoyageAvion from '@/components/blogpost/BlogArticleVoyageAvion';
import BlogArticleVoyageVoitureElectrique from '@/components/blogpost/BlogArticleVoyageVoitureElectrique';

// Composants dynamiques
const PopularVideos = dynamic(() => import('@/components/PopularVideos'), { ssr: false });
const Offers = dynamic(() => import('@/components/Offers'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });
const PopularDestinations = dynamic(() => import('@/components/PopularDestinations'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* ✅ Bannière temporaire */}
        <div className="px-4 mt-4">
          <ComingSoonBanner />
        </div>

        <section id="features">
          <Features />
        </section>

        <section id="planification">
          <TravelEssentials />
        </section>

        <section id="destinations">
          <PopularDestinations />
        </section>

        {/* ✅ Section Objets indispensables pour voyager */}
        <section id="objets_utiles" className="py-12 px-4 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Produits indispensables pour voyager
          </h2>
          <div className="space-y-12">
            <BlogArticleVoyageHotel />
            <BlogArticleVoyageCamping />
            <BlogArticleVoyageAvion />
            <BlogArticleVoyageVoitureElectrique />
          </div>
        </section>

        <section id="videos_populaires">
          <PopularVideos />
        </section>

        <section id="offres_speciales">
          <Offers />
        </section>

        <section id="blog_section" className="py-16 bg-gray-50">
          <div className="text-center mt-8">
            <Link href="/blog" className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
              Voir tous les articles
            </Link>
          </div>
        </section>

        <AddProducteur />
        <Chatbot />
      </main>
    </>
  );
}
