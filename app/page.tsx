'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import GroupedDestinations from '@/components/GroupedDestinations';
import FeaturedGuides from '@/components/home/FeaturedGuides';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import Testimonials from '@/components/home/Testimonials';
import dynamic from 'next/dynamic';

import BrandName from '@/components/brand/BrandName';

const PopularVideos = dynamic(() => import('@/components/PopularVideos'), { ssr: false });
const Offers = dynamic(() => import('@/components/OfferCard'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Impact verification – NE PAS MODIFIER */}
      <div style={{ display: 'none' }}>
        Impact-Site-Verification: b3e59d2b-b9c5-4a0d-bcf3-cacca26c52a4
      </div>
      <Navbar />
      <main className="min-h-screen bg-background pt-8 text-neutral">
        {/* Hero */}

        <section className="bg-surface relative py-12 text-center sm:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <H1
              className="
        /* rouge brique +
        doux */ mb-4 text-balance
        font-serif   text-3xl font-bold leading-tight tracking-tight text-[#B73A3A] sm:text-4xl
        md:text-5xl
      "
            >
              Explorez le Québec avec{' '}
              <span className="whitespace-nowrap">
                <BrandName />
              </span>
            </H1>

            {/* barre d’accent, plus fine et plus courte */}
            <div className="mx-auto -mt-1 h-[3px] w-16 rounded-full bg-[#C24A45]" />

            <p id="hero-desc" className="mb-8 font-sans text-base text-secondary sm:text-xl">
              Cartes interactives, itinéraires personnalisés et conseils pour un voyage authentique
              au Canada.
            </p>

            <Link
              href="#planification"
              aria-describedby="hero-desc"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3
                 font-semibold text-white shadow-sm transition hover:shadow-md
                 hover:brightness-105 focus:outline-none focus-visible:ring-2
                 focus-visible:ring-primary/40 active:scale-[0.99]"
            >
              Créer mon itinéraire <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
        {/* Guides Pilier */}
        <section id="guides" className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Guides essentiels
            </H2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary sm:text-xl">
              Découvrez nos guides détaillés pour chaque région et planifiez sereinement votre
              voyage.
            </p>
            {/* Affichage direct sans grid externe */}
            <FeaturedGuides />
          </div>
        </section>
        {/* Destinations */}
        <section id="destinations-populaires" className="bg-surface scroll-mt-24 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Destinations Populaires
            </H2>
            <p className="mb-6 text-lg text-secondary">
              Explorez nos suggestions des lieux incontournables au Québec et au Canada.
            </p>
            <GroupedDestinations /> {/* ← ton nouveau composant dynamique */}
          </div>
        </section>
        {/* Videos */}
        <section id="videos" className="bg-background py-16 text-center">
          <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
            Vos destinations en images
          </H2>
          <p className="mb-6 text-lg text-secondary">Vivez l'expérience avant même de partir.</p>
          <PopularVideos />
        </section>
        {/* Produits / Guides phares */}
        <section id="objets" className="bg-surface py-16">
          <div className="mx-auto max-w-6xl px-6">
            <H2 className="mb-4 text-center font-serif text-4xl font-bold text-primary">
              Produits de voyage indispensables (2025)
            </H2>
            <p className="mb-10 text-center text-lg text-secondary">
              Des choix testés pour voyager plus sereinement : sécurité, confort, organisation… et
              la tranquillité d’esprit qui fait toute la différence.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Avion */}
              <Link
                href="/blog/voyage-avion"
                className="group rounded-2xl border bg-white/50 p-6 transition hover:shadow-sm"
                aria-label="Voir nos indispensables pour voyager en avion"
              >
                <div className="text-2xl font-semibold text-gray-900">✈️ Voyage en avion</div>
                <p className="mt-2 text-gray-700">
                  8 essentiels pour un vol sans stress : écouteurs, oreiller, sac cabine malin,
                  astuces anti-jetlag. Le confort qui change tout.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide avion →
                </div>
              </Link>

              {/* Voiture / longs trajets (inclut VE) */}
              <Link
                href="/blog/voyage-voiture"
                className="group rounded-2xl border bg-white/50 p-6 transition hover:shadow-sm"
                aria-label="Voir nos indispensables pour longs trajets en voiture (inclut VE)"
              >
                <div className="text-2xl font-semibold text-gray-900">
                  🚗 Longs trajets en voiture
                </div>
                <p className="mt-2 text-gray-700">
                  Booster, trousse d’urgence, glacière 12&nbsp;V, compresseur, câbles… et ABRP pour
                  planifier les recharges en VE. Sécurité + autonomie = road-trip zen.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide voiture →
                </div>
              </Link>

              {/* Camping */}
              <Link
                href="/blog/voyage-camping"
                className="group rounded-2xl border bg-white/50 p-6 transition hover:shadow-sm"
                aria-label="Voir nos indispensables pour le camping"
              >
                <div className="text-2xl font-semibold text-gray-900">🏕️ Camping</div>
                <p className="mt-2 text-gray-700">
                  Checklist imprimable, erreurs à éviter, produits malins (éclairage, cuisine,
                  sommeil): simple, pratique, prêt pour le feu de camp.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide camping →
                </div>
              </Link>

              {/* Hôtel */}
              <Link
                href="/blog/voyage-hotel"
                className="group rounded-2xl border bg-white/50 p-6 transition hover:shadow-sm"
                aria-label="Voir nos indispensables pour voyager à l'hôtel"
              >
                <div className="text-2xl font-semibold text-gray-900">🏨 Voyage en hôtel</div>
                <p className="mt-2 text-gray-700">
                  Hygiène, sommeil, organisation: petits objets qui font une grande différence
                  (trousses, rangements, astuces famille).
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide hôtel →
                </div>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/#objets"
                className="inline-flex items-center rounded-lg border px-5 py-2.5 text-sm hover:bg-primary/5"
              >
                Voir tous les produits de voyage →
              </Link>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section id="testimonials" className="bg-surface py-16 text-center">
          <H2 className="mb-4 font-serif text-4xl font-bold text-primary">
            Ils nous ont fait confiance
          </H2>
          <Testimonials />
        </section>
        {/* Offres */}
        <section id="offres" className="bg-background py-16 text-center">
          <Offers />
        </section>
        {/* CTA Blog */}
        <section id="blog" className="bg-surface py-16 text-center">
          <Link href="/#destinations-populaires" className="font-semibold underline">
            Voir tous nos articles sur les plus belles régions du Québec
          </Link>
        </section>
        {/* Producteurs & Chatbot */}
        <Chatbot />
      </main>
    </>
  );
}
