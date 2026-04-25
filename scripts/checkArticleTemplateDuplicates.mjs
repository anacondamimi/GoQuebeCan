#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve(process.cwd(), 'src/components/blogpost');

const checks = [
  {
    prop: 'hotelSection',
    duplicatePatterns: ['<HotelGrid'],
    label: 'Doublon hôtels',
  },
  {
    prop: 'restaurantSection',
    duplicatePatterns: ['<RestaurantPremiumGrid'],
    label: 'Doublon restaurants',
  },
  {
    prop: 'faqSection',
    duplicatePatterns: ['<DestinationFaq', '<FAQ', '<Faq'],
    label: 'Doublon FAQ',
  },
];

function getTsxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return getTsxFiles(fullPath);
    if (entry.isFile() && fullPath.endsWith('.tsx')) return [fullPath];

    return [];
  });
}

function countOccurrences(content, pattern) {
  return content.split(pattern).length - 1;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const problems = [];

  if (!content.includes('<DestinationArticleTemplate')) return problems;

  for (const check of checks) {
    const hasTemplateProp = content.includes(`${check.prop}={`);

    if (!hasTemplateProp) continue;

    for (const pattern of check.duplicatePatterns) {
      const count = countOccurrences(content, pattern);

      // 1 occurrence = normal dans la prop du template
      // 2+ occurrences = probablement doublon dans le children
      if (count >= 2) {
        problems.push({
          label: check.label,
          prop: check.prop,
          component: pattern.replace('<', ''),
          count,
        });
      }
    }
  }

  return problems;
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Dossier introuvable : ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = getTsxFiles(BLOG_DIR);
  const results = [];

  for (const file of files) {
    const problems = analyzeFile(file);

    if (problems.length > 0) {
      results.push({
        file,
        problems,
      });
    }
  }

  if (results.length === 0) {
    console.log('✅ Aucun doublon détecté dans les articles.');
    return;
  }

  console.log('\n⚠️ Articles avec doublons possibles :\n');

  for (const result of results) {
    console.log(`📄 ${path.relative(process.cwd(), result.file)}`);

    for (const problem of result.problems) {
      console.log(
        `   - ${problem.label} : ${problem.component} trouvé ${problem.count} fois alors que ${problem.prop} est déjà utilisé.`,
      );
    }

    console.log('');
  }

  console.log('👉 À vérifier : supprimer les blocs rendus en double dans le contenu de l’article.');
}

main();
