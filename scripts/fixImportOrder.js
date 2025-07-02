const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'src', 'components', 'blogpost');

fs.readdirSync(folderPath).forEach((file) => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const lines = content.split('\n');
    const importLines = [];
    const otherLines = [];

    // 1. Récupérer toutes les lignes d'import où qu'elles soient
    for (const line of lines) {
      if (line.trim().startsWith('import')) {
        importLines.push(line);
      } else {
        otherLines.push(line);
      }
    }

    // 2. Supprimer les import duplicatas si jamais il y en a
    const uniqueImports = Array.from(new Set(importLines));

    // 3. Recomposer le contenu du fichier
    const newContent = [
      `// ✅ Imports déplacés automatiquement`,
      ...uniqueImports,
      ``,
      ...otherLines.filter((line) => !line.trim().startsWith('import')),
    ].join('\n');

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Fixé : ${file}`);
  }
});
