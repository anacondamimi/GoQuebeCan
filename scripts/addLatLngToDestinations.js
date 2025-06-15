import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Détermine __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
console.log('🌱 ENV CHARGÉ :', process.env);



const apiKey = process.env.OPENCAGE_API_KEY_GEO;
if (!apiKey) {
  console.log(`🔑 Clé API détectée : ${apiKey}`);
  console.error('❌ Clé API OpenCage non trouvée. Vérifie .env.local et le nom de la variable.');
  process.exit(1);
}

const inputPath = path.resolve(__dirname, '../src/data/producersWithCategories.json');
const outputPath = path.resolve(__dirname, '../src/data/producersWithCoords.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function geocode(adresse, ville) {
  const query = `${adresse}, ${ville}, Québec, Canada`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&language=fr&limit=1`;
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
  const producers = JSON.parse(raw);

  for (const producer of producers) {
    const adresse = producer.adresse || '';
    const ville = producer.ville || '';
    console.log(`📍 Géocodage de : ${producer.name} (${adresse}, ${ville})`);
    const coords = await geocode(adresse, ville);
    if (coords) {
      producer.lat = coords.lat;
      producer.lng = coords.lng;
      console.log(`✅ ${producer.name} → (${coords.lat}, ${coords.lng})`);
    } else {
      console.warn(`❌ Coordonnées introuvables pour : ${producer.name}`);
    }
    await delay(1000); // Respect des limites API
  }

  fs.writeFileSync(outputPath, JSON.stringify(producers, null, 2), 'utf-8');
  console.log(`🎉 Fichier enrichi sauvegardé : ${outputPath}`);
}

run();
