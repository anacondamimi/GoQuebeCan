// scripts/createDestination.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { default: OpenAI } = require('openai');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config({ path: 'app/.env.local' });

// ton prompt maître SEO
const buildSEOPrompt = require('./seoTemplate');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY_GEO });
const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
const OPENCAGE_KEY = process.env.OPENCAGE_API_KEY;
if (!OPENCAGE_KEY) {
  console.error('❌ Clé OpenCage manquante dans app/.env.local');
  process.exit(1);
}

// CLI
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (ans) => res(ans.trim())));

// géocodage OpenCage
async function geocode(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    city + ', Québec, Canada',
  )}&key=${OPENCAGE_KEY}&language=fr&limit=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results?.[0]?.geometry || null;
}

// slug + component name
function slugify(v) {
  return v
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\W+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function toComponentName(v) {
  return 'BlogArticle' + v.replace(/\W+/g, '');
}

// mise à jour de BlogComponents.ts
function updateBlogComponents(slug, componentName) {
  const bcPath = path.resolve('./src/components/blog/BlogComponents.ts');
  let content = fs.readFileSync(bcPath, 'utf-8');

  // import
  const importLine = `import ${componentName} from '../blogpost/${componentName}';`;
  if (!content.includes(importLine)) {
    content = content.replace(/(export const BlogComponents = {)/, `${importLine}\n\n$1`);
  }

  // ajout dans l'objet
  const entry = `  '${slug}': ${componentName},`;
  content = content.replace(
    /(export const BlogComponents = {\s*)([\s\S]*?)(\s*};)/,
    (_, p1, body, p3) => {
      if (body.includes(entry)) return `${p1}${body}${p3}`;
      return `${p1}${body}\n${entry}\n${p3}`;
    },
  );

  fs.writeFileSync(bcPath, content, 'utf-8');
  console.log(`✅ BlogComponents mis à jour : ${slug} → ${componentName}`);
}

// exécution
async function run() {
  const ville = await ask('📍 Nom de la nouvelle destination : ');
  const geo = await geocode(ville);
  if (!geo) {
    console.error(`❌ Géocodage impossible pour : ${ville}`);
    rl.close();
    process.exit(1);
  }
  const slug = slugify(ville);
  const componentName = toComponentName(ville);
  const filename = `${componentName}.tsx`;
  const outPath = path.resolve(`./src/components/blogpost/${filename}`);

  // 1) Construire le prompt SEO
  const prompt = buildSEOPrompt({ destination: ville, slug, lat: geo.lat, lng: geo.lng });

  console.log('🤖 Génération SEO & contenu AI en cours…');
  const aiResp = await openai.chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });
  const fullJsx = aiResp.choices[0].message.content.trim();

  // 2) Sauvegarder le fichier .tsx
  fs.writeFileSync(outPath, fullJsx, 'utf-8');
  console.log(`✅ Article généré : ${outPath}`);

  // 3) Mettre à jour BlogComponents.ts
  updateBlogComponents(slug, componentName);

  // 4) Regénérer destinations.json
  require('./generateDestinationsJson.js');

  console.log(`🎉 Destination "${ville}" prête à /destinations/${slug}`);
  rl.close();
}

run();
