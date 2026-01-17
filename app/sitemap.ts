// app/sitemap.ts
import type { MetadataRoute } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Sitemap FR uniquement.
 * Objectif: fournir a Google une liste canonique (sans redirections, sans /en, sans hreflang).
 */

// IMPORTANT: met ici le domaine CANONIQUE (celui qui sert les pages sans rediriger).
// D'apres tes traces (308 vers www), on privilegie www.
const SITE_URL = (() => {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.goquebecan.com';

  return raw.replace(/\/+$/, '');
})();

function abs(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // encodeURI garde les / mais encode les espaces et caracteres speciaux si jamais.
  return encodeURI(`${SITE_URL}${clean}`);
}

type DestinationsJsonItem = {
  slug?: string;
  href?: string;
  url?: string;
  path?: string;
};

function normalizeSlug(input: string): string {
  // Retire le domaine si jamais on a une URL complete.
  const noHost = input.replace(/^https?:\/\/[^/]+/i, '');

  // Retire query/hash
  const noQuery = noHost.split('?')[0]?.split('#')[0] ?? '';

  // Cas: /destinations/xyz
  const m = noQuery.match(/\/destinations\/(.+)$/i);
  const candidate = (m?.[1] ?? noQuery).trim();

  return candidate.replace(/^\/+/, '').replace(/\/+$/, '');
}

async function readDestinationsSlugs(): Promise<string[]> {
  // Lecture depuis /public pour eviter les soucis d'alias TS/Next.
  const filePath = path.join(process.cwd(), 'public', 'destinations.json');

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw) as unknown;

    if (!Array.isArray(data)) return [];

    const slugs = new Set<string>();

    for (const item of data as DestinationsJsonItem[]) {
      const candidates = [item.slug, item.href, item.url, item.path].filter(Boolean) as string[];

      for (const c of candidates) {
        const s = normalizeSlug(c);
        if (!s) continue;

        // Protection: pas de /en, pas de chemins hors destinations
        if (s.toLowerCase().startsWith('en/')) continue;
        if (s.toLowerCase().startsWith('destinations/')) {
          slugs.add(s.slice('destinations/'.length));
          continue;
        }

        // Slug simple (ex: "tadoussac")
        if (!s.includes('/')) {
          slugs.add(s);
          continue;
        }

        // Si on a autre chose que "xxx/yyy" on ignore (pour ne pas polluer le sitemap).
      }
    }

    return [...slugs]
      .map((s) => s.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, 'fr'));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Astuce SEO: pour les sitemaps, une date cohérente est suffisante.
  // Mettre "now" sur tout chaque build peut donner l'impression que tout change tout le temps.
  // Ici on met la date du build, mais tu peux aussi calculer par page si tu veux plus fin.
  const buildDate = new Date();

  const staticPaths: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'daily', priority: 1 },

    // Hub pages
    { path: '/destinations', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/planificateur', changeFrequency: 'weekly', priority: 0.85 },

    // Pages business / navigation
    { path: '/producteurs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/objets', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/offres', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/videos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/vols', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/vr', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/camping', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/experiences', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/itineraires-communaute', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/notre-mission', changeFrequency: 'monthly', priority: 0.6 },

    // Pages legales (crawl ok, mais priorite plus faible)
    { path: '/conditions-utilisation', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/mentions-legales', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/confidentialite', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/accessibilite', changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Blog slugs (si tu peux, idealement automatise via une source de verite)
  const blogSlugs = [
    'accessibilite',
    'anse-saint-jean',
    'baie-saint-paul',
    'bic',
    'bromont-granby',
    'canyon',
    'carleton',
    'eeyou-istchee',
    'forillon',
    'gaspesie',
    'grand-bend',
    'hautes-gorges',
    'kamouraska',
    'kuururjuaq',
    'levis',
    'location-vr',
    'location-vr-comparatif',
    'magog-orford',
    'massif',
    'mingan',
    'montmorency',
    'montreal',
    'orleans',
    'parc-aquatique',
    'perce',
    'port-au-persil',
    'port-cartier',
    'port-dover',
    'quebec',
    'rivieredu-loup',
    'road-trip-quebec',
    'sabrevois',
    'saguenay',
    'sandbanks',
    'sauble-beach',
    'sept-iles',
    'sherbrooke',
    'singing-sands',
    'tadoussac',
    'voyage-avion',
    'voyage-camping',
    'voyage-hotel',
    'voyage-voiture',
    'wasaga-beach',
  ]
    .map((s) => s.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'fr'));

  const destinationSlugs = await readDestinationsSlugs();

  const entries: MetadataRoute.Sitemap = [];

  // 1) Pages statiques
  for (const p of staticPaths) {
    entries.push({
      url: abs(p.path),
      lastModified: buildDate,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    });
  }

  // 2) Pages Destinations
  for (const slug of destinationSlugs) {
    // securite: on n'ajoute jamais /en/
    if (slug.toLowerCase().startsWith('en/')) continue;

    entries.push({
      url: abs(`/destinations/${slug}`),
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // 3) Pages Blog
  for (const slug of blogSlugs) {
    entries.push({
      url: abs(`/blog/${slug}`),
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Dedupe finale (au cas ou)
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
