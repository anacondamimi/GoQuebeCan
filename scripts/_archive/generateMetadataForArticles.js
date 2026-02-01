const fs = require('fs');
const path = require('path');

const blogDir = path.resolve('./src/components/blogpost');

const extractArrayNames = (content, variableName, nameField) => {
  const regex = new RegExp(`const\\s+${variableName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(regex);
  if (!match) return [];

  const items = [];
  const itemRegex = new RegExp(`${nameField}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`, 'g');
  let submatch;
  while ((submatch = itemRegex.exec(match[1])) !== null) {
    items.push(submatch[1]);
  }

  return items;
};

const extractTitle = (content) => {
  const match = content.match(/<H1[^>]*>(.*?)<\/h1>/);
  if (!match) return null;

  const raw = match[1].replace(/<[^>]*>/g, '').trim();
  return raw
    .split('-')[0]
    .replace(/Guide Complet[: ]*/i, '')
    .trim();
};

const insertMetadataBlock = (content, metadataBlock) => {
  const importEnd = content.indexOf(';\n', content.indexOf('from')) + 2;
  return content.slice(0, importEnd) + '\n\n' + metadataBlock + '\n' + content.slice(importEnd);
};

const generateMetadataBlock = (slug, ville, resume, activites, hebergements, publics) => {
  return `export const metadata = {
  slug: "${slug}",
  ville: "${ville}",
  resume: "${resume}",
  activites: ${JSON.stringify(activites, null, 2)},
  hebergements: ${JSON.stringify(hebergements, null, 2)},
  publics: ${JSON.stringify(publics, null, 2)}
};`;
};

const toSlug = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getPublicsFromVariables = (content) => {
  const publics = [];
  if (content.includes('familyActivities')) publics.push('familles');
  if (content.includes('teenActivities')) publics.push('ados');
  if (content.includes('couples')) publics.push('couples');
  if (content.includes('Culture') || content.includes("Galeries d'Art"))
    publics.push('amateurs de culture');
  if (content.includes('rafting') || content.includes('Randonnée')) publics.push('aventuriers');
  return publics;
};

const run = () => {
  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.startsWith('BlogArticle') && f.endsWith('.tsx'));

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes('export const metadata')) {
      console.log(`⏩ ${file} a déjà un bloc metadata. Ignoré.`);
      continue;
    }

    const ville =
      extractTitle(content) ||
      file
        .replace(/^BlogArticle|\.tsx$/g, '')
        .replace(/([A-Z])/g, ' $1')
        .trim();
    const slug = toSlug(ville);
    const resume = `Découverte de ${ville} et de ses attraits touristiques.`;

    const activites = [
      ...extractArrayNames(content, 'activities', 'name'),
      ...extractArrayNames(content, 'familyActivities', 'title'),
      ...extractArrayNames(content, 'teenActivities', 'title'),
    ];

    const hebergements = extractArrayNames(content, 'hotels', 'name');
    const publics = getPublicsFromVariables(content);

    const metadataBlock = generateMetadataBlock(
      slug,
      ville,
      resume,
      activites,
      hebergements,
      publics,
    );
    const newContent = insertMetadataBlock(content, metadataBlock);

    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Metadata ajouté à ${file}`);
  }

  console.log('🎉 Tous les fichiers ont été traités.');
};

run();
