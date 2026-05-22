#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');
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
const templateImport =
  "import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';";

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && /^BlogArticle.*\.tsx$/.test(f.name))
    .map((f) => path.join(dir, f.name));
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function usesTemplate(content) {
  return /<DestinationArticleTemplate\b/.test(content);
}

function hasTemplateImport(content) {
  return content.includes(templateImport);
}

function extractTitle(content, fallback) {
  const h1Match = content.match(/<H1[^>]*>\s*([^<]+)\s*<\/H1>/);
  if (h1Match) return h1Match[1].trim();

  const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
  if (titleMatch) return titleMatch[1].trim();

  return fallback
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();
}

function extractSlug(content, fileName) {
  const metadataSlugMatch = content.match(/slug:\s*["'`]([^"'`]+)["'`]/);
  if (metadataSlugMatch) return metadataSlugMatch[1];

  return fileName
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function addTemplateImport(content) {
  if (hasTemplateImport(content)) return content;

  const importLines = content.match(/^import .+;$/gm);
  if (!importLines?.length) return `${templateImport}\n${content}`;

  const lastImport = importLines[importLines.length - 1];
  return content.replace(lastImport, `${lastImport}\n${templateImport}`);
}

function removeNearbyImport(content) {
  return content.replace(
    /import\s+\{\s*NearbyDestinations\s*\}\s+from\s+['"]@\/components\/blog\/NearbyDestinations['"];\n?/g,
    '',
  );
}

function removeNearbyUsage(content) {
  return content.replace(
    /\s*<NearbyDestinations\s+currentSlug=\{?["'`][^"'`]+["'`]\}?\s*\/>\s*/g,
    '\n',
  );
}

function migrateSimpleArticle(content, fileName) {
  const slug = extractSlug(content, fileName);
  const title = extractTitle(content, fileName);

  let next = content;

  next = addTemplateImport(next);
  next = removeNearbyImport(next);
  next = removeNearbyUsage(next);

  const returnMatch = next.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*\n}/);

  if (!returnMatch) {
    return {
      ok: false,
      reason: 'Structure return (...) non détectée',
      content,
    };
  }

  const body = returnMatch[1];

  if (body.includes('<DestinationArticleTemplate')) {
    return {
      ok: false,
      reason: 'Article déjà migré',
      content,
    };
  }

  const cleanedBody = body.replace(/<H1[\s\S]*?<\/H1>\s*/g, '').trim();

  const wrapped = `return (
    <DestinationArticleTemplate
      slug="${slug}"
      title="${title.replace(/"/g, '&quot;')}"
      showNearbyDestinations={false}
    >
      ${cleanedBody}
    </DestinationArticleTemplate>
  );`;

  next = next.replace(/return\s*\(\s*[\s\S]*?\s*\);\s*\n}/, `${wrapped}\n}`);

  return {
    ok: true,
    reason: 'Migration simple effectuée',
    content: next,
  };
}

function analyzeFile(filePath) {
  const content = read(filePath);
  const fileName = path.basename(filePath);

  const alreadyTemplate = usesTemplate(content);

  return {
    filePath,
    fileName,
    slug: extractSlug(content, fileName),
    title: extractTitle(content, fileName),
    alreadyTemplate,
    hasTemplateImport: hasTemplateImport(content),
  };
}

function main() {
  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier introuvable :', blogpostDir);
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const results = files.map(analyzeFile);

  const excluded = results.filter((r) => EXCLUDED_FILES.has(r.fileName));
  const notMigrated = results.filter((r) => !r.alreadyTemplate && !EXCLUDED_FILES.has(r.fileName));
  const alreadyMigrated = results.filter((r) => r.alreadyTemplate);

  console.log('\n=== AUDIT DESTINATION ARTICLE TEMPLATE ===\n');
  console.log(`Articles exclus de la migration : ${excluded.length}`);
  console.log(`Total articles BlogArticle*.tsx : ${results.length}`);
  console.log(`Articles déjà migrés : ${alreadyMigrated.length}`);
  console.log(`Articles sans DestinationArticleTemplate : ${notMigrated.length}`);

  if (!notMigrated.length) {
    console.log('\n✅ Tous les articles utilisent déjà DestinationArticleTemplate.');
    return;
  }

  console.log('\n🛠 Articles à migrer :');
  for (const item of notMigrated) {
    console.log(`  - ${item.fileName} | slug: ${item.slug} | title: ${item.title}`);
  }
  if (excluded.length) {
    console.log('\n🚫 Articles exclus volontairement :');
    for (const item of excluded) {
      console.log(`  - ${item.fileName}`);
    }
  }
  if (!SHOULD_FIX) {
    console.log('\nℹ️ Audit seulement. Pour tenter une migration automatique :');
    console.log('node scripts/auditAndMigrateDestinationTemplate.mjs --fix');
    return;
  }

  console.log('\n=== MIGRATION AUTOMATIQUE ===\n');

  for (const item of notMigrated) {
    const original = read(item.filePath);
    const migrated = migrateSimpleArticle(original, item.fileName);

    if (!migrated.ok) {
      console.log(`⚠️ ${item.fileName} non modifié : ${migrated.reason}`);
      continue;
    }

    const backupPath = `${item.filePath}.backup`;
    write(backupPath, original);
    write(item.filePath, migrated.content);

    console.log(`✅ ${item.fileName} migré | backup créé : ${path.basename(backupPath)}`);
  }

  console.log('\n✅ Terminé. Lance maintenant : npm run build');
}

main();
