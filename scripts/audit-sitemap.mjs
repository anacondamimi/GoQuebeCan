#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || '.');
const APP_DIR = path.join(ROOT, 'app');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITEMAP_FILE = path.join(APP_DIR, 'sitemap.ts');
const OUTPUT_FILE = path.join(ROOT, 'sitemap-audit.txt');

const PAGE_FILES = new Set(['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'mdx-page.tsx']);

const IGNORE_DIRS = new Set([
  'api',
  '_components',
  '_lib',
  '_utils',
  '_hooks',
  '_data',
  '_types',
  '_store',
  '_actions',
  'admin',
]);

const IGNORE_FILE_NAMES = new Set([
  'layout.tsx',
  'layout.ts',
  'template.tsx',
  'template.ts',
  'loading.tsx',
  'loading.ts',
  'error.tsx',
  'error.ts',
  'not-found.tsx',
  'not-found.ts',
  'route.ts',
  'route.tsx',
  'default.tsx',
  'default.ts',
]);

function normalizeRoute(route) {
  if (!route) return '/';
  let r = route.trim();
  if (!r.startsWith('/')) r = '/' + r;
  r = r.replace(/\/+/g, '/');
  if (r.length > 1) r = r.replace(/\/+$/, '');
  return r;
}

function shouldIgnoreSegment(seg) {
  if (!seg) return true;
  if (IGNORE_DIRS.has(seg)) return true;
  if (seg.startsWith('_')) return true;
  if (seg.startsWith('(') && seg.endsWith(')')) return true; // route group
  return false;
}

function isDynamicSegment(seg) {
  return /^\[.*\]$/.test(seg);
}

function routeFromAppRelativeFile(relPath) {
  const parts = relPath.split(path.sep);

  const fileName = parts[parts.length - 1];
  if (!PAGE_FILES.has(fileName)) return null;

  const segments = parts.slice(0, -1).filter((seg) => !shouldIgnoreSegment(seg));

  // Ignore fully dynamic routes here; they need special handling from data sources.
  if (segments.some(isDynamicSegment)) return null;

  const route = '/' + segments.join('/');
  return normalizeRoute(route === '/' ? '/' : route);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, results = [], base = dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      await walk(full, results, base);
      continue;
    }

    if (IGNORE_FILE_NAMES.has(entry.name)) continue;
    if (!PAGE_FILES.has(entry.name)) continue;

    results.push(rel);
  }

  return results;
}

async function readJsonSafe(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeSlug(input) {
  if (!input || typeof input !== 'string') return '';

  const noHost = input.replace(/^https?:\/\/[^/]+/i, '');
  const noQuery = noHost.split('?')[0]?.split('#')[0] ?? '';
  const trimmed = noQuery.trim().replace(/^\/+/, '').replace(/\/+$/, '');

  const destMatch = trimmed.match(/^destinations\/(.+)$/i);
  if (destMatch?.[1]) return destMatch[1].trim().replace(/^\/+|\/+$/g, '');

  return trimmed;
}

async function readDestinationRoutes() {
  const filePath = path.join(PUBLIC_DIR, 'destinations.json');
  const data = await readJsonSafe(filePath);
  if (!Array.isArray(data)) return [];

  const routes = new Set();

  for (const item of data) {
    const candidates = [item?.slug, item?.href, item?.url, item?.path].filter(Boolean);

    for (const c of candidates) {
      const s = normalizeSlug(c);
      if (!s) continue;
      if (s.toLowerCase().startsWith('en/')) continue;

      if (!s.includes('/')) {
        routes.add(normalizeRoute(`/destinations/${s}`));
        continue;
      }

      if (s.toLowerCase().startsWith('destinations/')) {
        routes.add(normalizeRoute(`/${s}`));
      }
    }
  }

  return [...routes].sort();
}

function extractQuotedStrings(block) {
  const out = [];
  const regex = /'([^']+)'|"([^"]+)"/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    out.push(m[1] || m[2]);
  }
  return out;
}

async function parseSitemapTs() {
  const result = {
    staticPaths: [],
    blogRoutes: [],
  };

  if (!(await exists(SITEMAP_FILE))) return result;

  const src = await fs.readFile(SITEMAP_FILE, 'utf8');

  // 1) staticPaths
  const staticBlockMatch = src.match(
    /const\s+staticPaths\s*:\s*Array<[\s\S]*?>\s*=\s*\[([\s\S]*?)\];/,
  );
  if (staticBlockMatch?.[1]) {
    const block = staticBlockMatch[1];
    const pathMatches = [...block.matchAll(/path:\s*['"]([^'"]+)['"]/g)];
    result.staticPaths = [...new Set(pathMatches.map((m) => normalizeRoute(m[1])))].sort();
  }

  // 2) blogSlugs
  const blogBlockMatch = src.match(/const\s+blogSlugs\s*=\s*\[([\s\S]*?)\]\s*\.map/s);
  if (blogBlockMatch?.[1]) {
    const slugs = extractQuotedStrings(blogBlockMatch[1])
      .map((s) => s.trim())
      .filter(Boolean);

    result.blogRoutes = [...new Set(slugs.map((slug) => normalizeRoute(`/blog/${slug}`)))].sort();
  }

  return result;
}

function compareSets(labelA, setA, labelB, setB) {
  const onlyInA = [...setA].filter((x) => !setB.has(x)).sort();
  const onlyInB = [...setB].filter((x) => !setA.has(x)).sort();

  return {
    labelA,
    labelB,
    onlyInA,
    onlyInB,
  };
}

async function main() {
  const appFiles = await walk(APP_DIR);
  const detectedStaticRoutes = new Set(
    appFiles
      .map((rel) => routeFromAppRelativeFile(rel))
      .filter(Boolean)
      .map(normalizeRoute),
  );

  const destinationRoutes = new Set(await readDestinationRoutes());
  const sitemapData = await parseSitemapTs();

  const sitemapRoutes = new Set([
    ...sitemapData.staticPaths.map(normalizeRoute),
    ...sitemapData.blogRoutes.map(normalizeRoute),
    ...destinationRoutes,
  ]);

  const detectedRoutes = new Set([...detectedStaticRoutes, ...destinationRoutes]);

  const comparison = compareSets(
    'Routes détectées dans le site',
    detectedRoutes,
    'Routes déclarées dans le sitemap',
    sitemapRoutes,
  );

  const dynamicHints = [];
  if ([...appFiles].some((p) => p.includes(`[slug]${path.sep}page.`))) {
    dynamicHints.push(
      '- Des routes dynamiques [slug] existent dans app/, mais elles ne peuvent pas être validées sans leur source de données.',
    );
  }
  if (await exists(path.join(APP_DIR, 'partage', '[slug]', 'page.tsx'))) {
    dynamicHints.push(
      "- /partage/[slug] semble exister dans le site, mais n'est pas reconstruit automatiquement ici. Vérifie si ces URLs doivent être incluses dans le sitemap.",
    );
  }
  if (await exists(path.join(APP_DIR, 'blog', '[slug]', 'page.tsx'))) {
    dynamicHints.push(
      '- /blog/[slug] semble dynamique. Le script se base sur les blogSlugs trouvés dans app/sitemap.ts.',
    );
  }

  const lines = [];

  lines.push('AUDIT SITEMAP / ARBORESCENCE');
  lines.push(`Projet : ${ROOT}`);
  lines.push('');

  lines.push('1) Routes détectées dans le site');
  for (const route of [...detectedRoutes].sort()) lines.push(`- ${route}`);
  lines.push('');

  lines.push('2) Routes du sitemap');
  for (const route of [...sitemapRoutes].sort()) lines.push(`- ${route}`);
  lines.push('');

  lines.push('3) Routes présentes dans le site mais absentes du sitemap');
  if (comparison.onlyInA.length === 0) {
    lines.push('✅ Aucune');
  } else {
    for (const route of comparison.onlyInA) lines.push(`- ${route}`);
  }
  lines.push('');

  lines.push('4) Routes présentes dans le sitemap mais non détectées dans le site');
  if (comparison.onlyInB.length === 0) {
    lines.push('✅ Aucune');
  } else {
    for (const route of comparison.onlyInB) lines.push(`- ${route}`);
  }
  lines.push('');

  lines.push('5) Notes');
  if (dynamicHints.length === 0) {
    lines.push('- Aucune remarque particulière.');
  } else {
    for (const note of dynamicHints) lines.push(note);
  }
  lines.push('');

  lines.push('6) Résumé');
  lines.push(`- Routes statiques détectées : ${detectedStaticRoutes.size}`);
  lines.push(`- Routes destinations détectées : ${destinationRoutes.size}`);
  lines.push(`- Routes sitemap total comparées : ${sitemapRoutes.size}`);
  lines.push(`- Présentes sur le site mais absentes du sitemap : ${comparison.onlyInA.length}`);
  lines.push(`- Présentes dans le sitemap mais non détectées : ${comparison.onlyInB.length}`);
  lines.push('');

  await fs.writeFile(OUTPUT_FILE, lines.join('\n'), 'utf8');
  console.log(`✅ Audit écrit dans : ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('❌ Erreur :', err);
  process.exit(1);
});
