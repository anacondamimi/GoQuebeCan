const fs = require('fs');
const path = require('path');

function walk(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter(entry => !['node_modules', '.next', '.git', 'dist', 'out'].includes(entry.name))
    .map(entry => {
      const indent = '  '.repeat(depth);
      const name = entry.isDirectory() ? `${entry.name}/` : entry.name;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return `${indent}${name}\n${walk(fullPath, depth + 1, maxDepth).join('')}`;
      } else {
        return `${indent}${name}\n`;
      }
    });
}

const rootDir = path.resolve(__dirname);
const output = walk(rootDir).join('');

fs.writeFileSync('structure-simplifiee.txt', output);
console.log('✅ Fichier structure-simplifiee.txt généré.');
