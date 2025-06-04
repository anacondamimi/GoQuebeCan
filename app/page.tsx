'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import AddProducteur from '@/components/admin/AddProducteur';
import TravelEssentials from '@/components/TravelEssentials';
import ComingSoonBanner from '@/components/ComingSoonBanner';

// ✅ Chargements dynamiques client-only
const Products = dynamic(() => import('@/components/Products'), { ssr: false });
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

        <section id="objets_utiles">
          <Products />
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
