const fs = require('fs');
const path = require('path');

const blogpostDir = path.join(__dirname, '../src/components/blogpost');

fs.readdir(blogpostDir, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier blogpost:', err);
    return;
  }

  files
    .filter((file) => file.startsWith('BlogArticle') && file.endsWith('.tsx'))
    .forEach((file) => {
      const filePath = path.join(blogpostDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');

      const baseName = path.basename(file, '.tsx'); // ex: BlogArticleAnseSaintJean

      // Ne pas ajouter si déjà présent
      if (content.includes(`export default`) || content.includes(`export default ${baseName}`)) {
        console.log(`✅ ${file} : export default déjà présent`);
        return;
      }

      // Ajouter un saut de ligne si nécessaire
      if (!content.endsWith('\n')) content += '\n';

      // Ajouter export default à la fin
      content += `\nexport default ${baseName};\n`;

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Ajouté à : ${file}`);
    });
});
