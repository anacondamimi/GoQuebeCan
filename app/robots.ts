// app/robots.ts
import type { MetadataRoute } from 'next';

/**
 * 🤖 Robots 2025 — site FR avec option de traduction EN via bouton
 * → Autorise l'indexation FR, bloque les pages /en tant qu’elles ne sont pas servies statiquement.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://goquebecan.com';

const IS_LOCAL = SITE_URL.includes('localhost') || SITE_URL.includes('127.0.0.1');
const IS_PREVIEW = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';
const DISALLOW = process.env.DISALLOW_ROBOTS === 'true' || IS_LOCAL || IS_PREVIEW;

export default function robots(): MetadataRoute.Robots {
  // 🧱 Environnement local ou preview : tout bloqué
  if (DISALLOW) {
    return {
      rules: [
        { userAgent: '*', disallow: '/' },
        { userAgent: 'GPTBot', disallow: '/' },
        { userAgent: 'CCBot', disallow: '/' },
        { userAgent: 'Google-Extended', disallow: '/' },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: new URL(SITE_URL).hostname,
    };
  }

  // 🌐 Production : FR autorisé, EN bloqué temporairement
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/login/',
          '/private/',
          '/drafts/',
          '/planificateur/test/',
          '/test-youtube/',
          '/expansion/',
        ],
      },
      // Bots IA (facultatif)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).hostname,
  };
}
