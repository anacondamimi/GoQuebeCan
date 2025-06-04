const fs = require('fs');
const path = require('path');

const rootDir = './src/components'; // Tu peux adapter ce chemin si nécessaire
const fileMap = new Map();

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      const baseName = entry.name;
      if (!fileMap.has(baseName)) {
        fileMap.set(baseName, []);
      }
      fileMap.get(baseName).push(fullPath);
    }
  }
}

scanDir(rootDir);

// 🔍 Affiche les doublons
console.log('\n📋 Fichiers TSX avec noms en double :\n');

let foundDuplicates = false;
for (const [fileName, paths] of fileMap.entries()) {
  if (paths.length > 1) {
    foundDuplicates = true;
    console.log(`🔁 ${fileName}`);
    paths.forEach((p) => console.log(`   └── ${p}`));
    console.log();
  }
}

if (!foundDuplicates) {
  console.log('✅ Aucun doublon détecté.');
}
