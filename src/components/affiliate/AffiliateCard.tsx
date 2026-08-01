import React from 'react';
import AffiliateButton from '@/components/affiliate/AffiliateButton';
import type { AffiliateKey } from '@/lib/affiliates/links';

/**
 * Carte affiliée réutilisable (hôtel, hébergement, service…).
 * Remplace les blocs de cartes en dur qui étaient copiés-collés dans les articles.
 *
 * Usage :
 *   <AffiliateCard
 *     eyebrow="Hôtel de plage à Akumal"
 *     title="Se réveiller face à la baie"
 *     description="Un hôtel calme directement sur la plage, accès tôt le matin aux tortues."
 *     affKey="stay22Hotel"
 *     variant="primary"
 *     icon={<Palmtree className="size-4" />}
 *   />
 */

type AffiliateCardProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  affKey: AffiliateKey;
  ctaLabel?: string;
  variant?: 'primary' | 'outline' | 'soft' | 'emerald' | 'amber' | 'rose';
  icon?: React.ReactNode;
  accent?: string; // classe texte pour l'eyebrow, ex. 'text-sky-700'
};

export default function AffiliateCard({
  title,
  description,
  eyebrow,
  affKey,
  ctaLabel,
  variant = 'primary',
  icon,
  accent = 'text-indigo-700',
}: AffiliateCardProps) {
  return (
    <div className="not-prose rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {eyebrow ? (
        <p
          className={[
            'mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]',
            accent,
          ].join(' ')}
        >
          {icon}
          {eyebrow}
        </p>
      ) : null}

      <h4 className="text-base font-semibold text-gray-900">{title}</h4>

      {description ? <p className="mt-2 text-sm leading-6 text-gray-700">{description}</p> : null}

      <div className="mt-4">
        <AffiliateButton affKey={affKey} label={ctaLabel} variant={variant} />
      </div>
    </div>
  );
}
