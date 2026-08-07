import React from 'react';
import Image from 'next/image';
import type { ValiseProduct } from '@/data/valiseProducts';

/**
 * Carte produit pour la page valise.
 * - Affiche l'IMAGE si le champ `image` est rempli, sinon l'ÉMOJI (fallback simple).
 * - Badge de priorité (essentiel / utile / optionnel).
 * - Bouton affilié (rel="sponsored") si une url est fournie.
 * Ne pas modifier pour changer les produits : tout se gère dans valiseProducts.ts.
 */

const PRIORITY_STYLE: Record<string, string> = {
  essentiel: 'bg-emerald-100 text-emerald-800',
  utile: 'bg-sky-100 text-sky-800',
  optionnel: 'bg-gray-100 text-gray-600',
};

const PRIORITY_LABEL: Record<string, string> = {
  essentiel: 'Essentiel',
  utile: 'Utile',
  optionnel: 'Optionnel',
};

export default function ValiseProductCard({ product }: { product: ValiseProduct }) {
  const hasImage = Boolean(product.image && product.image.trim() !== '');
  const hasLink = Boolean(product.url && product.url.trim() !== '' && product.url !== '#');

  return (
    <div className="not-prose flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Visuel : image OU émoji */}
      <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        {hasImage ? (
          <Image
            src={product.image as string}
            alt={product.name}
            width={200}
            height={200}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-6xl" aria-hidden>
            {product.emoji}
          </span>
        )}
      </div>

      {/* Badge priorité */}
      <span
        className={[
          'mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-semibold',
          PRIORITY_STYLE[product.priority] ?? PRIORITY_STYLE.optionnel,
        ].join(' ')}
      >
        {PRIORITY_LABEL[product.priority] ?? 'Optionnel'}
      </span>

      {/* Nom + description */}
      <h4 className="text-sm font-bold text-gray-900">{product.name}</h4>
      <p className="mt-1 text-sm leading-6 text-gray-700">{product.desc}</p>

      {/* Astuce vécue (optionnelle) */}
      {product.tip ? (
        <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs leading-5 text-amber-900">
          💡 {product.tip}
        </p>
      ) : null}

      {/* Bouton affilié (si lien) */}
      {hasLink ? (
        <a
          href={product.url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          {product.cta || 'Voir le produit'}
        </a>
      ) : null}
    </div>
  );
}
