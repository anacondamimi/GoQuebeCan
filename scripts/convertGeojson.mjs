const fs = require('fs');
const path = require('path');

// 📥 Fichier source téléchargé depuis Overpass Turbo
const inputFile = path.join(__dirname, 'source.geojson');

// 📤 Fichier JSON de sortie
const outputFile = path.join(__dirname, 'producers.json');

// 📖 Lecture du GeoJSON
const raw = fs.readFileSync(inputFile, 'utf-8');
const geojson = JSON.parse(raw);

// 🧹 Filtrage et transformation
const producers = geojson.features
  .filter((f) => f.geometry?.type === 'Point' && f.properties?.name)
  .map((f) => ({
    id: f.id || f.properties.name.toLowerCase().replace(/\s/g, '-'),
    name: f.properties.name,
    lat: f.geometry.coordinates[1],
    lng: f.geometry.coordinates[0],
    type: f.properties.product || f.properties.shop || f.properties.craft || 'inconnu',
    website: f.properties.website || null,
  }));

// 💾 Écriture du JSON
fs.writeFileSync(outputFile, JSON.stringify(producers, null, 2), 'utf-8');
console.log(`✅ ${producers.length} producteurs enregistrés dans producers.json`);
