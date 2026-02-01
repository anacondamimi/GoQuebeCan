import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../src/data/producers.json');

// Charge le fichier JSON
let producers = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let corrections = 0;

producers = producers.map((p) => {
  if (
    (p.lat === null || p.lat === undefined) &&
    typeof p.website === 'string' &&
    p.website.trim().startsWith('-') &&
    typeof p.lng === 'number'
  ) {
    // Corriger : lng devient lat, et website devient la vraie longitude
    const newLat = p.lng;
    const newLng = parseFloat(p.website);

    console.log(`Correction: ${p.id} (${p.name}) lat:${newLat} lng:${newLng}`);

    corrections++;
    return {
      ...p,
      lat: newLat,
      lng: newLng,
      website: null,
    };
  }
  return p;
});

fs.writeFileSync(filePath, JSON.stringify(producers, null, 2), 'utf8');

console.log(`Correction terminée. ${corrections} entrées modifiées.`);
