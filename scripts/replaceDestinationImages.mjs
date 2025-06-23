// scripts/replaceDestinationImages.js
// Remplace les URL externes d'images dans PopularDestinations.tsx par des chemins locaux vers /images/destinations/

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/PopularDestinations.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Regex pour trouver les lignes contenant image: "https://..."
const imageLineRegex = /image:\s*['"]https:\/\/[^'"]+['"]/g;

const updatedContent = content.replace(imageLineRegex, (match) => {
  const nameMatch = match.match(/\/photo-[^\?]+/);
  if (!nameMatch) return match;

  // Déduire le nom du fichier à partir du nom de la destination dans l'objet
  const destinationMatch = match.match(/photo-[^\?]+/);
  const filename = destinationMatch
    ? destinationMatch[0].split('-').slice(-3).join('-')
    : 'default.jpg';

  // Exemple : /images/destinations/anse-saint-jean.avif
  const localPath = `/images/destinations/` + filename.replace(/\.jpg|\.jpeg|\.png/, '.avif');
  return `image: "${localPath}"`;
});

fs.writeFileSync(filePath, updatedContent, 'utf-8');
console.log('✅ Images mises à jour dans PopularDestinations.tsx');
