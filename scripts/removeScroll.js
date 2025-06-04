#!/usr/bin/env node
// scripts/removeScroll.js
// Supprime les références au scroll intra-page (handleScroll, onScrollToSection) dans tout le code .tsx

const fs = require('fs');
const path = require('path');

// Renvoie tous les fichiers sous le dossier courant
function walk(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
  return files;
}

const projectRoot = process.cwd();
const tsxFiles = walk(projectRoot);

tsxFiles.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;

  // 1) Supprime la déclaration de handleScroll
  updated = updated.replace(/const\s+handleScroll\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};?/g, '');

  // 2) Supprime les props onScrollToSection={...}
  updated = updated.replace(/\s+onScrollToSection=\{[^}]+\}/g, '');

  // 3) Supprime les id d'ancres si désiré (optionnel) -- désactivé par défaut
  // updated = updated.replace(/id="[^"]+"/g, '');

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✅ Modifié : ${file}`);
  }
});

console.log('🚀 Suppression du scroll terminée.');
