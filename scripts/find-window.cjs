/* eslint-env node */

const fs = require('fs');
const path = require('path');

const exts = ['.js', '.jsx', '.ts', '.tsx'];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('window') || line.includes('document') || line.includes('navigator')) {
      console.log(`${filePath}:${idx + 1} => ${line.trim()}`);
    }
  });
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory() && !file.startsWith('.')) {
      scanDir(fullPath);
    } else if (exts.includes(path.extname(fullPath))) {
      scanFile(fullPath);
    }
  });
}

console.log('\n🔍 Recherche des usages de window, document, navigator dans le projet...\n');
scanDir(process.cwd());
console.log('\n✅ Scan terminé. Corrige les occurrences listées si nécessaires.\n');
