// Script simplifié pour explorer l’arborescence d’un site Next.js
const fs = require('fs');
const path = require('path');

const IGNORED_DIRS = ['node_modules', '.next', '.git', 'public', '.vscode'];
const MAX_DEPTH = 3; // Pour limiter la taille

function getStructure(dir, depth = 0) {
  if (depth > MAX_DEPTH) return null;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries
    .filter((entry) => !IGNORED_DIRS.includes(entry.name) && !entry.name.startsWith('.'))
    .map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return {
          type: 'folder',
          name: entry.name,
          children: getStructure(fullPath, depth + 1),
        };
      } else {
        return {
          type: 'file',
          name: entry.name,
        };
      }
    });
}

const rootPath = path.resolve(__dirname);
const structure = getStructure(rootPath);

fs.writeFileSync('site-structure.json', JSON.stringify(structure, null, 2), 'utf-8');

console.log('✅ Structure du site générée dans site-structure.json');
