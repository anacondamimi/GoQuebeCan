import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';

export const metadata: Metadata = {
  title: 'Coup de cœur du mois : AnamimiZen | Bien-être & accompagnement humain',
  description:
    'Coup de cœur GoQuébeCan : AnamimiZen propose un accompagnement doux et accessible combinant soins LaHoChi et psychologie positive, particulièrement adapté aux personnes en surcharge mentale.',
  alternates: { canonical: '/coups-de-coeur/anamimizen' },
  robots: { index: true, follow: true },
};

export default function CoupDeCoeurAnamimiZenPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO / ÉDITORIAL */}
      <header className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm">
        {/* Fond graphique subtil */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-[#e11d48]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[#8b5cf6]/10 blur-3xl" />
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          {/* Colonne gauche */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Éditorial GoQuébeCan
              </span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#e11d48]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#e11d48]">
                <span aria-hidden>❤️</span>
                Coup de cœur du mois
              </span>
            </div>

            <div className="mt-4">
              <H1>
                AnamimiZen{' '}
                <span className="text-gray-500">
                  : un accompagnement bien-être humain et rassurant
                </span>
              </H1>
            </div>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Chez <BrandName />, nous aimons comprendre ce que nous recommandons. Après avoir
              échangé longuement sur sa démarche — et observé comment se déroule un accompagnement —
              nous avons trouvé l’approche d’AnamimiZen cohérente, humaine et accessible.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://anamimizen.com"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                Découvrir AnamimiZen
              </a>

              <Link
                href="/coups-de-coeur"
                className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                Retour aux coups de cœur
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border bg-white/70 p-4">
              <p className="text-sm text-gray-800">
                Transparence : lien externe vers AnamimiZen (site partenaire mis en avant dans notre
                série éditoriale).
              </p>
            </div>
          </div>

          {/* Colonne droite : image */}
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border bg-gray-50 md:h-80">
            <Image
              src="/images/offers/anamimizen.avif"
              alt="AnamimiZen — Coup de cœur GoQuébeCan"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* SECTION : VOIX DE LA THÉRAPEUTE */}
      <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e11d48]/10 text-[#e11d48]">
            💬
          </div>

          <div>
            <p className="text-base italic leading-relaxed text-gray-800">
              « Mon objectif est d’offrir un espace où l’on peut simplement déposer ce qui pèse. Les
              soins LaHoChi et les outils de psychologie positive aident à relâcher la pression
              mentale, à apaiser le stress et à retrouver plus de clarté intérieure, chacun à son
              rythme. »
            </p>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              — AnamimiZen, thérapeute bien-être
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Extrait d’un échange réalisé par GoQuébeCan
            </p>
          </div>
        </div>
      </section>

      {/* SECTIONS INFORMATIVES */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <H2>Ce que vivent souvent les gens</H2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>Surcharge mentale et fatigue émotionnelle</li>
            <li>Stress persistant, difficulté à décrocher</li>
            <li>Impression de tenir sans vraiment souffler</li>
            <li>Besoin de calme, de clarté et de recentrage</li>
          </ul>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <H2>Pourquoi nous recommandons</H2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            L’approche proposée par AnamimiZen est simple et respectueuse. Elle ne promet pas de
            solution miracle, mais offre un cadre sécurisant pour relâcher la pression et avancer à
            son rythme.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
          <H2>L’approche</H2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>
              <span className="font-semibold">LaHoChi</span> : détente, apaisement, relâchement
            </li>
            <li>
              <span className="font-semibold">Psychologie positive</span> : clarté, forces,
              confiance
            </li>
            <li>
              <span className="font-semibold">Cadre humain</span> : écoute, douceur, respect du
              rythme
            </li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-10 rounded-3xl border bg-white p-6 text-center shadow-sm">
        <H3>Envie d’en savoir plus ?</H3>
        <p className="mt-2 text-sm text-gray-700">
          Découvrir l’approche d’AnamimiZen ou poser une première question.
        </p>

        <div className="mt-4">
          <a
            href="https://anamimizen.com"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Aller sur AnamimiZen
          </a>
        </div>
      </section>
    </main>
  );
}
