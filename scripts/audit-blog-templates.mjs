#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.tsx'))
    .map((f) => path.join(dir, f.name));
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function usesTemplate(content) {
  return /<DestinationArticleTemplate\b/.test(content);
}

function usesNearby(content) {
  return /<NearbyDestinations\b/.test(content);
}

function hasTemplateImport(content) {
  return content.includes(
    "import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';",
  );
}

function hasNearbyImport(content) {
  return content.includes(
    "import { NearbyDestinations } from '@/components/blog/NearbyDestinations';",
  );
}

function extractSlug(content, fileName) {
  const slugPropMatch = content.match(/slug\s*=\s*["'`]([^"'`]+)["'`]/);
  if (slugPropMatch) return slugPropMatch[1];

  const metadataSlugMatch = content.match(/slug:\s*["'`]([^"'`]+)["'`]/);
  if (metadataSlugMatch) return metadataSlugMatch[1];

  return fileName
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function analyzeFile(filePath) {
  const content = read(filePath);
  const fileName = path.basename(filePath);

  return {
    fileName,
    slug: extractSlug(content, fileName),
    usesTemplate: usesTemplate(content),
    usesNearby: usesNearby(content),
    hasTemplateImport: hasTemplateImport(content),
    hasNearbyImport: hasNearbyImport(content),
  };
}

function printGroup(title, items, formatLine) {
  console.log(`\n${title}`);
  if (!items.length) {
    console.log('  - aucun');
    return;
  }
  for (const item of items) {
    console.log(`  - ${formatLine(item)}`);
  }
}

function main() {
  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier introuvable :', blogpostDir);
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const results = files.map(analyzeFile);

  const templateArticles = results.filter((r) => r.usesTemplate);
  const templateWithNearby = templateArticles.filter((r) => r.usesNearby);
  const templateWithoutNearby = templateArticles.filter((r) => !r.usesNearby);
  const notMigrated = results.filter((r) => !r.usesTemplate);

  const templateImportMissing = templateArticles.filter((r) => !r.hasTemplateImport);
  const nearbyImportMissing = results.filter((r) => r.usesNearby && !r.hasNearbyImport);

  console.log('\n=== AUDIT INTELLIGENT DES ARTICLES BLOG ===');

  printGroup(
    '✅ Articles déjà sur DestinationArticleTemplate',
    templateArticles,
    (r) => `${r.fileName} (slug: ${r.slug})`,
  );

  printGroup(
    '✅ Articles sur template + NearbyDestinations déjà présent',
    templateWithNearby,
    (r) => `${r.fileName} (slug: ${r.slug})`,
  );

  printGroup(
    '⚠️ Articles sur template mais sans NearbyDestinations',
    templateWithoutNearby,
    (r) => `${r.fileName} (slug: ${r.slug})`,
  );

  printGroup(
    '🛠 Articles pas encore migrés vers DestinationArticleTemplate',
    notMigrated,
    (r) => r.fileName,
  );

  printGroup(
    '⚠️ Import DestinationArticleTemplate manquant alors que le composant est utilisé',
    templateImportMissing,
    (r) => r.fileName,
  );

  printGroup(
    '⚠️ Import NearbyDestinations manquant alors que le composant est utilisé',
    nearbyImportMissing,
    (r) => r.fileName,
  );

  console.log('\n📊 Résumé');
  console.log(`Total articles : ${results.length}`);
  console.log(`Articles sur template : ${templateArticles.length}`);
  console.log(`Articles sur template + nearby : ${templateWithNearby.length}`);
  console.log(`Articles sur template sans nearby : ${templateWithoutNearby.length}`);
  console.log(`Articles non migrés : ${notMigrated.length}`);
}

main();
