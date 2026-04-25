#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('src/components/blogpost');
const OUTPUT_JSON = path.resolve('src/data/hotels/blogHotelAudit.report.json');
const OUTPUT_TXT = path.resolve('src/data/hotels/blogHotelAudit.report.txt');

function toSlug(filename) {
  return filename
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

function countMatches(content, regex) {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function detectSection(content) {
  const patterns = [
    /où dormir/i,
    /ou dormir/i,
    /hébergements?/i,
    /hebergements?/i,
    /hotelSection\s*=/i,
    /<HotelGrid\b/i,
  ];
  return patterns.some((p) => p.test(content));
}

function classifyArticle(data) {
  if (data.hasPickHotels && data.hasHotelGrid && data.hasHotelIdsImport) {
    return 'deja_migre';
  }

  if (
    (data.hasHotelsArray || data.hasHotelCardComponent || data.hasRawBookingLinks) &&
    !data.hasPickHotels
  ) {
    return 'ancien_modele';
  }

  if (data.hasDestinationTemplate && !data.hasPickHotels && detectSection(data.content)) {
    return 'hybride_a_migrer';
  }

  if (!detectSection(data.content) && !data.hasHotelsArray && !data.hasHotelGrid) {
    return 'sans_hotels_detectes';
  }

  return 'a_verifier';
}

function auditFile(filePath) {
  const filename = path.basename(filePath);
  const slug = toSlug(filename);
  const content = fs.readFileSync(filePath, 'utf8');

  const hasHotelGrid =
    /import\s+\{\s*HotelGrid\s*\}\s+from\s+['"][^'"]+['"]/.test(content) ||
    /<HotelGrid\b/.test(content);

  const hasPickHotels = /pickHotels\s*\(/.test(content);
  const hasHotelIdsImport = /HOTEL_IDS_[A-Z0-9_]+/.test(content);
  const hasHotelsArray = /const\s+hotels\s*=\s*\[/.test(content);
  const hasHotelCardComponent =
    /function\s+HotelCard\s*\(/.test(content) || /const\s+HotelCard\s*=/.test(content);

  const hasRawBookingLinks =
    /awin1\.com\/cread\.php/i.test(content) ||
    /booking\.com\/hotel\//i.test(content) ||
    /booking\.com\/city\//i.test(content);

  const hasBookingAwinImport = /bookingAwin/.test(content);
  const hasDestinationTemplate = /DestinationArticleTemplate/.test(content);

  const importCount = countMatches(content, /^import .*;$/gm);
  const rawBookingCount = countMatches(
    content,
    /awin1\.com\/cread\.php|booking\.com\/hotel\/|booking\.com\/city\//gi,
  );

  const result = {
    file: filename,
    slug,
    hasHotelGrid,
    hasPickHotels,
    hasHotelIdsImport,
    hasHotelsArray,
    hasHotelCardComponent,
    hasRawBookingLinks,
    rawBookingCount,
    hasBookingAwinImport,
    hasDestinationTemplate,
    classification: '',
    content,
  };

  result.classification = classifyArticle(result);

  return result;
}

function buildTextReport(results) {
  const lines = [];

  lines.push('AUDIT HÔTELS DES ARTICLES');
  lines.push('='.repeat(60));
  lines.push('');

  const groups = {};
  for (const r of results) {
    if (!groups[r.classification]) groups[r.classification] = [];
    groups[r.classification].push(r);
  }

  for (const [group, items] of Object.entries(groups)) {
    lines.push(`${group.toUpperCase()} (${items.length})`);
    lines.push('-'.repeat(60));

    for (const item of items.sort((a, b) => a.file.localeCompare(b.file, 'fr'))) {
      lines.push(`• ${item.file}`);
      lines.push(`  slug: ${item.slug}`);
      lines.push(
        `  HotelGrid:${item.hasHotelGrid ? 'oui' : 'non'} | pickHotels:${item.hasPickHotels ? 'oui' : 'non'} | HOTEL_IDS:${item.hasHotelIdsImport ? 'oui' : 'non'}`,
      );
      lines.push(
        `  hotels[]:${item.hasHotelsArray ? 'oui' : 'non'} | HotelCard:${item.hasHotelCardComponent ? 'oui' : 'non'} | liens booking bruts:${item.hasRawBookingLinks ? `oui (${item.rawBookingCount})` : 'non'}`,
      );
      lines.push(
        `  template:${item.hasDestinationTemplate ? 'oui' : 'non'} | bookingAwin:${item.hasBookingAwinImport ? 'oui' : 'non'}`,
      );
      lines.push('');
    }

    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Dossier introuvable: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /^BlogArticle.*\.tsx$/.test(f))
    .map((f) => path.join(BLOG_DIR, f));

  const results = files.map(auditFile);

  const jsonSafe = results.map(({ content, ...rest }) => rest);
  const txtReport = buildTextReport(results);

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonSafe, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_TXT, txtReport, 'utf8');

  const summary = jsonSafe.reduce((acc, item) => {
    acc[item.classification] = (acc[item.classification] || 0) + 1;
    return acc;
  }, {});

  console.log('Audit terminé.');
  console.log('');
  console.log('Résumé :');
  for (const [key, value] of Object.entries(summary)) {
    console.log(`- ${key}: ${value}`);
  }
  console.log('');
  console.log(`Rapport JSON : ${OUTPUT_JSON}`);
  console.log(`Rapport texte: ${OUTPUT_TXT}`);
}

main();
