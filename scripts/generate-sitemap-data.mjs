import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
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

const EXCLUDED_SEGMENTS = new Set(['api', 'admin', 'expansion']);

const EXCLUDED_ROUTES = new Set(['/ia-mathieu', '/static-page']);

function normalizeRoute(route) {
  if (!route) return '/';
  let value = String(route).trim();
  if (!value.startsWith('/')) value = `/${value}`;
  value = value.replace(/\/+/g, '/');
  if (value.length > 1) value = value.replace(/\/+$/, '');
  return value;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function shouldIgnoreSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith('(') && segment.endsWith(')')) return true; // route groups
  if (segment.startsWith('_')) return true;
  if (EXCLUDED_SEGMENTS.has(segment)) return true;
  return false;
}

function isDynamicSegment(segment) {
  return /^\[.*\]$/.test(segment);
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

  const segments = parts.slice(0, -1).filter((seg) => !shouldIgnoreSegment(seg));

  if (segments.some(isDynamicSegment)) return null;

  const route = normalizeRoute(`/${segments.join('/') || ''}`);

  if (EXCLUDED_ROUTES.has(route)) return null;
  if (route.startsWith('/expansion')) return null;

  return route;
}

function normalizeSlug(input) {
  if (!input || typeof input !== 'string') return '';

  const noHost = input.replace(/^https?:\/\/[^/]+/i, '');
  const noQuery = noHost.split('?')[0]?.split('#')[0] ?? '';
  const clean = noQuery.trim().replace(/^\/+/, '').replace(/\/+$/, '');

  const m = clean.match(/^destinations\/(.+)$/i);
  if (m?.[1]) return m[1].trim();

  return clean;
}

async function readJsonSafe(filePath, fallback = null) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function readDestinationRoutes() {
  const filePath = path.join(PUBLIC_DIR, 'destinations.json');
  const data = await readJsonSafe(filePath, []);
  if (!Array.isArray(data)) return [];

  const routes = new Set();

  for (const item of data) {
    const candidates = [item?.slug, item?.href, item?.url, item?.path].filter(Boolean);

    for (const candidate of candidates) {
      const slug = normalizeSlug(candidate);
      if (!slug) continue;
      if (slug.toLowerCase().startsWith('en/')) continue;

      if (!slug.includes('/')) {
        routes.add(normalizeRoute(`/destinations/${slug}`));
      } else if (slug.toLowerCase().startsWith('destinations/')) {
        routes.add(normalizeRoute(`/${slug}`));
      }
    }
  }

  return [...routes].sort((a, b) => a.localeCompare(b, 'fr'));
}

async function readBlogRoutes() {
  const routes = new Set();

  const possibleSources = [
    path.join(SRC_DIR, 'data', 'blog-slugs.ts'),
    path.join(SRC_DIR, 'components', 'blog', 'blogSlugs.server.ts'),
  ];

  for (const filePath of possibleSources) {
    if (!(await exists(filePath))) continue;

    try {
      const raw = await fs.readFile(filePath, 'utf8');

      // Cherche les chaînes simples dans un tableau/export
      const matches = [...raw.matchAll(/['"`]([a-z0-9-]+)['"`]/gi)]
        .map((m) => m[1])
        .filter(Boolean);

      for (const slug of matches) {
        if (
          ['use', 'client', 'server', 'blog', 'slug', 'slugs', 'default'].includes(
            slug.toLowerCase(),
          )
        ) {
          continue;
        }

        routes.add(normalizeRoute(`/blog/${slug}`));
      }
    } catch {
      // continue
    }
  }

  // Fallback sécurité : dossiers blog statiques directement dans app/blog
  const blogDir = path.join(APP_DIR, 'blog');
  try {
    const entries = await fs.readdir(blogDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      if (name.startsWith('[')) continue;
      if (name.startsWith('(')) continue;

      const hasPage =
        (await exists(path.join(blogDir, name, 'page.tsx'))) ||
        (await exists(path.join(blogDir, name, 'page.ts'))) ||
        (await exists(path.join(blogDir, name, 'page.jsx'))) ||
        (await exists(path.join(blogDir, name, 'page.js')));

      if (hasPage) {
        routes.add(normalizeRoute(`/blog/${name}`));
      }
    }
  } catch {
    // ignore
  }

  return [...routes].sort((a, b) => a.localeCompare(b, 'fr'));
}

async function readCommunityRoutes() {
  if (!SUPABASE_URL) return [];
  const apiKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!apiKey) return [];

  const url =
    `${SUPABASE_URL}/rest/v1/community_itineraries` +
    `?select=slug,created_at&status=eq.approved&slug=not.is.null`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      console.warn(`community_itineraries fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const rows = await res.json();
    if (!Array.isArray(rows)) return [];

    return rows
      .map((row) => ({
        route: normalizeRoute(`/partage/${row.slug}`),
        lastModified: row.created_at || null,
      }))
      .filter((item) => item.route && item.route !== '/partage')
      .sort((a, b) => a.route.localeCompare(b.route, 'fr'));
  } catch (error) {
    console.warn('community_itineraries fetch error:', error);
    return [];
  }
}

function withMeta(route, overrides = {}) {
  return {
    route,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
    ...overrides,
  };
}

async function main() {
  const pageFiles = await walk(APP_DIR);
  const staticRoutes = [...new Set(pageFiles.map(routeFromPageFile).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'fr'),
  );

  const destinationRoutes = await readDestinationRoutes();
  const blogRoutes = await readBlogRoutes();
  const communityRoutes = await readCommunityRoutes();

  const staticEntries = staticRoutes
    .filter((route) => !route.startsWith('/blog/'))
    .filter((route) => !route.startsWith('/destinations/'))
    .filter((route) => !route.startsWith('/partage/'))
    .map((route) => {
      if (route === '/') {
        return withMeta(route, { changeFrequency: 'daily', priority: 1.0 });
      }

      if (['/blog', '/destinations', '/planificateur'].includes(route)) {
        return withMeta(route, { changeFrequency: 'weekly', priority: 0.85 });
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
        return withMeta(route, { changeFrequency: 'weekly', priority: 0.8 });
      }

      if (['/contact', '/notre-mission'].includes(route)) {
        return withMeta(route, { changeFrequency: 'monthly', priority: 0.6 });
      }

      if (
        [
          '/conditions-utilisation',
          '/mentions-legales',
          '/confidentialite',
          '/accessibilite',
        ].includes(route)
      ) {
        return withMeta(route, { changeFrequency: 'yearly', priority: 0.3 });
      }

      return withMeta(route);
    });

  const destinationEntries = destinationRoutes.map((route) =>
    withMeta(route, { changeFrequency: 'weekly', priority: 0.7 }),
  );

  const blogEntries = blogRoutes.map((route) =>
    withMeta(route, { changeFrequency: 'monthly', priority: 0.65 }),
  );

  const communityEntries = communityRoutes.map((item) =>
    withMeta(item.route, {
      lastModified: item.lastModified || new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  );

  const allEntries = [...staticEntries, ...destinationEntries, ...blogEntries, ...communityEntries]
    .filter((entry) => !EXCLUDED_ROUTES.has(entry.route))
    .filter((entry) => !entry.route.startsWith('/expansion'))
    .sort((a, b) => a.route.localeCompare(b.route, 'fr'));

  const deduped = [];
  const seen = new Set();

  for (const entry of allEntries) {
    if (seen.has(entry.route)) continue;
    seen.add(entry.route);
    deduped.push(entry);
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    counts: {
      static: staticEntries.length,
      destinations: destinationEntries.length,
      blog: blogEntries.length,
      community: communityEntries.length,
      total: deduped.length,
    },
    entries: deduped,
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
