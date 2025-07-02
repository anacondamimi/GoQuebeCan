import { promises as fs } from 'fs';
import path from 'path';

// 📁 Racine du projet
const projectRoot = process.cwd();
const blogFolderPath = path.join(projectRoot, 'app', 'blog');
const componentsFolderPath = path.join(projectRoot, 'src', 'components', 'blogpost');

// 🗺️ Liste des slugs attendus
const slugs = [
  'vieux-quebec',
  'gaspesie',
  'montreal',
  'charlevoix',
  'anse-saint-jean',
  'bic',
  'forillon',
  'magog-orford',
  'massif',
  'tadoussac',
  'baie-saint-paul',
  'rivière-du-loup',
  'sherbrooke',
  'quebec',
  'port-cartier',
  'wasaga-beach',
];

// 🔁 Slug → Nom du fichier
function slugToComponentFilename(slug: string): string {
  return (
    'BlogArticle' +
    slug
      .replace(/_/g, '-')
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') +
    '.tsx'
  );
}

// 🔥 Suppression des page.tsx inutiles
async function cleanRedundantPages() {
  console.log('🧹 Nettoyage des fichiers page.tsx inutiles...\\n');
  const entries = await fs.readdir(blogFolderPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== '[slug]') {
      const pagePath = path.join(blogFolderPath, entry.name, 'page.tsx');
      try {
        await fs.access(pagePath);
        await fs.unlink(pagePath);
        console.log(`🗑️  Supprimé : ${pagePath}`);
      } catch {
        console.log(`✅ Aucun fichier à supprimer pour : ${entry.name}`);
      }
    }
  }
}

// 🔎 Vérification que tous les BlogArticleX.tsx existent
async function verifyBlogArticles() {
  console.log('\\n🔍 Vérification des composants BlogArticleX.tsx...\\n');
  let hasErrors = false;

  for (const slug of slugs) {
    const expectedFile = slugToComponentFilename(slug);
    const filePath = path.join(componentsFolderPath, expectedFile);

    try {
      await fs.access(filePath);
      console.log(`✅ Trouvé : ${expectedFile}`);
    } catch {
      console.error(`❌ Manquant : ${expectedFile}`);
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('\\n🎉 Tous les fichiers BlogArticleX.tsx nécessaires sont présents.');
  } else {
    console.warn('\\n⚠️ Des fichiers manquent. Pense à vérifier ton componentMap.');
  }
}

// 🚀 Script principal
async function main() {
  await cleanRedundantPages();
  await verifyBlogArticles();
}

main();
