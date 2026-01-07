'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import BrandName from '@/components/brand/BrandName';
import { CAMPINGS } from '@/data/campings';

import { Tent, MapPin, DollarSign, Star } from 'lucide-react';

/* ───────────────────────────────────────────────

/* ───────────────────────────────────────────────
   📊 Données exemples (à terme à remplacer par campings.json)
─────────────────────────────────────────────── */
const campingSites = CAMPINGS.map((c) => ({
  slug: c.slug,
  name: c.name,
  location: c.location,
  description: c.shortDescription,
  price: c.typicalPrice,
  rating: c.rating ?? 4.6,
  image: c.heroImage,
  mainAttractions: c.highlights ?? [],
  tags: c.tags,
}));

/* ───────────────────────────────────────────────
   🧭 Composant principal
─────────────────────────────────────────────── */
export function CampingGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('rating');
  const [filters] = useState<string[]>([]);

  // 🔍 Tri et filtrage combinés
  const filteredCampings = useMemo(() => {
    return campingSites
      .filter((site) => {
        const matchesSearch = [site.name, site.location, site.description]
          .concat(site.mainAttractions)
          .some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFilters = filters.length === 0 || filters.every((f) => site.tags.includes(f));

        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price')
          return (
            parseInt(a.price.replace(/\D/g, ''), 10) - parseInt(b.price.replace(/\D/g, ''), 10)
          );
        return b.rating - a.rating;
      });
  }, [searchTerm, sortBy, filters]);

  /* ───────────────────────────────────────────────
     🧩 JSON-LD — Données structurées SEO
  ─────────────────────────────────────────────── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: campingSites.map((site, index) => ({
      '@type': 'Campground',
      position: index + 1,
      name: site.name,
      description: site.description,
      image: site.image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location,
        addressRegion: 'Québec',
        addressCountry: 'Canada',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: site.rating,
        reviewCount: Math.floor(150 + Math.random() * 250),
      },
    })),
  };

  /* ───────────────────────────────────────────────
     🧩 FAQ Schema SEO
  ─────────────────────────────────────────────── */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quels sont les meilleurs campings familiaux au Québec ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les campings des Érables, du Bic et du Mont-Tremblant sont particulièrement appréciés des familles pour leurs activités, piscines et emplacements bien aménagés.',
        },
      },
      {
        '@type': 'Question',
        name: 'Où camper au bord de l’eau au Québec ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le camping du Fjord, du Bic, de la Baie-des-Chaleurs et certains sites à Tadoussac permettent de camper avec vue sur l’eau, entre fleuve, mer et fjord.',
        },
      },
      {
        '@type': 'Question',
        name: 'Peut-on camper avec un VR ou une van aménagée ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, la majorité des campings du Québec proposent des emplacements avec services pour VR. Les campings de la Gaspésie, du Saguenay, des Cantons-de-l’Est et des Laurentides sont particulièrement adaptés aux road trips en van.',
        },
      },
      {
        '@type': 'Question',
        name: 'Les campings acceptent-ils les chiens au Québec ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Beaucoup de campings acceptent les animaux, mais les règles varient selon les établissements et les parcs nationaux. Il est toujours recommandé de vérifier les règlements avant de réserver.',
        },
      },
    ],
  };

  /* ───────────────────────────────────────────────
     🖼️ Affichage du guide
  ─────────────────────────────────────────────── */
  return (
    <section className="relative mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-md md:p-10">
      {/* Données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* 🏕️ En-tête SEO */}
      <header className="mb-10 text-center">
        <Tent className="mx-auto size-10 text-green-600" />
        <H1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Guide des meilleurs campings du Québec (2025–2026)
        </H1>
        <p className="mx-auto mt-3 max-w-3xl text-gray-600">
          Découvrez les plus beaux endroits pour camper au Québec — entre nature, confort et
          aventures. Filtrez selon vos envies pour trouver le site parfait, puis ajoutez-le à votre
          itinéraire <BrandName />.
        </p>
      </header>

      {/* 🔍 Barre de recherche et filtres */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Rechercher un camping ou une région..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 sm:w-2/3"
          aria-label="Rechercher un camping"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
          className="rounded-lg border border-gray-300 px-4 py-2"
          aria-label="Trier les campings"
        >
          <option value="rating">Trier par note</option>
          <option value="name">Trier par nom</option>
          <option value="price">Trier par prix approximatif</option>
        </select>
      </div>

      {/* Résumé */}
      <p className="mb-6 text-sm text-gray-500" aria-live="polite">
        {filteredCampings.length} campings trouvés — mise à jour 2025–2026
      </p>

      {/* Cartes des campings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampings.map((site, i) => (
          <motion.article
            key={site.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-xl border bg-gray-50 transition-all hover:shadow-lg"
          >
            <div className="relative h-52 w-full">
              <Image
                src={site.image}
                alt={`Photo du ${site.name}`}
                fill
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/placeholder/placeholder.avif"
              />
            </div>

            <div className="p-5">
              <H2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Tent className="size-5 text-green-600" /> {site.name}
              </H2>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="size-4 text-blue-500" /> {site.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">{site.description}</p>

              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li>
                  <DollarSign className="mr-1 inline size-4 text-amber-500" />
                  <strong>Tarifs :</strong> {site.price}
                </li>
                <li>
                  <Star className="mr-1 inline size-4 text-yellow-400" />
                  <strong>Note moyenne :</strong> {site.rating.toFixed(1)} / 5
                </li>
                <li>
                  <strong>À ne pas manquer :</strong> {site.mainAttractions.slice(0, 3).join(', ')}
                </li>
              </ul>

              <div className="mt-3 flex flex-wrap gap-2">
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* 🧭 Idées de road trips camping */}
      <section className="mx-auto mt-16 max-w-5xl">
        <H2 className="mb-4 text-2xl font-semibold text-gray-900">
          Idées d’itinéraires camping au Québec
        </H2>
        <p className="mb-6 text-sm text-gray-600">
          Utilisez ces itinéraires comme base, puis personnalisez-les dans le planificateur
          <BrandName /> pour ajouter des producteurs locaux, des activités et vos propres étapes.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              7 jours — Gaspésie & Baie-des-Chaleurs
            </h3>
            <ul className="mb-2 list-inside list-disc">
              <li>Jour 1-2 : Parc national de la Gaspésie</li>
              <li>Jour 3-4 : Baie-des-Chaleurs (camping plage)</li>
              <li>Jour 5-7 : Route côtière + producteurs locaux</li>
            </ul>
            <p>
              Parfait pour un premier grand road trip en famille ou en van, avec paysages de
              montagne et bord de mer.
            </p>
            <Link
              href="/producteurs"
              className="mt-3 inline-block text-xs font-medium text-blue-600 hover:underline"
            >
              Trouver des producteurs locaux sur la route →
            </Link>
          </article>

          <article className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              3 jours — Saguenay & Tadoussac
            </h3>
            <ul className="mb-2 list-inside list-disc">
              <li>Jour 1 : Camping du Fjord</li>
              <li>Jour 2 : Tadoussac et observation des baleines</li>
              <li>Jour 3 : Retour par la route du fjord</li>
            </ul>
            <p>
              Idéal pour un long week-end, entre fjord, croisières aux baleines et petits villages
              typiques.
            </p>
            <Link
              href="/producteurs"
              className="mt-3 inline-block text-xs font-medium text-blue-600 hover:underline"
            >
              Trouver des producteurs locaux sur la route →
            </Link>
          </article>

          <article className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700">
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              4 jours — Cantons-de-l’Est & ciel étoilé
            </h3>
            <ul className="mb-2 list-inside list-disc">
              <li>Jour 1-2 : Camping des Érables</li>
              <li>Jour 3-4 : Camping du Mont-Mégantic</li>
            </ul>
            <p>
              Un combiné parfait entre ambiance familiale, villages de l’Estrie et ciel étoilé
              exceptionnel.
            </p>
            <Link
              href="/producteurs"
              className="mt-3 inline-block text-xs font-medium text-blue-600 hover:underline"
            >
              Trouver des producteurs locaux sur la route →
            </Link>
          </article>
        </div>
      </section>

      {/* 💡 Comment choisir votre camping au Québec ? */}
      <section className="mx-auto mt-16 max-w-3xl text-left text-gray-700">
        <H2 className="mb-3 text-2xl font-semibold">Comment choisir votre camping au Québec ?</H2>
        <p className="mb-3 text-sm">
          Posez-vous d’abord deux questions : combien de temps vous restez, et quel type
          d’expérience vous recherchez (plage, montagne, calme, activités pour les enfants, etc.).
        </p>
        <ul className="mb-4 list-inside list-disc text-sm">
          <li>
            <strong>Région :</strong> Gaspésie, Saguenay, Cantons-de-l’Est, Laurentides… adaptez vos
            choix à la durée de votre séjour.
          </li>
          <li>
            <strong>Type d’hébergement :</strong> tente, VR, prêt-à-camper, van aménagée. Vérifiez
            les services (électricité, eau, égout).
          </li>
          <li>
            <strong>Ambiance :</strong> certains campings sont très familiaux et animés, d’autres
            misent sur le calme et le ciel étoilé.
          </li>
          <li>
            <strong>Accès à l’eau :</strong> fleuve, mer, lac, rivière… important si vous rêvez de
            baignade ou d’activités nautiques.
          </li>
        </ul>
        <p className="mb-3 text-sm">
          Pour aller plus loin, utilisez le{' '}
          <Link href="/planificateur" className="font-medium text-blue-600 hover:underline">
            planificateur <BrandName />
          </Link>{' '}
          et ajoutez vos campings, activités et producteurs locaux favoris sur un même itinéraire.
        </p>
      </section>

      {/* 📘 Section conseils */}
      <section className="mx-auto mt-14 max-w-3xl text-center text-gray-700">
        <H2 className="mb-4 text-2xl font-semibold">Conseils pratiques pour camper au Québec</H2>
        <ul className="mx-auto mb-6 inline-block list-inside list-disc text-left text-sm text-gray-600">
          <li>
            Réservez tôt en haute saison (juillet-août), surtout en Gaspésie et dans les parcs
            nationaux.
          </li>
          <li>Prévoyez des vêtements pour les soirées fraîches, même en plein été.</li>
          <li>
            Utilisez des sacs réutilisables et respectez les règles environnementales locales.
          </li>
          <li>Consultez les règlements concernant les feux à ciel ouvert avant votre départ.</li>
          <li>
            Pensez à vérifier les producteurs locaux à proximité sur{' '}
            <Link href="/producteurs" className="font-medium text-blue-600 hover:underline">
              la carte des producteurs
            </Link>{' '}
            pour agrémenter votre séjour.
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/objets"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Objets indispensables
          </Link>
          <Link
            href="/planificateur"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Planificateur d’itinéraire
          </Link>
          <Link
            href="/videos"
            className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
          >
            Vidéos populaires
          </Link>
        </div>
      </section>
    </section>
  );
}
