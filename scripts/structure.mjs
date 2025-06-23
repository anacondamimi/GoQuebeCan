// 📁 Place ce fichier à la racine de ton projet

const fs = require('fs');
const path = require('path');

const IGNORE = [
  'node_modules',
  '.git',
  '.next',
  '.vercel',
  'build',
  'dist',
  'out',
  'public',
  '.turbo',
  '.idea',
];

function walk(dir, indent = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries
    .filter((entry) => !IGNORE.includes(entry.name) && !entry.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      console.log(`${indent}├── ${entry.name}`);

      if (entry.isDirectory()) {
        walk(fullPath, indent + '│   ');
      }
    });
}

console.log('📁 Structure du projet :\n');
walk('.');
