// generateComponentMap.ts
import fs from 'fs';
import path from 'path';

const blogpostDir = path.resolve(__dirname, 'src/components/blogpost');
const outputPath = path.resolve(__dirname, 'app/blog/componentMap.ts');

const files = fs
  .readdirSync(blogpostDir)
  .filter((file) => file.startsWith('BlogArticle') && file.endsWith('.tsx'));

const entries = files.map((file) => {
  const componentName = path.basename(file, '.tsx'); // ex: BlogArticleGaspesie
  const slug = componentName
    .replace(/^BlogArticle/, '') // Retirer "BlogArticle"
    .replace(/([A-Z])/g, '-$1') // Mettre un tiret avant chaque majuscule
    .replace(/^-/, '') // Enlever le tiret du début
    .toLowerCase(); // Tout passer en minuscule

  return `  '${slug}': () => import('@/components/blogpost/${componentName}').then(mod => mod.${componentName}),`;
});

const content = `// 🔧 Auto-generated componentMap.ts

const componentMap: Record<string, () => Promise<any>> = {
${entries.join('\n')}
};

export default componentMap;
`;

fs.writeFileSync(outputPath, content);

console.log('✅ componentMap.ts mis à jour avec succès !');
