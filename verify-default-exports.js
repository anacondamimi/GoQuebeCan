#!/usr/bin/env node

const { globSync } = require('glob');
const fs = require('fs');
const path = require('path');

// Définissez le pattern sur votre dossier de composants
const pattern = path.join(process.cwd(), 'src/components/**/*.tsx');

// Récupérez tous les fichiers TSX de façon synchrone
let files;
try {
  files = globSync(pattern);
} catch (err) {
  console.error('❌ Erreur lors du globbing :', err);
  process.exit(1);
}

const missingDefault = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  // On cherche un "export default"
  if (!/export\s+default/.test(content)) {
    missingDefault.push(path.relative(process.cwd(), file));
  }
});

if (missingDefault.length > 0) {
  console.log('🚨 Fichiers sans `export default` :');
  missingDefault.forEach((f) => console.log('  •', f));
  process.exit(1);
} else {
  console.log('🎉 Tous les composants ont bien un `export default`!');
  process.exit(0);
}
