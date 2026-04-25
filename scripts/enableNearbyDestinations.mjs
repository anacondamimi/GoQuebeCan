#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src', 'components', 'blogpost');
const SHOULD_FIX = process.argv.includes('--fix');

const EXCLUDED_FILES = new Set([
  'BlogArticleLocationVR.tsx',
  'BlogArticleLocationVRComparatif.tsx',
  'BlogArticleParcAquatique.tsx',
  'BlogArticleVoyageAvion.tsx',
  'BlogArticleVoyageCamping.tsx',
  'BlogArticleVoyageHotel.tsx',
  'BlogArticleVoyageVoiture.tsx',
]);

function getFiles(folder) {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((f) => f.isFile() && /^BlogArticle.*\.tsx$/.test(f.name))
    .map((f) => path.join(folder, f.name));
}

const files = getFiles(dir);
const affected = [];

for (const file of files) {
  const name = path.basename(file);
  if (EXCLUDED_FILES.has(name)) continue;

  const content = fs.readFileSync(file, 'utf8');

  if (content.includes('showNearbyDestinations={false}')) {
    affected.push({ file, name, content });
  }
}

if (!affected.length) {
  console.log('✅ Aucun article destination avec showNearbyDestinations={false}.');
  process.exit(0);
}

console.log('\nArticles destination à corriger :\n');
for (const item of affected) {
  console.log(`- ${item.name}`);
}

if (!SHOULD_FIX) {
  console.log('\nAudit seulement. Pour corriger :');
  console.log('node scripts/enableNearbyDestinations.mjs --fix');
  process.exit(0);
}

for (const item of affected) {
  const backup = `${item.file}.backup-nearby`;
  fs.writeFileSync(backup, item.content, 'utf8');

  const next = item.content.replace(/\s*showNearbyDestinations=\{false\}/g, '');

  fs.writeFileSync(item.file, next, 'utf8');
  console.log(`✅ Corrigé : ${item.name}`);
}

console.log('\nTerminé. Lance : npm run build');
