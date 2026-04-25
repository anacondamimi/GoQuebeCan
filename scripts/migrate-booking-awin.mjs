#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/components/blogpost');
const BACKUP_ROOT = path.resolve(PROJECT_ROOT, '.backup-booking-awin');

const args = new Set(process.argv.slice(2));
const WRITE = args.has('--write');
const VERBOSE = args.has('--verbose');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function backupFile(filePath, backupDir) {
  const rel = path.relative(PROJECT_ROOT, filePath);
  const dest = path.join(backupDir, rel);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(filePath, dest);
}

function hasBookingAwinImport(content) {
  return content.includes(`import { bookingAwin } from '@/lib/awin';`);
}

function insertBookingAwinImport(content) {
  if (hasBookingAwinImport(content)) {
    return { content, changed: false };
  }

  const metadataMatch = content.match(/export\s+const\s+metadata\s*=/);

  if (metadataMatch && typeof metadataMatch.index === 'number') {
    const insertPos = metadataMatch.index;
    const before = content.slice(0, insertPos).replace(/\s*$/, '');
    const after = content.slice(insertPos);

    return {
      content: `${before}\nimport { bookingAwin } from '@/lib/awin';\n\n${after}`,
      changed: true,
    };
  }

  const importMatches = [...content.matchAll(/^import .*;$/gm)];
  if (importMatches.length) {
    const lastImport = importMatches[importMatches.length - 1];
    const insertPos = (lastImport.index ?? 0) + lastImport[0].length;

    return {
      content:
        content.slice(0, insertPos) +
        `\nimport { bookingAwin } from '@/lib/awin';` +
        content.slice(insertPos),
      changed: true,
    };
  }

  return {
    content: `import { bookingAwin } from '@/lib/awin';\n\n${content}`,
    changed: true,
  };
}

function replaceBookingLinks(content) {
  let updated = content;
  let count = 0;

  // href="https://www.booking.com/..."
  updated = updated.replace(
    /href=(["'])(https:\/\/www\.booking\.com\/[^"'{}]+)\1/g,
    (_, __, url) => {
      count += 1;
      return `href={bookingAwin('${url}')}`;
    },
  );

  // link: 'https://www.booking.com/...'
  updated = updated.replace(
    /link:\s*(["'])(https:\/\/www\.booking\.com\/[^"']+)\1/g,
    (_, __, url) => {
      count += 1;
      return `link: bookingAwin('${url}')`;
    },
  );

  // bookingUrl: 'https://www.booking.com/...'
  updated = updated.replace(
    /bookingUrl:\s*(["'])(https:\/\/www\.booking\.com\/[^"']+)\1/g,
    (_, __, url) => {
      count += 1;
      return `bookingUrl: bookingAwin('${url}')`;
    },
  );

  return { content: updated, count };
}

function normalizeImports(content) {
  const importRegex = /^import .*;$/gm;
  const imports = content.match(importRegex) || [];

  if (!imports.length) return content;

  const uniqueImports = [...new Set(imports)];
  let cleaned = content.replace(importRegex, '').trim();

  const metadataMatch = cleaned.match(/export\s+const\s+metadata\s*=/);
  if (!metadataMatch || typeof metadataMatch.index !== 'number') {
    return uniqueImports.join('\n') + '\n\n' + cleaned;
  }

  const insertPos = metadataMatch.index;
  const before = cleaned.slice(0, insertPos).trim();
  const after = cleaned.slice(insertPos);

  return `${before}\n\n${uniqueImports.join('\n')}\n\n${after}`;
}

function normalizeSpacing(content) {
  return content.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n');
}

function processFile(filePath, backupDir) {
  const result = {
    file: path.basename(filePath),
    status: 'skipped',
    changedLinks: 0,
    steps: [],
  };

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  if (!content.includes('www.booking.com')) {
    return result;
  }

  const replaceRes = replaceBookingLinks(content);
  content = replaceRes.content;

  if (replaceRes.count === 0) {
    return result;
  }

  result.changedLinks = replaceRes.count;
  result.steps.push(`${replaceRes.count} lien(s) Booking remplacé(s)`);

  const importRes = insertBookingAwinImport(content);
  content = importRes.content;
  if (importRes.changed) {
    result.steps.push('import bookingAwin ajouté');
  }

  content = normalizeImports(content);
  content = normalizeSpacing(content);

  if (content === original) {
    return result;
  }

  if (WRITE) {
    backupFile(filePath, backupDir);
    fs.writeFileSync(filePath, content, 'utf8');
    result.status = 'written';
  } else {
    result.status = 'dry-run';
  }

  return result;
}

function main() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /^BlogArticle.*\.tsx$/.test(f))
    .map((f) => path.join(BLOG_DIR, f));

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(BACKUP_ROOT, timestamp);

  const results = files.map((filePath) => processFile(filePath, backupDir));

  const written = results.filter((r) => r.status === 'written').length;
  const dryRun = results.filter((r) => r.status === 'dry-run').length;
  const touched = results.filter((r) => r.status !== 'skipped');

  const reportPath = path.resolve(PROJECT_ROOT, 'src/data/hotels/bookingAwinMigration.report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n=== Migration bookingAwin ===');
  console.log(`Mode        : ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
  console.log(`Écrits      : ${written}`);
  console.log(`Dry-run     : ${dryRun}`);
  console.log(`Rapport     : ${reportPath}`);

  if (WRITE) {
    console.log(`Backups     : ${backupDir}`);
  }

  if (touched.length) {
    console.log('\nFichiers concernés :');
    for (const r of touched) {
      console.log(`- ${r.file} [${r.status}] → ${r.changedLinks} lien(s)`);
    }
  }

  if (VERBOSE) {
    for (const r of touched) {
      console.log(`\n${r.file}`);
      for (const step of r.steps) {
        console.log(`  - ${step}`);
      }
    }
  }
}

main();
