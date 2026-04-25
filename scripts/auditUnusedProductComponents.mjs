#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.join(process.cwd(), 'src');

const exportedNames = [
  'BuyCTA',
  'ProductSection',
  'QuickChips',
  'DecisionTable',
  'FAQ',
  'Checklist2Col',
  'ConclusionLinks',
  'ItemListJsonLd',
];

function getFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return getFiles(full);
    if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) return [full];
    return [];
  });
}

const files = getFiles(srcDir);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  const importsProductKit =
    content.includes("from '@/components/TravelContentKit'") ||
    content.includes('from "@/components/TravelContentKit"') ||
    content.includes("from '@/components/blog/ProductArticleComponents'") ||
    content.includes('from "@/components/blog/ProductArticleComponents"');

  if (!importsProductKit) continue;

  console.log(`\n📄 ${path.relative(process.cwd(), file)}`);

  for (const name of exportedNames) {
    const count = (content.match(new RegExp(`\\b${name}\\b`, 'g')) || []).length;

    if (count <= 1) {
      console.log(`   ⚠️ ${name} importé mais probablement non utilisé`);
    } else {
      console.log(`   ✅ ${name} utilisé (${count} occurrences)`);
    }
  }
}
