const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config({ path: './app/.env.local' });

const apiKey = process.env.OPENCAGE_API_KEY;
if (!apiKey) {
  console.error('❌ Clé API OpenCage non trouvée. Vérifie .env.local');
  process.exit(1);
}

const inputPath = path.resolve('./public/microbreweriesOriginal.json');
const outputPath = path.resolve('./public/microbreweriesWithCoords.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function geocode(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city + ', Québec, Canada')}&key=${apiKey}&language=fr&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results[0]) {
    return data.results[0].geometry;
  }
  return null;
}

async function run() {
  const raw = fs.readFileSync(inputPath, 'utf-8');
  const microbreweries = JSON.parse(raw);

  let count = 1;
  for (const mb of microbreweries) {
    console.log(`📍 Géocodage : ${mb.name} (${mb.ville})`);
    const coords = await geocode(mb.ville);
    if (coords) {
      mb.lat = coords.lat;
      mb.lng = coords.lng;
      mb.id = `micro-${String(count).padStart(3, '0')}`;
      mb.type = 'microbrewery';
      console.log(`✅ ${mb.name} : ${coords.lat}, ${coords.lng}`);
    } else {
      console.warn(`❌ Pas de coordonnées pour : ${mb.name}`);
    }
    count++;
    await delay(1000);
  }

  fs.writeFileSync(outputPath, JSON.stringify(microbreweries, null, 2), 'utf-8');
  console.log(`🎉 Fichier sauvé : ${outputPath}`);
}

run();
