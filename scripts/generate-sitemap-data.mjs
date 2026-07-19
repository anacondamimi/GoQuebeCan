import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/**
 * Charge .env.local (puis .env) dans process.env, sans dépendance externe.
 * Utile car `node script.mjs` ne lit PAS ces fichiers automatiquement
 * (contrairement à Next.js). Ne réécrase pas une variable déjà définie.
 */
function loadEnvFiles() {
  const files = ['.env.local', '.env'];

  for (const file of files) {
    const full = path.join(ROOT, file);
    if (!fsSync.existsSync(full)) continue;

    const raw = fsSync.readFileSync(full, 'utf8');

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();

      // retire les guillemets englobants éventuels
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (key && !(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}

loadEnvFiles();
const APP_DIR = path.join(ROOT, 'app');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');
const OUT_DIR = path.join(SRC_DIR, 'generated');
const OUT_FILE = path.join(OUT_DIR, 'sitemap-data.json');

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.goquebecan.com'
).replace(/\/+$/, '');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const PAGE_FILES = new Set(['page.tsx', 'page.ts', 'page.jsx', 'page.js']);

const EXCLUDED_SEGMENTS = new Set(['api', 'admin', 'expansion', 'lib']);

const EXCLUDED_ROUTES = new Set([
  '/ia-mathieu',
  '/static-page',
  '/test-youtube',
  '/stats',
  '/destinations-monde',
  '/destinations-monde/slug',
  '/experiences',
  '/objets',
  '/blog',
]);

const STATIC_LASTMOD = '2025-10-26T17:55:55.740Z';

function normalizeRoute(route) {
  if (!route) return '/';

  let value = String(route).trim();
  if (!value.startsWith('/')) value = `/${value}`;

  value = value.replace(/\/+/g, '/');

  if (value.length > 1) {
    value = value.replace(/\/+$/, '');
  }

  return value;
}

function isAllowedRoute(route) {
  if (!route) return false;

  const normalized = normalizeRoute(route);
  const invalidSegments = ['slug', 'undefined', 'null', '[slug]'];

  if (EXCLUDED_ROUTES.has(normalized)) return false;
  if (normalized.startsWith('/api')) return false;
  if (normalized.startsWith('/admin')) return false;
  if (normalized.startsWith('/expansion')) return false;
  if (normalized.includes('[') || normalized.includes(']')) return false;

  if (invalidSegments.some((segment) => normalized.includes(`/${segment}`))) {
    return false;
  }

  return true;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getFileMTime(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toISOString();
  } catch {
    return null;
  }
}

function isRouteGroup(segment) {
  return segment.startsWith('(') && segment.endsWith(')');
}

function isPrivateSegment(segment) {
  return segment.startsWith('_');
}

function isDynamicSegment(segment) {
  return /^\[.*\]$/.test(segment);
}

function hasExcludedSegment(parts) {
  return parts.some((segment) => EXCLUDED_SEGMENTS.has(segment));
}

async function walk(dir, files = []) {
  let entries = [];

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_SEGMENTS.has(entry.name)) continue;
      if (isPrivateSegment(entry.name)) continue;

      await walk(full, files);
      continue;
    }

    if (PAGE_FILES.has(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

function routeFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  const parts = rel.split(path.sep);

  const fileName = parts.at(-1);
  if (!fileName || !PAGE_FILES.has(fileName)) return null;

  const rawSegments = parts.slice(0, -1);

  if (hasExcludedSegment(rawSegments)) return null;
  if (rawSegments.some(isPrivateSegment)) return null;
  if (rawSegments.some(isDynamicSegment)) return null;

  const routeSegments = rawSegments.filter((segment) => !isRouteGroup(segment));
  const route = normalizeRoute(`/${routeSegments.join('/') || ''}`);

  if (!isAllowedRoute(route)) return null;

  return route;
}

async function findPageFileForRoute(route) {
  const normalized = normalizeRoute(route);

  if (normalized === '/') {
    const rootCandidates = [
      path.join(APP_DIR, 'page.tsx'),
      path.join(APP_DIR, 'page.ts'),
      path.join(APP_DIR, 'page.jsx'),
      path.join(APP_DIR, 'page.js'),
    ];

    for (const candidate of rootCandidates) {
      if (await exists(candidate)) return candidate;
    }

    return null;
  }

  const routeWithoutSlash = normalized.replace(/^\/+/, '');

  const candidates = [
    path.join(APP_DIR, routeWithoutSlash, 'page.tsx'),
    path.join(APP_DIR, routeWithoutSlash, 'page.ts'),
    path.join(APP_DIR, routeWithoutSlash, 'page.jsx'),
    path.join(APP_DIR, routeWithoutSlash, 'page.js'),
  ];

  for (const candidate of candidates) {
    if (await exists(candidate)) return candidate;
  }

  return null;
}

/**
 * Extrait les slugs de blog depuis componentMap.ts.
 *
 * ⚠️ Ne parse QUE les clés du bloc `const componentMap: ... = { ... }`,
 * pas tout le fichier (l'ancienne version ramassait aussi des clés hors-objet
 * via des regex trop larges). BLOG_SLUGS = Object.keys(componentMap) reste la
 * source unique de vérité côté app ; on la reproduit fidèlement ici.
 */
function extractBlogSlugsFromComponentMap(raw) {
  const slugs = new Set();

  // Isole le corps de l'objet componentMap = { ... };
  const objectMatch = raw.match(/componentMap[^=]*=\s*\{([\s\S]*?)\n\}\s*;/);
  const body = objectMatch ? objectMatch[1] : raw;

  // Chaque entrée est de la forme  'slug': () => import(...)  ou  slug: () => import(...)
  // On ne capture que les clés suivies de `() => import`
  const entryRegex = /(?:^|,|\{)\s*['"`]?([a-z0-9][a-z0-9-]*)['"`]?\s*:\s*\(\s*\)\s*=>\s*import/gim;

  let match;
  while ((match = entryRegex.exec(body)) !== null) {
    slugs.add(match[1]);
  }

  return [...slugs].sort((a, b) => a.localeCompare(b, 'fr'));
}

async function readProducerRegionRoutes() {
  const producerRegions = [
    'abitibi-temiscamingue',
    'bas-saint-laurent',
    'cantons-de-lest',
    'centre-du-quebec',
    'charlevoix',
    'cote-nord',
    'gaspesie',
    'lanaudiere',
    'laurentides',
    'mauricie',
    'montreal',
    'nord-du-quebec',
    'outaouais',
    'saguenay-lac-saint-jean',
    'ville-de-quebec',
  ];

  return producerRegions.map((slug) => ({
    route: normalizeRoute(`/producteurs/${slug}`),
    lastModified: STATIC_LASTMOD,
  }));
}

async function readBlogRoutes() {
  const routes = new Map();

  const componentMapPath = path.join(SRC_DIR, 'lib', 'blog', 'componentMap.ts');

  if (await exists(componentMapPath)) {
    const sourceMTime = await getFileMTime(componentMapPath);

    try {
      const raw = await fs.readFile(componentMapPath, 'utf8');
      const slugs = extractBlogSlugsFromComponentMap(raw);

      if (slugs.length === 0) {
        console.warn('⚠️  Aucun slug extrait de componentMap.ts — vérifie le format du fichier.');
      }

      for (const slug of slugs) {
        const route = normalizeRoute(`/blog/${slug}`);
        if (!isAllowedRoute(route)) continue;

        routes.set(route, { route, lastModified: sourceMTime });
      }
    } catch (error) {
      console.warn('componentMap.ts read error:', error);
    }
  } else {
    console.warn(`⚠️  componentMap.ts introuvable à ${componentMapPath}`);
  }

  // Complément : dossiers statiques app/blog/<name>/page.tsx (articles hors componentMap)
  const blogDir = path.join(APP_DIR, 'blog');

  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const name = entry.name;
      if (name.startsWith('[')) continue;
      if (isRouteGroup(name)) continue;
      if (isPrivateSegment(name)) continue;

      const pageCandidates = [
        path.join(blogDir, name, 'page.tsx'),
        path.join(blogDir, name, 'page.ts'),
        path.join(blogDir, name, 'page.jsx'),
        path.join(blogDir, name, 'page.js'),
      ];

      let pageFile = null;
      for (const candidate of pageCandidates) {
        if (await exists(candidate)) {
          pageFile = candidate;
          break;
        }
      }

      if (!pageFile) continue;

      const route = normalizeRoute(`/blog/${name}`);
      if (!isAllowedRoute(route)) continue;

      routes.set(route, { route, lastModified: await getFileMTime(pageFile) });
    }
  } catch {
    // pas de dossier app/blog, on ignore
  }

  return [...routes.values()].sort((a, b) => a.route.localeCompare(b.route, 'fr'));
}

async function readCommunityRoutes() {
  if (!SUPABASE_URL) return [];

  const apiKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!apiKey) return [];

  const url =
    `${SUPABASE_URL}/rest/v1/community_itineraries` +
    `?select=slug,created_at,approved_at&status=eq.approved&slug=not.is.null`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      let body = '';
      try {
        body = await res.text();
      } catch {
        // ignore
      }
      console.warn(
        `community_itineraries fetch failed: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`,
      );
      console.warn(
        `  (clé utilisée: ${SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE' : SUPABASE_ANON_KEY ? 'ANON' : 'AUCUNE'})`,
      );
      return [];
    }

    const rows = await res.json();
    if (!Array.isArray(rows)) return [];

    return rows
      .map((row) => ({
        route: normalizeRoute(`/partage/${row.slug}`),
        lastModified: row.approved_at || row.created_at || null,
      }))
      .filter((item) => item.route && item.route !== '/itineraires-communaute')
      .filter((item) => isAllowedRoute(item.route))
      .sort((a, b) => a.route.localeCompare(b.route, 'fr'));
  } catch (error) {
    console.warn('community_itineraries fetch error:', error);
    return [];
  }
}

function getSeoMetaForRoute(route) {
  if (route.startsWith('/producteurs/')) {
    return { changeFrequency: 'weekly', priority: 0.78 };
  }
  if (route === '/') {
    return { changeFrequency: 'daily', priority: 1.0 };
  }
  if (route.startsWith('/partage/')) {
    return { changeFrequency: 'weekly', priority: 0.7 };
  }
  if (route === '/blog') {
    return { changeFrequency: 'daily', priority: 0.9 };
  }
  if (route === '/destinations') {
    return { changeFrequency: 'weekly', priority: 0.9 };
  }
  if (route === '/planificateur') {
    return { changeFrequency: 'weekly', priority: 0.9 };
  }
  if (route.startsWith('/blog/')) {
    return { changeFrequency: 'weekly', priority: 0.82 };
  }
  if (route.startsWith('/destinations/')) {
    return { changeFrequency: 'weekly', priority: 0.75 };
  }
  if (route.startsWith('/itineraires-communaute/')) {
    return { changeFrequency: 'weekly', priority: 0.7 };
  }
  if (
    [
      '/producteurs',
      '/objets',
      '/offres',
      '/videos',
      '/vols',
      '/camping',
      '/experiences',
      '/itineraires-communaute',
      '/coups-de-coeur',
      '/coups-de-coeur/anamimizen',
    ].includes(route)
  ) {
    return { changeFrequency: 'weekly', priority: 0.8 };
  }
  if (['/contact', '/notre-mission'].includes(route)) {
    return { changeFrequency: 'monthly', priority: 0.6 };
  }
  if (
    ['/conditions-utilisation', '/mentions-legales', '/confidentialite', '/accessibilite'].includes(
      route,
    )
  ) {
    return { changeFrequency: 'yearly', priority: 0.3 };
  }

  return { changeFrequency: 'monthly', priority: 0.6 };
}

async function findImageForRoute(route) {
  const slug = route.split('/').pop();
  if (!slug) return null;

  const candidates = [
    path.join(PUBLIC_DIR, 'images', 'destinations', `${slug}.avif`),
    path.join(PUBLIC_DIR, 'images', 'destinations', `${slug}.webp`),
    path.join(PUBLIC_DIR, 'images', 'destinations', `${slug}.jpg`),
    path.join(PUBLIC_DIR, 'images', `${slug}.avif`),
  ];

  for (const filePath of candidates) {
    if (await exists(filePath)) {
      const relative = `/${path.relative(PUBLIC_DIR, filePath).split(path.sep).join('/')}`;
      return `${SITE_URL}${relative}`;
    }
  }

  return null;
}

async function createEntry(route, overrides = {}) {
  const normalizedRoute = normalizeRoute(route);
  const pageFile = await findPageFileForRoute(normalizedRoute);
  const pageMTime = pageFile ? await getFileMTime(pageFile) : null;
  const seo = getSeoMetaForRoute(normalizedRoute);

  const slug = normalizedRoute.split('/').pop();
  const image = await findImageForRoute(normalizedRoute);

  return {
    route: normalizedRoute,
    lastModified: overrides.lastModified || pageMTime || STATIC_LASTMOD,
    changeFrequency: overrides.changeFrequency || seo.changeFrequency,
    priority: typeof overrides.priority === 'number' ? overrides.priority : seo.priority,
    image,
    imageTitle: image && slug ? `Découvrez ${slug.replace(/-/g, ' ')} au Québec` : null,
  };
}

function dedupeEntries(entries) {
  const map = new Map();

  for (const entry of entries) {
    const route = normalizeRoute(entry.route);

    if (!isAllowedRoute(route)) continue;

    const current = { ...entry, route };
    const existing = map.get(route);

    if (!existing) {
      map.set(route, current);
      continue;
    }

    const existingDate = existing.lastModified ? new Date(existing.lastModified).getTime() : 0;
    const currentDate = current.lastModified ? new Date(current.lastModified).getTime() : 0;

    const newest = currentDate > existingDate ? current : existing;

    map.set(route, {
      ...existing,
      ...newest,
      priority: Math.max(existing.priority || 0, current.priority || 0.6),
      image: existing.image || current.image || null,
      imageTitle: existing.imageTitle || current.imageTitle || null,
    });
  }

  return [...map.values()].sort((a, b) => a.route.localeCompare(b.route, 'fr'));
}

function countByPrefix(entries, prefix) {
  return entries.filter((entry) => entry.route === prefix || entry.route.startsWith(`${prefix}/`))
    .length;
}

async function main() {
  const pageFiles = await walk(APP_DIR);

  const staticRoutes = [
    ...new Set(pageFiles.map(routeFromPageFile).filter(Boolean).filter(isAllowedRoute)),
  ].sort((a, b) => a.localeCompare(b, 'fr'));

  const blogRoutes = await readBlogRoutes();
  const communityRoutes = await readCommunityRoutes();
  const producerRegionRoutes = await readProducerRegionRoutes();

  // NOTE : plus de destinationRoutes.
  // Il n'existe aucune route /destinations/[slug] dynamique, et les anciens
  // destinations.json (src/data + public) ne sont plus importés nulle part.
  // C'était la source des URLs fantômes du sitemap. Seule /destinations (index)
  // existe, et elle est déjà captée par walk() → staticRoutes.

  const staticEntries = await Promise.all(
    staticRoutes
      .filter((route) => !route.startsWith('/blog/'))
      .filter((route) => !route.startsWith('/destinations/'))
      .filter((route) => !route.startsWith('/itineraires-communaute/'))
      .map((route) => createEntry(route)),
  );

  const producerRegionEntries = await Promise.all(
    producerRegionRoutes.map((item) =>
      createEntry(item.route, {
        lastModified: item.lastModified || undefined,
        changeFrequency: 'weekly',
        priority: 0.78,
      }),
    ),
  );

  const blogEntries = await Promise.all(
    blogRoutes.map((item) =>
      createEntry(item.route, {
        lastModified: item.lastModified || undefined,
      }),
    ),
  );

  const communityEntries = await Promise.all(
    communityRoutes.map((item) =>
      createEntry(item.route, {
        lastModified: item.lastModified || undefined,
      }),
    ),
  );

  const allEntries = [
    ...staticEntries,
    ...blogEntries,
    ...communityEntries,
    ...producerRegionEntries,
  ];
  const entries = dedupeEntries(allEntries);

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    counts: {
      static: staticEntries.length,
      blog: blogEntries.length,
      community: communityEntries.length,
      producerRegions: producerRegionEntries.length,
      totalBeforeDedupe: allEntries.length,
      total: entries.length,
      duplicatesRemoved: allEntries.length - entries.length,
      withImages: entries.filter((entry) => Boolean(entry.image)).length,
      withoutImages: entries.filter((entry) => !entry.image).length,
      blogFinal: countByPrefix(entries, '/blog'),
      communityFinal: countByPrefix(entries, '/itineraires-communaute'),
      producerRegionsFinal: countByPrefix(entries, '/producteurs'),
    },
    entries,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`✅ Sitemap data generated: ${OUT_FILE}`);
  console.log(payload.counts);
}

main().catch((error) => {
  console.error('❌ generate-sitemap-data failed');
  console.error(error);
  process.exit(1);
});
