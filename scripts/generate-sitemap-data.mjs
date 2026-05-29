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

async function readJsonSafe(filePath, fallback = null) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
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

function normalizeSlug(input) {
  if (!input || typeof input !== 'string') return '';

  const noHost = input.replace(/^https?:\/\/[^/]+/i, '');
  const noQuery = noHost.split('?')[0]?.split('#')[0] ?? '';
  const clean = noQuery.trim().replace(/^\/+/, '').replace(/\/+$/, '');

  const destinationMatch = clean.match(/^destinations\/(.+)$/i);
  if (destinationMatch?.[1]) return destinationMatch[1].trim();

  const blogMatch = clean.match(/^blog\/(.+)$/i);
  if (blogMatch?.[1]) return blogMatch[1].trim();

  return clean;
}

async function readDestinationRoutes() {
  const possibleFiles = [
    path.join(PUBLIC_DIR, 'destinations.json'),
    path.join(SRC_DIR, 'data', 'destinations.json'),
  ];

  const routes = new Map();

  for (const filePath of possibleFiles) {
    const data = await readJsonSafe(filePath, []);
    if (!Array.isArray(data)) continue;

    const sourceMTime = await getFileMTime(filePath);

    for (const item of data) {
      const candidates = [item?.slug, item?.href, item?.url, item?.path].filter(Boolean);

      for (const candidate of candidates) {
        const slug = normalizeSlug(candidate);
        if (!slug) continue;
        if (slug.toLowerCase().startsWith('en/')) continue;

        const route = slug.includes('/')
          ? normalizeRoute(`/${slug}`)
          : normalizeRoute(`/blog/${slug}`);

        if (!route.startsWith('/blog/')) continue;
        if (!isAllowedRoute(route)) continue;

        routes.set(route, {
          route,
          lastModified:
            item?.lastModified || item?.updatedAt || item?.modifiedTime || sourceMTime || null,
        });
      }
    }
  }

  return [...routes.values()].sort((a, b) => a.route.localeCompare(b.route, 'fr'));
}

function extractSlugsFromSource(raw) {
  return [...raw.matchAll(/['"`]([a-z0-9][a-z0-9-]{1,})['"`]/gi)]
    .map((match) => match[1])
    .filter(Boolean)
    .filter((slug) => {
      const lower = slug.toLowerCase();

      return ![
        'use',
        'client',
        'server',
        'blog',
        'slug',
        'slugs',
        'default',
        'true',
        'false',
      ].includes(lower);
    });
}

async function readBlogRoutes() {
  const routes = new Map();

  const possibleSources = [
    path.join(SRC_DIR, 'data', 'blog-slugs.ts'),
    path.join(SRC_DIR, 'components', 'blog', 'blogSlugs.server.ts'),
  ];

  for (const filePath of possibleSources) {
    if (!(await exists(filePath))) continue;

    const sourceMTime = await getFileMTime(filePath);

    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const slugs = extractSlugsFromSource(raw);

      for (const slug of slugs) {
        const route = normalizeRoute(`/blog/${slug}`);
        if (!isAllowedRoute(route)) continue;

        routes.set(route, {
          route,
          lastModified: sourceMTime,
        });
      }
    } catch {
      // ignore
    }
  }

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

      routes.set(route, {
        route,
        lastModified: await getFileMTime(pageFile),
      });
    }
  } catch {
    // ignore
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
      console.warn(`community_itineraries fetch failed: ${res.status} ${res.statusText}`);
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
  if (route === '/') {
    return {
      changeFrequency: 'daily',
      priority: 1.0,
    };
  }
if (route.startsWith('/partage/')) {
  return {
    changeFrequency: 'weekly',
    priority: 0.7,
  };
}
  if (route === '/blog') {
    return {
      changeFrequency: 'daily',
      priority: 0.9,
    };
  }

  if (route === '/destinations') {
    return {
      changeFrequency: 'weekly',
      priority: 0.9,
    };
  }

  if (route === '/planificateur') {
    return {
      changeFrequency: 'weekly',
      priority: 0.9,
    };
  }

  if (route.startsWith('/blog/')) {
    return {
      changeFrequency: 'weekly',
      priority: 0.82,
    };
  }

  if (route.startsWith('/destinations/')) {
    return {
      changeFrequency: 'weekly',
      priority: 0.75,
    };
  }

  if (route.startsWith('/itineraires-communaute/')) {
    return {
      changeFrequency: 'weekly',
      priority: 0.7,
    };
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
    return {
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  }

  if (['/contact', '/notre-mission'].includes(route)) {
    return {
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  }

  if (
    ['/conditions-utilisation', '/mentions-legales', '/confidentialite', '/accessibilite'].includes(
      route,
    )
  ) {
    return {
      changeFrequency: 'yearly',
      priority: 0.3,
    };
  }

  return {
    changeFrequency: 'monthly',
    priority: 0.6,
  };
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

    const current = {
      ...entry,
      route,
    };

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

  const destinationRoutes = await readDestinationRoutes();
  const blogRoutes = await readBlogRoutes();
  const communityRoutes = await readCommunityRoutes();

  const staticEntries = await Promise.all(
    staticRoutes
      .filter((route) => !route.startsWith('/blog/'))
      .filter((route) => !route.startsWith('/destinations/'))
      .filter((route) => !route.startsWith('/itineraires-communaute/'))
      .map((route) => createEntry(route)),
  );

  const destinationEntries = await Promise.all(
    destinationRoutes.map((item) =>
      createEntry(item.route, {
        lastModified: item.lastModified || undefined,
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

  const allEntries = [...staticEntries, ...destinationEntries, ...blogEntries, ...communityEntries];
  const entries = dedupeEntries(allEntries);

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    counts: {
      static: staticEntries.length,
      destinations: destinationEntries.length,
      blog: blogEntries.length,
      community: communityEntries.length,
      totalBeforeDedupe: allEntries.length,
      total: entries.length,
      duplicatesRemoved: allEntries.length - entries.length,
      withImages: entries.filter((entry) => Boolean(entry.image)).length,
      withoutImages: entries.filter((entry) => !entry.image).length,
      blogFinal: countByPrefix(entries, '/blog'),
      destinationsFinal: countByPrefix(entries, '/destinations'),
      communityFinal: countByPrefix(entries, '/itineraires-communaute'),
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
