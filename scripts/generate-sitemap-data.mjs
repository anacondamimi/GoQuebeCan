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

const STATIC_LASTMOD = '2025-10-26T17:55:55.740Z';

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

async function getFileMTime(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime.toISOString();
  } catch {
    return null;
  }
}

function shouldIgnoreSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith('(') && segment.endsWith(')')) return true;
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

function routeToPageFile(route) {
  if (route === '/') {
    return path.join(APP_DIR, 'page.tsx');
  }

  return path.join(APP_DIR, route.replace(/^\/+/, ''), 'page.tsx');
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

  const routes = new Map();

  for (const item of data) {
    const candidates = [item?.slug, item?.href, item?.url, item?.path].filter(Boolean);

    for (const candidate of candidates) {
      const slug = normalizeSlug(candidate);
      if (!slug) continue;
      if (slug.toLowerCase().startsWith('en/')) continue;

      const route = slug.includes('/')
        ? normalizeRoute(`/${slug}`)
        : normalizeRoute(`/destinations/${slug}`);

      if (!route.startsWith('/destinations/')) continue;

      routes.set(route, {
        route,
        lastModified: item?.lastModified || item?.updatedAt || item?.modifiedTime || null,
      });
    }
  }

  return [...routes.values()].sort((a, b) => a.route.localeCompare(b.route, 'fr'));
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

      const matches = [...raw.matchAll(/['"`]([a-z0-9-]+)['"`]/gi)]
        .map((match) => match[1])
        .filter(Boolean);

      for (const slug of matches) {
        if (
          ['use', 'client', 'server', 'blog', 'slug', 'slugs', 'default'].includes(
            slug.toLowerCase(),
          )
        ) {
          continue;
        }

        const route = normalizeRoute(`/blog/${slug}`);

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
      if (name.startsWith('(')) continue;

      const pageFiles = [
        path.join(blogDir, name, 'page.tsx'),
        path.join(blogDir, name, 'page.ts'),
        path.join(blogDir, name, 'page.jsx'),
        path.join(blogDir, name, 'page.js'),
      ];

      const pageFile = pageFiles.find(async (file) => exists(file));

      const hasPage =
        (await exists(path.join(blogDir, name, 'page.tsx'))) ||
        (await exists(path.join(blogDir, name, 'page.ts'))) ||
        (await exists(path.join(blogDir, name, 'page.jsx'))) ||
        (await exists(path.join(blogDir, name, 'page.js')));

      if (!hasPage) continue;

      const route = normalizeRoute(`/blog/${name}`);
      const lastModified =
        (await getFileMTime(path.join(blogDir, name, 'page.tsx'))) ||
        (await getFileMTime(path.join(blogDir, name, 'page.ts'))) ||
        (await getFileMTime(path.join(blogDir, name, 'page.jsx'))) ||
        (await getFileMTime(path.join(blogDir, name, 'page.js')));

      routes.set(route, {
        route,
        lastModified,
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
      .filter((item) => item.route && item.route !== '/partage')
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
      priority: 0.8,
    };
  }

  if (route.startsWith('/destinations/')) {
    return {
      changeFrequency: 'weekly',
      priority: 0.75,
    };
  }

  if (route.startsWith('/partage/')) {
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

async function createEntry(route, overrides = {}) {
  const pageMTime = await getFileMTime(routeToPageFile(route));
  const seo = getSeoMetaForRoute(route);

  const slug = route.split('/').pop();

  return {
    route,
    lastModified: overrides.lastModified || pageMTime || STATIC_LASTMOD,
    changeFrequency: overrides.changeFrequency || seo.changeFrequency,
    priority: typeof overrides.priority === 'number' ? overrides.priority : seo.priority,

    // 🔥 AJOUT IMAGE
    image: slug ? `${SITE_URL}/images/destinations/${slug}.avif` : null,

    imageTitle: slug ? `Découvrez ${slug.replace(/-/g, ' ')} au Québec` : null,
  };
}

function isAllowedRoute(route) {
  if (!route) return false;
  if (EXCLUDED_ROUTES.has(route)) return false;
  if (route.startsWith('/api')) return false;
  if (route.startsWith('/admin')) return false;
  if (route.startsWith('/expansion')) return false;
  if (route.includes('[') || route.includes(']')) return false;
  return true;
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

    if (currentDate > existingDate) {
      map.set(route, {
        ...existing,
        ...current,
        priority: Math.max(existing.priority || 0, current.priority || 0.6),
      });
    }
  }

  return [...map.values()].sort((a, b) => a.route.localeCompare(b.route, 'fr'));
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
      .filter((route) => !route.startsWith('/partage/'))
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
    generatedAt: await getFileMTime(pageFile),
    siteUrl: SITE_URL,
    counts: {
      static: staticEntries.length,
      destinations: destinationEntries.length,
      blog: blogEntries.length,
      community: communityEntries.length,
      totalBeforeDedupe: allEntries.length,
      total: entries.length,
      duplicatesRemoved: allEntries.length - entries.length,
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
