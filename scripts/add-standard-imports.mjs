#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');

const templateImport =
  "import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';";
const nearbyImport = "import { NearbyDestinations } from '@/components/blog/NearbyDestinations';";

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.tsx'))
    .map((f) => path.join(dir, f.name));
}

function hasImport(content, importLine) {
  return content.includes(importLine);
}

function usesTemplate(content) {
  return /<DestinationArticleTemplate\b/.test(content);
}

function usesNearby(content) {
  return /<NearbyDestinations\b/.test(content);
}

function insertImport(content, importLine) {
  if (hasImport(content, importLine)) return content;

  const lines = content.split('\n');
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (/^import\s.+from\s+['"].+['"];?\s*$/.test(lines[i].trim())) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    return `${importLine}\n${content}`;
  }

  lines.splice(lastImportIndex + 1, 0, importLine);
  return lines.join('\n');
}

function processFile(filePath, dryRun = false) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  const fileName = path.basename(filePath);
  const templateUsed = usesTemplate(original);
  const nearbyUsed = usesNearby(original);

  let addedTemplateImport = false;
  let addedNearbyImport = false;

  if (templateUsed && !hasImport(updated, templateImport)) {
    updated = insertImport(updated, templateImport);
    addedTemplateImport = true;
  }

  if ((templateUsed || nearbyUsed) && !hasImport(updated, nearbyImport)) {
    updated = insertImport(updated, nearbyImport);
    addedNearbyImport = true;
  }

  if (updated !== original && !dryRun) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }

  return {
    fileName,
    changed: updated !== original,
    templateUsed,
    nearbyUsed,
    addedTemplateImport,
    addedNearbyImport,
  };
}

function main() {
  const dryRun = process.argv.includes('--dry-run');

  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier introuvable :', blogpostDir);
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const results = files.map((file) => processFile(file, dryRun));

  console.log(`\nMode : ${dryRun ? 'DRY RUN' : 'WRITE'}\n`);

  for (const r of results) {
    if (!r.changed) continue;
    console.log(
      `✔ ${r.fileName} ${
        r.addedTemplateImport ? '[+TemplateImport]' : ''
      } ${r.addedNearbyImport ? '[+NearbyImport]' : ''}`.trim(),
    );
  }

  const changed = results.filter((r) => r.changed).length;
  const templateCandidates = results.filter((r) => r.templateUsed).length;
  const nearbyCandidates = results.filter((r) => r.templateUsed || r.nearbyUsed).length;

  console.log('\nRésumé');
  console.log('Fichiers analysés :', results.length);
  console.log('Fichiers utilisant DestinationArticleTemplate :', templateCandidates);
  console.log('Fichiers candidats pour NearbyDestinations :', nearbyCandidates);
  console.log('Fichiers modifiés :', changed);
}

main();
