import React from 'react';
import { aff, type AffiliateKey } from '@/lib/affiliates/links';

/**
 * Bouton d'appel à l'action affilié.
 * - Récupère url/label/rel depuis la source unique (links.ts) via la clé.
 * - Force target="_blank" + rel="sponsored noopener noreferrer" (SEO + sécurité).
 * - Variantes de couleur alignées sur les conventions Tailwind du projet.
 *
 * Usage :
 *   <AffiliateButton affKey="stay22Hotel" />
 *   <AffiliateButton affKey="assurance" label="Comparer maintenant" variant="outline" />
 */

type Variant = 'primary' | 'outline' | 'soft' | 'emerald' | 'amber' | 'rose';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  outline: 'border border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50',
  soft: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 hover:bg-indigo-100',
  emerald: 'bg-emerald-600 text-white hover:bg-emerald-700',
  amber: 'bg-amber-500 text-white hover:bg-amber-600',
  rose: 'bg-rose-600 text-white hover:bg-rose-700',
};

type AffiliateButtonProps = {
  affKey: AffiliateKey;
  label?: string;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
};

export default function AffiliateButton({
  affKey,
  label,
  variant = 'primary',
  className,
  fullWidth = false,
}: AffiliateButtonProps) {
  const link = aff(affKey);
  const base =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition';
  const width = fullWidth ? 'w-full sm:w-auto' : '';

  return (
    <a
      href={link.url}
      target="_blank"
      rel={`${link.rel} noopener noreferrer`}
      className={[base, VARIANTS[variant], width, className].filter(Boolean).join(' ')}
    >
      {label ?? link.label}
    </a>
  );
}
