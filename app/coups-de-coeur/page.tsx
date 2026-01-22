import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import BrandName from '@/components/brand/BrandName';

export const metadata: Metadata = {
  title: 'Coups de cœur GoQuébeCan | Entrepreneurs locaux recommandés',
  description:
    'Chaque mois, GoQuébeCan met en lumière un entrepreneur local : des projets humains, utiles, et alignés avec l’esprit du Québec authentique.',
  alternates: { canonical: '/coups-de-coeur' },
  robots: { index: true, follow: true },
};

export default function CoupsDeCoeurPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-600">
          Série éditoriale
        </p>

        <div className="mt-2">
          <H1>
            Coups de cœur <BrandName />
          </H1>
        </div>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          On aime voyager, mais on aime aussi ce qui rend le Québec vivant : des gens passionnés,
          des projets sincères, des services qui font du bien. Ici, on met en avant des
          entrepreneurs locaux qu’on recommande pour leur approche et leur sérieux.
        </p>
      </header>

      <section className="mt-8 grid gap-6">
        <article className="grid gap-6 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2">
          {/* Colonne gauche : texte */}
          <div className="flex flex-col justify-center">
            <H2>Coup de cœur du mois : AnamimiZen</H2>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Un accompagnement doux (LaHoChi + psychologie positive) pour souffler, se recentrer et
              retrouver un meilleur équilibre quand la charge mentale prend trop de place.
            </p>

            <div className="mt-5">
              <Link
                href="/coups-de-coeur/anamimizen"
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Lire le coup de cœur
              </Link>
            </div>
          </div>

          {/* Colonne droite : image */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/offers/anamimizen.avif"
              alt="AnamimiZen – Coup de cœur GoQuébeCan"
              fill
              className="object-cover"
              priority
            />
          </div>
        </article>
      </section>
    </main>
  );
}
