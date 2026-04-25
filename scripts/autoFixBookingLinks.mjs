#!/usr/bin/env node

// scripts/autoFixBookingLinks.mjs
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APPLY = process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

const TARGETS = [
  path.resolve(__dirname, '../src/data/hotels/hotelCatalog.generated.ts'),
  path.resolve(__dirname, '../src/components/blogpost'),
];

const REPORT_DIR = path.resolve(__dirname, '../reports');
const REPORT_FILE = path.join(REPORT_DIR, 'booking-link-audit.json');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

const AWIN_CONFIG = {
  awinmid: 6776,
  awinaffid: 1950847,
  domain: 'www.awin1.com',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

async function walk(dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|md|mdx)$/i.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

async function resolveTargets(targets) {
  const results = [];

  for (const target of targets) {
    if (!fs.existsSync(target)) continue;

    const stat = await fsp.stat(target);
    if (stat.isDirectory()) {
      results.push(...(await walk(target)));
    } else if (stat.isFile()) {
      results.push(target);
    }
  }

  return [...new Set(results)];
}

function normalizeRelative(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
}

function isBookingHost(hostname) {
  const host = hostname.toLowerCase();
  return host === 'booking.com' || host === 'www.booking.com' || host.endsWith('.booking.com');
}

function isAwinHost(hostname) {
  const host = hostname.toLowerCase();
  return host === 'awin1.com' || host === 'www.awin1.com' || host.endsWith('.awin1.com');
}

function isExpediaHost(hostname) {
  const host = hostname.toLowerCase();
  return host.includes('expedia.');
}

function cleanBookingUrl(input) {
  try {
    const url = new URL(input);

    if (!isBookingHost(url.hostname)) return input;

    url.protocol = 'https:';
    url.hash = '';

    const keepParams = new Set(['ss', 'dest_id', 'dest_type', 'lang']);
    const cleanedParams = new URLSearchParams();

    for (const [key, value] of url.searchParams.entries()) {
      if (!keepParams.has(key)) continue;
      if (!value?.trim()) continue;
      cleanedParams.set(key, value);
    }

    url.search = cleanedParams.toString() ? `?${cleanedParams.toString()}` : '';
    return url.toString();
  } catch {
    return input;
  }
}

function buildAwinUrl(destinationUrl) {
  const clean = cleanBookingUrl(destinationUrl);
  const encoded = encodeURIComponent(clean);
  return `https://${AWIN_CONFIG.domain}/cread.php?awinmid=${AWIN_CONFIG.awinmid}&awinaffid=${AWIN_CONFIG.awinaffid}&ued=${encoded}`;
}

function extractUed(awinUrl) {
  try {
    const url = new URL(awinUrl);
    const ued = url.searchParams.get('ued');
    if (!ued) return null;
    return decodeURIComponent(ued);
  } catch {
    return null;
  }
}

function stripDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae');
}

function slugifyForSearch(str) {
  return stripDiacritics(str)
    .toLowerCase()
    .replace(/['’]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function extractCandidateNameFromUrl(urlString) {
  try {
    const url = new URL(urlString);
    const parts = url.pathname.split('/').filter(Boolean);

    if (!parts.length) return '';
    const last = parts[parts.length - 1] || '';

    return last
      .replace(/\.fr\.html$/i, '')
      .replace(/\.html$/i, '')
      .replace(/-/g, ' ')
      .trim();
  } catch {
    return '';
  }
}

function classifyUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);

    if (isBookingHost(url.hostname)) {
      return {
        kind: 'booking-direct',
        bookingUrl: rawUrl,
        auditable: true,
      };
    }

    if (isAwinHost(url.hostname)) {
      const ued = extractUed(rawUrl);
      if (!ued) {
        return {
          kind: 'awin-unknown',
          bookingUrl: null,
          auditable: false,
        };
      }

      try {
        const dest = new URL(ued);
        if (isBookingHost(dest.hostname)) {
          return {
            kind: 'awin-booking',
            bookingUrl: ued,
            auditable: true,
          };
        }

        return {
          kind: 'awin-non-booking',
          bookingUrl: ued,
          auditable: false,
        };
      } catch {
        return {
          kind: 'awin-unknown',
          bookingUrl: null,
          auditable: false,
        };
      }
    }

    if (isExpediaHost(url.hostname)) {
      return {
        kind: 'expedia',
        bookingUrl: null,
        auditable: false,
      };
    }

    return {
      kind: 'other',
      bookingUrl: null,
      auditable: false,
    };
  } catch {
    return {
      kind: 'invalid-url',
      bookingUrl: null,
      auditable: false,
    };
  }
}

async function fetchText(url, options = {}) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': USER_AGENT,
      'accept-language': 'fr-CA,fr;q=0.9,en;q=0.8',
      ...options.headers,
    },
  });

  const text = await res.text();
  return { res, text };
}

function detectSoftError(html) {
  const patterns = [
    'page non trouvée',
    'cette page n’existe pas',
    'cette page nexiste pas',
    'nous n’avons pas trouvé',
    'nous n avons pas trouvé',
    'aucun établissement trouvé',
    'aucune disponibilité',
    'no properties found',
    "we couldn't find",
    'page not found',
    'property does not exist',
    'the page you requested was not found',
  ];

  const normalized = stripDiacritics(html).toLowerCase();
  return patterns.some((p) => normalized.includes(stripDiacritics(p).toLowerCase()));
}

async function auditBookingUrl(rawBookingUrl) {
  const cleaned = cleanBookingUrl(rawBookingUrl);

  try {
    const { res, text } = await fetchText(cleaned);
    const finalUrl = res.url;
    const status = res.status;
    const ok = res.ok;
    const softError = detectSoftError(text);

    let suspicious = false;
    let reason = null;

    if (status === 404) {
      suspicious = true;
      reason = 'HTTP 404';
    } else if (!ok) {
      suspicious = true;
      reason = `HTTP ${status}`;
    } else if (softError) {
      suspicious = true;
      reason = 'Soft 404 / page vide / page non trouvée';
    }

    return {
      originalUrl: rawBookingUrl,
      bookingUrl: cleaned,
      finalUrl,
      status,
      ok,
      suspicious,
      reason,
    };
  } catch (error) {
    return {
      originalUrl: rawBookingUrl,
      bookingUrl: cleaned,
      finalUrl: null,
      status: null,
      ok: false,
      suspicious: true,
      reason: `Fetch failed: ${error?.message || 'unknown error'}`,
    };
  }
}

async function searchBookingCandidate(hotelName, location = '') {
  const query = [hotelName, location, 'site:booking.com/hotel/ca'].filter(Boolean).join(' ');
  const url = `https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(
    `${hotelName} ${location}`.trim(),
  )}`;

  try {
    const { res, text } = await fetchText(url);

    const matches = [...text.matchAll(/https:\/\/www\.booking\.com\/hotel\/ca\/[^"'<> ]+/gi)]
      .map((m) => m[0])
      .map((u) => u.replace(/&amp;/g, '&'));

    const unique = [...new Set(matches)];

    const needle = slugifyForSearch(`${hotelName} ${location}`);
    const scored = unique
      .map((candidate) => {
        const slug = slugifyForSearch(extractCandidateNameFromUrl(candidate));
        let score = 0;

        for (const token of needle.split(' ')) {
          if (slug.includes(token)) score += 2;
        }

        return { candidate, slug, score };
      })
      .sort((a, b) => b.score - a.score);

    return {
      searchUrl: url,
      status: res.status,
      candidates: scored.slice(0, 5),
      best: scored[0]?.candidate || null,
    };
  } catch (error) {
    return {
      searchUrl: url,
      status: null,
      candidates: [],
      best: null,
      error: error?.message || 'search failed',
    };
  }
}

function extractBookingUrlEntries(content) {
  const results = [];

  const regex = /bookingUrl\s*:\s*['"`]([^'"`]+)['"`]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    results.push({
      raw: match[1],
      index: match.index,
      length: match[0].length,
      fullMatch: match[0],
    });
  }

  return results;
}

function replaceLiteralAtIndex(content, originalFullMatch, newRawUrl) {
  const quoteMatch = originalFullMatch.match(/bookingUrl\s*:\s*(['"`])/);
  const quote = quoteMatch?.[1] || "'";
  return originalFullMatch.replace(
    /bookingUrl\s*:\s*['"`][^'"`]+['"`]/,
    `bookingUrl: ${quote}${newRawUrl}${quote}`,
  );
}

async function processFile(filePath) {
  const relative = normalizeRelative(filePath);
  const originalContent = await fsp.readFile(filePath, 'utf8');
  let updatedContent = originalContent;

  const entries = extractBookingUrlEntries(originalContent);
  const reportEntries = [];
  let changed = false;

  if (VERBOSE) {
    console.log(`\n📄 ${relative} — ${entries.length} bookingUrl trouvé(s)`);
  }

  for (const entry of entries) {
    const classification = classifyUrl(entry.raw);

    const baseReport = {
      file: relative,
      raw: entry.raw,
      kind: classification.kind,
      originalUrl: classification.bookingUrl || entry.raw,
      bookingUrl: classification.bookingUrl || null,
      finalUrl: null,
      status: null,
      ok: null,
      suspicious: false,
      reason: null,
      replaced: false,
      replacementUrl: null,
    };

    if (!classification.auditable || !classification.bookingUrl) {
      reportEntries.push({
        ...baseReport,
        reason:
          classification.kind === 'expedia'
            ? 'Lien Expedia ignoré'
            : classification.kind === 'awin-non-booking'
              ? 'Lien Awin non Booking ignoré'
              : classification.kind === 'other'
                ? 'Lien non Booking ignoré'
                : classification.kind === 'invalid-url'
                  ? 'URL invalide'
                  : 'Lien non audité',
      });
      continue;
    }

    const audit = await auditBookingUrl(classification.bookingUrl);

    let currentReport = {
      ...baseReport,
      originalUrl: audit.originalUrl,
      bookingUrl: audit.bookingUrl,
      finalUrl: audit.finalUrl,
      status: audit.status,
      ok: audit.ok,
      suspicious: audit.suspicious,
      reason: audit.reason,
    };

    if (audit.suspicious) {
      const guessedName = extractCandidateNameFromUrl(classification.bookingUrl);
      const search = await searchBookingCandidate(guessedName);

      if (search.best) {
        const candidateAudit = await auditBookingUrl(search.best);

        if (!candidateAudit.suspicious && APPLY) {
          const replacementAwin = buildAwinUrl(search.best);
          const oldSegment = entry.fullMatch;
          const newSegment = replaceLiteralAtIndex(updatedContent, oldSegment, replacementAwin);

          updatedContent = updatedContent.replace(oldSegment, newSegment);
          changed = true;

          currentReport = {
            ...currentReport,
            replaced: true,
            replacementUrl: replacementAwin,
            reason: `Corrigé automatiquement via candidat Booking: ${search.best}`,
          };
        } else {
          currentReport = {
            ...currentReport,
            replacementUrl: search.best,
            reason: `Candidat trouvé: ${search.best}`,
          };
        }
      }
    } else {
      const normalizedAwin = buildAwinUrl(classification.bookingUrl);

      if (APPLY && entry.raw !== normalizedAwin) {
        const oldSegment = entry.fullMatch;
        const newSegment = replaceLiteralAtIndex(updatedContent, oldSegment, normalizedAwin);
        updatedContent = updatedContent.replace(oldSegment, newSegment);
        changed = true;

        currentReport = {
          ...currentReport,
          replaced: true,
          replacementUrl: normalizedAwin,
          reason: 'Lien normalisé en Awin propre',
        };
      }
    }

    reportEntries.push(currentReport);
    await sleep(250);
  }

  if (APPLY && changed && updatedContent !== originalContent) {
    await fsp.writeFile(filePath, updatedContent, 'utf8');
  }

  return {
    file: relative,
    changed,
    entries: reportEntries,
  };
}

async function main() {
  await ensureDir(REPORT_DIR);

  const files = await resolveTargets(TARGETS);
  const allResults = [];

  console.log(`\n🔎 ${files.length} fichier(s) à analyser`);
  console.log(`Mode apply: ${APPLY ? 'OUI' : 'NON'}`);

  for (const file of files) {
    const result = await processFile(file);
    allResults.push(result);
  }

  const flat = allResults.flatMap((r) => r.entries);

  const summary = {
    scannedFiles: files.length,
    totalEntries: flat.length,
    bookingEntries: flat.filter((x) => x.kind === 'booking-direct').length,
    awinBookingEntries: flat.filter((x) => x.kind === 'awin-booking').length,
    expediaEntries: flat.filter((x) => x.kind === 'expedia').length,
    suspiciousEntries: flat.filter((x) => x.suspicious).length,
    replacedEntries: flat.filter((x) => x.replaced).length,
    generatedAt: new Date().toISOString(),
  };

  const finalReport = {
    summary,
    results: allResults,
  };

  await fsp.writeFile(REPORT_FILE, JSON.stringify(finalReport, null, 2), 'utf8');

  console.log('\n✅ Audit terminé');
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\n📁 Rapport: ${normalizeRelative(REPORT_FILE)}`);
}

main().catch((error) => {
  console.error('\n❌ Erreur fatale');
  console.error(error);
  process.exit(1);
});
