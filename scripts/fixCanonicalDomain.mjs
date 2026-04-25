#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = process.cwd();

const OLD_DOMAIN = 'https://goquebecan.com';
const NEW_DOMAIN = 'https://www.goquebecan.com';

const INCLUDED_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mdx',
  '.html',
  '.xml',
  '.txt',
];

const IGNORED_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.vercel']);

let scannedFiles = 0;
let modifiedFiles = 0;
let replacements = 0;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        await walk(fullPath);
      }
      continue;
    }

    const ext = path.extname(entry.name);

    if (!INCLUDED_EXTENSIONS.includes(ext)) continue;

    scannedFiles++;

    const content = await fs.readFile(fullPath, 'utf8');

    if (!content.includes(OLD_DOMAIN)) continue;

    const count = content.split(OLD_DOMAIN).length - 1;
    const updated = content.replaceAll(OLD_DOMAIN, NEW_DOMAIN);

    await fs.writeFile(fullPath, updated, 'utf8');

    modifiedFiles++;
    replacements += count;

    console.log(`✅ ${path.relative(ROOT_DIR, fullPath)} — ${count} remplacement(s)`);
  }
}

await walk(ROOT_DIR);

console.log('\n--- Résumé ---');
console.log(`Fichiers analysés : ${scannedFiles}`);
console.log(`Fichiers modifiés : ${modifiedFiles}`);
console.log(`Remplacements : ${replacements}`);
console.log('✅ Correction terminée.');
