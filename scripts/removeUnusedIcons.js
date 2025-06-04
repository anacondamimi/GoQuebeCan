const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '../src/components/blogpost');

const iconsToRemove = ['MapPin', 'Camera'];

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Erreur de lecture du dossier blogpost :', err);
    return;
  }

  files
    .filter((file) => file.startsWith('BlogArticle') && file.endsWith('.tsx'))
    .forEach((file) => {
      const filePath = path.join(folderPath, file);
      let content = fs.readFileSync(filePath, 'utf8');

      // Repère la ligne d'import des icônes lucide-react
      const importRegex = /import\s*{\s*([^}]*)\s*}\s*from\s*['"]lucide-react['"];/;

      const match = content.match(importRegex);
      if (match) {
        const importedIcons = match[1]
          .split(',')
          .map((icon) => icon.trim())
          .filter((icon) => !iconsToRemove.includes(icon));

        const newImportLine =
          importedIcons.length > 0
            ? `import { ${importedIcons.join(', ')} } from 'lucide-react';`
            : ''; // supprime complètement l'import s'il n'en reste plus

        content = content.replace(importRegex, newImportLine);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Nettoyé : ${file}`);
      } else {
        console.log(`ℹ️ Aucun import trouvé dans ${file}`);
      }
    });
});
