[1mdiff --git a/app/vols/VolsClient.tsx b/app/vols/VolsClient.tsx[m
[1mindex f8c8595..3aa64a4 100644[m
[1m--- a/app/vols/VolsClient.tsx[m
[1m+++ b/app/vols/VolsClient.tsx[m
[36m@@ -4,48 +4,194 @@[m [mimport Image from 'next/image';[m
 import Link from 'next/link';[m
 import H1 from '@/components/typography/H1';[m
 import H2 from '@/components/typography/H2';[m
[32m+[m[32mimport Script from 'next/script';[m
[32m+[m[32mimport { useEffect } from 'react';[m
 [m
 export default function VolsClient() {[m
[32m+[m[32m  /**[m
[32m+[m[32m   * ✅ Expedia flights link[m
[32m+[m[32m   * - Mets ton lien affilié dans NEXT_PUBLIC_EXPEDIA_FLIGHTS_URL (recommandé)[m
[32m+[m[32m   * - Sinon, fallback sur Expedia public[m
[32m+[m[32m   */[m
[32m+[m[32m  const EXPEDIA_FLIGHTS_URL =[m
[32m+[m[32m    (process.env.NEXT_PUBLIC_EXPEDIA_FLIGHTS_URL ?? '').trim() || 'https://www.expedia.ca/Flights';[m
[32m+[m
   const openChat = () => {[m
     if (typeof window !== 'undefined') {[m
       window.dispatchEvent(new Event('openChat'));[m
     }[m
   };[m
[31m-[m
[32m+[m[32m  useEffect(() => {[m
[32m+[m[32m    // Re-trigger Expedia banner init after hydration (important in Next.js)[m
[32m+[m[32m    const w = window as any;[m
[32m+[m[32m    if (w?.EgAffiliateBanners?.init) {[m
[32m+[m[32m      w.EgAffiliateBanners.init();[m
[32m+[m[32m    }[m
[32m+[m[32m  }, []);[m
   return ([m
     <div className="mx-auto max-w-6xl space-y-14">[m
       {/* ─────────────────────────────[m
[31m-         0) BANNIÈRE PARTENAIRE (French Bee)[m
[32m+[m[32m         0) PARTENAIRES VOLS (UX friendly)[m
          ───────────────────────────── */}[m
[31m-      <div className="text-center">[m
[31m-        <a[m
[31m-          rel="sponsored noreferrer"[m
[31m-          href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"[m
[31m-          target="_blank"[m
[31m-          id="2240413"[m
[31m-        >[m
[31m-          <Image[m
[31m-            src="/images/frenchbee.avif"[m
[31m-            alt="Vol Montréal–Paris à prix compétitif — French Bee"[m
[31m-            width={280}[m
[31m-            height={280}[m
[31m-            className="mx-auto rounded-xl shadow-md transition-transform hover:scale-105"[m
[31m-            priority[m
[32m+[m[32m      <div className="grid gap-6 md:grid-cols-2">[m
[32m+[m[32m        {/* French Bee */}[m
[32m+[m[32m        <div className="rounded-2xl border bg-white p-6 shadow-sm">[m
[32m+[m[32m          <div className="flex items-start justify-between gap-3">[m
[32m+[m[32m            <div>[m
[32m+[m[32m              <p className="text-sm font-semibold text-gray-900">Compagnie aérienne</p>[m
[32m+[m[32m              <Image[m
[32m+[m[32m                src="/images/french-bee-logo.png"[m
[32m+[m[32m                alt="French Bee – compagnie aérienne"[m
[32m+[m[32m                width={140}[m
[32m+[m[32m                height={40}[m
[32m+[m[32m                className="size-auto"[m
[32m+[m[32m                priority[m
[32m+[m[32m              />[m
[32m+[m[32m              <p className="mt-2 text-sm text-gray-600">[m
[32m+[m[32m                Bon plan pour comparer et réserver (lien sponsorisé).[m
[32m+[m[32m              </p>[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">[m
[32m+[m[32m              Direct & simple[m
[32m+[m[32m            </span>[m
[32m+[m[32m          </div>[m
[32m+[m
[32m+[m[32m          <a[m
[32m+[m[32m            rel="sponsored noreferrer"[m
[32m+[m[32m            href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"[m
[32m+[m[32m            target="_blank"[m
[32m+[m[32m            id="2240413"[m
[32m+[m[32m            className="mt-4 block overflow-hidden rounded-xl border"[m
[32m+[m[32m          >[m
[32m+[m[32m            <Image[m
[32m+[m[32m              src="/images/french-bee-vols-montreal-europe-destinations-soleil.avif"[m
[32m+[m[32m              alt="Vols French Bee au départ de Montréal vers l’Europe et des destinations soleil"[m
[32m+[m[32m              width={1600}[m
[32m+[m[32m              height={900}[m
[32m+[m[32m              priority[m
[32m+[m[32m              sizes="(max-width: 768px) 100vw, 50vw"[m
[32m+[m[32m              className="h-72 w-full object-cover object-bottom md:h-80"[m
[32m+[m[32m            />[m
[32m+[m[32m          </a>[m
[32m+[m
[32m+[m[32m          {/* Pixel tracking partenaire */}[m
[32m+[m[32m          <img[m
[32m+[m[32m            src="https://imp.pxf.io/i/6175749/2240413/25450"[m
[32m+[m[32m            alt=""[m
[32m+[m[32m            width="1"[m
[32m+[m[32m            height="1"[m
[32m+[m[32m            style={{ position: 'absolute', visibility: 'hidden' }}[m
           />[m
[31m-        </a>[m
[31m-[m
[31m-        {/* Pixel tracking partenaire */}[m
[31m-        <img[m
[31m-          src="https://imp.pxf.io/i/6175749/2240413/25450"[m
[31m-          alt=""[m
[31m-          width="1"[m
[31m-          height="1"[m
[31m-          style={{ position: 'absolute', visibility: 'hidden' }}[m
[31m-        />[m
[31m-[m
[31m-        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">[m
[31m-          Offres partenaires : clique pour voir les tarifs actuels (lien sponsorisé).[m
[31m-        </p>[m
[32m+[m
[32m+[m[32m          {/* Destinations French Bee */}[m
[32m+[m[32m          <div className="mt-4">[m
[32m+[m[32m            <p className="text-sm font-semibold text-gray-900">Destinations desservies</p>[m
[32m+[m
[32m+[m[32m            <div className="mt-2 flex flex-wrap gap-2">[m
[32m+[m[32m              {[[m
[32m+[m[32m                { label: 'France', to: 'France' },[m
[32m+[m[32m                { label: 'Espagne', to: 'Spain' },[m
[32m+[m[32m                { label: 'Algérie', to: 'Algeria' },[m
[32m+[m[32m                { label: 'Maroc', to: 'Morocco' },[m
[32m+[m[32m                { label: 'Italie', to: 'Italy' },[m
[32m+[m[32m                { label: 'Portugal', to: 'Portugal' },[m
[32m+[m[32m                { label: 'Angleterre', to: 'United Kingdom' },[m
[32m+[m[32m                { label: 'La Réunion', to: 'Reunion Island' },[m
[32m+[m[32m              ].map((d) => ([m
[32m+[m[32m                <a[m
[32m+[m[32m                  key={d.label}[m
[32m+[m[32m                  href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"[m
[32m+[m[32m                  target="_blank"[m
[32m+[m[32m                  rel="sponsored noreferrer"[m
[32m+[m[32m                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"[m
[32m+[m[32m                >[m
[32m+[m[32m                  {d.label}[m
[32m+[m[32m                </a>[m
[32m+[m[32m              ))}[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <p className="mt-2 text-xs text-gray-500">[m
[32m+[m[32m              Destinations et itinéraires variables selon la saison et l’aéroport de départ.[m
[32m+[m[32m            </p>[m
[32m+[m[32m          </div>[m
[32m+[m
[32m+[m[32m          <div className="mt-5 flex flex-col gap-3 sm:flex-row">[m
[32m+[m[32m            <a[m
[32m+[m[32m              rel="sponsored noreferrer"[m
[32m+[m[32m              href="https://frenchbeefr.pxf.io/c/6175749/2240413/25450"[m
[32m+[m[32m              target="_blank"[m
[32m+[m[32m              className="w-full rounded-lg bg-gray-900 px-5 py-3 text-center text-white shadow transition hover:bg-black sm:w-auto"[m
[32m+[m[32m            >[m
[32m+[m[32m              Voir les vols French Bee →[m
[32m+[m[32m            </a>[m
[32m+[m
[32m+[m[32m            <a[m
[32m+[m[32m              href="#conseils"[m
[32m+[m[32m              className="w-full rounded-lg border border-gray-200 px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50 sm:w-auto"[m
[32m+[m[32m            >[m
[32m+[m[32m              Conseils avant de réserver[m
[32m+[m[32m            </a>[m
[32m+[m[32m          </div>[m
[32m+[m[32m        </div>[m
[32m+[m
[32m+[m[32m        {/* Expedia */}[m
[32m+[m[32m        <div className="rounded-2xl border bg-white p-6 shadow-sm">[m
[32m+[m[32m          <div className="flex items-start justify-between gap-3">[m
[32m+[m[32m            <div>[m
[32m+[m[32m              <p className="text-sm font-semibold text-gray-900">Partenaire vols</p>[m
[32m+[m[32m              {/* Expedia Affiliate Banner */}[m
[32m+[m[32m              <p className="mt-2 text-sm text-gray-600">[m
[32m+[m[32m                Recherche rapide, filtres pratiques, et options flexibles selon tes dates.[m
[32m+[m[32m              </p>[m
[32m+[m
[32m+[m[32m              <div className="mt-4 overflow-hidden rounded-xl border bg-gray-50 p-4">[m
[32m+[m[32m                <div[m
[32m+[m[32m                  className="eg-affiliate-banners"[m
[32m+[m[32m                  data-program="ca-expedia"[m
[32m+[m[32m                  data-network="pz"[m
[32m+[m[32m                  data-layout="leaderboard"[m
[32m+[m[32m                  data-image="sailing"[m
[32m+[m[32m                  data-message="ready-takeoff-find-perfect-flight"[m
[32m+[m[32m                  data-camref="1110lkQdC"[m
[32m+[m[32m                  data-pubref=""[m
[32m+[m[32m                  data-link="flights"[m
[32m+[m[32m                />[m
[32m+[m[32m              </div>[m
[32m+[m
[32m+[m[32m              <p className="mt-3 text-xs text-gray-500">[m
[32m+[m[32m                Lien sponsorisé — les prix et conditions dépendent des disponibilités.[m
[32m+[m[32m              </p>[m
[32m+[m
[32m+[m[32m              <Script[m
[32m+[m[32m                src="https://creator.expediagroup.com/products/banners/assets/eg-affiliate-banners.js"[m
[32m+[m[32m                strategy="afterInteractive"[m
[32m+[m[32m                onLoad={() => {[m
[32m+[m[32m                  console.log('[Expedia] script loaded ✅', (window as any).EgAffiliateBanners);[m
[32m+[m[32m                  const w = window as any;[m
[32m+[m[32m                  if (w?.EgAffiliateBanners?.init) w.EgAffiliateBanners.init();[m
[32m+[m[32m                }}[m
[32m+[m[32m                onError={() => {[m
[32m+[m[32m                  console.log('[Expedia] script load FAILED ❌');[m
[32m+[m[32m                }}[m
[32m+[m[32m              />[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">[m
[32m+[m[32m              Comparateur[m
[32m+[m[32m            </span>[m
[32m+[m[32m          </div>[m
[32m+[m
[32m+[m[32m          <div className="mt-4 rounded-xl border p-5">[m
[32m+[m[32m            <ul className="space-y-2 text-sm text-gray-700">[m
[32m+[m[32m              <li>• Compare facilement plusieurs dates</li>[m
[32m+[m[32m              <li>• Filtre par horaires, escales, prix</li>[m
[32m+[m[32m              <li>• Options flexibles selon les disponibilités</li>[m
[32m+[m[32m            </ul>[m
[32m+[m[32m          </div>[m
[32m+[m
[32m+[m[32m          <div className="mt-5 flex flex-col gap-3 sm:flex-row"></div>[m
[32m+[m[32m        </div>[m
       </div>[m
 [m
       {/* ─────────────────────────────[m
[36m@@ -64,11 +210,20 @@[m [mexport default function VolsClient() {[m
         <div className="flex flex-col gap-3 sm:flex-row">[m
           <a[m
             rel="sponsored noreferrer"[m
[31m-            href="https://www.skyscanner.ca"[m
[32m+[m[32m            href={EXPEDIA_FLIGHTS_URL}[m
             target="_blank"[m
             className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-white shadow transition hover:bg-blue-700 sm:w-auto"[m
           >[m
[31m-            Comparer les vols maintenant[m
[32m+[m[32m            Comparer les vols sur Expedia[m
[32m+[m[32m          </a>[m
[32m+[m
[32m+[m[32m          <a[m
[32m+[m[32m            rel="noreferrer"[m
[32m+[m[32m            href="https://www.skyscanner.ca"[m
[32m+[m[32m            target="_blank"[m
[32m+[m[32m            className="w-full rounded-lg border border-gray-200 px-5 py-3 text-center text-gray-900 transition hover:bg-gray-50 sm:w-auto"[m
[32m+[m[32m          >[m
[32m+[m[32m            Voir aussi sur Skyscanner[m
           </a>[m
 [m
           <a[m
[36m@@ -197,7 +352,7 @@[m [mexport default function VolsClient() {[m
       </section>[m
 [m
       {/* ─────────────────────────────[m
[31m-         5) SECTION 6 — POINTS + ASSURANCES (développée)[m
[32m+[m[32m         5) POINTS + ASSURANCES[m
          ───────────────────────────── */}[m
       <section className="space-y-4">[m
         <H2 className="text-xl font-semibold text-gray-900">[m
[36m@@ -244,6 +399,7 @@[m [mexport default function VolsClient() {[m
             </p>[m
           </div>[m
         </div>[m
[32m+[m
         <p className="mt-4 text-gray-700">[m
           Si tu veux comprendre concrètement comment transformer tes dépenses du quotidien[m
           (épicerie, restaurants, achats courants) en billets d’avion moins chers, j’ai préparé un[m
[36m@@ -257,7 +413,6 @@[m [mexport default function VolsClient() {[m
           Lire le guide : accumuler des points et voyager moins cher →[m
         </Link>[m
 [m
[31m-        {/* CTA affiliation / parrainage (à remplacer par ton lien) */}[m
         <div className="rounded-2xl bg-blue-50 p-6">[m
           <p className="font-semibold text-gray-900">[m
             Tu veux apprendre à accumuler plus vite et voyager moins cher avec les points ?[m
[1mdiff --git a/next.config.mjs b/next.config.mjs[m
[1mindex e776f3d..938da15 100644[m
[1m--- a/next.config.mjs[m
[1m+++ b/next.config.mjs[m
[36m@@ -7,11 +7,11 @@[m
 // 🛡️ Content Security Policy[m
 const CONTENT_SECURITY_POLICY = `[m
   default-src 'self';[m
[31m-  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;[m
[32m+[m[32m  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://creator.expediagroup.com;[m
   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;[m
[31m-  img-src * blob: data:;[m
[32m+[m[32m  img-src * blob: data:https://creator.expediagroup.com https://*.expediagroup.com https://*.expedia.com;[m
   font-src 'self' https://fonts.gstatic.com;[m
[31m-  connect-src *;[m
[32m+[m[32m  connect-src 'self' https://creator.expediagroup.com https://*.expediagroup.com https://*.expedia.com;[m
   frame-src https://www.youtube.com https://player.vimeo.com;[m
   media-src *;[m
   object-src 'none';[m
[1mdiff --git a/public/images/frenchbee.avif b/public/images/frenchbee.avif[m
[1mdeleted file mode 100644[m
[1mindex 53f16e6..0000000[m
Binary files a/public/images/frenchbee.avif and /dev/null differ
