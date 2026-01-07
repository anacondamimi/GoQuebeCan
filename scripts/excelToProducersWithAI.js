import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import OpenAI from 'openai';
import pLimit from 'p-limit';
import { fileURLToPath } from 'url';

// Pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const limit = pLimit(5);

const excelPath = path.join(__dirname, 'producers.xlsx');
const destinationsPath = path.join(__dirname, '../public/destinations.json');
const outputPath = path.join(__dirname, '../src/data/producers.json');

// Lire destinations
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

const workbook = xlsx.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);
dotenv.config({ path: path.join(__dirname, '../.env.local') });
(async () => {
  console.log(`Génération de descriptions pour ${rows.length} producteurs...`);

  const producers = await Promise.all(
    rows.map((row, i) =>
      limit(async () => {
        const id = `prod-${i + 1}`;
        let description = row.Description?.trim();

        if (!description) {
          try {
            description = await generateDescription(row.Name, row.Région);
          } catch {
            description = '';
          }
        }

        const relatedArticles = row.RelatedArticles
          ? row.RelatedArticles.split(',').map((s) => s.trim())
          : findRelatedArticles(row.Ville);

        return {
          id,
          name: row.Name,
          type: 'ferme',
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

  fs.writeFileSync(outputPath, JSON.stringify(producers, null, 2), 'utf8');
  console.log('producers.json généré avec succès !');
})();
