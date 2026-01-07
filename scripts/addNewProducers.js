import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import OpenAI from 'openai';
import pLimit from 'p-limit';
import { fileURLToPath } from 'url';

// Gérer __dirname en module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger la clé dans .env.local (même que ton 1er script)
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const limit = pLimit(5);

// Fichiers
const excelPath = path.join(__dirname, 'nouveaux_producteurs_4.xlsx');
const destinationsPath = path.join(__dirname, '../public/destinations.json');
const outputPath = path.join(__dirname, '../src/data/producers.json');

// Charger JSON existant
let producers = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

// Trouver le dernier ID
let maxId = Math.max(...producers.map((p) => parseInt(p.id.split('-')[1], 10)));
console.log('Dernier ID trouvé:', maxId);

const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

const destinations = JSON.parse(fs.readFileSync(destinationsPath, 'utf8'));

function findRelatedArticles(ville) {
  if (!ville) return [];
  const villeLower = ville.toLowerCase();
  return destinations
    .filter((d) => d.city && d.city.toLowerCase().includes(villeLower))
    .map((d) => d.slug);
}

async function generateDescription(name, region) {
  const prompt = `Écris une courte description touristique (20 mots max) pour "${name}", producteur ou commerce situé dans la région ${region}. Style chaleureux.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 60,
    temperature: 0.7,
  });
  return res.choices[0].message.content.trim();
}

(async () => {
  console.log(`Ajout de ${rows.length} nouveaux producteurs...`);

  const newProducers = await Promise.all(
    rows.map((row, i) =>
      limit(async () => {
        const id = `prod-${maxId + i + 1}`; // commence après prod-200
        let description = row.Description?.trim();

        if (!description) {
          try {
            description = await generateDescription(row.Name, row.Région);
          } catch {
            description = '';
          }
        }

        const relatedArticles =
          row.RelatedArticles && row.RelatedArticles.toString().trim() !== ''
            ? row.RelatedArticles.split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            : findRelatedArticles(row.Ville);

        return {
          id,
          name: row.Name,
          type: row.Type ? row.Type.toLowerCase() : 'ferme', // <- prend la valeur du fichier Excel
          lat: parseFloat(row.Lat),
          lng: parseFloat(row.Lng),
          website: row.Website || null,
          description,
          featured: row.Featured === true || row.Featured === 'True',
          relatedArticles,
        };
      }),
    ),
  );

  // Ajoute à la fin sans toucher aux anciens
  producers = [...producers, ...newProducers];

  fs.writeFileSync(outputPath, JSON.stringify(producers, null, 2), 'utf8');
  console.log('Nouveaux producteurs ajoutés avec succès !');
})();
