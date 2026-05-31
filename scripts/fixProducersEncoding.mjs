import fs from 'fs/promises';
import path from 'path';

const PRODUCERS_PATH = path.join(process.cwd(), 'src/data/producers.json');

const replacements = {
  '�': '',
  'Ã©': 'é',
  'Ã¨': 'è',
  Ãª: 'ê',
  'Ã«': 'ë',
  'Ã ': 'à',
  'Ã¢': 'â',
  'Ã´': 'ô',
  'Ã®': 'î',
  'Ã¯': 'ï',
  'Ã§': 'ç',
  'Ã‰': 'É',
  Ãˆ: 'È',
  ÃŠ: 'Ê',
  'â€™': '’',
  'â€“': '–',
  'â€”': '—',
  'Å“': 'œ',
  '\u0089': 'é',
  '\u0090': 'É',
  '\u008A': 'è',
  '\u0088': 'ê',
  '\u008D': 'ç',
  'COMTE\u0089S': 'COMTÉS',
  'Comte\u0089s': 'Comtés',
};

function cleanText(value) {
  if (typeof value !== 'string') return value;

  let cleaned = value;

  for (const [bad, good] of Object.entries(replacements)) {
    cleaned = cleaned.split(bad).join(good);
  }

  return cleaned.replace(/\s+/g, ' ').trim();
}

function cleanObject(value) {
  if (Array.isArray(value)) {
    return value.map(cleanObject);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, cleanObject(val)]));
  }

  return cleanText(value);
}

async function main() {
  const raw = await fs.readFile(PRODUCERS_PATH, 'utf8');
  const producers = JSON.parse(raw);

  const cleaned = cleanObject(producers);

  await fs.writeFile(PRODUCERS_PATH, JSON.stringify(cleaned, null, 2), 'utf8');

  console.log('Encodage nettoyé dans producers.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
