'use client';

import React from 'react';
import Image from 'next/image';
import H3 from '@/components/typography/H3';

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

export interface CampingProductSectionProps {
  /** Ancre unique utilisée par le tableau récap pour scroller vers la fiche */
  id: string;
  /** Titre produit affiché en <H3> */
  title: string;
  /** Lien affilié (Amazon, etc.) */
  href: string;
  /** Texte du prix affiché (ex: "~89.99 CAD" ou "selon l’offre") */
  priceText?: string;
  /** Texte du bouton CTA (par défaut: "Voir l’offre — livraison rapide") */
  ctaText?: string;
  /** Image intrinsèque (zéro rognage) */
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
    /** Optionnel: override de l’attribut sizes */
    sizes?: string;
  };
  /** Paragraphe d’intro court (bénéfice/usage) */
  description?: string;
  /** Points clés standards */
  pros?: string;
  cons?: string;
  tips?: string;
  scenario?: string;
  /** Classes supplémentaires si besoin */
  className?: string;
}

/**
 * Section produit 2 colonnes, image intrinsèque (pas de rognage), texte à droite
 * — réutilisable pour toutes les fiches produits camping.
 */
export default function CampingProductSection({
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
}: CampingProductSectionProps) {
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
                priority={false}
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

/*
USAGE EXEMPLE — copie/colle dans ta page :

import CampingProductSection from '@/components/CampingProductSection'
import { BuyCTA } from '@/components/CampingProductSection'

<CampingProductSection
  id="filtre-waterdrop"
  title="Purificateur d’eau Waterdrop (filtre individuel)"
  href="https://amzn.to/4mPKh4I"
  priceText="~50.99 CAD"
  image={{
    src: '/images/produits/purificateur-eau-camping.avif',
    alt: 'Filtre à eau Waterdrop — portable et léger, idéal pour randonnée et camping au Québec',
    width: 1200,
    height: 900,
    caption: 'Waterdrop : eau plus sûre au camp, sans s’alourdir.'
  }}
  description="Compact et efficace pour filtrer ruisseaux et lacs, améliore le goût sans alourdir le sac."
  pros="Léger, simple, bon goût."
  cons="Débit plus lent en eau très trouble; non adapté à l’eau salée ni aux virus."
  tips="Préfiltre avec un tissu; backwash après chaque sortie; protège la cartouche du gel."
  scenario="Rando dans la Jacques-Cartier : tu remplis au ruisseau, tu filtres au camp pendant que le feu crépite."
/>
*/
