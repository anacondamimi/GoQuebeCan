#!/usr/bin/env node
// scripts/generateBlogMeta.mjs
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Répertoires et chemins
const blogDir = path.resolve(__dirname, '../src/components/blogpost');
const outputFile = path.resolve(__dirname, '../src/components/lib/data/blogMeta.ts');

// 2) Helpers d’extraction
const extractArrayNames = (content, variableName, nameField) => {
  const regex = new RegExp(`const\\s+${variableName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(regex);
  if (!match) return [];
  const items = [];
  const itemRegex = new RegExp(`${nameField}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`, 'g');
  let m;
  while ((m = itemRegex.exec(match[1])) !== null) {
    items.push(m[1].trim());
  }
  return items;
};

const extractTitle = (content) => {
  const h1 = content.match(/<H1[^>]*>(.*?)<\/h1>/i);
  if (!h1) return null;
  const text = h1[1].replace(/<[^>]*>/g, '').trim();
  return text
    .replace(/Guide\s*Complet[:\s–-]*/i, '')
    .split(/–|-|:/)[0]
    .trim();
};

const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getPublicsFromContent = (content) => {
  const publics = new Set();
  if (content.includes('familyActivities')) publics.add('familles');
  if (content.includes('teenActivities')) publics.add('ados');
  if (content.includes('couples')) publics.add('couples');
  if (/Culture|Galeries d'Art/i.test(content)) publics.add('amateurs de culture');
  if (/rafting|Randonn[ée]e/i.test(content)) publics.add('aventuriers');
  return Array.from(publics);
};

const uniqSort = (arr) =>
  Array.from(new Set(arr.filter(Boolean).map((s) => s.trim()))).sort((a, b) =>
    a.localeCompare(b, 'fr'),
  );

// 3) Lecture / collecte
if (!fs.existsSync(blogDir)) {
  console.error(`❌ Dossier introuvable: ${blogDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.startsWith('BlogArticle') && f.endsWith('.tsx'))
  .sort((a, b) => a.localeCompare(b, 'fr'));

const allMeta = {};

for (const file of files) {
  try {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const rawTitle =
      extractTitle(content) ||
      file
        .replace(/^BlogArticle|\.tsx$/g, '')
        .replace(/([A-Z])/g, ' $1')
        .trim();

    const slug = toSlug(rawTitle);
    const description = `Découverte de ${rawTitle} et de ses attraits touristiques.`;

    const activites = uniqSort([
      ...extractArrayNames(content, 'activities', 'name'),
      ...extractArrayNames(content, 'familyActivities', 'title'),
      ...extractArrayNames(content, 'teenActivities', 'title'),
    ]);

    const hebergements = uniqSort(extractArrayNames(content, 'hotels', 'name'));
    const publics = uniqSort(getPublicsFromContent(content));
    const defaultImage = `/images/destinations/${slug}.avif`;

    allMeta[slug] = {
      title: rawTitle,
      description,
      image: defaultImage,
      activites,
      hebergements,
      publics,
    };
  } catch (err) {
    console.warn(`⚠️ Impossible de parser ${file}: ${err.message}`);
  }
}

// 4) Génération TS
const sortedEntries = Object.entries(allMeta).sort(([a], [b]) => a.localeCompare(b, 'fr'));
const sortedObject = Object.fromEntries(sortedEntries);

const header = `// AUTO-GÉNÉRÉ par scripts/generateBlogMeta.mjs — Ne pas modifier à la main

export interface BlogMetaItem {
  title: string;
  description: string;
  image?: string;
  activites: string[];
  hebergements: string[];
  publics: string[];
}

`;

const body =
  `export const blogMeta = ` +
  `${JSON.stringify(sortedObject, null, 2)} ` +
  `as const satisfies Record<string, BlogMetaItem>;
`;

// ... tout ton code au-dessus (header, body, sortedObject, etc.)

async function main() {
  await fsp.mkdir(path.dirname(outputFile), { recursive: true });
  await fsp.writeFile(outputFile, header + body, 'utf-8');
  console.log(`✅ blogMeta.ts mis à jour avec ${sortedEntries.length} entrées (${outputFile}).`);
}

main().catch((err) => {
  console.error('❌ Génération blogMeta échouée:', err);
  process.exit(1);
});
