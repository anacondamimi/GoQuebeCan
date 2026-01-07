// app/sitemap.ts
import type { MetadataRoute } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import destinations from '@/data/destinations.json';

/**
 * 🗺️ Sitemap 2025 — Bilingue (FR/EN)
 * Inclut : pages principales, destinations, articles de blog
 * Génère les URLs FR et EN avec alternates hreflang
 */

const SITE_URL_FR =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://goquebecan.com';

const SITE_URL_EN = SITE_URL_FR.endsWith('/') ? `${SITE_URL_FR}en` : `${SITE_URL_FR}/en`;

const BLOG_COMPONENTS_DIR = path.join(process.cwd(), 'src', 'components', 'blogpost');

/* ========================================
   ⚙️ Helpers
   ======================================== */

async function safeStat(p: string) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

function fileNameToSlug(fileName: string): string | null {
  const base = fileName.replace(/\.(tsx?|mdx|jsx|md)$/i, '');
  if (!base.startsWith('BlogArticle')) return null;
  const core = base.replace(/^BlogArticle/, '');
  if (!core) return null;
  return core
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function dedupe(items: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.url)) return false;
    seen.add(i.url);
    return true;
  });
}

function byLastModifiedDesc(a: MetadataRoute.Sitemap[number], b: MetadataRoute.Sitemap[number]) {
  return new Date(b.lastModified ?? 0).getTime() - new Date(a.lastModified ?? 0).getTime();
}

/* ========================================
   🧭 Générateurs de routes
   ======================================== */

function getMainRoutes(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const MAIN_PAGES = [
    '/',
    '/blog',
    '/destinations',
    '/producteurs',
    '/planificateur',
    '/objets',
    '/offres',
    '/videos',
    '/vols',
    '/vr',
    '/camping',
    '/experiences',
    '/itineraires-communaute',
    '/contact',
    '/notre-mission',
    '/conditions-utilisation',
    '/mentions-legales',
    '/confidentialite',
    '/accessibilite',
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const path of MAIN_PAGES) {
    routes.push({
      url: `${SITE_URL_FR}${path}`,
      lastModified: now,
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'fr-CA': `${SITE_URL_FR}${path}`,
          'en-CA': `${SITE_URL_EN}${path}`,
        },
      },
    });

    routes.push({
      url: `${SITE_URL_EN}${path}`,
      lastModified: now,
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      alternates: {
        languages: {
          'fr-CA': `${SITE_URL_FR}${path}`,
          'en-CA': `${SITE_URL_EN}${path}`,
        },
      },
    });
  }

  return routes;
}

function getDestinationRoutes(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return (destinations as Array<{ slug: string; updatedAt?: string }>).flatMap((d) => {
    const fr = `${SITE_URL_FR}/destinations/${d.slug}`;
    const en = `${SITE_URL_EN}/destinations/${d.slug}`;
    return [
      {
        url: fr,
        lastModified: d.updatedAt ?? now,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: { 'fr-CA': fr, 'en-CA': en } },
      },
      {
        url: en,
        lastModified: d.updatedAt ?? now,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: { 'fr-CA': fr, 'en-CA': en } },
      },
    ];
  });
}

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_COMPONENTS_DIR);
  } catch {
    return [];
  }

  const now = new Date().toISOString();
  const routes: MetadataRoute.Sitemap = [];

  for (const file of files) {
    if (!/\.(tsx?|mdx|jsx|md)$/i.test(file)) continue;
    const slug = fileNameToSlug(file);
    if (!slug) continue;

    const fullPath = path.join(BLOG_COMPONENTS_DIR, file);
    const stat = await safeStat(fullPath);
    const lastModified = stat?.mtime?.toISOString() ?? now;

    const fr = `${SITE_URL_FR}/blog/${slug}`;
    const en = `${SITE_URL_EN}/blog/${slug}`;

    routes.push({
      url: fr,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: { 'fr-CA': fr, 'en-CA': en } },
    });
    routes.push({
      url: en,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: { 'fr-CA': fr, 'en-CA': en } },
    });
  }

  return routes;
}

/* ========================================
   🗺️ Sitemap principal
   ======================================== */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [mainRoutes, destinationRoutes, blogRoutes] = await Promise.all([
    Promise.resolve(getMainRoutes()),
    Promise.resolve(getDestinationRoutes()),
    getBlogRoutes(),
  ]);

  const allRoutes = dedupe([...mainRoutes, ...destinationRoutes, ...blogRoutes]).sort(
    byLastModifiedDesc,
  );

  return allRoutes;
}
