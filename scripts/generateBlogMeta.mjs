#!/usr/bin/env node
// scripts/generateBlogMeta.mjs

import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Project, Node, SyntaxKind } from 'ts-morph';

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Répertoires et chemins
const blogDir = path.resolve(__dirname, '../src/components/blogpost');
const outputFile = path.resolve(__dirname, '../src/components/lib/data/blogMeta.ts');

// 2) Helpers
const toSlug = (str) =>
  String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const uniqSort = (arr) =>
  Array.from(
    new Set(
      arr
        .filter(Boolean)
        .map((s) => String(s).trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b, 'fr'));

const prettifyFileNameTitle = (fileName) =>
  fileName
    .replace(/^BlogArticle|\.tsx$/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim();

function unquote(text) {
  if (!text) return text;
  return text.replace(/^['"`]/, '').replace(/['"`]$/, '');
}

function getStringLiteralValue(node) {
  if (!node) return null;

  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return node.getLiteralValue().trim();
  }

  if (Node.isTemplateExpression(node)) {
    const head = node.getHead().getLiteralText();
    const spans = node.getTemplateSpans();
    const fullText =
      head +
      spans
        .map((span) => `\${${span.getExpression().getText()}}${span.getLiteral().getLiteralText()}`)
        .join('');
    return fullText.trim();
  }

  return null;
}

function getObjectPropertyString(obj, propName) {
  const prop = obj.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return null;
  return getStringLiteralValue(prop.getInitializer());
}

function extractArrayObjectsStringField(sourceFile, variableName, fieldName) {
  const decl = sourceFile.getVariableDeclaration(variableName);
  if (!decl) return [];

  const init = decl.getInitializer();
  if (!init || !Node.isArrayLiteralExpression(init)) return [];

  const values = [];

  for (const element of init.getElements()) {
    if (!Node.isObjectLiteralExpression(element)) continue;
    const value = getObjectPropertyString(element, fieldName);
    if (value) values.push(value);
  }

  return values;
}

function extractH1TextFromJsx(sourceFile) {
  const descendants = sourceFile.getDescendants();

  for (const node of descendants) {
    if (Node.isJsxElement(node)) {
      const opening = node.getOpeningElement();
      const tagName = opening.getTagNameNode().getText();

      if (tagName !== 'H1') continue;

      const rawText = node.getText();

      const cleaned = rawText
        .replace(/^<H1\b[^>]*>/i, '')
        .replace(/<\/H1>$/i, '')
        .replace(/\{[^}]*\}/g, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleaned) return null;

      return cleaned
        .replace(/guide\s*complet[:\s–-]*/i, '')
        .split(/\s[–-]\s|:| \| /)[0]
        .trim();
    }

    if (Node.isJsxSelfClosingElement(node)) {
      continue;
    }
  }

  return null;
}

function getPublicsFromSource(sourceFile, rawText) {
  const publics = new Set();

  if (sourceFile.getVariableDeclaration('familyActivities')) publics.add('familles');
  if (sourceFile.getVariableDeclaration('teenActivities')) publics.add('ados');

  if (/\bcouples\b/i.test(rawText)) publics.add('couples');
  if (/\b(Culture|Galeries d['’]Art|musée|patrimoine)\b/i.test(rawText)) {
    publics.add('amateurs de culture');
  }
  if (/\b(rafting|randonnée|randonnee|kayak|via ferrata|plein air)\b/i.test(rawText)) {
    publics.add('aventuriers');
  }

  return Array.from(publics);
}

function buildDescription(title, activites, publics) {
  const firstActivities = activites.slice(0, 2);
  const firstPublics = publics.slice(0, 2);

  if (firstActivities.length && firstPublics.length) {
    return `${title} : découvrez ${firstActivities.join(', ')}, avec des idées parfaites pour ${firstPublics.join(' et ')}.`;
  }

  if (firstActivities.length) {
    return `${title} : découvrez les incontournables comme ${firstActivities.join(', ')}.`;
  }

  return `Découvrez ${title}, ses attraits touristiques, ses activités et ses hébergements incontournables.`;
}

// 3) Main
async function main() {
  let dirEntries;

  try {
    dirEntries = await fsp.readdir(blogDir, { withFileTypes: true });
  } catch (err) {
    console.error(`❌ Impossible de lire le dossier blog : ${blogDir}`);
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const files = dirEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.startsWith('BlogArticle') && name.endsWith('.tsx'))
    .sort((a, b) => a.localeCompare(b, 'fr'));

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      allowJs: false,
      jsx: 4, // React JSX
    },
  });

  const allMeta = {};
  const seenSlugs = new Map();

  for (const file of files) {
    try {
      const filePath = path.join(blogDir, file);
      const content = await fsp.readFile(filePath, 'utf-8');

      const sourceFile = project.createSourceFile(filePath, content, {
        overwrite: true,
      });

      const rawTitle = extractH1TextFromJsx(sourceFile) || prettifyFileNameTitle(file);
      const slug = toSlug(rawTitle);

      if (!slug) {
        console.warn(`⚠️ Slug vide pour ${file}, fichier ignoré.`);
        continue;
      }

      if (seenSlugs.has(slug)) {
        console.warn(
          `⚠️ Slug en doublon "${slug}" détecté : ${file} et ${seenSlugs.get(slug)}. Fichier ignoré.`,
        );
        continue;
      }

      seenSlugs.set(slug, file);

      const activites = uniqSort([
        ...extractArrayObjectsStringField(sourceFile, 'activities', 'name'),
        ...extractArrayObjectsStringField(sourceFile, 'familyActivities', 'title'),
        ...extractArrayObjectsStringField(sourceFile, 'teenActivities', 'title'),
      ]);

      const hebergements = uniqSort(extractArrayObjectsStringField(sourceFile, 'hotels', 'name'));

      const publics = uniqSort(getPublicsFromSource(sourceFile, content));
      const image = `/images/destinations/${slug}.avif`;
      const description = buildDescription(rawTitle, activites, publics);

      allMeta[slug] = {
        title: rawTitle,
        description,
        image,
        activites,
        hebergements,
        publics,
      };
    } catch (err) {
      console.warn(
        `⚠️ Impossible de parser ${file}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

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

  const body = `export const blogMeta = ${JSON.stringify(
    sortedObject,
    null,
    2,
  )} as const satisfies Record<string, BlogMetaItem>;
`;

  await fsp.mkdir(path.dirname(outputFile), { recursive: true });
  await fsp.writeFile(outputFile, header + body, 'utf-8');

  console.log(`✅ blogMeta.ts mis à jour avec ${sortedEntries.length} entrées (${outputFile}).`);
}

main().catch((err) => {
  console.error('❌ Génération blogMeta échouée :', err);
  process.exit(1);
});
