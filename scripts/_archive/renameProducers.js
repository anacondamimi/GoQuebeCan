import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Définir __dirname pour ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins vers les fichiers
const inputPath = path.join(__dirname, '../src/data/producers.json');
const outputPath = path.join(__dirname, '../src/data/producers_uniform.json');

// Fonction pour formatter les ID
function padNumber(num, size = 3) {
  let s = String(num);
  while (s.length < size) s = '0' + s;
  return s;
}

// Traitement des producteurs
function uniformizeIDs(producers) {
  return producers.map((producer, index) => ({
    ...producer,
    id: `prod-${padNumber(index + 1)}`,
  }));
}

// Lancer le script
function run() {
  try {
    const raw = fs.readFileSync(inputPath, 'utf-8');
    const producers = JSON.parse(raw);
    const updatedProducers = uniformizeIDs(producers);
    fs.writeFileSync(outputPath, JSON.stringify(updatedProducers, null, 2), 'utf-8');
    console.log(`✅ Fichier généré : ${outputPath}`);
  } catch (err) {
    console.error('❌ Erreur lors du traitement :', err.message);
  }
}

run();
