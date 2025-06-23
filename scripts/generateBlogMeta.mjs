// scripts/generateBlogMeta.js

const fs = require('fs');
const path = require('path');

//
// 1. Répertoires et chemins
//
const blogDir = path.resolve(__dirname, '../src/components/blogpost');
const outputFile = path.resolve(__dirname, '../src/components/lib/data/blogMeta.ts');

//
// 2. Helpers d’extraction
//
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
  const h1 = content.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (!h1) return null;
  const text = h1[1].replace(/<[^>]*>/g, '').trim();
  // Si tu as un pattern "Guide Complet – Ville", on enlève la partie Guide :
  return text
    .split(/–|-|:/)[0]
    .replace(/Guide Complet[: ]*/i, '')
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
  const publics = [];
  if (content.includes('familyActivities')) publics.push('familles');
  if (content.includes('teenActivities')) publics.push('ados');
  if (content.includes('couples')) publics.push('couples');
  if (/Culture|Galeries d'Art/.test(content)) publics.push('amateurs de culture');
  if (/rafting|Randonnée/.test(content)) publics.push('aventuriers');
  return publics;
};

//
// 3. Lecture des fichiers et collecte des métas
//
const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.startsWith('BlogArticle') && f.endsWith('.tsx'));

const allMeta = {};

files.forEach((file) => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Titre → Ville ou nom d’article
  const rawTitle =
    extractTitle(content) ||
    file
      .replace(/^BlogArticle|\.tsx$/g, '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
  const slug = toSlug(rawTitle);

  // Résumé générique (à adapter si tu veux un texte plus précis)
  const resume = `Découverte de ${rawTitle} et de ses attraits touristiques.`;

  // Activités et hébergements
  const activites = [
    ...extractArrayNames(content, 'activities', 'name'),
    ...extractArrayNames(content, 'familyActivities', 'title'),
    ...extractArrayNames(content, 'teenActivities', 'title'),
  ];
  const hebergements = extractArrayNames(content, 'hotels', 'name');

  // Publics ciblés
  const publics = getPublicsFromContent(content);

  // Stockage
  allMeta[slug] = {
    title: rawTitle,
    description: resume,
    activites,
    hebergements,
    publics,
  };
});

//
// 4. Génération du fichier blogMeta.ts
//
const header = `// AUTO-GÉNÉRÉ par scripts/generateBlogMeta.js — Ne pas modifier à la main\n\n`;
const interfaceDef = `export interface BlogMetaItem {
  title: string;
  description: string;
  activites: string[];
  hebergements: string[];
  publics: string[];
}\n\n`;
const exportLine = `export const blogMeta: Record<string, BlogMetaItem> = ${JSON.stringify(allMeta, null, 2)};\n`;

fs.writeFileSync(outputFile, header + interfaceDef + exportLine, 'utf-8');
console.log(`✅ blogMeta.ts mis à jour avec ${Object.keys(allMeta).length} entrées.`);
