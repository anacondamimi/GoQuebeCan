const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '../src/components/blogpost');

// Icônes à supprimer (imports et balises JSX)
const iconsToRemove = ['MapPin', 'Camera', 'Mountain', 'Waves', 'Lighthouse'];

fs.readdirSync(folderPath)
  .filter((file) => file.startsWith('BlogArticle') && file.endsWith('.tsx'))
  .forEach((file) => {
    const filePath = path.join(folderPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 🔥 Supprimer balises JSX <Icon ... /> (autofermantes)
    iconsToRemove.forEach((icon) => {
      const jsxRegex = new RegExp(`<${icon}[^>]*\\/?>\\s*`, 'g');
      content = content.replace(jsxRegex, '');
    });

    // 🔥 Supprimer import de lucide-react
    const importRegex = /import\s*{\s*([^}]*)\s*}\s*from\s*['"]lucide-react['"];/;
    const match = content.match(importRegex);

    if (match) {
      const cleanedIcons = match[1]
        .split(',')
        .map((icon) => icon.trim())
        .filter((icon) => !iconsToRemove.includes(icon));

      const newImportLine =
        cleanedIcons.length > 0
          ? `import { ${cleanedIcons.join(', ')} } from 'lucide-react';`
          : '';

      content = content.replace(importRegex, newImportLine);
    }

    // 🔥 Supprimer déclarations inutilisées (ex: const Lighthouse = ...)
    iconsToRemove.forEach((icon) => {
      const constRegex = new RegExp(`const\\s+${icon}\\s*=\\s*[^;]+;\\s*`, 'g');
      content = content.replace(constRegex, '');
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Nettoyé : ${file}`);
  });
