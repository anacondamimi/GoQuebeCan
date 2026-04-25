#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const BLOG_DIR = path.resolve(PROJECT_ROOT, 'src/components/blogpost');
const OUTPUT_JSON = path.resolve(
  PROJECT_ROOT,
  'src/data/restaurants/blogRestaurantAudit.report.json',
);
const OUTPUT_TXT = path.resolve(
  PROJECT_ROOT,
  'src/data/restaurants/blogRestaurantAudit.report.txt',
);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toSlug(filename) {
  return filename
    .replace(/^BlogArticle/, '')
    .replace(/\.tsx$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

function countMatches(content, regex) {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function extractRestaurantsArrayBlock(content) {
  const patterns = [
    /const\s+restaurants\s*:\s*[^=]+\s*=\s*\[([\s\S]*?)\n\];/m,
    /const\s+restaurants\s*=\s*\[([\s\S]*?)\n\];/m,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractObjectBlocks(arrayBlock) {
  if (!arrayBlock) return [];

  const objects = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < arrayBlock.length; i += 1) {
    const char = arrayBlock[i];

    if (char === '{') {
      if (depth === 0) start = i;
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        objects.push(arrayBlock.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return objects;
}

function extractKeysFromObjectBlock(objectBlock) {
  const keys = new Set();
  const regex = /([A-Za-z_][A-Za-z0-9_]*)\s*:/g;
  let match;

  while ((match = regex.exec(objectBlock)) !== null) {
    keys.add(match[1]);
  }

  return [...keys];
}

function extractAllRestaurantKeys(arrayBlock) {
  const objectBlocks = extractObjectBlocks(arrayBlock);
  const keySet = new Set();

  for (const block of objectBlocks) {
    for (const key of extractKeysFromObjectBlock(block)) {
      keySet.add(key);
    }
  }

  return {
    objectCount: objectBlocks.length,
    keys: [...keySet].sort((a, b) => a.localeCompare(b, 'fr')),
  };
}

function detectRestaurantSection(content) {
  const patterns = [
    /où manger/i,
    /ou manger/i,
    /restaurants?/i,
    /restauration/i,
    /restaurantSection\s*=/i,
    /RestaurantPremiumGrid/i,
  ];

  return patterns.some((p) => p.test(content));
}

function isRestaurantPremiumCompatible(keys) {
  const requiredCore = ['name', 'type', 'speciality', 'price', 'mustTry', 'schedule'];
  return requiredCore.every((key) => keys.includes(key));
}

function classifyRestaurantArticle(data) {
  if (data.hasRestaurantPremiumGridImport && data.hasRestaurantPremiumGridUsage) {
    return 'deja_migre';
  }

  if (data.hasRestaurantsArray && data.isPremiumCompatible) {
    return 'compatible_auto';
  }

  if (data.hasRestaurantsArray && !data.isPremiumCompatible) {
    return 'array_a_enrichir';
  }

  if (data.hasRestaurantSectionButNoArray) {
    return 'section_sans_array';
  }

  return 'sans_restaurants_detectes';
}

function auditFile(filePath) {
  const filename = path.basename(filePath);
  const slug = toSlug(filename);
  const content = fs.readFileSync(filePath, 'utf8');

  const arrayBlock = extractRestaurantsArrayBlock(content);
  const { objectCount, keys } = extractAllRestaurantKeys(arrayBlock);

  const hasRestaurantsArray = !!arrayBlock;
  const hasRestaurantPremiumGridImport = content.includes(
    `import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';`,
  );
  const hasRestaurantPremiumGridUsage = /<RestaurantPremiumGrid\b/.test(content);
  const hasRestaurantSection = detectRestaurantSection(content);
  const hasRestaurantMapRender = /\{restaurants\.map\(/.test(content);
  const restaurantMentions = countMatches(content, /restaurants?/gi);
  const hasRestaurantSectionButNoArray = hasRestaurantSection && !hasRestaurantsArray;
  const isPremiumCompatible = isRestaurantPremiumCompatible(keys);

  const result = {
    file: filename,
    slug,
    hasRestaurantsArray,
    restaurantObjectCount: objectCount,
    restaurantKeys: keys,
    hasRestaurantPremiumGridImport,
    hasRestaurantPremiumGridUsage,
    hasRestaurantMapRender,
    hasRestaurantSection,
    hasRestaurantSectionButNoArray,
    restaurantMentions,
    isPremiumCompatible,
    classification: '',
  };

  result.classification = classifyRestaurantArticle(result);

  return result;
}

function buildTextReport(results) {
  const lines = [];

  lines.push('AUDIT RESTAURANTS DES ARTICLES');
  lines.push('='.repeat(70));
  lines.push('');

  const groups = {};
  for (const r of results) {
    if (!groups[r.classification]) groups[r.classification] = [];
    groups[r.classification].push(r);
  }

  for (const [group, items] of Object.entries(groups)) {
    lines.push(`${group.toUpperCase()} (${items.length})`);
    lines.push('-'.repeat(70));

    for (const item of items.sort((a, b) => a.file.localeCompare(b.file, 'fr'))) {
      lines.push(`• ${item.file}`);
      lines.push(`  slug: ${item.slug}`);
      lines.push(
        `  array:${item.hasRestaurantsArray ? 'oui' : 'non'} | objets:${item.restaurantObjectCount} | premium import:${item.hasRestaurantPremiumGridImport ? 'oui' : 'non'} | premium usage:${item.hasRestaurantPremiumGridUsage ? 'oui' : 'non'}`,
      );
      lines.push(
        `  restaurants.map:${item.hasRestaurantMapRender ? 'oui' : 'non'} | section détectée:${item.hasRestaurantSection ? 'oui' : 'non'} | compatible premium:${item.isPremiumCompatible ? 'oui' : 'non'}`,
      );
      lines.push(
        `  clés: ${item.restaurantKeys.length ? item.restaurantKeys.join(', ') : '(aucune)'}`,
      );
      lines.push('');
    }

    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Dossier introuvable: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /^BlogArticle.*\.tsx$/.test(f))
    .map((f) => path.join(BLOG_DIR, f));

  const results = files.map(auditFile);

  ensureDir(path.dirname(OUTPUT_JSON));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_TXT, buildTextReport(results), 'utf8');

  const summary = results.reduce((acc, item) => {
    acc[item.classification] = (acc[item.classification] || 0) + 1;
    return acc;
  }, {});

  console.log('Audit restaurants terminé.\n');
  console.log('Résumé :');
  for (const [key, value] of Object.entries(summary)) {
    console.log(`- ${key}: ${value}`);
  }

  console.log(`\nRapport JSON : ${OUTPUT_JSON}`);
  console.log(`Rapport texte: ${OUTPUT_TXT}`);
}

main();
