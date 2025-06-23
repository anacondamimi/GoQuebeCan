// simplifyStructure.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'app'); // Remplace par 'pages' si tu utilises le Pages Router
const OUTPUT = path.join(__dirname, 'structure.json');

function getSimpleStructure(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    // Ignorer les fichiers système ou TSX spécifiques
    if (entry.name.startsWith('_') || entry.name.startsWith('.') || entry.name === 'layout.tsx') {
      return [];
    }

    if (entry.isDirectory()) {
      return getSimpleStructure(fullPath, relativePath);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      return ['/' + base.replace(/\\+/g, '/').replace(/\/page\.(t|j)sx$/, '').replace(/\/index$/, '')];
    } else {
      return [];
    }
  });
}

const structure = getSimpleStructure(ROOT);

fs.writeFileSync(OUTPUT, JSON.stringify(structure, null, 2));
console.log(`✅ Structure simplifiée sauvegardée dans ${OUTPUT}`);
