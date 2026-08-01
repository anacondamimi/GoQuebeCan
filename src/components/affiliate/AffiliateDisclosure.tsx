import React from 'react';

/**
 * Mention de transparence d'affiliation.
 * À placer une fois par article contenant des liens rémunérés (en tête d'article).
 * Centralisée ici : si la formulation légale doit changer, on modifie un seul fichier.
 */
export default function AffiliateDisclosure({ className }: { className?: string }) {
  return (
    <p className={['text-xs leading-5 text-gray-500', className].filter(Boolean).join(' ')}>
      Transparence : certains liens de cet article sont affiliés. Si tu réserves via l’un d’eux,
      GoQuébeCan peut toucher une commission — sans aucun coût supplémentaire pour toi. Ça soutient
      notre travail éditorial et n’influence pas nos recommandations.
    </p>
  );
}
