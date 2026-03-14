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
                mb-4 text-balance
                font-serif text-3xl font-bold leading-tight tracking-tight text-[#B73A3A]
                sm:text-4xl md:text-5xl
              "
            >
              Explorez le Québec avec{' '}
              <span className="whitespace-nowrap">
                <BrandName />
              </span>
            </H1>

            <div className="mx-auto -mt-1 h-[3px] w-16 rounded-full bg-[#C24A45]" />

            <p id="hero-desc" className="mb-8 font-sans text-base text-secondary sm:text-xl">
              Cartes interactives, itinéraires personnalisés, producteurs locaux, vidéos et conseils
              concrets pour préparer un voyage authentique au Québec et au Canada.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/planificateur"
                aria-describedby="hero-desc"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.99]"
              >
                Créer mon itinéraire <span aria-hidden>→</span>
              </Link>

              <Link
                href="/#destinations-populaires"
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary/5"
              >
                Explorer les destinations
              </Link>
            </div>
          </div>
        </section>

        {/* Guides piliers */}
        <section id="guides" className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Guides essentiels
            </H2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary sm:text-xl">
              Découvrez nos guides détaillés pour mieux choisir vos destinations, organiser votre
              séjour et voyager plus sereinement.
            </p>
            <FeaturedGuides />
          </div>
        </section>

        {/* Destinations */}
        <section id="destinations-populaires" className="bg-surface scroll-mt-24 py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Destinations populaires
            </H2>
            <p className="mb-6 text-lg text-secondary">
              Explorez nos suggestions de lieux incontournables au Québec et au Canada pour préparer
              une escapade simple, agréable et mémorable.
            </p>
            <GroupedDestinations />
          </div>
        </section>

        {/* Vidéos */}
        <section id="videos" className="bg-background py-16 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
              Vos destinations en images
            </H2>
            <p className="mb-6 text-lg text-secondary">
              Regardez l’ambiance d’un lieu avant même de partir et inspirez-vous pour votre
              prochain parcours.
            </p>
            <PopularVideos />
          </div>
        </section>

        {/* Préparer son voyage */}
        <section id="preparer-voyage" className="bg-surface py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <H2 className="mb-4 font-serif text-4xl font-bold text-primary sm:text-5xl">
                Préparer son voyage simplement
              </H2>
              <p className="mb-10 text-lg text-secondary">
                Guides pratiques, idées utiles, découvertes locales et conseils concrets pour
                organiser un séjour agréable, bien pensé et vraiment vivant.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {/* Avion */}
              <Link
                href="/blog/voyage-avion"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Voir notre guide pour préparer un voyage en avion"
              >
                <div className="text-2xl font-semibold text-gray-900">✈️ Voyage en avion</div>
                <p className="mt-2 text-gray-700">
                  Valise, confort, organisation cabine et astuces utiles pour voyager plus léger et
                  plus sereinement avant le départ.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide avion →
                </div>
              </Link>

              {/* Voiture */}
              <Link
                href="/blog/voyage-voiture"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Voir notre guide pour préparer un voyage en voiture"
              >
                <div className="text-2xl font-semibold text-gray-900">🚗 Voyage en voiture</div>
                <p className="mt-2 text-gray-700">
                  Accessoires, sécurité, organisation, longs trajets et conseils pratiques pour
                  rendre la route plus simple, plus confortable et plus agréable.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide voiture →
                </div>
              </Link>

              {/* Camping */}
              <Link
                href="/blog/voyage-camping"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Voir notre guide pour préparer un voyage camping"
              >
                <div className="text-2xl font-semibold text-gray-900">🏕️ Voyage camping</div>
                <p className="mt-2 text-gray-700">
                  Checklist, erreurs à éviter, équipement utile et petites astuces pour partir bien
                  préparé et profiter d’un séjour nature plus confortable.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide camping →
                </div>
              </Link>

              {/* Hôtel */}
              <Link
                href="/blog/voyage-hotel"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Voir notre guide pour préparer un séjour à l'hôtel"
              >
                <div className="text-2xl font-semibold text-gray-900">🏨 Voyage à l’hôtel</div>
                <p className="mt-2 text-gray-700">
                  Les petits objets qui rendent un séjour plus confortable : hygiène, sommeil,
                  organisation et astuces pratiques pour profiter pleinement du voyage.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir le guide hôtel →
                </div>
              </Link>

              {/* Producteurs */}
              <Link
                href="/producteurs"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Découvrir les producteurs locaux"
              >
                <div className="text-2xl font-semibold text-gray-900">🧺 Producteurs locaux</div>
                <p className="mt-2 text-gray-700">
                  Fromageries, microbrasseries, fermes, marchés et belles haltes gourmandes pour
                  découvrir le territoire autrement pendant votre voyage.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Découvrir les producteurs →
                </div>
              </Link>

              {/* Coups de cœur */}
              <Link
                href="/coups-de-coeur"
                className="group rounded-2xl border bg-white/70 p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label="Voir nos coups de cœur du mois"
              >
                <div className="text-2xl font-semibold text-gray-900">💛 Coups de cœur</div>
                <p className="mt-2 text-gray-700">
                  Nos idées du moment pour vous inspirer : destinations, découvertes locales, haltes
                  marquantes et expériences qu’on aime vraiment.
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Voir les coups de cœur →
                </div>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-primary/5"
              >
                Voir tous les guides de voyage →
              </Link>

              <Link
                href="/planificateur"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Planifier mon itinéraire →
              </Link>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section id="testimonials" className="bg-surface py-16 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <H2 className="mb-4 font-serif text-4xl font-bold text-primary">
              Ils nous ont fait confiance
            </H2>
            <Testimonials />
          </div>
        </section>

        {/* Offres */}
        <section id="offres" className="bg-background py-16 text-center">
          <div className="mx-auto max-w-6xl px-4">
            <Offers />
          </div>
        </section>

        {/* CTA final */}
        <section id="blog" className="bg-surface py-16 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <H2 className="mb-4 font-serif text-3xl font-bold text-primary sm:text-4xl">
              Besoin d’idées pour votre prochain voyage ?
            </H2>
            <p className="mb-6 text-lg text-secondary">
              Explorez nos destinations, préparez votre parcours et ajoutez de belles découvertes
              locales à votre séjour.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#destinations-populaires"
                className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition hover:bg-primary/5"
              >
                Voir les destinations →
              </Link>

              <Link
                href="/producteurs"
                className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition hover:bg-primary/5"
              >
                Voir les producteurs locaux →
              </Link>

              <Link
                href="/planificateur"
                className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-105"
              >
                Ouvrir le planificateur →
              </Link>
            </div>
          </div>
        </section>

        <Chatbot />
      </main>
    </>
  );
}
