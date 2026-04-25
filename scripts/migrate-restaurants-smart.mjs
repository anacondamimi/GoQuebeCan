#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/components/blogpost');
const AUDIT_FILE = path.resolve(
  PROJECT_ROOT,
  'src/data/restaurants/blogRestaurantAudit.report.json',
);
const BACKUP_ROOT = path.resolve(PROJECT_ROOT, '.backup-restaurant-migration');

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

function insertImport(content) {
  const importLine = `import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';`;

  if (content.includes(importLine)) {
    return content;
  }

  const metadataMatch = content.match(/export\s+const\s+metadata\s*=/);

  if (metadataMatch && typeof metadataMatch.index === 'number') {
    const insertPos = metadataMatch.index;
    const before = content.slice(0, insertPos).trim();
    const after = content.slice(insertPos);

    return `${before}\n${importLine}\n\n${after}`;
  }

  return `${importLine}\n\n${content}`;
}

function replaceRender(content) {
  return content.replace(
    /\{restaurants\.map\(\s*\([^)]*\)\s*=>[\s\S]*?\)\}/m,
    '<RestaurantPremiumGrid items={restaurants} />',
  );
}

function normalizeImports(content) {
  const imports = content.match(/^import .*;$/gm) || [];
  const unique = [...new Set(imports)];

  let cleaned = content.replace(/^import .*;$/gm, '').trim();

  const metadataMatch = cleaned.match(/export\s+const\s+metadata\s*=/);

  if (!metadataMatch || typeof metadataMatch.index !== 'number') {
    return unique.join('\n') + '\n\n' + cleaned;
  }

  const insertPos = metadataMatch.index;

  return (
    cleaned.slice(0, insertPos).trim() +
    '\n\n' +
    unique.join('\n') +
    '\n\n' +
    cleaned.slice(insertPos)
  );
}

function processFile(entry, backupDir) {
  const filePath = path.join(BLOG_DIR, entry.file);

  const result = {
    file: entry.file,
    status: 'skipped',
  };

  if (entry.classification !== 'compatible_auto') {
    return result;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = insertImport(content);
  content = replaceRender(content);
  content = normalizeImports(content);

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
  const audit = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(BACKUP_ROOT, timestamp);

  const results = audit.map((entry) => processFile(entry, backupDir));

  const written = results.filter((r) => r.status === 'written').length;
  const dryRun = results.filter((r) => r.status === 'dry-run').length;

  console.log('\n=== Migration RESTAURANTS ===');
  console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
  console.log(`Écrits: ${written}`);
  console.log(`Dry-run: ${dryRun}`);

  console.log('\nFichiers traités:');
  results.filter((r) => r.status !== 'skipped').forEach((r) => console.log('-', r.file));
}

main();
