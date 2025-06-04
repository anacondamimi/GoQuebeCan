const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'src', 'components', 'blogpost');

fs.readdirSync(folderPath).forEach((file) => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(folderPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    if (!content.includes('export default')) {
      const baseName = path.basename(file, '.tsx'); // e.g. BlogArticleLevis
      const exportLine = `\n\nexport default ${baseName};\n`;

      fs.appendFileSync(filePath, exportLine, 'utf-8');
      console.log(`✅ Ajouté : export default ${baseName} → ${file}`);
    }
  }
});
