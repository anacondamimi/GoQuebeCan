'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import GroupedDestinations from '@/components/GroupedDestinations';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import Testimonials from '@/components/home/Testimonials';
import ItineraryPlanner from '@/components/ItineraryPlanner';
import TravelEssentials from '@/components/TravelEssentials';
import AddProducteur from '@/components/admin/AddProducteur';

const PopularVideos = dynamic(() => import('@/components/PopularVideos'), { ssr: false });
const Offers = dynamic(() => import('@/components/Offers'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background text-neutral">
        {/* Hero */}
        <section className="relative bg-surface py-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-primary mb-4">
              Explorez le Québec avec GoQuebeCan
            </h1>
            <p className="text-lg sm:text-xl text-secondary font-sans mb-6">
              Cartes interactives, itinéraires personnalisés et conseils pour un voyage authentique
              au Canada.
            </p>
            <Link
              href="#planification"
              className="inline-block bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition"
            >
              Créer mon itinéraire
            </Link>
          </div>
        </section>

        {/* Guides Pilier */}
        <section id="guides" className="py-20 bg-surface">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
              Guides essentiels
            </h2>
            <p className="text-lg sm:text-xl text-secondary mb-10 max-w-2xl mx-auto">
              Découvrez nos guides détaillés pour chaque région et planifiez sereinement votre
              voyage.
            </p>
            {/* Affichage direct sans grid externe */}
            <FeaturedGuides />
          </div>
        </section>

        {/* Destinations */}
        <section id="destinations" className="py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Destinations Populaires
            </h2>
            <p className="text-lg text-secondary mb-6">
              Explorez nos suggestions des lieux incontournables au Québec et au Canada.
            </p>
            <GroupedDestinations /> {/* ← ton nouveau composant dynamique */}
          </div>
        </section>

        {/* Vidéos */}
        <section id="videos" className="py-16 bg-background text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Vos destinations en images
          </h2>
          <p className="text-lg text-secondary mb-6">Vivez l'expérience avant même de partir.</p>
          <PopularVideos />
        </section>

        {/* Produits */}
        <section id="objets" className="py-16 bg-surface text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Produits indispensables
          </h2>
          <p className="text-lg text-secondary mb-6">
            Préparez-vous avec nos suggestions pour un voyage réussi.
          </p>
          <TravelEssentials />
        </section>

        {/* Planificateur */}
        <section id="planification" className="py-16 bg-background text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Planifiez votre voyage
          </h2>
          <p className="text-lg text-secondary mb-6">
            Créez votre itinéraire sur mesure avec notre outil interactif.
          </p>
          <ItineraryPlanner />
        </section>

        {/* Témoignages */}
        <section id="testimonials" className="py-16 bg-surface text-center">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Ils nous ont fait confiance
          </h2>
          <Testimonials />
        </section>

        {/* Offres */}
        <section id="offres" className="py-16 bg-background text-center">
          <Offers />
        </section>

        {/* CTA Blog */}
        <section id="blog" className="py-16 bg-surface text-center">
          <Link
            href="/blog"
            className="inline-block bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-primary transition"
          >
            Voir tous les articles
          </Link>
        </section>

        {/* Producteurs & Chatbot */}
        <AddProducteur />
        <Chatbot />
      </main>
    </>
  );
}
