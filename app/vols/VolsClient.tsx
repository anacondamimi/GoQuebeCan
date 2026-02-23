'use client';

import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import Script from 'next/script';
import { useEffect } from 'react';

export default function VolsClient() {
  /**
   * ✅ Expedia flights link
   * - Mets ton lien affilié dans NEXT_PUBLIC_EXPEDIA_FLIGHTS_URL (recommandé)
   * - Sinon, fallback sur Expedia public
   */
  const EXPEDIA_FLIGHTS_URL =
    (process.env.NEXT_PUBLIC_EXPEDIA_FLIGHTS_URL ?? '').trim() || 'https://www.expedia.ca/Flights';

  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openChat'));
    }
  };
  useEffect(() => {
    // Re-trigger Expedia banner init after hydration (important in Next.js)
    const w = window as any;
    if (w?.EgAffiliateBanners?.init) {
      w.EgAffiliateBanners.init();
    }
  }, []);
  return (
    <div className="mx-auto max-w-6xl space-y-14">
      {/* ─────────────────────────────
         0) PARTENAIRES VOLS (UX friendly)
         ───────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* French Bee */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Compagnie aérienne</p>
              <Image
                src="/images/french-bee-logo.png"
                alt="French Bee – compagnie aérienne"
                width={140}
                height={40}
                className="size-auto"
                priority
              />
              <p className="mt-2 text-sm text-gray-600">
                Bon plan pour comparer et réserver (lien sponsorisé).
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              Direct & simple
            </span>
          </div>

          <a
            rel="sponsored noreferrer"
            href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"
            target="_blank"
            id="2240413"
            className="mt-4 block overflow-hidden rounded-xl border"
          >
            <Image
              src="/images/french-bee-vols-montreal-europe-destinations-soleil.avif"
              alt="Vols French Bee au départ de Montréal vers l’Europe et des destinations soleil"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-72 w-full object-cover object-bottom md:h-80"
            />
          </a>

          {/* Pixel tracking partenaire */}
          <img
            src="https://imp.pxf.io/i/6175749/2240413/25450"
            alt=""
            width="1"
            height="1"
            style={{ position: 'absolute', visibility: 'hidden' }}
          />

          {/* Destinations French Bee */}
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-900">Destinations desservies</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: 'France', to: 'France' },
                { label: 'Espagne', to: 'Spain' },
                { label: 'Algérie', to: 'Algeria' },
                { label: 'Maroc', to: 'Morocco' },
                { label: 'Italie', to: 'Italy' },
                { label: 'Portugal', to: 'Portugal' },
                { label: 'Angleterre', to: 'United Kingdom' },
                { label: 'La Réunion', to: 'Reunion Island' },
              ].map((d) => (
                <a
                  key={d.label}
                  href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"
                  target="_blank"
                  rel="sponsored noreferrer"
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {d.label}
                </a>
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Destinations et itinéraires variables selon la saison et l’aéroport de départ.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              rel="sponsored noreferrer"
              href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"
              target="_blank"
              className="w-full rounded-lg bg-gray-900 px-5 py-3 text-center text-white shadow transition hover:bg-black sm:w-auto"
            >
              Voir les vols French Bee →
            </a>

            <a
              href="#conseils"
              className="w-full rounded-lg border border-gray-200 px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50 sm:w-auto"
            >
              Conseils avant de réserver
            </a>
          </div>
        </div>

        {/* Expedia */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Partenaire vols</p>
              {/* Expedia Affiliate Banner */}
              <p className="mt-2 text-sm text-gray-600">
                Recherche rapide, filtres pratiques, et options flexibles selon tes dates.
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border bg-gray-50 p-4">
                <div
                  className="eg-affiliate-banners"
                  data-program="ca-expedia"
                  data-network="pz"
                  data-layout="leaderboard"
                  data-image="sailing"
                  data-message="ready-takeoff-find-perfect-flight"
                  data-camref="1110lkQdC"
                  data-pubref=""
                  data-link="flights"
                />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Lien sponsorisé — les prix et conditions dépendent des disponibilités.
              </p>

              <Script
                src="https://creator.expediagroup.com/products/banners/assets/eg-affiliate-banners.js"
                strategy="afterInteractive"
                onLoad={() => {
                  console.log('[Expedia] script loaded ✅', (window as any).EgAffiliateBanners);
                  const w = window as any;
                  if (w?.EgAffiliateBanners?.init) w.EgAffiliateBanners.init();
                }}
                onError={() => {
                  console.log('[Expedia] script load FAILED ❌');
                }}
              />
            </div>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Comparateur
            </span>
          </div>

          <div className="mt-4 rounded-xl border p-5">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Compare facilement plusieurs dates</li>
              <li>• Filtre par horaires, escales, prix</li>
              <li>• Options flexibles selon les disponibilités</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row"></div>
        </div>
      </div>

      {/* ─────────────────────────────
         1) HERO
         ───────────────────────────── */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <H1 className="mb-3 text-2xl font-bold text-gray-900">
          ✈️ Vols pas chers & conseils pour voyager en avion
        </H1>

        <p className="mb-6 text-gray-700">
          Comparer les vols, réserver au bon moment et voyager plus sereinement — même si tu prends
          l’avion rarement.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            rel="sponsored noreferrer"
            href={EXPEDIA_FLIGHTS_URL}
            target="_blank"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-white shadow transition hover:bg-blue-700 sm:w-auto"
          >
            Comparer les vols sur Expedia
          </a>

          <a
            rel="noreferrer"
            href="https://www.skyscanner.ca"
            target="_blank"
            className="w-full rounded-lg border border-gray-200 px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50 sm:w-auto"
          >
            Voir aussi sur Skyscanner
          </a>

          <a
            href="#conseils"
            className="w-full rounded-lg border border-gray-200 px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50 sm:w-auto"
          >
            Je voyage rarement — les conseils
          </a>

          <button
            onClick={openChat}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-center text-white shadow transition hover:bg-indigo-700 sm:w-auto"
          >
            Lancer l’assistant GoQuébeCan
          </button>
        </div>
      </section>

      {/* ─────────────────────────────
         2) CONSEILS RÉSERVATION
         ───────────────────────────── */}
      <section id="conseils" className="space-y-4">
        <H2 className="text-xl font-semibold text-gray-900">
          Quand réserver pour payer moins cher
        </H2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">1) Vise le milieu de semaine</p>
            <p className="mt-2 text-gray-700">
              Les prix sont souvent plus intéressants quand tu compares des départs mardi–mercredi,
              plutôt que vendredi–dimanche.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">2) Joue avec ±1 à 3 jours</p>
            <p className="mt-2 text-gray-700">
              Une petite flexibilité sur les dates peut faire une grande différence, surtout en
              haute saison.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">3) Réserve assez tôt (sans paniquer)</p>
            <p className="mt-2 text-gray-700">
              Pour beaucoup de destinations, comparer et réserver plusieurs semaines à l’avance
              donne de meilleurs résultats que d’attendre au dernier moment.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">4) Escale : parfois le meilleur compromis</p>
            <p className="mt-2 text-gray-700">
              Une escale courte peut réduire fortement le prix sans rendre le voyage pénible,
              surtout si tu choisis des correspondances réalistes.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────
         3) COMPARATIFS
         ───────────────────────────── */}
      <section className="space-y-4">
        <H2 className="text-xl font-semibold text-gray-900">
          Comparatifs utiles (rapide à scanner)
        </H2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">Comparateurs</p>
            <p className="mt-2 text-gray-700">
              Idéal pour tester plusieurs dates, itinéraires et compagnies. Utilise 2 comparateurs
              si tu veux valider qu’un “bon prix” est réellement bon.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">Compagnies</p>
            <p className="mt-2 text-gray-700">
              Regarde les règles bagages, le confort et les frais cachés. Parfois un billet “un peu
              plus cher” revient moins cher quand les bagages sont inclus.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">Aéroports</p>
            <p className="mt-2 text-gray-700">
              YUL, YQB, YYZ : selon ta région, changer d’aéroport ou d’horaire peut faire baisser le
              prix (et parfois simplifier les correspondances).
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────
         4) VOYAGEUR OCCASIONNEL + LIEN OBJETS
         ───────────────────────────── */}
      <section className="rounded-2xl bg-yellow-50 p-6 sm:p-8">
        <H2 className="text-xl font-semibold text-gray-900">
          Je prends l’avion rarement : quoi retenir
        </H2>

        <p className="mt-3 text-gray-800">
          Si tu prends l’avion une ou deux fois par année, c’est normal d’avoir un petit stress.
          L’essentiel, c’est d’éviter les erreurs classiques : arriver trop tard, bagage non
          conforme, ou correspondance trop serrée.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog/voyage-avion"
            className="rounded-lg bg-gray-900 px-5 py-3 text-center text-white transition hover:bg-black"
          >
            Voir mes objets indispensables pour l’avion
          </Link>

          <Link
            href="/planificateur"
            className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50"
          >
            Planifier mon itinéraire
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────
         5) POINTS + ASSURANCES
         ───────────────────────────── */}
      <section className="space-y-4">
        <H2 className="text-xl font-semibold text-gray-900">
          Voyager moins cher (et plus sereinement) avec les points et assurances
        </H2>

        <p className="text-gray-700">
          Beaucoup de gens payent encore leurs vols plein tarif, alors qu’ils pourraient réduire la
          facture simplement en optimisant les points. Aeroplan permet de payer un billet d’avion en
          partie ou en totalité avec des points (selon disponibilité). Certaines cartes permettent
          aussi d’accumuler plus vite et de transférer des points vers Aeroplan.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">
              Exemple rapide : gagner des points sans changer tes habitudes
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>Épicerie : jusqu’à 5× les points (selon la catégorie marchande)</li>
              <li>500 $ d’épicerie = environ 2 500 points</li>
              <li>Sur quelques mois, tu peux déjà payer une partie d’un vol</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Astuce : si tu veux accélérer, tu peux concentrer tes achats récurrents sur la bonne
              carte.
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="font-semibold text-gray-900">
              Assurances : le filet de sécurité qui change le voyage
            </p>
            <p className="mt-3 text-gray-700">
              Certaines cartes (ex : Amex Cobalt) incluent des protections voyage. Un point très
              apprécié : en cas de retard important (ex : 4 heures ou plus), il peut y avoir une
              couverture allant jusqu’à environ <strong>500 $ par personne</strong> pour l’hôtel,
              repas et transport — <strong>selon les conditions de la police</strong>. La perte ou
              le retard de bagages peut aussi être couvert.
            </p>
            <p className="mt-3 text-sm text-gray-600">
              Important : toujours vérifier les conditions exactes (admissibilité, plafonds, preuve
              d’achat, etc.).
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-700">
          Si tu veux comprendre concrètement comment transformer tes dépenses du quotidien
          (épicerie, restaurants, achats courants) en billets d’avion moins chers, j’ai préparé un
          guide simple et détaillé.
        </p>

        <Link
          href="/blog/points-aeroplan-amex-cobalt"
          className="mt-2 inline-block font-semibold text-blue-600"
        >
          Lire le guide : accumuler des points et voyager moins cher →
        </Link>

        <div className="rounded-2xl bg-blue-50 p-6">
          <p className="font-semibold text-gray-900">
            Tu veux apprendre à accumuler plus vite et voyager moins cher avec les points ?
          </p>
          <p className="mt-2 text-gray-700">
            Je te montre une méthode simple (épicerie, dépenses du quotidien, transferts de points)
            pour réduire le coût des billets et voyager avec plus de sérénité.
          </p>

          <a
            href="/blog/points-aeroplan-amex-cobalt"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white shadow transition hover:bg-blue-700"
          >
            Découvrir la stratégie points & voyage →
          </a>
        </div>
      </section>

      {/* ─────────────────────────────
         6) SALONS AÉROPORT (Aventura)
         ───────────────────────────── */}
      <section className="space-y-4">
        <H2 className="text-xl font-semibold text-gray-900">
          Salons d’aéroport : confort avant le vol
        </H2>

        <p className="text-gray-700">
          Pour les longues attentes ou les correspondances, les salons d’aéroport changent
          l’expérience : calme, wifi, prises, et souvent collations/boissons. Certaines cartes (ex :
          Visa Aventura Gold / Infinite) offrent des entrées incluses (souvent 4) — pratique pour
          voyager plus sereinement.
        </p>
      </section>

      {/* ─────────────────────────────
         7) LIENS INTERNES / MAILLAGE FINAL
         ───────────────────────────── */}
      <section className="border-t pt-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/planificateur"
            className="rounded-xl border p-5 text-center font-semibold text-blue-600 transition hover:bg-gray-50"
          >
            ✈️ Planifier mon itinéraire
          </Link>

          <Link
            href="/blog/voyage-avion"
            className="rounded-xl border p-5 text-center font-semibold text-blue-600 transition hover:bg-gray-50"
          >
            🎒 Objets indispensables (avion)
          </Link>

          <Link
            href="/producteurs"
            className="rounded-xl border p-5 text-center font-semibold text-blue-600 transition hover:bg-gray-50"
          >
            🧀 Découvrir les producteurs québécois
          </Link>
        </div>
      </section>
    </div>
  );
}
