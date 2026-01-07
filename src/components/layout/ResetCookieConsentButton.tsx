'use client';

import React from 'react';
import { manageCookies } from '@/components/CookieBanner';

export default function ResetCookieConsentButton() {
  const handleClick = () => {
    // On se contente de réouvrir la bannière,
    // c'est elle qui gérera ensuite le consentement et l'enregistrement.
    try {
      if (typeof window === 'undefined') return;
      manageCookies();
    } catch (error) {
      console.error('Erreur lors de l’ouverture de la bannière cookies :', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Modifier mes préférences de cookies"
      title="Modifier mes préférences de cookies"
    >
      🎛 Modifier mes préférences cookies
    </button>
  );
}
