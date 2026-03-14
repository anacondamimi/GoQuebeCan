// app/robots.ts
import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://goquebecan.com';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
const IS_DEV = process.env.NODE_ENV !== 'production';

// Par défaut : on bloque en dev + preview.
// Si tu veux tester Lighthouse local sans pénalité : mets DISALLOW_ROBOTS=false dans .env.local
const DISALLOW =
  process.env.DISALLOW_ROBOTS === 'true'
    ? true
    : process.env.DISALLOW_ROBOTS === 'false'
      ? false
      : IS_DEV || IS_PREVIEW;

export default function robots(): MetadataRoute.Robots {
  if (DISALLOW) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: new URL(SITE_URL).hostname,
    };
  }

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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).hostname,
  };
}
