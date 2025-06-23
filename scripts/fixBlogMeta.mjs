// scripts/fixBlogMeta.js
// Ce script régénère entièrement src/components/lib/data/blogMeta.ts
// à partir des fichiers TSX dans src/components/blogpost/

const fs = require('fs');
const path = require('path');

// Répertoires
const blogDir = path.resolve(__dirname, '../src/components/blogpost');
const outputFile = path.resolve(__dirname, '../src/components/lib/data/blogMeta.ts');

// Helpers d'extraction
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractTitle(content) {
  const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (!match) return null;
  return match[1].replace(/<[^>]*>/g, '').trim();
}

function getPublics(content) {
  const publics = [];
  if (/familyActivities/.test(content)) publics.push('familles');
  if (/teenActivities/.test(content)) publics.push('ados');
  if (/couples/.test(content)) publics.push('couples');
  if (/Culture|Galeries d'Art/.test(content)) publics.push('amateurs de culture');
  if (/rafting|Randonnée/.test(content)) publics.push('aventuriers');
  return publics;
}

function extractArray(content, varName, key) {
  const re = new RegExp(`const\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const m = content.match(re);
  if (!m) return [];
  const list = [];
  const itemRe = new RegExp(`${key}\\s*:\\s*['\"]([^'\"]+)['\"]`, 'g');
  let sub;
  while ((sub = itemRe.exec(m[1])) !== null) list.push(sub[1]);
  return list;
}

// Lecture des fichiers
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.tsx'));
const aggregate = {};

files.forEach((file) => {
  const p = path.join(blogDir, file);
  const src = fs.readFileSync(p, 'utf-8');
  const titleRaw =
    extractTitle(src) ||
    file
      .replace(/BlogArticle|\.tsx/g, '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  const slug = toSlug(titleRaw);
  const resume = `Découverte de ${titleRaw} et de ses attraits touristiques.`;
  const activites = [
    ...extractArray(src, 'activities', 'name'),
    ...extractArray(src, 'familyActivities', 'title'),
    ...extractArray(src, 'teenActivities', 'title'),
  ];
  const hebergements = extractArray(src, 'hotels', 'name');
  const publics = getPublics(src);
  aggregate[slug] = {
    title: titleRaw,
    description: resume,
    image: `/images/${slug}.jpg`,
    activites,
    hebergements,
    publics,
  };
});

// Génération TS
const header = `// AUTO-GÉNÉRÉ — Ne pas modifier manuellement\n\n`;
const iface = `export interface BlogMetaItem { title: string; description: string; image?: string; activites: string[]; hebergements: string[]; publics: string[] }\n\n`;
const exportLine = `export const blogMeta: Record<string, BlogMetaItem> = ${JSON.stringify(aggregate, null, 2)};\n`;

fs.writeFileSync(outputFile, header + iface + exportLine, 'utf8');
console.log(`✅ blogMeta.ts régénéré avec ${Object.keys(aggregate).length} entrées.`);
