'use client';
import React, { useEffect, useState } from 'react';
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const translations = {
  fr: {
    intro:
      'Nous utilisons des cookies pour assurer le bon fonctionnement du site, améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
    policy: 'Lire la politique de confidentialité',
    functional: 'Cookies fonctionnels (obligatoires)',
    statistics: 'Cookies statistiques (Google Analytics, etc.)',
    marketing: 'Cookies marketing (publicité ciblée)',
    customize: 'Personnaliser',
    save: 'Sauvegarder',
    acceptAll: 'Tout accepter',
  },
  en: {
    intro:
      'We use cookies to ensure the site works properly, improve your experience, analyze traffic and personalize content.',
    policy: 'Read our privacy policy',
    functional: 'Functional cookies (required)',
    statistics: 'Analytics cookies (Google Analytics, etc.)',
    marketing: 'Marketing cookies (targeted advertising)',
    customize: 'Customize',
    save: 'Save',
    acceptAll: 'Accept all',
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState({
    functional: true,
    statistics: false,
    marketing: false,
  });

  const userLang =
    typeof navigator !== 'undefined' && navigator.language.startsWith('en') ? 'en' : 'fr';
  const t = translations[userLang];

  const loadConsentedScripts = React.useCallback((prefs: typeof preferences) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (prefs.statistics) {
      const ga = document.createElement('script');
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
      ga.async = true;
      document.head.appendChild(ga);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-GZP1YZLT2F');
    }

    if (prefs.marketing) {
      const fb = document.createElement('script');
      fb.src = 'https://connect.facebook.net/en_US/fbevents.js';
      fb.async = true;
      document.head.appendChild(fb);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    const stored = localStorage.getItem('cookie_consent');
    if (!stored) {
      setVisible(true);
    } else {
      const parsed = JSON.parse(stored);
      loadConsentedScripts(parsed);
    }
  }, [loadConsentedScripts]);

  const acceptAll = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    const all = { functional: true, statistics: true, marketing: true };
    localStorage.setItem('cookie_consent', JSON.stringify(all));
    setPreferences(all);
    loadConsentedScripts(all);
    setVisible(false);
  };

  const saveConsent = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    loadConsentedScripts(preferences);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 shadow-lg z-50 border-t">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col gap-4">
        <div>
          <p className="text-sm">{t.intro}</p>
          <p className="text-xs text-gray-500">
            <a href="/confidentialite" className="underline">
              {t.policy}
            </a>
          </p>
        </div>

        {showOptions && (
          <div className="space-y-2 text-sm">
            <label className="block">
              <input type="checkbox" checked disabled /> {t.functional}
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={preferences.statistics}
                onChange={(e) => setPreferences({ ...preferences, statistics: e.target.checked })}
              />{' '}
              {t.statistics}
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              />{' '}
              {t.marketing}
            </label>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-2 md:justify-end">
          <button
            onClick={() => setShowOptions((v) => !v)}
            className="text-sm underline text-blue-700"
          >
            {t.customize}
          </button>
          <button
            onClick={saveConsent}
            className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {t.save}
          </button>
          <button
            onClick={acceptAll}
            className="text-sm px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
