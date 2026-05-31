import fs from 'fs/promises';
import path from 'path';

const ROOT = process.cwd();
const PRODUCERS_PATH = path.join(ROOT, 'src/data/producers.json');

const mrcToRegion = {
  // Montréal / Montérégie proche
  Montréal: 'Montréal et sa région',
  Laval: 'Montréal et sa région',
  Longueuil: 'Montréal et sa région',
  'Agglomération de Montréal': 'Montréal et sa région',
  'Agglomération de Longueuil': 'Montréal et sa région',
  'Deux-Montagnes': 'Montréal et sa région',
  'Deux-Montagnes (MRC)': 'Montréal et sa région',
  'La Vallée-du-Richelieu': 'Montréal et sa région',
  Rouville: 'Montréal et sa région',
  'Le Haut-Richelieu': 'Montréal et sa région',
  'Les Jardins-de-Napierville': 'Montréal et sa région',
  'Vaudreuil-Soulanges': 'Montréal et sa région',
  'Le Haut-Saint-Laurent': 'Montréal et sa région',
  'Les Maskoutains': 'Montréal et sa région',
  'Beauharnois-Salaberry': 'Montréal et sa région',
  "Marguerite-D'Youville": 'Montréal et sa région',
  'Pierre-De Saurel': 'Montréal et sa région',
  Roussillon: 'Montréal et sa région',
  'Thérèse-De Blainville': 'Montréal et sa région',

  // Laurentides
  'Les Laurentides': 'Laurentides',
  Laurentides: 'Laurentides',
  'Antoine-Labelle': 'Laurentides',
  'La Rivière-du-Nord': 'Laurentides',
  "Les Pays-d'en-Haut": 'Laurentides',
  Argenteuil: 'Laurentides',

  // Lanaudière
  Matawinie: 'Lanaudière',
  "D'Autray": 'Lanaudière',
  'Joliette (MRC)': 'Lanaudière',
  "L'Assomption (MRC)": 'Lanaudière',
  Montcalm: 'Lanaudière',
  'Les Moulins': 'Lanaudière',

  // Ville de Québec / Chaudière-Appalaches
  Québec: 'Ville de Québec et sa région',
  Lévis: 'Ville de Québec et sa région',
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
  'La Côte-de-Beaupré': 'Ville de Québec et sa région',
  "L'Île-d'Orléans": 'Ville de Québec et sa région',
  'La Jacques-Cartier': 'Ville de Québec et sa région',

  // Cantons-de-l'Est
  'Brome-Missisquoi': "Cantons-de-l'Est",
  'La Haute-Yamaska': "Cantons-de-l'Est",
  Memphrémagog: "Cantons-de-l'Est",
  Sherbrooke: "Cantons-de-l'Est",
  'Le Val-Saint-François': "Cantons-de-l'Est",
  Coaticook: "Cantons-de-l'Est",
  'Coaticook (MRC)': "Cantons-de-l'Est",
  'Les Sources': "Cantons-de-l'Est",
  Acton: "Cantons-de-l'Est",
  'Le Granit': "Cantons-de-l'Est",
  'Le Haut-Saint-François': "Cantons-de-l'Est",

  // Centre-du-Québec
  Arthabaska: 'Centre-du-Québec',
  'Bécancour (MRC)': 'Centre-du-Québec',
  'Nicolet-Yamaska': 'Centre-du-Québec',
  "L'Érable": 'Centre-du-Québec',
  Drummond: 'Centre-du-Québec',

  // Mauricie
  Mauricie: 'Mauricie',
  'Les Chenaux': 'Mauricie',
  'Maskinongé (MRC)': 'Mauricie',
  Mékinac: 'Mauricie',
  'Agglomération de La Tuque': 'Mauricie',

  // Saguenay–Lac-Saint-Jean
  'Lac-Saint-Jean-Est': 'Saguenay–Lac-Saint-Jean',
  'Saguenay–Lac-Saint-Jean': 'Saguenay–Lac-Saint-Jean',
  'Le Fjord-du-Saguenay': 'Saguenay–Lac-Saint-Jean',
  'Le Domaine-du-Roy': 'Saguenay–Lac-Saint-Jean',
  'Maria-Chapdelaine': 'Saguenay–Lac-Saint-Jean',

  // Bas-Saint-Laurent
  Kamouraska: 'Bas-Saint-Laurent',
  'Kamouraska (MRC)': 'Bas-Saint-Laurent',
  'Rivière-du-Loup': 'Bas-Saint-Laurent',
  'Rivière-du-Loup (MRC)': 'Bas-Saint-Laurent',
  Témiscouata: 'Bas-Saint-Laurent',
  'Les Basques': 'Bas-Saint-Laurent',
  Rimouski: 'Bas-Saint-Laurent',
  'La Mitis': 'Bas-Saint-Laurent',
  Matane: 'Bas-Saint-Laurent',
  'La Matanie': 'Bas-Saint-Laurent',
  'La Matapédia': 'Bas-Saint-Laurent',

  // Gaspésie
  'La Côte-de-Gaspé': 'Gaspésie',
  'Le Rocher-Percé': 'Gaspésie',
  'La Haute-Gaspésie': 'Gaspésie',
  Bonaventure: 'Gaspésie',
  'Bonaventure (MRC)': 'Gaspésie',
  Avignon: 'Gaspésie',
  'Les Îles-de-la-Madeleine': 'Gaspésie',

  // Côte-Nord
  'La Haute-Côte-Nord': 'Côte-Nord',
  Manicouagan: 'Côte-Nord',
  'Sept-Rivières': 'Côte-Nord',
  Minganie: 'Côte-Nord',
  'Le Golfe-du-Saint-Laurent': 'Côte-Nord',
  Caniapiscau: 'Côte-Nord',

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

  // Ontario
  'Simcoe County': "Plages de l'Ontario",
  'Bruce County': "Plages de l'Ontario",
  'Prince Edward County': "Plages de l'Ontario",
  'Lambton County': "Plages de l'Ontario",
  'Norfolk County': "Plages de l'Ontario",

  // Hors Québec
  'Comté de Franklin': 'Hors Québec',
  'South Slave Region': 'Hors Québec',
};

function normalize(value = '') {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function findRegionFromCounty(county) {
  if (!county) return null;

  if (mrcToRegion[county]) {
    return mrcToRegion[county];
  }

  const normalizedCounty = normalize(county);

  const found = Object.entries(mrcToRegion).find(([key]) => normalize(key) === normalizedCounty);

  return found ? found[1] : null;
}

async function main() {
  const raw = await fs.readFile(PRODUCERS_PATH, 'utf8');
  const producers = JSON.parse(raw);

  let updated = 0;
  let unchanged = 0;
  let missing = 0;

  for (const producer of producers) {
    const region = findRegionFromCounty(producer.county);

    if (!region) {
      missing++;
      continue;
    }

    if (producer.region !== region) {
      producer.region = region;
      updated++;
    } else {
      unchanged++;
    }
  }

  await fs.writeFile(PRODUCERS_PATH, JSON.stringify(producers, null, 2), 'utf8');

  console.log('Recalcul terminé.');
  console.log(`Régions mises à jour : ${updated}`);
  console.log(`Déjà correctes : ${unchanged}`);
  console.log(`County non reconnues : ${missing}`);

  const counts = producers.reduce((acc, producer) => {
    const region = producer.region || 'Sans région';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  console.table(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([region, count]) => ({ region, count })),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
