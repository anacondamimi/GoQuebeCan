'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export default function BlogArticleVoyageCamping() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Les Meilleurs Accessoires pour le Camping au Québec | Guide 2025',
    description:
      "Découvrez les accessoires de camping incontournables en 2025 au Canada : comparatif de tentes, matelas, lampes, réchauds, avec conseils, guide d'achat et checklist imprimable.",
    datePublished: '2025-06-24',
    dateModified: '2025-09-24',
    publisher: {
      '@type': 'Organization',
      name: 'GoQuébeCan',
    },
  };
  const PRODUCTS = [
    {
      id: 'tente-coleman-skydome',
      cat: 'Tente',
      title: 'Tente Coleman Skydome',
      url: 'https://amzn.to/45RnK1F',
    },
    {
      id: 'filtre-waterdrop',
      cat: 'Purificateur d’eau',
      title: "Purificateur d'eau Waterdrop (filtre individuel)",
      url: 'https://amzn.to/4mPKh4I',
    },
    {
      id: 'matelas-gear-doctors',
      cat: 'Matelas',
      title: 'Matelas de camping GEAR DOCTORS',
      url: 'https://amzn.to/4m2w43q',
    },
    {
      id: 'matelas-hikenture-double',
      cat: 'Matelas',
      title: 'Matelas Hikenture double auto-gonflant',
      url: 'https://amzn.to/4nfVIm5',
    },
    {
      id: 'rechaud-camping',
      cat: 'Réchaud',
      title: 'Réchaud de camping / randonnée / pêche',
      url: 'https://amzn.to/4mSwSJp',
    },
    {
      id: 'chaise-pliante',
      cat: 'Chaise pliante',
      title: 'Chaise de camping pliante (type Trekology)',
      url: 'https://amzn.to/4gbrZZo',
    },
    {
      id: 'frontale-1200lm',
      cat: 'Éclairage',
      title: 'Lampe frontale 1200 lumens (camping/rando/pêche)',
      url: 'https://amzn.to/3HU7ALH',
    },
    {
      id: 'powerbank-20000',
      cat: 'Énergie',
      title: 'Chargeur de batteries portable 20 000 mAh',
      url: 'https://amzn.to/4pikrYN',
    },
  ];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: p.url,
    })),
  };
  function BuyCTA({ href, children }: { href: string; children: React.ReactNode }) {
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

  return (
    <>
      <Head>
        <title>Les Meilleurs Accessoires pour le Camping au Québec | Guide 2025</title>
        <meta
          name="description"
          content="Découvrez les accessoires de camping incontournables en 2025 au Canada : comparatif de tentes, matelas, lampes, réchauds, avec conseils, guide d'achat et checklist imprimable."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12 text-center">
          <H1 className="mb-4">Les Meilleurs Accessoires pour le Camping au Québec en 2025</H1>
          <p className="text-xl leading-relaxed text-gray-700">
            Camper au Québec, c’est s’offrir une parenthèse de nature pure. Mais pour en profiter
            pleinement, encore faut-il être bien équipé. Que vous soyez en tente, en van ou en
            roulotte, voici le guide ultime des accessoires de camping à ne pas oublier.
          </p>
        </header>

        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            Pourquoi ces accessoires sont-ils essentiels ?
          </H2>
          <p className="mb-4 text-gray-700">
            Le camping peut rapidement devenir inconfortable sans les bons outils. Froid nocturne,
            repas impossibles à cuisiner, matelas trop fin, éclairage insuffisant… autant d’erreurs
            évitables grâce à un bon équipement.
          </p>
          <p className="text-gray-700">
            Chaque produit présenté ici a été sélectionné pour son utilité concrète, sa durabilité,
            et son bon rapport qualité-prix au Canada.
          </p>
        </section>

        <section className="mb-12">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-left text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Catégorie</th>
                  <th className="px-4 py-2">Modèle</th>
                  <th className="px-4 py-2">Article</th>
                  <th className="px-4 py-2">Offre</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{p.cat}</td>
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">
                      <a href={`#${p.id}`} className="text-blue-600 underline">
                        Voir l’article
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Voir l’offre
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12" id="comparatif-tentes">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            Comment choisir sa tente en 30 s
          </H2>
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
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Budget / famille</td>
                  <td className="px-4 py-2">Montage simple • Espace • Pluie</td>
                  <td className="px-4 py-2">
                    <a href="#tente-coleman-skydome" className="text-blue-600 underline">
                      Tente Coleman Skydome
                    </a>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Pluie + vent</td>
                  <td className="px-4 py-2">Arceaux solides • Double-toit bien tendu</td>
                  <td className="px-4 py-2">
                    <a href="#tente-coleman-skydome" className="text-blue-600 underline">
                      Conseils montage
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Les prix varient : consulte l’offre pour le tarif et la dispo à jour.
          </p>
        </section>

        {/* Produit 1 */}
        <section id="tente-coleman-skydome" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/tente-coleman-skydome.avif"
                    alt="Tente Coleman Skydome — dôme 3-saisons, montage rapide, idéale pour camping familial au Québec"
                    width={1200} // mets ici le ratio réel si tu le connais (ex: 1200x1200 si image carrée)
                    height={900} // ex: si l’image est 4:3, mets 1200x900
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Coleman Skydome : valeur sûre pour 2–3 nuits, météo variable.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Tente Coleman Skydome
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <strong>Prix :</strong> ~299 CAD
                <BuyCTA href="https://amzn.to/45RnK1F">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Tente simple et efficace pour le camping familial, résistante à la pluie, avec bonne
                aération.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Prix, facilité de montage.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Moins adaptée au vent fort.
                </li>
                <li>
                  <strong>Conseils :</strong> Ajouter une bâche de sol pour renforcer l'étanchéité.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Camping familial ou estival.
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* Produit 2 */}
        <section id="filtre-waterdrop" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/purificateur-eau-camping.avif"
                    alt="Filtre à eau Waterdrop — portable et léger, idéal pour randonnée et camping au Québec"
                    width={1200} // mets ici le ratio réel si tu le connais (ex: 1200x1200 si image carrée)
                    height={900} // ex: si l’image est 4:3, mets 1200x900
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>

                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Waterdrop : eau plus sûre au camp, sans s’alourdir.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Purificateur d’eau Waterdrop (filtre individuel)
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~50.99 CAD</span>
                <BuyCTA href="https://amzn.to/4mPKh4I">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Compact et efficace pour filtrer ruisseaux et lacs, améliore le goût et te rend
                autonome sans alourdir le sac.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Léger, simple, bon goût.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Débit plus lent en eau très trouble; non adapté à
                  l’eau salée ni aux virus.
                </li>
                <li>
                  <strong>Conseils :</strong> Préfiltre avec un tissu; backwash après chaque sortie;
                  protège la cartouche du gel.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Rando dans la Jacques-Cartier : tu remplis au
                  ruisseau, tu filtres au camp pendant que le feu crépite.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 3 : Matelas de camping GEAR DOCTORS */}
        <section id="matelas-gear-doctors" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/matelas-doctors-mince.avif"
                    alt="Matelas de camping GEAR DOCTORS — gonflable léger et compact pour randonnée, isolation 2 saisons"
                    width={1200} // ajuste ces valeurs au vrai ratio de l'image (ex: 1200x900 si 4:3)
                    height={800}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Confort notable pour un poids maîtrisé — parfait en rando bivouac.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Matelas de camping GEAR DOCTORS
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~41.99 CAD</span>
                <BuyCTA href="https://amzn.to/4m2w43q">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Ultraléger, compact et isolant : une base simple et efficace pour mieux dormir sous
                la tente.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Poids plume, prix doux, garantie de remplacement à
                  vie.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Un peu bruyant lorsqu’on bouge.
                </li>
                <li>
                  <strong>Conseils :</strong> Idéal 2 saisons; ajoute une fine mousse si le sol est
                  froid/rocaille.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Camping itinérant ou minimaliste.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 4 : Hikenture double auto-gonflant */}
        <section id="matelas-hikenture-double" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/matelas-Hikenture-double.avif"
                    alt="Matelas de camping double Hikenture — auto-gonflant, confortable et pratique pour couple ou famille en tente"
                    width={1200} // ajuste au ratio réel (ex: 1200x900 si 4:3)
                    height={900}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Le confort duo au camp de base — installation simple.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Matelas Hikenture double auto-gonflant
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~89.99 CAD</span>
                <BuyCTA href="https://amzn.to/4nfVIm5">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Matelas confortable et pratique pour deux personnes. Bon compromis entre confort et
                encombrement.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Grand format, facile à gonfler.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Plus encombrant plié.
                </li>
                <li>
                  <strong>Conseils :</strong> Bien rouler pour expulser l’air; prévoir un sac large.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Camping en voiture, en famille ou en couple.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 5 : Réchaud de camping / randonnée / pêche */}
        <section id="rechaud-camping" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/rechaud-de-camping.avif"
                    alt="Réchaud de camping compact — chauffe rapide pour café et repas simples en randonnée et à la pêche"
                    width={1200} // ajuste au vrai ratio si besoin (ex: 1200x900 pour 4:3)
                    height={900}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Café en 2 minutes — moral +10 au réveil.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Réchaud de camping / randonnée / pêche
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~79.95 CAD</span>
                <BuyCTA href="https://amzn.to/4mSwSJp">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Réchaud compact et ultra-rapide : fait bouillir l’eau en moins de 2 minutes, même
                par temps froid.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Vitesse, efficacité, format tout-en-un.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Moins polyvalent pour la vraie cuisine (sautés,
                  sauces).
                </li>
                <li>
                  <strong>Conseils :</strong> Utilise une cartouche compatible, abrite du vent, ne
                  laisse jamais sans surveillance.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Rando rapide, pêche au bord du lac, repas
                  lyophilisés.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 6 : Chaise de camping pliante */}
        <section id="chaise-pliante" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/chaise-camping-soccer.avif"
                    alt="Chaise de camping pliante — compacte et légère, assise basse stable pour feu de camp et match de soccer"
                    width={1200} // 3:2 recommandé si ton fichier est 600x400 → 1200x800
                    height={800}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Compacte et étonnamment stable — parfaite autour du feu ou au match.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Chaise de camping pliante
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~47.99 CAD</span>
                <BuyCTA href="https://amzn.to/4gbrZZo">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Chaise pliable ultra-légère et rapide à monter, idéale pour le camping, la pêche et
                les matchs de soccer.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Ultra-compacte, légère, montage express.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Assise basse; peut s’enfoncer sur sol meuble.
                </li>
                <li>
                  <strong>Conseils :</strong> Utilise des plaquettes/patins sur sable ou terrain
                  boueux; range-la au sec.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Fin d’après-midi en Gaspésie, face au coucher de
                  soleil, juste à la bonne hauteur pour profiter du feu et des étoiles.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 7 : Lampe frontale 1200 lumens */}
        <section id="frontale-1200lm" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/lampe-frontal.avif"
                    alt="Lampe frontale 1200 lumens — faisceau réglable IPX4, idéale pour camping, randonnée et pêche de nuit"
                    width={1200} // adapte au ratio réel si besoin (ex : 1200x800 pour 3:2)
                    height={800}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  Mains libres au camp — confort et sécurité la nuit.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Lampe frontale 1200 lumens pour camping, randonnée, pêche
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~25.99 CAD</span>
                <BuyCTA href="https://amzn.to/3HU7ALH">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Puissante, résistante aux intempéries (IPX4) et endurante : parfaite pour les
                sorties prolongées.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> Polyvalente, puissance réglable, mode nuit.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Peut manquer un peu de puissance à pleine vitesse
                  de marche.
                </li>
                <li>
                  <strong>Conseils :</strong> Emporte des piles/batteries de rechange; nettoie les
                  contacts périodiquement.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Randonnée nocturne, montage de tente après le
                  coucher du soleil, camping sauvage.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Produit 8 : Chargeur de batteries portable (Power Bank 20 000 mAh) */}
        <section id="powerbank-20000" className="mb-12">
          <div className="grid items-start gap-4 sm:gap-6 md:grid-cols-12">
            {/* Colonne image */}
            <div className="md:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/images/produits/chargeur-batterie.avif"
                    alt="Batterie externe 20 000 mAh — affichage du pourcentage et lampe intégrée, idéale pour le camping"
                    width={1200} // ajuste au ratio réel si besoin (ex: 1200x800 pour 3:2)
                    height={800}
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <figcaption className="mt-2 text-center text-xs text-gray-500 sm:text-sm md:text-left">
                  2–3 jours d’énergie sereine — tu sais toujours ce qu’il reste.
                </figcaption>
              </figure>
            </div>

            {/* Colonne contenu */}
            <div className="md:col-span-7">
              <H3 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Chargeur de batteries portable 20 000 mAh
              </H3>

              <p className="flex flex-wrap items-center gap-3 text-gray-700">
                <span className="text-gray-600">Prix : ~34.19 CAD</span>
                <BuyCTA href="https://amzn.to/4pikrYN">Voir l’offre — livraison rapide</BuyCTA>
              </p>

              <p className="mt-3 text-gray-700">
                Grosse capacité avec affichage clair du pourcentage et petite lampe intégrée :
                recharge téléphone, frontale et lampe de camp sans stress.
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-1.5 text-gray-700">
                <li>
                  <strong>Avantages :</strong> 20 000 mAh, affichage %, lampe intégrée — autonomie
                  2–3 jours.
                </li>
                <li>
                  <strong>Inconvénients :</strong> Un peu lourde/volumineuse; recharge complète
                  longue; non étanche.
                </li>
                <li>
                  <strong>Conseils :</strong> Charge à 100 % la veille; garde-la au chaud par temps
                  froid; utilise un câble court/rapide.
                </li>
                <li>
                  <strong>Scénario idéal :</strong> Week-end en parc national : tu éclaires le camp
                  le soir, recharges téléphone + frontale la nuit, et repars le matin à 100 %.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="guide-achat" className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛒 Guide d'achat</H2>

          {/* Choix rapides */}
          <div className="mb-4 flex flex-wrap gap-2">
            <a
              href="#tente-coleman-skydome"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
            >
              Tente famille (budget)
            </a>
            <a
              href="#matelas-hikenture-double"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
            >
              Confort duo
            </a>
            <a
              href="#matelas-gear-doctors"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
            >
              Ultraléger (solo)
            </a>
            <a
              href="#powerbank-20000"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
            >
              Énergie 2–3 jours
            </a>
            <a
              href="#filtre-waterdrop"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
            >
              Eau plus sûre
            </a>
          </div>

          {/* Tableau décisionnel */}
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
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Famille / budget</td>
                  <td className="px-4 py-2">Montage simple • Espace • Pluie</td>
                  <td className="px-4 py-2">
                    <a href="#tente-coleman-skydome" className="text-blue-600 underline">
                      Coleman Skydome
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Confort à deux</td>
                  <td className="px-4 py-2">Largeur • Stabilité • Installation</td>
                  <td className="px-4 py-2">
                    <a href="#matelas-hikenture-double" className="text-blue-600 underline">
                      Hikenture double
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Rando légère</td>
                  <td className="px-4 py-2">Poids • Compacité • Isolation</td>
                  <td className="px-4 py-2">
                    <a href="#matelas-gear-doctors" className="text-blue-600 underline">
                      GEAR DOCTORS
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Autonomie énergie</td>
                  <td className="px-4 py-2">Capacité • % restant • Polyvalence</td>
                  <td className="px-4 py-2">
                    <a href="#powerbank-20000" className="text-blue-600 underline">
                      Power bank 20 000 mAh
                    </a>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-medium">Eau potable simple</td>
                  <td className="px-4 py-2">Compacité • Goût • Facilité</td>
                  <td className="px-4 py-2">
                    <a href="#filtre-waterdrop" className="text-blue-600 underline">
                      Waterdrop
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-gray-700">
            Évalue tes besoins : durée du séjour, poids à porter, météo, niveau de confort. Vérifie
            aussi la compatibilité (ex. largeur matelas vs. dimensions de tente).
          </p>
        </section>

        <section id="conseils" className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛠️ Conseils d'utilisation</H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>
              Fais un montage test de la{' '}
              <a href="#tente-coleman-skydome" className="text-blue-600 underline">
                tente
              </a>{' '}
              avant départ.
            </li>
            <li>
              Organise le sac : lourd au centre, items fréquents en haut (frontale, coupe-vent).
            </li>
            <li>
              Protège l’énergie : garde la{' '}
              <a href="#powerbank-20000" className="text-blue-600 underline">
                power bank
              </a>{' '}
              au chaud la nuit.
            </li>
            <li>
              Eau : préfiltre avec un tissu avant le{' '}
              <a href="#filtre-waterdrop" className="text-blue-600 underline">
                filtre Waterdrop
              </a>
              .
            </li>
            <li>Pluie : ajoute un tarp au-dessus de la cuisine; tends bien le double-toit.</li>
          </ul>
        </section>

        <section id="checklist" className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            📋 Checklist de voyage au camping
          </H2>
          <div className="grid gap-4 text-gray-700 sm:grid-cols-2">
            <ul className="ml-6 list-disc space-y-2">
              <li>Tente + sardines + maillet</li>
              <li>
                Matelas (
                <a href="#matelas-gear-doctors" className="text-blue-600 underline">
                  solo
                </a>{' '}
                /{' '}
                <a href="#matelas-hikenture-double" className="text-blue-600 underline">
                  double
                </a>
                )
              </li>
              <li>Sac de couchage + oreiller</li>
              <li>
                Éclairage :{' '}
                <a href="#frontale-1200lm" className="text-blue-600 underline">
                  frontale
                </a>{' '}
                + piles
              </li>
            </ul>
            <ul className="ml-6 list-disc space-y-2">
              <li>Réchaud + cartouche + briquet</li>
              <li>
                Eau :{' '}
                <a href="#filtre-waterdrop" className="text-blue-600 underline">
                  filtre
                </a>{' '}
                / gourdes
              </li>
              <li>
                Power bank{' '}
                <a href="#powerbank-20000" className="text-blue-600 underline">
                  20 000 mAh
                </a>
              </li>
              <li>Trousse 1ers soins + anti-moustiques</li>
            </ul>
          </div>
          <p className="mt-3 text-gray-700"></p>
        </section>

        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            🚫 Erreurs courantes à éviter (et solutions)
          </H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>
              Oublier la frontale → garde une{' '}
              <a href="#frontale-1200lm" className="text-blue-600 underline">
                frontale 1200 lm
              </a>{' '}
              + piles de rechange.
            </li>
            <li>
              Ne pas tester l’étanchéité → fais un montage test de la{' '}
              <a href="#tente-coleman-skydome" className="text-blue-600 underline">
                tente
              </a>{' '}
              et tends le double-toit.
            </li>
            <li>
              Sous-estimer le froid → ajoute un drap polaire et choisis un matelas{' '}
              <a href="#matelas-gear-doctors" className="text-blue-600 underline">
                isolant
              </a>
              .
            </li>
            <li>
              Manquer d’énergie → prends une{' '}
              <a href="#powerbank-20000" className="text-blue-600 underline">
                power bank 20 000 mAh
              </a>
              .
            </li>
          </ul>
        </section>

        <section id="faq" className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">❓ FAQ</H2>
          <details className="mb-2 rounded-lg border p-3">
            <summary className="cursor-pointer font-semibold">
              Quel est le meilleur matelas pour le dos ?
            </summary>
            <div className="mt-2 text-gray-700">
              Un autogonflant épais est souvent plus confortable; en rando légère, le{' '}
              <a href="#matelas-gear-doctors" className="text-blue-600 underline">
                GEAR DOCTORS
              </a>{' '}
              offre un bon compromis.
            </div>
          </details>
          <details className="mb-2 rounded-lg border p-3">
            <summary className="cursor-pointer font-semibold">
              Peut-on camper gratuitement au Québec ?
            </summary>
            <div className="mt-2 text-gray-700">
              Oui dans certaines zones (terres de la Couronne), en respectant les règles locales.
            </div>
          </details>
          <details className="mb-2 rounded-lg border p-3">
            <summary className="cursor-pointer font-semibold">Faut-il réserver en parc ?</summary>
            <div className="mt-2 text-gray-700">
              Oui : SÉPAQ et Parcs Canada demandent une réservation, surtout en haute saison.
            </div>
          </details>
        </section>

        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🎯 Conclusion</H2>
          <p className="mb-4 text-gray-700">
            Bien préparé, tu profites à 100 % de la nature québécoise. Choisis simple, solide et
            adapté à ton style — et tu pars l’esprit léger.
          </p>

          {/* Choix rapides vers les produits clés */}
          <div className="mb-4 flex flex-wrap gap-2">
            <a
              href="#tente-coleman-skydome"
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              Tente famille
            </a>
            <a
              href="#matelas-hikenture-double"
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              Confort duo
            </a>
            <a
              href="#powerbank-20000"
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              Énergie 2–3 jours
            </a>
            <a
              href="#filtre-waterdrop"
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              Eau plus sûre
            </a>
            <a
              href="#chaise-pliante"
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 hover:bg-emerald-100"
            >
              Moment feu de camp
            </a>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/blog/voyage-hotel"
              className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
            >
              Voyage en hôtel
            </Link>
            <Link
              href="/blog/voyage-voiture"
              className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
            >
              Voyage en voiture électrique
            </Link>
            <Link
              href="/blog/voyage-avion"
              className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
            >
              Voyage en avion
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
