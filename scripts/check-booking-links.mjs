#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/components/blogpost');
const OUTPUT_DIR = path.resolve(PROJECT_ROOT, 'src/data/hotels');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'bookingLinkCheck.report.json');
const OUTPUT_TXT = path.join(OUTPUT_DIR, 'bookingLinkCheck.report.txt');

const args = new Set(process.argv.slice(2));
const VERBOSE = args.has('--verbose');
const TIMEOUT_MS = 20000;

const BOOKING_ERROR_PATTERNS = [
  /property.*not.*found/i,
  /accommodation.*not.*found/i,
  /hotel.*not.*found/i,
  /page.*not.*found/i,
  /this property is unavailable/i,
  /doesn't exist/i,
  /could not be found/i,
  /hébergement.*introuvable/i,
  /hébergement.*non trouvé/i,
  /établissement.*introuvable/i,
  /établissement.*non trouvé/i,
  /page.*introuvable/i,
  /aucun hébergement/i,
  /n'est plus disponible/i,
  /we can't find/i,
  /we could not find/i,
  /no properties found/i,
  /no availability/i,
  /results for your search/i,
  /search results/i,
  /aucun résultat/i,
  /désolé/i,
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walkFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else if (/^BlogArticle.*\.tsx$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractLinksFromContent(content) {
  const found = [];

  // href="https://www.booking.com/..."
  for (const match of content.matchAll(/href=(["'])(https:\/\/www\.booking\.com\/[^"' )}]+)\1/g)) {
    found.push({
      kind: 'href-booking-direct',
      raw: match[0],
      url: match[2],
    });
  }

  // link: 'https://www.booking.com/...'
  for (const match of content.matchAll(
    /(?:link|bookingUrl|reserveUrl|mapUrl)\s*:\s*(["'])(https:\/\/www\.booking\.com\/[^"' )}]+)\1/g,
  )) {
    found.push({
      kind: 'object-booking-direct',
      raw: match[0],
      url: match[2],
    });
  }

  // bookingAwin('https://www.booking.com/...')
  for (const match of content.matchAll(
    /bookingAwin\((["'])(https:\/\/www\.booking\.com\/[^"' )}]+)\1\)/g,
  )) {
    found.push({
      kind: 'bookingAwin-wrapper',
      raw: match[0],
      url: match[2],
    });
  }

  // vieux liens Awin directs
  for (const match of content.matchAll(/https:\/\/www\.awin1\.com\/cread\.php\?[^"' )}]+/g)) {
    found.push({
      kind: 'awin-direct',
      raw: match[0],
      url: match[0],
    });
  }

  return dedupeLinks(found);
}

function dedupeLinks(items) {
  const seen = new Set();
  const out = [];

  for (const item of items) {
    const key = `${item.kind}__${item.url}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }

  return out;
}

function extractBookingUrlFromAwin(awinUrl) {
  try {
    const url = new URL(awinUrl);
    const ued = url.searchParams.get('ued');
    if (!ued) return null;
    return decodeURIComponent(ued);
  } catch {
    return null;
  }
}
function safePathname(urlString) {
  try {
    return new URL(urlString).pathname || '';
  } catch {
    return '';
  }
}

function extractHotelSlug(pathname) {
  const match = pathname.match(/\/hotel\/[^/]+\/([^/.]+)(?:\.[a-z]{2})?\.html/i);
  return match ? match[1].toLowerCase() : null;
}
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; BookingLinkChecker/1.0)',
        'accept-language': 'fr-CA,fr;q=0.9,en;q=0.8',
        ...options.headers,
      },
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(originalUrl, kind) {
  let bookingUrl = originalUrl;

  if (kind === 'awin-direct') {
    const extracted = extractBookingUrlFromAwin(originalUrl);
    if (extracted) {
      bookingUrl = extracted;
    }
  }

  const result = {
    originalUrl,
    bookingUrl,
    kind,
    ok: false,
    suspicious: false,
    status: null,
    finalUrl: null,
    reason: null,
  };

  try {
    const response = await fetchWithTimeout(bookingUrl, { method: 'GET' });
    result.status = response.status;
    result.finalUrl = response.url;

    const html = await response.text();
    const compact = html.replace(/\s+/g, ' ').slice(0, 80000);

    const matchedPattern = BOOKING_ERROR_PATTERNS.find((pattern) => pattern.test(compact));

    if (!response.ok) {
      result.reason = `HTTP ${response.status}`;
      result.suspicious = true;
      return result;
    }

    if (matchedPattern) {
      result.reason = `pattern détecté: ${matchedPattern}`;
      result.suspicious = true;
      return result;
    }

    const originalPath = safePathname(bookingUrl);
    const finalPath = safePathname(result.finalUrl || '');

    const originalHotelSlug = extractHotelSlug(originalPath);
    const finalHotelSlug = extractHotelSlug(finalPath);

    if (originalHotelSlug && finalHotelSlug && originalHotelSlug !== finalHotelSlug) {
      result.reason = `slug hôtel différent après redirection (${originalHotelSlug} -> ${finalHotelSlug})`;
      result.suspicious = true;
      return result;
    }

    if (originalPath.includes('/hotel/') && !finalPath.includes('/hotel/')) {
      result.reason = 'la page finale n’est plus une fiche hôtel';
      result.suspicious = true;
      return result;
    }

    const looksLikeSearchResults =
      /searchresults/i.test(finalPath) ||
      /search results/i.test(compact) ||
      /results for your search/i.test(compact) ||
      /aucun résultat/i.test(compact) ||
      /no properties found/i.test(compact);

    if (looksLikeSearchResults) {
      result.reason = 'redirigé vers une page de résultats/recherche';
      result.suspicious = true;
      return result;
    }

    const looksLikeHotelPage =
      /hp_hotel_name/i.test(compact) ||
      /hotel_name/i.test(compact) ||
      /availability/i.test(compact) ||
      /check-in/i.test(compact) ||
      /check out/i.test(compact) ||
      /rooms/i.test(compact) ||
      /Property highlights/i.test(compact);

    if (originalPath.includes('/hotel/') && !looksLikeHotelPage) {
      result.reason = 'la page ne ressemble pas à une vraie fiche hôtel';
      result.suspicious = true;
      return result;
    }

    result.ok = true;
    return result;
  } catch (error) {
    result.reason = error instanceof Error ? error.message : 'erreur inconnue';
    result.suspicious = true;
    return result;
  }
}

async function main() {
  ensureDir(OUTPUT_DIR);

  const files = walkFiles(BLOG_DIR);
  const entries = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const links = extractLinksFromContent(content);

    for (const link of links) {
      entries.push({
        file: path.relative(PROJECT_ROOT, filePath),
        ...link,
      });
    }
  }

  const results = [];

  for (const entry of entries) {
    if (VERBOSE) {
      console.log(`Test: ${entry.file} → ${entry.url}`);
    }

    const checked = await checkUrl(entry.url, entry.kind);
    results.push({
      file: entry.file,
      kind: entry.kind,
      raw: entry.raw,
      originalUrl: checked.originalUrl,
      bookingUrl: checked.bookingUrl,
      finalUrl: checked.finalUrl,
      status: checked.status,
      ok: checked.ok,
      suspicious: checked.suspicious,
      reason: checked.reason,
    });
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2), 'utf8');

  const suspicious = results.filter((r) => r.suspicious);
  const ok = results.filter((r) => r.ok);

  const txt = [
    'VÉRIFICATION DES LIENS BOOKING',
    '========================================',
    '',
    `Total testés : ${results.length}`,
    `OK           : ${ok.length}`,
    `Suspects     : ${suspicious.length}`,
    '',
    'LIENS SUSPECTS',
    '----------------------------------------',
    ...(suspicious.length
      ? suspicious.map((r) =>
          [
            `Fichier   : ${r.file}`,
            `Type      : ${r.kind}`,
            `Status    : ${r.status ?? 'n/a'}`,
            `Raison    : ${r.reason ?? 'n/a'}`,
            `URL test  : ${r.bookingUrl}`,
            `URL finale: ${r.finalUrl ?? 'n/a'}`,
            '',
          ].join('\n'),
        )
      : ['Aucun lien suspect détecté.', '']),
  ].join('\n');

  fs.writeFileSync(OUTPUT_TXT, txt, 'utf8');

  console.log('\n=== Vérification Booking terminée ===');
  console.log(`Total testés : ${results.length}`);
  console.log(`OK           : ${ok.length}`);
  console.log(`Suspects     : ${suspicious.length}`);
  console.log(`Rapport JSON : ${OUTPUT_JSON}`);
  console.log(`Rapport TXT  : ${OUTPUT_TXT}`);
}

main().catch((error) => {
  console.error('Erreur pendant la vérification :', error);
  process.exit(1);
});
