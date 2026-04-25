#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');

const templateImport =
  "import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate'";
const nearbyImport = "import { NearbyDestinations } from '@/components/blog/NearbyDestinations'";

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.tsx'))
    .map((f) => path.join(dir, f.name));
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  return {
    file: path.basename(filePath),
    hasTemplate: content.includes(templateImport),
    hasNearby: content.includes(nearbyImport),
  };
}

function main() {
  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier blogpost introuvable');
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const results = files.map(analyzeFile);

  console.log('\n=== ANALYSE DES IMPORTS ===\n');

  const missingTemplate = [];
  const missingNearby = [];
  const ok = [];

  for (const r of results) {
    if (!r.hasTemplate) missingTemplate.push(r.file);
    if (!r.hasNearby) missingNearby.push(r.file);
    if (r.hasTemplate && r.hasNearby) ok.push(r.file);
  }

  console.log('✅ OK (les deux présents) :');
  ok.forEach((f) => console.log('  -', f));

  console.log('\n⚠️ MANQUE DestinationArticleTemplate :');
  missingTemplate.forEach((f) => console.log('  -', f));

  console.log('\n⚠️ MANQUE NearbyDestinations :');
  missingNearby.forEach((f) => console.log('  -', f));

  console.log('\n📊 Résumé :');
  console.log('Total fichiers :', files.length);
  console.log('OK :', ok.length);
  console.log('Manque Template :', missingTemplate.length);
  console.log('Manque Nearby :', missingNearby.length);
}

main();
