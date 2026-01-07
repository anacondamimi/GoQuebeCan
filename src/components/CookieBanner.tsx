'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import H2 from '@/components/typography/H2';

// ✅ Correction TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
// 🎨 Couleurs de marque GoQuébeCan
const BRAND = {
  blue: '#36b5ff',
  violet: '#aa7fd5',
  white: '#ffffff',
  dark: '#111111',
};

const CONSENT_VERSION = '2.0';
const EXPIRATION_DAYS = 365;
const defaultPrefs = { functional: true, statistics: false, marketing: false };

const translations = {
  fr: {
    title: 'Cookies & confidentialité',
    intro:
      'Nous utilisons des cookies pour assurer le bon fonctionnement du site, améliorer votre expérience et analyser le trafic.',
    policy: 'Lire la politique de confidentialité',
    functional: 'Cookies fonctionnels (obligatoires)',
    statistics: 'Cookies statistiques (Google Analytics, etc.)',
    marketing: 'Cookies marketing (publicité ciblée)',
    customize: 'Personnaliser',
    save: 'Sauvegarder',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
  },
  en: {
    title: 'Cookies & Privacy',
    intro:
      'We use cookies to ensure the site works properly, improve your experience and analyze traffic.',
    policy: 'Read privacy policy',
    functional: 'Functional cookies (required)',
    statistics: 'Analytics cookies (Google Analytics, etc.)',
    marketing: 'Marketing cookies (targeted ads)',
    customize: 'Customize',
    save: 'Save',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
  },
};

// === Fonctions utilitaires ===
function setConsent(data: any) {
  const payload = { ...data, version: CONSENT_VERSION, date: Date.now() };
  localStorage.setItem('cookie_consent', JSON.stringify(payload));
  document.cookie = `cookie_consent=${btoa(JSON.stringify(payload))}; path=/; max-age=${
    EXPIRATION_DAYS * 86400
  }; SameSite=Strict; Secure`;
}

function getConsent() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('cookie_consent');
  return stored ? JSON.parse(stored) : null;
}

export function manageCookies() {
  const event = new CustomEvent('openCookieBanner');
  window.dispatchEvent(event);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState(defaultPrefs);
  const [ready, setReady] = useState(false);

  const userLang =
    typeof navigator !== 'undefined' && navigator.language.startsWith('en') ? 'en' : 'fr';
  const t = translations[userLang];

  const loadConsentedScripts = useCallback((prefs: typeof defaultPrefs) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      (window.dataLayer as any).push(args);
    }

    // Google Consent Mode v2 (2025 ready)
    gtag('consent', 'default', {
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      analytics_storage: prefs.statistics ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });

    if (prefs.statistics && !document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GZP1YZLT2F';
      s.async = true;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', 'G-GZP1YZLT2F');
    }

    if (prefs.marketing && !document.querySelector('script[src*="connect.facebook.net"]')) {
      const fb = document.createElement('script');
      fb.src = 'https://connect.facebook.net/en_US/fbevents.js';
      fb.async = true;
      document.head.appendChild(fb);
    }
  }, []);

  useEffect(() => {
    const stored = getConsent();
    if (!stored || stored.version !== CONSENT_VERSION) {
      setVisible(true);
    } else {
      loadConsentedScripts(stored);
    }
    setReady(true);

    const openHandler = () => setVisible(true);
    window.addEventListener('openCookieBanner', openHandler);
    return () => window.removeEventListener('openCookieBanner', openHandler);
  }, [loadConsentedScripts]);

  const closeBanner = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), 600);
  };

  const acceptAll = () => {
    const all = { functional: true, statistics: true, marketing: true };
    setConsent(all);
    loadConsentedScripts(all);
    closeBanner();
  };

  const rejectAll = () => {
    const none = { functional: true, statistics: false, marketing: false };
    setConsent(none);
    loadConsentedScripts(none);
    closeBanner();
  };

  const saveConsent = () => {
    setConsent(preferences);
    loadConsentedScripts(preferences);
    closeBanner();
  };

  if (!ready || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      aria-modal="true"
      className={`border-[ fixed inset-x-0 bottom-0 z-50 border-t-4 text-gray-800 transition-all
        duration-500 ease-out dark:text-gray-100${BRAND.blue}] bg-[${BRAND.white}] dark:bg-[${BRAND.dark}]
        shadow-[0_-3px_15px_rgba(0,0,0,0.25)]
        ${closing ? 'animate-slideDownFadeOut' : 'animate-slideUpFadeIn'}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-6 md:flex-row md:justify-between">
        {/* Logo + Texte */}
        <div className="flex items-start gap-3 md:w-3/5">
          <Image
            src="/logo.png"
            alt="GoQuébeCan logo"
            width={52}
            height={52}
            priority
            className="rounded-md"
          />
          <div>
            <H2 id="cookie-title" className="flex items-center gap-2 text-sm font-semibold">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin-slow"
              >
                <circle cx="12" cy="12" r="10" fill={BRAND.blue} />
                <circle cx="8" cy="10" r="1.5" fill={BRAND.violet} />
                <circle cx="14" cy="8" r="1" fill={BRAND.violet} />
                <circle cx="16" cy="14" r="1.2" fill={BRAND.violet} />
                <circle cx="10" cy="16" r="1" fill={BRAND.violet} />
              </svg>
              {t.title}
            </H2>
            <p id="cookie-desc" className="mt-1 text-sm leading-snug">
              {t.intro}
            </p>
            <a
              href="/confidentialite"
              className="text-xs text-[${BRAND.blue}] underline hover:text-blue-800 dark:hover:text-blue-300"
            >
              {t.policy}
            </a>
          </div>
        </div>

        {/* Options */}
        {showOptions && (
          <div
            className="animate-fadeIn w-full space-y-2 rounded border border-gray-200 bg-gray-50 p-3 text-sm md:w-auto dark:border-gray-700 dark:bg-[#222]"
            aria-live="polite"
          >
            <label className="flex items-center gap-2">
              <input type="checkbox" checked disabled /> {t.functional}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.statistics}
                onChange={(e) => setPreferences({ ...preferences, statistics: e.target.checked })}
              />
              {t.statistics}
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
              />
              {t.marketing}
            </label>
          </div>
        )}

        {/* Boutons */}
        <div className="flex flex-wrap justify-end gap-2 md:flex-nowrap md:justify-start">
          <button
            onClick={() => setShowOptions((v) => !v)}
            className="rounded border border-[${BRAND.blue}] px-4 py-2 text-sm font-medium text-[${BRAND.blue}] hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:ring-2 focus:ring-blue-400"
          >
            {t.customize}
          </button>
          <button
            onClick={rejectAll}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-800"
          >
            {t.rejectAll}
          </button>
          <button
            onClick={saveConsent}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-800"
          >
            {t.save}
          </button>
          <button
            onClick={acceptAll}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-800"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes slideUpFadeIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideDownFadeOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .animate-slideUpFadeIn {
          animation: slideUpFadeIn 0.6s ease-out forwards;
        }
        .animate-slideDownFadeOut {
          animation: slideDownFadeOut 0.6s ease-in forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 7s linear infinite;
        }
      `}</style>
    </div>
  );
}
