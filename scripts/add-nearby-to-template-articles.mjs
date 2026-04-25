#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');

const nearbyImport = "import { NearbyDestinations } from '@/components/blog/NearbyDestinations';";

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.tsx'))
    .map((f) => path.join(dir, f.name));
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function usesTemplate(content) {
  return /<DestinationArticleTemplate\b/.test(content);
}

function usesNearby(content) {
  return /<NearbyDestinations\b/.test(content);
}

function hasNearbyImport(content) {
  return content.includes(nearbyImport);
}

function extractSlug(content, fileName) {
  const slugPropMatch = content.match(/slug\s*=\s*["'`]([^"'`]+)["'`]/);
  if (slugPropMatch) return slugPropMatch[1];

  const metadataSlugMatch = content.match(/slug:\s*["'`]([^"'`]+)["'`]/);
  if (metadataSlugMatch) return metadataSlugMatch[1];

  return fileName
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function insertImport(content, importLine) {
  if (content.includes(importLine)) return content;

  const lines = content.split('\n');
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (/^import\s.+from\s+['"].+['"];?\s*$/.test(lines[i].trim())) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    return `${importLine}\n${content}`;
  }

  lines.splice(lastImportIndex + 1, 0, importLine);
  return lines.join('\n');
}

function injectNearby(content, slug) {
  if (usesNearby(content)) return content;

  const closingTag = '</DestinationArticleTemplate>';
  const idx = content.lastIndexOf(closingTag);
  if (idx === -1) return content;

  const before = content.slice(0, idx).replace(/\s*$/, '');
  const after = content.slice(idx);

  return `${before}

      <NearbyDestinations currentSlug="${slug}" />
    ${after}`;
}

function processFile(filePath, dryRun = false) {
  const original = read(filePath);
  const fileName = path.basename(filePath);

  if (!usesTemplate(original)) {
    return { fileName, changed: false, reason: 'skip:not-template' };
  }

  if (usesNearby(original)) {
    return { fileName, changed: false, reason: 'skip:already-nearby' };
  }

  const slug = extractSlug(original, fileName);

  let updated = original;
  updated = insertImport(updated, nearbyImport);
  updated = injectNearby(updated, slug);

  if (updated === original) {
    return { fileName, changed: false, reason: 'skip:no-change' };
  }

  if (!dryRun) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }

  return { fileName, changed: true, reason: `added:${slug}` };
}

function main() {
  const dryRun = process.argv.includes('--dry-run');

  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier introuvable :', blogpostDir);
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const results = files.map((file) => processFile(file, dryRun));

  console.log(`\nMode : ${dryRun ? 'DRY RUN' : 'WRITE'}\n`);

  for (const r of results) {
    if (r.changed) {
      console.log(`✔ ${r.fileName} — ${r.reason}`);
    }
  }

  const changed = results.filter((r) => r.changed);
  const skipped = results.filter((r) => !r.changed);

  console.log('\nRésumé');
  console.log('Modifiés :', changed.length);
  console.log('Ignorés :', skipped.length);
}

main();
