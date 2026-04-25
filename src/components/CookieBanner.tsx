'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import H2 from '@/components/typography/H2';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type CookiePrefs = {
  functional: true;
  statistics: boolean;
  marketing: boolean;
};

type StoredConsent = CookiePrefs & {
  version?: string;
  date?: number;
};

const BRAND = {
  blue: '#36b5ff',
  violet: '#aa7fd5',
};

const CONSENT_VERSION = '2.2';
const EXPIRATION_DAYS = 365;
const GA_ID = 'G-GZP1YZLT2F';

const defaultPrefs: CookiePrefs = {
  functional: true,
  statistics: false,
  marketing: false,
};

const translations = {
  fr: {
    title: 'Cookies & confidentialité',
    intro:
      'Nous utilisons quelques cookies pour faire fonctionner le site, comprendre ce qui vous aide le plus et améliorer GoQuébeCAN. Vous gardez le contrôle à tout moment.',
    policy: 'Lire la politique de confidentialité',
    functional: 'Cookies fonctionnels — nécessaires au bon fonctionnement du site',
    statistics: 'Cookies statistiques — nous aident à améliorer le site',
    marketing: 'Cookies marketing — utiles pour les publicités et contenus personnalisés',
    customize: 'Personnaliser',
    save: 'Sauvegarder mes choix',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    helper: 'Vous pouvez modifier vos choix plus tard depuis la politique de confidentialité.',
    close: 'Fermer',
  },
  en: {
    title: 'Cookies & Privacy',
    intro:
      'We use a few cookies to make the website work, understand what helps visitors most, and improve GoQuébeCAN. You stay in control at all times.',
    policy: 'Read privacy policy',
    functional: 'Functional cookies — required for the website to work',
    statistics: 'Analytics cookies — help us improve the website',
    marketing: 'Marketing cookies — used for ads and personalized content',
    customize: 'Customize',
    save: 'Save my choices',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    helper: 'You can update your choices later from the privacy policy.',
    close: 'Close',
  },
};

function encodeConsent(payload: StoredConsent) {
  try {
    return btoa(JSON.stringify(payload));
  } catch {
    return '';
  }
}

function setConsent(data: CookiePrefs) {
  if (typeof window === 'undefined') return;

  const payload: StoredConsent = {
    ...data,
    version: CONSENT_VERSION,
    date: Date.now(),
  };

  localStorage.setItem('cookie_consent', JSON.stringify(payload));

  const encoded = encodeConsent(payload);

  if (encoded) {
    document.cookie = `cookie_consent=${encoded}; path=/; max-age=${
      EXPIRATION_DAYS * 86400
    }; SameSite=Strict; Secure`;
  }
}

function getConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('cookie_consent');

  if (!stored) return null;

  try {
    return JSON.parse(stored) as StoredConsent;
  } catch {
    return null;
  }
}

export function manageCookies() {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent('openCookieBanner'));
}

function ensureGtagBase() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

function setDefaultGoogleConsent() {
  if (typeof window === 'undefined') return;

  ensureGtagBase();

  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
}

function updateGoogleConsent(prefs: CookiePrefs) {
  if (typeof window === 'undefined') return;

  ensureGtagBase();

  window.gtag?.('consent', 'update', {
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    analytics_storage: prefs.statistics ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  });
}

function sendPageView() {
  if (typeof window === 'undefined') return;

  window.gtag?.('config', GA_ID, {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return;

  ensureGtagBase();

  const existing = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`,
  );

  if (existing) {
    sendPageView();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag?.('js', new Date());
  sendPageView();
}

function loadFacebookPixel() {
  if (typeof window === 'undefined') return;

  const existing = document.querySelector('script[src*="connect.facebook.net"]');

  if (existing) return;

  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.async = true;
  document.head.appendChild(script);
}

function normalizePrefs(stored: StoredConsent): CookiePrefs {
  return {
    functional: true,
    statistics: Boolean(stored.statistics),
    marketing: Boolean(stored.marketing),
  };
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [preferences, setPreferences] = useState<CookiePrefs>(defaultPrefs);
  const [ready, setReady] = useState(false);
  const [reopened, setReopened] = useState(false);

  const userLang =
    typeof navigator !== 'undefined' && navigator.language.startsWith('en') ? 'en' : 'fr';

  const t = translations[userLang];

  const loadConsentedScripts = useCallback((prefs: CookiePrefs) => {
    updateGoogleConsent(prefs);

    if (prefs.statistics) {
      loadGoogleAnalytics();
    }

    if (prefs.marketing) {
      loadFacebookPixel();
    }
  }, []);

  useEffect(() => {
    setDefaultGoogleConsent();

    const stored = getConsent();

    if (!stored || stored.version !== CONSENT_VERSION) {
      setVisible(true);
      setPreferences(defaultPrefs);
    } else {
      const restoredPrefs = normalizePrefs(stored);
      setPreferences(restoredPrefs);
      loadConsentedScripts(restoredPrefs);
    }

    setReady(true);

    const openHandler = () => {
      const current = getConsent();

      if (current) {
        setPreferences(normalizePrefs(current));
      }

      setReopened(true);
      setVisible(true);
      setClosing(false);
    };

    window.addEventListener('openCookieBanner', openHandler);

    return () => {
      window.removeEventListener('openCookieBanner', openHandler);
    };
  }, [loadConsentedScripts]);

  const closeBanner = () => {
    setClosing(true);

    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setShowOptions(false);
    }, 450);
  };

  const acceptAll = () => {
    const all: CookiePrefs = {
      functional: true,
      statistics: true,
      marketing: true,
    };

    setConsent(all);
    setPreferences(all);
    loadConsentedScripts(all);
    closeBanner();
  };

  const rejectAll = () => {
    const none: CookiePrefs = {
      functional: true,
      statistics: false,
      marketing: false,
    };

    setConsent(none);
    setPreferences(none);
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
      className={`fixed inset-x-0 bottom-0 z-50 border-t bg-white text-gray-900 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out dark:bg-[#111111] dark:text-gray-100 ${
        closing ? 'animate-cookieSlideDown' : 'animate-cookieSlideUp'
      }`}
      style={{ borderTopColor: BRAND.blue }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4 md:w-3/5">
          <Image
            src="/logo.png"
            alt="Logo GoQuébeCAN"
            width={52}
            height={52}
            priority
            className="size-[52px] rounded-lg"
          />

          <div>
            <div className="flex items-start justify-between gap-3">
              <H2 id="cookie-title" className="text-base font-bold">
                {t.title}
              </H2>

              {reopened && (
                <button
                  type="button"
                  onClick={closeBanner}
                  aria-label={t.close}
                  className="rounded-full px-2 text-lg leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <p
              id="cookie-desc"
              className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {t.intro}
            </p>

            <a
              href="/confidentialite"
              className="mt-2 inline-block text-sm font-medium underline underline-offset-4 hover:opacity-80"
              style={{ color: BRAND.blue }}
            >
              {t.policy}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:w-auto">
          {showOptions && (
            <div
              className="animate-cookieFadeIn w-full space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm md:min-w-[340px] dark:border-gray-700 dark:bg-[#1c1c1c]"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <input id="cookies-functional" type="checkbox" checked disabled className="mt-1" />
                <label htmlFor="cookies-functional" className="leading-snug">
                  {t.functional}
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="cookies-statistics"
                  type="checkbox"
                  checked={preferences.statistics}
                  onChange={(e) =>
                    setPreferences((current) => ({
                      ...current,
                      statistics: e.target.checked,
                    }))
                  }
                  className="mt-1"
                />
                <label htmlFor="cookies-statistics" className="leading-snug">
                  {t.statistics}
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="cookies-marketing"
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((current) => ({
                      ...current,
                      marketing: e.target.checked,
                    }))
                  }
                  className="mt-1"
                />
                <label htmlFor="cookies-marketing" className="leading-snug">
                  {t.marketing}
                </label>
              </div>

              <p className="border-t border-gray-200 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {t.helper}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ backgroundColor: BRAND.blue }}
            >
              {t.acceptAll}
            </button>

            <button
              type="button"
              onClick={() => setShowOptions((value) => !value)}
              className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:hover:bg-blue-950/40"
              style={{ borderColor: BRAND.blue, color: BRAND.blue }}
            >
              {t.customize}
            </button>

            {showOptions && (
              <button
                type="button"
                onClick={saveConsent}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
                style={{ backgroundColor: BRAND.violet }}
              >
                {t.save}
              </button>
            )}

            <button
              type="button"
              onClick={rejectAll}
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 underline underline-offset-4 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {t.rejectAll}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cookieSlideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes cookieSlideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes cookieFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-cookieSlideUp {
          animation: cookieSlideUp 0.45s ease-out forwards;
        }

        .animate-cookieSlideDown {
          animation: cookieSlideDown 0.45s ease-in forwards;
        }

        .animate-cookieFadeIn {
          animation: cookieFadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
