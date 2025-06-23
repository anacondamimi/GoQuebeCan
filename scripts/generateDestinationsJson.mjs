// scripts/generateDestinationsJson.js
const fs = require('fs');
const path = require('path');

const blogDir = path.resolve('./src/components/blogpost');
const outputPath = path.resolve('./public/destinations.json');

const run = () => {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.tsx'));
  console.log(`🔍 Fichiers détectés :`, files);

  const destinations = [];

  for (const file of files) {
    const filePath = path.join(blogDir, file);

    try {
      // Lecture brute du fichier pour extraire le bloc metadata
      const content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(/export const metadata = ({[\s\S]*?});/);

      if (!match) {
        console.warn(`⚠️  Aucun metadata trouvé dans ${file}`);
        continue;
      }

      // Utilisation d'eval pour évaluer l'objet JavaScript
      const metadata = eval('(' + match[1] + ')');

      if (metadata) {
        destinations.push(metadata);
        console.log(`✅ ${metadata.slug} ajouté à destinations.json`);
      } else {
        console.warn(`⚠️  Metadata vide dans ${file}`);
      }
    } catch (e) {
      console.warn(`❌ Erreur dans ${file} : ${e.message}`);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(destinations, null, 2), 'utf-8');
  console.log(`\n🎉 destinations.json généré avec ${destinations.length} entrées.`);
};

run();
