const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'app');

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (entry.name.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  let changed = false;

  const fixes = [
    { from: /from ['"]app\/components/g, to: "from '@/components" },
    { from: /from ['"]@\/lib\/data\/blogMeta["']/g, to: "from '@/components/lib/data/blogMeta'" },
    {
      from: /from ['"]app\/components\/blog\/BlogComponents["']/g,
      to: "from '@/components/blog/BlogComponents'",
    },
  ];

  fixes.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  });

  // Correction type manquant sur id
  const idFixRegex = /function\s+(\w+)\s*\(\s*id\s*\)/;
  if (idFixRegex.test(content)) {
    content = content.replace(idFixRegex, 'function $1(id: string)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fichier modifié : ${filePath}`);
  }
}

console.log('🔍 Analyse des fichiers .tsx dans app/...');
walk(baseDir, fixFile);
console.log('✅ Correction terminée.');
