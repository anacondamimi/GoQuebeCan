/**
 * Génère un sitemap.xml statique dans /public/
 * Commande : pnpm tsx scripts/generate-sitemap-xml.ts
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import destinations from '../src/data/destinations.json' assert { type: 'json' };

const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.goquebecan.com';

const BLOG_DIR = path.join(process.cwd(), 'src', 'components', 'blogpost');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

// Routes principales
const MAIN_PAGES: string[] = [
  '/',
  '/accessibilite',
  '/blog',
  '/camping',
  '/conditions-utilisation',
  '/confidentialite',
  '/contact',
  '/destinations',
  '/experiences',
  '/ia-mathieu',
  '/itineraires-communaute',
  '/mentions-legales',
  '/notre-mission',
  '/objets',
  '/offres',
  '/planificateur',
  '/producteurs',
  '/videos',
  '/vols',
  '/vr',
];

/** Convertit BlogArticleQuébec.tsx → quebec */
function fileNameToSlug(fileName: string): string | null {
  const base = fileName.replace(/\.(tsx?|mdx|jsx|md)$/i, '');
  if (!base.startsWith('BlogArticle')) return null;
  const core = base.replace(/^BlogArticle/, '');
  if (!core) return null;
  const withSpaces = core
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return withSpaces
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function safeStat(p: string) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

/** Récupère les articles blog depuis le dossier blogpost */
async function getBlogRoutes(): Promise<{ loc: string; lastmod: string }[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    console.warn('⚠️ Dossier blogpost non trouvé — aucun article ajouté au sitemap');
    return [];
  }

  const routes = [];
  for (const file of files) {
    if (!/\.(tsx?|mdx|jsx|md)$/i.test(file)) continue;
    const slug = fileNameToSlug(file);
    if (!slug) continue;

    const full = path.join(BLOG_DIR, file);
    const stat = await safeStat(full);
    const lastmod = stat?.mtime?.toISOString() ?? new Date().toISOString();

    routes.push({
      loc: `${SITE_URL}/blog/${slug}`,
      lastmod,
    });
  }
  return routes;
}

/** Génération du XML complet */
async function generateSitemapXML() {
  const now = new Date().toISOString();

  // Pages principales
  const mainRoutes = MAIN_PAGES.map((url) => ({
    loc: `${SITE_URL}${url}`,
    lastmod: now,
  }));

  // Destinations (depuis ton JSON)
  const destinationRoutes = (destinations as Array<{ slug: string; updatedAt?: string }>).map(
    (d) => ({
      loc: `${SITE_URL}/destinations/${d.slug}`,
      lastmod: d.updatedAt ?? now,
    }),
  );

  // Blog
  const blogRoutes = await getBlogRoutes();

  // Fusionner & dédoublonner
  const allRoutes = [...mainRoutes, ...destinationRoutes, ...blogRoutes].filter(
    (r, i, arr) => arr.findIndex((x) => x.loc === r.loc) === i,
  );

  // Construction XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  await fs.writeFile(OUTPUT_FILE, xml, 'utf-8');
  console.log(`✅ Sitemap généré avec ${allRoutes.length} URLs → ${OUTPUT_FILE}`);
}

// Exécution
generateSitemapXML().catch((err) => {
  console.error('❌ Erreur lors de la génération du sitemap:', err);
  process.exit(1);
});
