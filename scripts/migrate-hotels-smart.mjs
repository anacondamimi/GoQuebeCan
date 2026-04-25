#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/components/blogpost');
const AUDIT_FILE = path.resolve(PROJECT_ROOT, 'src/data/hotels/blogHotelAudit.report.json');
const BY_ARTICLE_DIR = path.resolve(PROJECT_ROOT, 'src/data/hotels/byArticle');
const BACKUP_ROOT = path.resolve(PROJECT_ROOT, '.backup-hotel-migration');

const args = new Set(process.argv.slice(2));
const WRITE = args.has('--write');
const VERBOSE = args.has('--verbose');

function log(...parts) {
  console.log(parts.join(' '));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function backupFile(filePath, backupDir) {
  const rel = path.relative(PROJECT_ROOT, filePath);
  const dest = path.join(backupDir, rel);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(filePath, dest);
}

function toHotelConst(slug) {
  return `HOTEL_IDS_${slug.replace(/-/g, '_').toUpperCase()}`;
}

function buildByArticleImportPath(slug) {
  return `@/data/hotels/byArticle/${slug}`;
}

function buildNeededImports(slug) {
  const hotelConst = toHotelConst(slug);

  return [
    `import { HotelGrid } from '@/components/hotels/HotelGrid';`,
    `import { pickHotels } from '@/data/hotels/hotelCatalog.generated';`,
    `import { ${hotelConst} } from '${buildByArticleImportPath(slug)}';`,
  ];
}

function insertImports(content, slug) {
  const neededImports = buildNeededImports(slug);
  const missing = neededImports.filter((line) => !content.includes(line));

  if (!missing.length) {
    return { content, changed: false };
  }

  const metadataMatch = content.match(/export\s+const\s+metadata\s*=/);

  if (metadataMatch && typeof metadataMatch.index === 'number') {
    const insertPos = metadataMatch.index;

    const before = content.slice(0, insertPos).replace(/\s*$/, '');
    const after = content.slice(insertPos);

    const updated = `${before}\n${missing.join('\n')}\n\n${after}`;
    return { content: updated, changed: true };
  }

  const allImportMatches = [...content.matchAll(/^import .*;$/gm)];
  if (allImportMatches.length) {
    const lastImport = allImportMatches[allImportMatches.length - 1];
    const insertPos = (lastImport.index ?? 0) + lastImport[0].length;
    const updated =
      content.slice(0, insertPos) + '\n' + missing.join('\n') + content.slice(insertPos);
    return { content: updated, changed: true };
  }

  return {
    content: `${missing.join('\n')}\n\n${content}`,
    changed: true,
  };
}

function replaceHotelsConst(content, slug) {
  const hotelConst = toHotelConst(slug);

  const patterns = [
    /const\s+hotels\s*:\s*[^=]+\s*=\s*\[[\s\S]*?\n\];/m,
    /const\s+hotels\s*=\s*\[[\s\S]*?\n\];/m,
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      return {
        content: content.replace(pattern, `const hotels = pickHotels(${hotelConst});`),
        changed: true,
      };
    }
  }

  return { content, changed: false };
}

function replaceHotelsRender(content) {
  const patterns = [
    {
      label: 'div-wrapper',
      regex: /<div\b([^>]*)>\s*\{hotels\.map\(\s*\([^)]*\)\s*=>[\s\S]*?\)\}\s*<\/div>/m,
      replacement: '<HotelGrid items={hotels} />',
    },
    {
      label: 'map-only',
      regex: /\{hotels\.map\(\s*\([^)]*\)\s*=>[\s\S]*?\)\}/m,
      replacement: '<HotelGrid items={hotels} />',
    },
  ];

  for (const { label, regex, replacement } of patterns) {
    if (regex.test(content)) {
      return {
        content: content.replace(regex, replacement),
        changed: true,
        strategy: label,
      };
    }
  }

  return { content, changed: false, strategy: null };
}

function maybeAddMigrationComment(content) {
  const marker = '{/* MIGRATED_HOTELS_GRID */}';
  if (content.includes(marker)) return { content, changed: false };

  const updated = content.replace(
    /<HotelGrid items=\{hotels\} \/>/,
    `${marker}\n<HotelGrid items={hotels} />`,
  );

  return { content: updated, changed: updated !== content };
}

function normalizeSpacing(content) {
  return content.replace(/\n{3,}/g, '\n\n').replace(/[ \t]+\n/g, '\n');
}
function normalizeImports(content) {
  const importRegex = /^import .*;$/gm;
  const imports = content.match(importRegex) || [];

  if (!imports.length) return content;

  // Supprimer tous les imports existants
  let cleaned = content.replace(importRegex, '').trim();

  // Trouver metadata
  const metadataMatch = cleaned.match(/export\s+const\s+metadata\s*=/);

  if (!metadataMatch || typeof metadataMatch.index !== 'number') {
    return imports.join('\n') + '\n\n' + cleaned;
  }

  const insertPos = metadataMatch.index;

  return (
    cleaned.slice(0, insertPos).trim() +
    '\n\n' +
    imports.join('\n') +
    '\n\n' +
    cleaned.slice(insertPos)
  );
}
function processFile(entry, backupDir) {
  const filePath = path.join(BLOG_DIR, entry.file);
  const byArticleFile = path.join(BY_ARTICLE_DIR, `${entry.slug}.ts`);
  const hotelConst = toHotelConst(entry.slug);

  const result = {
    file: entry.file,
    slug: entry.slug,
    status: 'skipped',
    reasons: [],
    steps: [],
  };

  if (!fs.existsSync(filePath)) {
    result.reasons.push('fichier article introuvable');
    return result;
  }

  if (!fs.existsSync(byArticleFile)) {
    result.reasons.push(`byArticle introuvable: ${entry.slug}.ts`);
    return result;
  }

  if (entry.classification !== 'ancien_modele') {
    result.reasons.push(`classification=${entry.classification}`);
    return result;
  }

  if (!entry.hasHotelsArray) {
    result.reasons.push('pas de const hotels = [...] détecté');
    return result;
  }

  if (entry.hasHotelCardComponent) {
    result.reasons.push('composant HotelCard custom détecté');
    return result;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  const importRes = insertImports(content, entry.slug);
  content = importRes.content;
  if (importRes.changed) result.steps.push('imports ajoutés avant metadata');

  const hotelsConstRes = replaceHotelsConst(content, entry.slug);
  content = hotelsConstRes.content;
  if (hotelsConstRes.changed) {
    result.steps.push(`const hotels remplacé par pickHotels(${hotelConst})`);
  } else {
    result.reasons.push('remplacement du const hotels impossible');
    return result;
  }

  const renderRes = replaceHotelsRender(content);
  content = renderRes.content;
  if (renderRes.changed) {
    result.steps.push(`bloc rendu hôtels remplacé (${renderRes.strategy})`);
  } else {
    result.reasons.push('bloc JSX hotels.map(...) non trouvé');
    return result;
  }

  const commentRes = maybeAddMigrationComment(content);
  content = commentRes.content;
  if (commentRes.changed) result.steps.push('marqueur de migration ajouté');

  // ✅ AJOUT ICI
  content = normalizeImports(content);
  result.steps.push('imports normalisés');

  // puis spacing
  content = normalizeSpacing(content);

  if (content === original) {
    result.reasons.push('aucun changement final');
    return result;
  }

  if (WRITE) {
    backupFile(filePath, backupDir);
    fs.writeFileSync(filePath, content, 'utf8');
    result.status = 'written';
  } else {
    result.status = 'dry-run';
  }

  return result;
}

function main() {
  if (!fs.existsSync(AUDIT_FILE)) {
    console.error(`Audit introuvable: ${AUDIT_FILE}`);
    process.exit(1);
  }

  const audit = readJson(AUDIT_FILE);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(BACKUP_ROOT, timestamp);

  const results = [];
  for (const entry of audit) {
    const res = processFile(entry, backupDir);
    results.push(res);

    if (VERBOSE) {
      log(
        `[${res.status}]`,
        res.file,
        res.steps.length ? `→ ${res.steps.join(', ')}` : '',
        res.reasons.length ? `| ${res.reasons.join(' / ')}` : '',
      );
    }
  }

  const summary = {
    written: results.filter((r) => r.status === 'written').length,
    dryRun: results.filter((r) => r.status === 'dry-run').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
  };

  const reportPath = path.resolve(PROJECT_ROOT, 'src/data/hotels/blogHotelMigration.report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n=== Migration hôtels intelligente ===');
  console.log(`Mode        : ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
  console.log(`Écrits      : ${summary.written}`);
  console.log(`Dry-run     : ${summary.dryRun}`);
  console.log(`Ignorés     : ${summary.skipped}`);
  console.log(`Rapport     : ${reportPath}`);

  if (WRITE) {
    console.log(`Backups     : ${backupDir}`);
  }

  const interesting = results.filter((r) => r.status !== 'skipped');
  if (interesting.length) {
    console.log('\nFichiers concernés :');
    for (const r of interesting) {
      console.log(`- ${r.file} [${r.status}]`);
    }
  }

  const blocked = results.filter(
    (r) =>
      r.reasons.some((reason) => reason.includes('HotelCard custom')) ||
      r.reasons.some((reason) => reason.includes('bloc JSX hotels.map')) ||
      r.reasons.some((reason) => reason.includes('const hotels')),
  );

  if (blocked.length) {
    console.log('\nÀ revoir manuellement :');
    for (const r of blocked) {
      console.log(`- ${r.file}: ${r.reasons.join(' | ')}`);
    }
  }
}

main();
