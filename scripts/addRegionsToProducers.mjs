import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const PRODUCERS_PATH = path.join(ROOT, 'src/data/producers.json');
const ENV_PATH = path.join(ROOT, '.env.local');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadEnvKey() {
  const env = await fs.readFile(ENV_PATH, 'utf8');
  const line = env.split('\n').find((l) => l.trim().startsWith('OPENCAGE_API_KEY_GEO='));

  if (!line) {
    throw new Error('Clé OPENCAGE_API_KEY_GEO introuvable dans .env.local');
  }

  return line
    .split('=')
    .slice(1)
    .join('=')
    .trim()
    .replace(/^["']|["']$/g, '');
}

const mrcToRegion = {
  // Montréal et sa région / Montérégie / Laurentides proches
  'Deux-Montagnes (MRC)': 'Montréal et sa région',
  'Deux-Montagnes': 'Montréal et sa région',
  'La Vallée-du-Richelieu': 'Montréal et sa région',
  Rouville: 'Montréal et sa région',
  'Le Haut-Richelieu': 'Montréal et sa région',
  'Les Jardins-de-Napierville': 'Montréal et sa région',
  'Vaudreuil-Soulanges': 'Montréal et sa région',
  'Le Haut-Saint-Laurent': 'Montréal et sa région',
  'Agglomération de Longueuil': 'Montréal et sa région',
  'Les Maskoutains': 'Montréal et sa région',
  'Beauharnois-Salaberry': 'Montréal et sa région',
  "Marguerite-D'Youville": 'Montréal et sa région',
  'Pierre-De Saurel': 'Montréal et sa région',
  Roussillon: 'Montréal et sa région',
  'Agglomération de Montréal': 'Montréal et sa région',
  'Thérèse-De Blainville': 'Montréal et sa région',
  'Les Moulins': 'Montréal et sa région',
  "L'Assomption (MRC)": 'Montréal et sa région',
  Montcalm: 'Montréal et sa région',
  'Joliette (MRC)': 'Montréal et sa région',

  // Laurentides
  'Les Laurentides': 'Laurentides',
  Laurentides: 'Laurentides',
  'Antoine-Labelle': 'Laurentides',
  'La Rivière-du-Nord': 'Laurentides',
  "Les Pays-d'en-Haut": 'Laurentides',
  Argenteuil: 'Laurentides',

  // Saguenay–Lac-Saint-Jean
  'Lac-Saint-Jean-Est': 'Saguenay–Lac-Saint-Jean',
  'Saguenay–Lac-Saint-Jean': 'Saguenay–Lac-Saint-Jean',
  'Le Fjord-du-Saguenay': 'Saguenay–Lac-Saint-Jean',
  'Le Domaine-du-Roy': 'Saguenay–Lac-Saint-Jean',
  'Maria-Chapdelaine': 'Saguenay–Lac-Saint-Jean',

  // Mauricie / Lanaudière / Centre-du-Québec
  Mauricie: 'Mauricie',
  'Les Chenaux': 'Mauricie',
  'Maskinongé (MRC)': 'Mauricie',
  Mékinac: 'Mauricie',
  'Agglomération de La Tuque': 'Mauricie',

  // Lanaudière
  Matawinie: 'Lanaudière',
  "D'Autray": 'Lanaudière',
  'Joliette (MRC)': 'Lanaudière',
  "L'Assomption (MRC)": 'Lanaudière',
  Montcalm: 'Lanaudière',
  'Les Moulins': 'Lanaudière',

  // Centre-du-Québec
  Arthabaska: 'Centre-du-Québec',
  'Bécancour (MRC)': 'Centre-du-Québec',
  'Nicolet-Yamaska': 'Centre-du-Québec',
  "L'Érable": 'Centre-du-Québec',
  Drummond: 'Centre-du-Québec',

  // Région de Québec / Chaudière-Appalaches
  'Portneuf (MRC)': 'Ville de Québec et sa région',
  Bellechasse: 'Ville de Québec et sa région',
  'Lotbinière (MRC)': 'Ville de Québec et sa région',
  "L'Islet (MRC)": 'Ville de Québec et sa région',
  'Montmagny (MRC)': 'Ville de Québec et sa région',
  'Les Appalaches': 'Ville de Québec et sa région',
  'Beauce-Sartigan': 'Ville de Québec et sa région',
  'La Nouvelle-Beauce': 'Ville de Québec et sa région',
  'Les Etchemins': 'Ville de Québec et sa région',
  'Beauce-Centre': 'Ville de Québec et sa région',

  // Cantons-de-l'Est
  'Coaticook (MRC)': "Cantons-de-l'Est",
  Acton: "Cantons-de-l'Est",
  'Le Granit': "Cantons-de-l'Est",
  'Le Haut-Saint-François': "Cantons-de-l'Est",

  // Gaspésie
  'Bonaventure (MRC)': 'Gaspésie',

  // Bas-Saint-Laurent
  'Kamouraska (MRC)': 'Bas-Saint-Laurent',
  'Rivière-du-Loup (MRC)': 'Bas-Saint-Laurent',

  // Outaouais
  Outaouais: 'Outaouais',
  Papineau: 'Outaouais',
  Pontiac: 'Outaouais',
  "Les Collines-de-l'Outaouais": 'Outaouais',
  'La Vallée-de-la-Gatineau': 'Outaouais',

  // Abitibi / Nord
  'Abitibi-Ouest': 'Abitibi-Témiscamingue',
  Témiscamingue: 'Abitibi-Témiscamingue',
  Abitibi: 'Abitibi-Témiscamingue',
  "La Vallée-de-l'Or": 'Abitibi-Témiscamingue',
  Jamésie: 'Nord-du-Québec',
  'Nord-du-Québec': 'Nord-du-Québec',

  // Hors Québec / à garder visible
  'Comté de Franklin': 'Territoires sauvages pour éviter la foule',
  'South Slave Region': 'Territoires sauvages pour éviter la foule',
};

function normalize(value = '') {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function findRegionFromComponents(components) {
  const possibleValues = [
    components.county,
    components.municipality,
    components.city,
    components.town,
    components.village,
    components.state_district,
    components.region,
  ].filter(Boolean);

  for (const value of possibleValues) {
    if (mrcToRegion[value]) return mrcToRegion[value];

    const normalizedValue = normalize(value);

    const found = Object.entries(mrcToRegion).find(([key]) => normalize(key) === normalizedValue);

    if (found) return found[1];
  }

  return 'À classer';
}

async function reverseGeocode(lat, lng, apiKey) {
  const url =
    `https://api.opencagedata.com/geocode/v1/json` +
    `?q=${lat}+${lng}` +
    `&key=${apiKey}` +
    `&language=fr` +
    `&no_annotations=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur OpenCage ${response.status}`);
  }

  const data = await response.json();
  const components = data?.results?.[0]?.components;

  if (!components) {
    return {
      region: 'À classer',
      city: null,
      county: null,
    };
  }

  return {
    region: findRegionFromComponents(components),
    city:
      components.city || components.town || components.village || components.municipality || null,
    county: components.county || components.state_district || null,
  };
}

async function main() {
  const apiKey = await loadEnvKey();

  const raw = await fs.readFile(PRODUCERS_PATH, 'utf8');
  const producers = JSON.parse(raw);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < producers.length; i++) {
    const producer = producers[i];

    if (producer.region && producer.region !== 'À classer') {
      skipped++;
      continue;
    }

    if (!producer.lat || !producer.lng) {
      producer.region = 'À classer';
      failed++;
      continue;
    }

    try {
      console.log(`[${i + 1}/${producers.length}] ${producer.name} — recherche région...`);

      const result = await reverseGeocode(producer.lat, producer.lng, apiKey);

      producer.region = result.region;
      producer.city = producer.city || result.city;
      producer.county = producer.county || result.county;

      updated++;

      console.log(`   → ${producer.region}`);

      await fs.writeFile(PRODUCERS_PATH, JSON.stringify(producers, null, 2), 'utf8');

      await delay(1200);
    } catch (error) {
      failed++;
      producer.region = producer.region || 'À classer';
      console.error(`   Erreur pour ${producer.name}: ${error.message}`);
      await delay(3000);
    }
  }

  console.log('\nTerminé.');
  console.log(`Mis à jour : ${updated}`);
  console.log(`Déjà classés : ${skipped}`);
  console.log(`À vérifier : ${failed}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
