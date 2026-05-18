// scripts/audit-sitemap-coverage.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');
const SITEMAP_FILE = path.join(ROOT, 'src/generated/sitemap-data.json');

const PAGE_FILES = new Set(['page.tsx', 'page.ts', 'page.jsx', 'page.js']);

function normalizeRoute(route) {
  if (!route) return '/';
  let value = String(route).trim();
  if (!value.startsWith('/')) value = `/${value}`;
  value = value.replace(/\/+/g, '/');
  if (value.length > 1) value = value.replace(/\/+$/, '');
  return value;
}

function shouldIgnoreSegment(segment) {
  if (!segment) return true;
  if (segment.startsWith('(') && segment.endsWith(')')) return true;
  if (segment.startsWith('_')) return true;
  if (['api', 'admin', 'expansion'].includes(segment)) return true;
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
  const segments = parts.slice(0, -1).filter((seg) => !shouldIgnoreSegment(seg));

  if (segments.some(isDynamicSegment)) return null;

  const route = normalizeRoute(`/${segments.join('/') || ''}`);

  if (['/ia-mathieu', '/static-page'].includes(route)) return null;

  return route;
}

async function main() {
  const pageFiles = await walk(APP_DIR);

  const appRoutes = new Set(pageFiles.map(routeFromPageFile).filter(Boolean).sort());

  const sitemapRaw = await fs.readFile(SITEMAP_FILE, 'utf8');
  const sitemapData = JSON.parse(sitemapRaw);

  const sitemapRoutes = new Set(
    sitemapData.entries.map((entry) => normalizeRoute(entry.route)).sort(),
  );

  const missingFromSitemap = [...appRoutes].filter((route) => !sitemapRoutes.has(route));
  const extraInSitemap = [...sitemapRoutes].filter((route) => !appRoutes.has(route));

  console.log('\n📊 Audit sitemap coverage');
  console.log('Routes app trouvées :', appRoutes.size);
  console.log('Routes sitemap :', sitemapRoutes.size);

  console.log('\n❌ Routes app absentes du sitemap :');
  console.log(missingFromSitemap.length ? missingFromSitemap : 'Aucune');

  console.log('\n⚠️ Routes dans sitemap mais pas dans app direct :');
  console.log(extraInSitemap.length ? extraInSitemap : 'Aucune');

  await fs.writeFile(
    path.join(ROOT, 'sitemap-coverage-report.json'),
    JSON.stringify(
      {
        counts: {
          appRoutes: appRoutes.size,
          sitemapRoutes: sitemapRoutes.size,
          missingFromSitemap: missingFromSitemap.length,
          extraInSitemap: extraInSitemap.length,
        },
        missingFromSitemap,
        extraInSitemap,
      },
      null,
      2,
    ),
    'utf8',
  );

  console.log('\n📄 Rapport généré : sitemap-coverage-report.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
