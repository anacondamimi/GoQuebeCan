#!/usr/bin/env node

/**
 * scripts/show-src-tree.mjs
 *
 * Usage :
 * node scripts/show-src-tree.mjs
 *
 * Optionnel :
 * node scripts/show-src-tree.mjs src
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT_ARG = process.argv[2] || 'src';
const rootPath = path.resolve(process.cwd(), ROOT_ARG);

const IGNORED_NAMES = new Set([
  '.git',
  '.next',
  'node_modules',
  'dist',
  'build',
  '.turbo',
  '.vercel',
  'coverage',
]);

const MAX_DEPTH = Infinity;

function isIgnored(name) {
  return IGNORED_NAMES.has(name);
}

function sortEntries(a, b) {
  const aIsDir = a.isDirectory();
  const bIsDir = b.isDirectory();

  if (aIsDir && !bIsDir) return -1;
  if (!aIsDir && bIsDir) return 1;

  return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
}

function walk(dirPath, prefix = '', depth = 0) {
  if (depth > MAX_DEPTH) return [];

  let dirents;
  try {
    dirents = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((entry) => !isIgnored(entry.name))
      .sort(sortEntries);
  } catch (error) {
    return [`${prefix}└── [Erreur lecture dossier: ${path.basename(dirPath)}]`];
  }

  const lines = [];

  dirents.forEach((entry, index) => {
    const isLast = index === dirents.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      lines.push(`${prefix}${connector}${entry.name}/`);
      lines.push(...walk(fullPath, nextPrefix, depth + 1));
    } else {
      lines.push(`${prefix}${connector}${entry.name}`);
    }
  });

  return lines;
}

if (!fs.existsSync(rootPath)) {
  console.error(`Le dossier n'existe pas : ${rootPath}`);
  process.exit(1);
}

if (!fs.statSync(rootPath).isDirectory()) {
  console.error(`Ce chemin n'est pas un dossier : ${rootPath}`);
  process.exit(1);
}

const rootName = path.basename(rootPath);
const treeLines = [`${rootName}/`, ...walk(rootPath)];

console.log(treeLines.join('\n'));
