import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

/** Bouton d’achat standardisé (affiliation) */
export function BuyCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
    >
      {children} <span aria-hidden>→</span>
    </a>
  );
}

/** Section produit générique (camping, hôtel, etc.) — image intrinsèque, 2 colonnes, zéro rognage */
export type ProductSectionProps = {
  id: string;
  title: string;
  href: string;
  priceText?: string;
  ctaText?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    sizes?: string;
  };
  description?: string;
  pros?: string;
  cons?: string;
  tips?: string;
  scenario?: string;
  className?: string;
};

export function ProductSection({
  id,
  title,
  href,
  priceText,
  ctaText = 'Voir l’offre — livraison rapide',
  image,
  description,
  pros,
  cons,
  tips,
  scenario,
  className = '',
}: ProductSectionProps) {
  const sizes = image.sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px';

  return (
    <section id={id} className={`mb-12 ${className}`}>
      <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
        {/* Colonne image */}
        <div className="md:col-span-5">
          <figure>
            <div className="overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="block h-auto w-full"
                sizes={sizes}
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        </div>

        {/* Colonne contenu */}
        <div className="md:col-span-7">
          <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{title}</H3>

          <div className="flex flex-wrap items-center gap-3 text-gray-700">
            {priceText ? <span className="text-gray-600">Prix : {priceText}</span> : null}
            <BuyCTA href={href}>{ctaText}</BuyCTA>
          </div>

          {description ? <p className="mt-3 text-gray-700">{description}</p> : null}

          {(pros || cons || tips || scenario) && (
            <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
              {pros ? (
                <li>
                  <strong>Avantages :</strong> {pros}
                </li>
              ) : null}
              {cons ? (
                <li>
                  <strong>Inconvénients :</strong> {cons}
                </li>
              ) : null}
              {tips ? (
                <li>
                  <strong>Conseils :</strong> {tips}
                </li>
              ) : null}
              {scenario ? (
                <li>
                  <strong>Scénario idéal :</strong> {scenario}
                </li>
              ) : null}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/** Liens en forme de "chips" pour navigation interne */
export function QuickChips({
  items,
  color = 'blue',
}: {
  items: { href: string; label: string }[];
  color?: 'blue' | 'emerald';
}) {
  const base =
    color === 'emerald'
      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
      : 'bg-blue-50 text-blue-700 hover:bg-blue-100';
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <a key={it.href} href={it.href} className={`rounded-full px-3 py-1 text-sm ${base}`}>
          {it.label}
        </a>
      ))}
    </div>
  );
}

/** Tableau décisionnel 3 colonnes (Profil / Critères / Reco) */
export function DecisionTable({
  rows,
}: {
  rows: { profil: string; criteres: string; reco: React.ReactNode }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-300 text-left text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Profil</th>
            <th className="px-4 py-2">Critères clés</th>
            <th className="px-4 py-2">Notre reco</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2 font-medium">{r.profil}</td>
              <td className="px-4 py-2">{r.criteres}</td>
              <td className="px-4 py-2">{r.reco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** FAQ repliable (SEO + UX), fournie avec items Q/A */
export function FAQ({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <section id="faq" className="mb-12">
      <H2 className="mb-4 text-3xl font-semibold text-gray-900">❓ FAQ</H2>
      {items.map((it, idx) => (
        <details key={idx} className="mb-2 rounded-lg border p-3">
          <summary className="cursor-pointer font-semibold">{it.q}</summary>
          <div className="mt-2 text-gray-700">{it.a}</div>
        </details>
      ))}
    </section>
  );
}

/** Checklist 2 colonnes */
export function Checklist2Col({
  left,
  right,
  title,
}: {
  left: string[];
  right: string[];
  title?: string;
}) {
  return (
    <section id="checklist" className="mb-12">
      {title ? <H2 className="mb-4 text-3xl font-semibold text-gray-900">{title}</H2> : null}
      <div className="grid gap-4 text-gray-700 sm:grid-cols-2">
        <ul className="ml-6 list-disc space-y-2">
          {left.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <ul className="ml-6 list-disc space-y-2">
          {right.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Conclusion avec liens internes */
export function ConclusionLinks({
  items,
  title = '🎯 Conclusion',
}: {
  items: { href: string; label: string }[];
  title?: string;
}) {
  return (
    <section className="mb-12">
      <H2 className="mb-4 text-3xl font-semibold text-gray-900">{title}</H2>
      <div className="mb-4 text-gray-700">
        Bien préparé, tu profites à 100 % du voyage. Va à l’essentiel, solide et adapté — et pars
        l’esprit léger.
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

/** JSON-LD ItemList pour une page qui liste des produits affiliés */
export function ItemListJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: p.url,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

/* ---------------------------------------------
USAGE EXEMPLES (copie/colle dans tes pages)
---------------------------------------------

// CAMPING — section produit
<ProductSection
  id="filtre-waterdrop"
  title="Purificateur d’eau Waterdrop (filtre individuel)"
  href="https://amzn.to/4mPKh4I"
  priceText="~50.99 CAD"
  image={{ src: '/images/produits/purificateur-eau-camping.avif', alt: 'Filtre à eau Waterdrop — portable et léger, idéal pour randonnée et camping au Québec', width: 1200, height: 900, caption: 'Waterdrop : eau plus sûre au camp, sans s’alourdir.' }}
  description="Compact et efficace pour filtrer ruisseaux et lacs, améliore le goût sans alourdir le sac."
  pros="Léger, simple, bon goût."
  cons="Débit plus lent en eau très trouble; non adapté à l’eau salée ni aux virus."
  tips="Préfiltre avec un tissu; backwash après chaque sortie; protège la cartouche du gel."
  scenario="Rando dans la Jacques-Cartier : tu remplis au ruisseau, tu filtres au camp pendant que le feu crépite."
/>

// HOTEL — section produit (ex: adaptateur GaN)
<ProductSection
  id="chargeur-gan-65w"
  title="Adaptateur universel + chargeur GaN 65W"
  href="https://amzn.to/xxxxx"
  priceText="selon l’offre"
  image={{ src: '/images/hotel/gan-65w.avif', alt: 'Chargeur GaN 65W avec adaptateur universel — USB-C PD pour ordinateurs et téléphones', width: 1200, height: 900, caption: 'Un seul bloc, plusieurs appareils.' }}
  description="Un bloc compact qui recharge téléphone, tablette et laptop en même temps."
  pros="Rapide, compact, multi-ports USB-C/USB-A."
  cons="Parfois sans broche de terre; attention aux appareils exigeants."
  tips="Prends 100–240 V et au moins 65W en USB-C PD."
  scenario="Tu recharges tel + laptop pendant la douche; tout est full avant le souper."
/>

// GUIDE D’ACHAT — chips & tableau
<QuickChips items={[
  { href: '#tente-coleman-skydome', label: 'Tente famille' },
  { href: '#matelas-hikenture-double', label: 'Confort duo' },
  { href: '#powerbank-20000', label: 'Énergie 2–3 jours' },
]} />
<DecisionTable rows={[
  { profil: 'Famille / budget', criteres: 'Montage simple • Espace • Pluie', reco: <a href="#tente-coleman-skydome" className="text-blue-600 underline">Coleman Skydome</a> },
  { profil: 'Rando légère', criteres: 'Poids • Compacité • Isolation', reco: <a href="#matelas-gear-doctors" className="text-blue-600 underline">GEAR DOCTORS</a> },
]} />

// FAQ
<FAQ items={[
  { q: 'Faut-il un adaptateur à l’étranger ?', a: <>Oui, choisis un modèle universel (type A/B/C/G, etc.) et vérifie le bi-voltage 100–240 V de tes appareils.</> },
  { q: 'Les batteries sont-elles autorisées en avion ?', a: <>En cabine uniquement pour la plupart des compagnies; vérifie la limite Wh et range les bornes protégées.</> },
]} />

// Conclusion avec liens internes
<ConclusionLinks items={[
  { href: '/voyage/hotel', label: 'Voyage en hôtel' },
  { href: '/voyage/voiture-electrique', label: 'Voyage en voiture électrique' },
  { href: '/voyage/avion', label: 'Voyage en avion' },
]} />

// JSON-LD ItemList depuis une liste
<ItemListJsonLd items={[
  { name: 'Purificateur d’eau Waterdrop', url: 'https://amzn.to/4mPKh4I' },
  { name: 'Power bank 20 000 mAh', url: 'https://www.amazon.ca/dp/B0B9YYZKNL' },
]} />
--------------------------------------------- */
