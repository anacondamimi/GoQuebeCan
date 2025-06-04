// scripts/addLatLngToDestinations.js
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config({ path: './app/.env.local' }); // 🔑 charge la clé

const apiKey = process.env.OPENCAGE_API_KEY;
if (!apiKey) {
  console.error('❌ Clé API OpenCage non trouvée. Vérifie .env.local et le nom de la variable.');
  process.exit(1);
}

const inputPath = path.resolve('./public/destinationsOriginal.json');
const outputPath = path.resolve('./public/destinationsWithCoords.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function geocode(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city + ', Québec, Canada')}&key=${apiKey}&language=fr&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results[0]) {
    const location = data.results[0].geometry;
    return { lat: location.lat, lng: location.lng };
  }
  return null;
}

async function run() {
  const raw = fs.readFileSync(inputPath, 'utf-8');
  const destinations = JSON.parse(raw);

  for (const dest of destinations) {
    console.log(`📍 Géocodage de : ${dest.ville}`);
    const coords = await geocode(dest.ville);
    if (coords) {
      dest.lat = coords.lat;
      dest.lng = coords.lng;
      console.log(`✅ ${dest.ville} → (${coords.lat}, ${coords.lng})`);
    } else {
      console.warn(`❌ Coordonnées introuvables pour : ${dest.ville}`);
    }
    await delay(1000); // limite d'OpenCage (1 requête/sec)
  }

  fs.writeFileSync(outputPath, JSON.stringify(destinations, null, 2), 'utf-8');
  console.log(`🎉 Fichier enrichi sauvegardé : ${outputPath}`);
}

run();
