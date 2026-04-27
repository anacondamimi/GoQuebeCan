#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, 'project-structure-report.txt');

const TARGETS = ['app', 'src', 'public', 'scripts'];

const IMPORTANT_FILES = [
  'app/sitemap.ts',
  'scripts/generate-sitemap-data.js',
  'scripts/generate-sitemap-data.mjs',
  'src/generated/sitemap-data.json',
  'public/destinations.json',
  'src/data/blog-slugs.ts',
  'src/components/blog/blogSlugs.server.ts',
  'package.json',
];

const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', '.vercel', 'dist', 'build']);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, prefix = '') {
  const lines = [];

  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return lines;
  }

  entries.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(ROOT, fullPath);

    lines.push(`${prefix}${entry.isDirectory() ? '📁' : '📄'} ${relativePath}`);

    if (entry.isDirectory()) {
      const childLines = await walk(fullPath, `${prefix}  `);
      lines.push(...childLines);
    }
  }

  return lines;
}

async function main() {
  const output = [];

  output.push('=== RAPPORT STRUCTURE PROJET GOQUEBECAN ===');
  output.push(`Date: ${new Date().toISOString()}`);
  output.push(`Root: ${ROOT}`);
  output.push('');

  output.push('=== ARBORESCENCE ===');

  for (const target of TARGETS) {
    const targetPath = path.join(ROOT, target);

    if (await exists(targetPath)) {
      output.push('');
      output.push(`--- ${target}/ ---`);
      const lines = await walk(targetPath);
      output.push(...lines);
    }
  }

  output.push('');
  output.push('=== FICHIERS IMPORTANTS À COPIER/COLLER ENSUITE ===');

  for (const file of IMPORTANT_FILES) {
    const filePath = path.join(ROOT, file);

    if (!(await exists(filePath))) {
      output.push('');
      output.push(`--- ${file} ---`);
      output.push('ABSENT');
      continue;
    }

    const content = await fs.readFile(filePath, 'utf8');

    output.push('');
    output.push(`--- ${file} ---`);
    output.push(content.slice(0, 20000));

    if (content.length > 20000) {
      output.push('');
      output.push('[FICHIER TRONQUÉ À 20000 CARACTÈRES]');
    }
  }

  await fs.writeFile(OUT_FILE, output.join('\n'), 'utf8');

  console.log(`✅ Rapport généré : ${OUT_FILE}`);
}

main().catch((error) => {
  console.error('❌ Erreur génération rapport structure');
  console.error(error);
  process.exit(1);
});
