#!/usr/bin/env node
/**
 * create-article.mjs
 * ────────────────────────────────────────────────────────────
 * Génère automatiquement un nouvel article de destination pour GoQuébeCan :
 *  - Pose les questions (destination, photos, hôtels, restaurants, angle SEO)
 *  - Appelle l'API Claude pour rédiger le contenu (SEO 2026)
 *  - Écrit le composant BlogArticleXxx.tsx dans le patron DestinationArticleTemplate
 *  - Crée/complète src/data/hotels/byArticle/<slug>.ts
 *  - Ajoute l'entrée dans src/lib/blog/componentMap.ts
 *  - Copie les photos fournies aux bons emplacements conventionnels
 *
 * Usage :
 *    node scripts/create-article.mjs
 *
 * Prérequis :
 *    - Variable d'env ANTHROPIC_API_KEY (dans .env, déjà chargé via `dotenv/config`)
 *    - Node 18+ (fetch natif)
 *
 * Après exécution :
 *    pnpm prebuild   # régénère blogMeta.ts + sitemap-data.json automatiquement
 *    pnpm build      # vérifie que tout compile
 * ────────────────────────────────────────────────────────────
 */

import dotenv from 'dotenv';
dotenv.config(); // charge .env s'il existe
dotenv.config({ path: '.env.local', override: true }); // puis .env.local par-dessus (convention Next.js)
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // racine du projet (scripts/ est un niveau en dessous)

const PATHS = {
  componentMap: path.join(ROOT, 'src/lib/blog/componentMap.ts'),
  blogpostDir: path.join(ROOT, 'src/components/blogpost'),
  byArticleDir: path.join(ROOT, 'src/data/hotels/byArticle'),
  hotelCatalog: path.join(ROOT, 'src/data/hotels/hotelCatalog.generated.ts'),
  imagesDestinations: path.join(ROOT, 'public/images/destinations'),
  imagesHotels: path.join(ROOT, 'public/images/destinations/hotels'),
  imagesRestos: path.join(ROOT, 'public/images/restos'),
};

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

const rl = createInterface({ input: stdin, output: stdout });
const ask = async (question, fallback = '') => {
  const answer = (await rl.question(`${question}${fallback ? ` [${fallback}]` : ''} : `)).trim();
  return answer || fallback;
};
const askYesNo = async (question, fallback = 'o') => {
  const answer = (await ask(`${question} (o/n)`, fallback)).toLowerCase();
  return answer.startsWith('o') || answer.startsWith('y');
};

/* ────────────────────────────────────────────
   Utilitaires de formatage
   ──────────────────────────────────────────── */
function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toPascalCase(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toSnakeId(...parts) {
  return parts
    .join('_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/* ────────────────────────────────────────────
   Étape 1 — Entrevue interactive
   ──────────────────────────────────────────── */
async function interview() {
  console.log('\n🧭  Création d’un nouvel article GoQuébeCan\n');

  const destinationName = await ask('Nom de la destination (ex: "Kamouraska")');
  const slugSuggestion = slugify(destinationName);
  const slug = await ask('Slug (URL /blog/...)', slugSuggestion);
  const region = await ask('Région (ex: "Bas-Saint-Laurent")', 'Québec');

  console.log('\n📸  Photo principale (hero)');
  console.log(`  ℹ️  Place ta photo à public/images/destinations/${slug}.avif — je m’attends à la trouver là.`);
  const heroExt = await ask('  Extension du fichier', '.avif');
  const heroAlt = `Vue sur ${destinationName}`; // généré automatiquement

  console.log('\n🏨  Hôtels à inclure — donne le lien (site officiel de préférence, Booking bloque parfois les requêtes automatisées)');
  const hotels = [];
  while (true) {
    const url = await ask(`  Hôtel #${hotels.length + 1} — URL (ou Entrée pour arrêter)`);
    if (!url) break;
    hotels.push({ url });
  }

  console.log('\n🍽️  Restaurants — recherche automatique des meilleurs établissements');
  const autoRestaurants = await askYesNo(
    '  Chercher automatiquement 4 restaurants (1 gastronomique, 1 prix moyen/microbrasserie, 2 cantine) parmi les mieux notés ?',
  );
  let restaurants = [];
  if (!autoRestaurants) {
    console.log('  Entrée manuelle (laisse le nom vide pour terminer)');
    while (true) {
      const name = await ask(`  Restaurant #${restaurants.length + 1} — nom (ou Entrée pour arrêter)`);
      if (!name) break;
      const type = await ask('    Type de cuisine / ambiance');
      const speciality = await ask('    Spécialité');
      const price = await ask('    Gamme de prix ($ / $$ / $$$)', '$$');
      const mustTry = await ask('    Un plat/expérience à essayer');
      const vibe = await ask('    Ambiance en un mot (ex: "Chaleureux")', 'Convivial');
      const tip = await ask('    Petit conseil personnel');
      restaurants.push({ name, city: destinationName, type, speciality, price, mustTry, vibe, tip, imagePath: '' });
    }
  }

  console.log('\n🧺  Épicerie, marché local et producteurs (laisse vide pour terminer)');
  const groceries = [];
  while (true) {
    const title = await ask(`  Adresse #${groceries.length + 1} — nom (ex: "Marché de X", "Ferme Y") (ou Entrée pour arrêter)`);
    if (!title) break;
    const subtitle = await ask('    Sous-titre court (ex: "Produits locaux, saison et esprit terroir")');
    const description = await ask('    Description (1-2 phrases)');
    groceries.push({ title, subtitle, description });
  }

  console.log('\n💛  Conseil vécu GoQuébeCan (testé par toi-même — optionnel)');
  const hasOwnTip = await askYesNo('  As-tu un conseil personnel testé toi-même à mettre en vedette ?', 'n');
  let ownTip = null;
  if (hasOwnTip) {
    const category = await ask('    Catégorie (activité / restaurant / boulangerie / producteur)', 'activité');
    const title = await ask('    Nom du lieu / de l’activité');
    const description = await ask('    Ton expérience réelle, en 2-3 phrases');
    ownTip = { category, title, description };
  }

  console.log('\n🔑  Optimisation SEO');
  const keywords = await ask('Mots-clés cibles séparés par virgules', `${destinationName}, Québec, voyage`);
  const angle = await ask(
    'Angle éditorial particulier ? (ex: "famille avec ados", "road trip romantique")',
    'guide complet et pratique',
  );

  return {
    destinationName,
    slug,
    region,
    heroExt,
    heroAlt,
    hotels,
    restaurants,
    needsRestaurantResearch: autoRestaurants,
    groceries,
    ownTip,
    keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
    angle,
  };
}

/* ────────────────────────────────────────────
   Étape 2 — Génération du contenu via l'API Claude
   ──────────────────────────────────────────── */
async function generateContent(brief) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY manquante. Ajoute-la dans ton fichier .env avant de lancer ce script.',
    );
  }

  console.log('\n✍️  Génération du contenu par l’IA (SEO 2026)…');

  const schemaInstructions = `
Tu es rédacteur SEO senior pour GoQuébeCan, un site de tourisme Québec/Canada.
Rédige un article de destination complet, chaleureux, humain (pas robotique), optimisé SEO 2026.

RÈGLES SEO 2026 :
- Un seul H1 implicite (le titre), structure logique en H2/H3
- Réponds aux intentions de recherche réelles : "que faire à X", "où dormir", "combien de jours", "en famille"
- Phrases naturelles, pas de bourrage de mots-clés
- Inclure une section FAQ (bonnes pratiques pour les extraits enrichis Google et l'IA générative/SGE)
- Ton : chaleureux, concret, jamais générique ("Découvrez ce bel endroit...")
- Longueur : article complet et substantiel, plusieurs sections détaillées

Réponds UNIQUEMENT avec un objet JSON valide, sans balises markdown, correspondant exactement à ce schéma :

{
  "title": "string - titre H1 accrocheur incluant le nom de la destination",
  "subtitle": "string - sous-titre 1-2 phrases",
  "introTitle": "string - ex: Pourquoi visiter X ?",
  "introParagraphs": ["string", "string", "string"],
  "quickFacts": [{"label": "string", "value": "string"}],
  "sections": [
    {"heading": "string (H2)", "paragraphs": ["string"], "bullets": ["string"] }
  ],
  "hotelIntro": {"title": "string", "text": "string"},
  "restaurantIntro": {"title": "string", "text": "string"},
  "faqs": [{"question": "string", "answer": "string"}],
  "conclusionTitle": "string",
  "conclusionText": "string",
  "seoTitle": "string - balise <title> optimisée, 55-60 caractères, inclut la marque GoQuébeCan",
  "seoDescription": "string - meta description 140-160 caractères, incitative"
}
`.trim();

  const userBrief = `
Destination : ${brief.destinationName}
Région : ${brief.region}
Angle éditorial : ${brief.angle}
Mots-clés cibles : ${brief.keywords.join(', ')}
Hôtels à mentionner dans l'intro "où dormir" (déjà sélectionnés, ne pas en inventer d'autres) : ${
    brief.hotels.map((h) => h.name).join(', ') || 'aucun'
  }
Restaurants à mentionner dans l'intro "où manger" (déjà sélectionnés, ne pas en inventer d'autres) : ${
    brief.restaurants.map((r) => r.name).join(', ') || 'aucun'
  }
Adresses épicerie/marché/producteurs (déjà sélectionnées, une section dédiée les affichera automatiquement — n'en invente pas d'autres et ne les répète pas dans tes sections) : ${
    brief.groceries.map((g) => g.title).join(', ') || 'aucune'
  }
`.trim();

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: schemaInstructions,
      messages: [{ role: 'user', content: userBrief }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Erreur API Claude (${res.status}) : ${errText}`);
  }

  const data = await res.json();
  const rawText = data.content?.map((b) => b.text || '').join('\n') ?? '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('\n⚠️  Réponse brute reçue (impossible de parser en JSON) :\n', rawText);
    throw new Error('La réponse de l’IA n’était pas un JSON valide. Relance le script.');
  }
}

/* ────────────────────────────────────────────
   Étape 2bis — Résolution des hôtels depuis leur URL
   ──────────────────────────────────────────── */
async function fetchPageText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'fr-CA,fr;q=0.9,en;q=0.8',
    },
  });
  if (res.status === 403) {
    throw new Error('403 - probablement bloqué par une protection anti-robot (fréquent sur Booking.com)');
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, 12000); // limite raisonnable pour le prompt
}

async function manualHotelFallback(url) {
  const name = await ask('    Nom de l’hôtel');
  const category = await ask('    Catégorie (ex: "Hôtel boutique")', 'Hébergement');
  const description = await ask('    Description courte');
  const price = await ask('    Prix affiché', 'Voir les tarifs');
  const ratingText = await ask('    Mention qualité', 'Très bien');
  return { name, category, description, price, ratingText, perks: [], tags: [], bookingUrl: url };
}

async function resolveHotelFromUrl(url, destinationName) {
  console.log(`  🔎  Analyse de ${url}…`);
  let pageText = '';
  try {
    pageText = await fetchPageText(url);
  } catch (err) {
    console.warn(`  ⚠️  Impossible de récupérer la page (${err.message}).`);
    if (url.includes('booking.com')) {
      console.warn(
        '      → Booking.com bloque souvent les requêtes automatisées. Essaie l’URL du site officiel de l’hôtel si possible.',
      );
    }
  }

  if (!pageText || pageText.length < 200) {
    console.warn(
      '  ⚠️  Contenu insuffisant récupéré (le site est probablement chargé en JavaScript). Entrée manuelle :',
    );
    return manualHotelFallback(url);
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: `Tu extrais des informations d'hôtel à partir du texte brut d'une page web. Réponds UNIQUEMENT en JSON, sans markdown, avec ce schéma exact :
{"name": "string", "category": "string (ex: Hôtel boutique, Auberge, Chalet)", "description": "string EXACTEMENT 3 phrases en français", "price": "string ex: Dès ~150 $ + taxes/nuit", "ratingText": "string ex: Exceptionnel, Très bien", "perks": ["string"], "tags": ["string"]}
Si une info est absente du texte, fais une estimation raisonnable plutôt que de laisser vide, mais ne mens jamais sur le nom de l'établissement.`,
      messages: [
        {
          role: 'user',
          content: `Destination : ${destinationName}\nURL : ${url}\n\nTexte de la page :\n${pageText}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    console.warn(`  ⚠️  Erreur API (${res.status}) lors de l'extraction.`);
    return manualHotelFallback(url);
  }

  const data = await res.json();
  const rawText = data.content?.map((b) => b.text || '').join('\n') ?? '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return { ...parsed, bookingUrl: url };
  } catch {
    console.warn('  ⚠️  Réponse IA non-JSON pour cet hôtel.');
    return manualHotelFallback(url);
  }
}

/* ────────────────────────────────────────────
   Étape 2ter — Recherche automatique des restaurants
   ──────────────────────────────────────────── */
async function researchRestaurants(brief) {
  console.log('\n🔎  Recherche des meilleurs restaurants (via recherche web en direct)…');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      system: `Tu es un recherchiste voyage pour GoQuébeCan. Cherche sur le web les meilleurs restaurants RÉELS à ${brief.destinationName} (${brief.region}), en te basant sur les avis Google/TripAdvisor les plus récents et les plus recherchés.

Trouve exactement 4 établissements réels et vérifiables (ne jamais inventer de nom) :
1. Un restaurant gastronomique / haut de gamme
2. Un restaurant prix moyen OU une microbrasserie
3. Deux adresses type cantine / casse-croûte / cuisine simple et rapide

Réponds UNIQUEMENT avec un tableau JSON valide (aucun markdown, aucun texte autour), avec ce schéma exact pour chaque objet :
{"name": "string", "type": "string (ex: Gastronomique, Microbrasserie, Cantine)", "speciality": "string", "price": "$ | $$ | $$$ | $$$$", "mustTry": "string", "vibe": "string", "tip": "string - un conseil pratique"}`,
      messages: [
        { role: 'user', content: `Trouve 4 restaurants à ${brief.destinationName}, ${brief.region}, Canada.` },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.warn(`  ⚠️  Erreur API lors de la recherche de restaurants (${res.status}) : ${errText}`);
    return [];
  }

  const data = await res.json();
  const rawText =
    data.content?.filter((b) => b.type === 'text').map((b) => b.text).join('\n') ?? '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const found = JSON.parse(cleaned);
    return found.map((r) => ({
      name: r.name,
      city: brief.destinationName,
      type: r.type,
      speciality: r.speciality,
      price: r.price,
      mustTry: r.mustTry,
      schedule: 'Horaires variables selon la saison',
      vibe: r.vibe,
      tip: r.tip,
      imagePath: '',
    }));
  } catch {
    console.warn('  ⚠️  Réponse de recherche non-JSON — aucun restaurant ajouté automatiquement.');
    return [];
  }
}

/* ────────────────────────────────────────────
   Étape 2quater — Suggestion automatique d'une adresse épicerie/producteur
   ──────────────────────────────────────────── */
async function researchDefaultGrocery(brief) {
  console.log('  🔎  Aucune adresse épicerie fournie — recherche d’un producteur/boulangerie local réel…');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      system: `Cherche sur le web UN vrai commerce local à ${brief.destinationName} (${brief.region}) : une boulangerie artisanale, un marché public, une ferme ou un producteur local réel et vérifiable (jamais inventé).
Réponds UNIQUEMENT en JSON, sans markdown : {"title": "string - nom réel", "subtitle": "string court", "description": "string 1-2 phrases"}`,
      messages: [{ role: 'user', content: `Trouve une adresse épicerie/producteur/boulangerie à ${brief.destinationName}.` }],
    }),
  });

  if (!res.ok) {
    console.warn('  ⚠️  Recherche automatique échouée — aucune adresse épicerie ajoutée.');
    return null;
  }

  const data = await res.json();
  const rawText = data.content?.filter((b) => b.type === 'text').map((b) => b.text).join('\n') ?? '';
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    const found = JSON.parse(cleaned);
    console.log(`  ✅  Suggestion trouvée : ${found.title}`);
    return found;
  } catch {
    console.warn('  ⚠️  Réponse non-JSON — aucune adresse épicerie ajoutée.');
    return null;
  }
}

/* ────────────────────────────────────────────
   Étape 3 — Copie des images
   ──────────────────────────────────────────── */
async function checkImageExists(absolutePath, label) {
  const exists = await fileExists(absolutePath);
  if (!exists) {
    console.warn(`  ⚠️  Photo introuvable : ${absolutePath}`);
    console.warn(`      → Place ${label} à cet endroit exact avant de lancer "pnpm build".`);
  }
  return exists;
}

async function handleImages(brief) {
  console.log('\n🖼️   Vérification des photos (convention : tu les places toi-même)…');

  // Hero → /public/images/destinations/<slug>.avif
  const heroDest = path.join(PATHS.imagesDestinations, `${brief.slug}${brief.heroExt}`);
  await checkImageExists(heroDest, 'la photo principale de la destination');
  const heroPublicPath = `/images/destinations/${brief.slug}${brief.heroExt}`;

  // Hôtels → /public/images/destinations/hotels/<nom-hotel>.avif
  for (const hotel of brief.hotels) {
    const hotelSlug = slugify(hotel.name);
    hotel.publicImagePath = `/images/destinations/hotels/${hotelSlug}.avif`;
    await checkImageExists(path.join(PATHS.imagesHotels, `${hotelSlug}.avif`), `la photo de "${hotel.name}"`);
  }

  // Restaurants → /public/images/restos/<slug>/<slug-resto>.avif (optionnel, sinon image générique)
  for (const resto of brief.restaurants) {
    const restoSlug = slugify(resto.name);
    const dest = path.join(PATHS.imagesRestos, brief.slug, `${restoSlug}.avif`);
    resto.publicImagePath = (await fileExists(dest))
      ? `/images/restos/${brief.slug}/${restoSlug}.avif`
      : '/images/carte.avif'; // image générique déjà utilisée ailleurs dans le projet
  }

  return heroPublicPath;
}

/* ────────────────────────────────────────────
   Étape 4 — Écriture des fichiers hôtels (byArticle + catalogue)
   ──────────────────────────────────────────── */
async function writeHotelFiles(brief) {
  const hotelIds = [];
  const newCatalogEntries = [];

  for (const hotel of brief.hotels) {
    const id = toSnakeId(hotel.name, brief.slug);
    hotelIds.push(id);

    const entry = `
  ${id}: {
    id: '${id}',
    name: ${JSON.stringify(hotel.name)},
    category: ${JSON.stringify(hotel.category)},
    location: ${JSON.stringify(brief.destinationName)},
    description: ${JSON.stringify(hotel.description)},
    extra: ${JSON.stringify(`Un excellent choix pour séjourner à ${brief.destinationName}.`)},
    price: ${JSON.stringify(hotel.price)},
    ratingText: ${JSON.stringify(hotel.ratingText)},
    ratingNumber: 9.0,
    perks: ${JSON.stringify(hotel.perks || [])},
    tags: ${JSON.stringify(hotel.tags?.length ? hotel.tags : [brief.destinationName])},
    bookingUrl: ${JSON.stringify(hotel.bookingUrl || '')},
    image: {
      src: ${JSON.stringify(hotel.publicImagePath)},
      alt: ${JSON.stringify(`${hotel.name} — hébergement recommandé à ${brief.destinationName}`)},
    },
    variant: 'compact',
  },`.replace(/^\n/, '');

    newCatalogEntries.push(entry);
  }

  // 1) byArticle/<slug>.ts
  const constName = `HOTEL_IDS_${brief.slug.toUpperCase().replace(/-/g, '_')}`;
  const byArticleContent = `export const ${constName} = [\n${hotelIds
    .map((id) => `  '${id}',`)
    .join('\n')}\n];\n`;
  await fs.mkdir(PATHS.byArticleDir, { recursive: true });
  await fs.writeFile(path.join(PATHS.byArticleDir, `${brief.slug}.ts`), byArticleContent, 'utf-8');

  // 2) Ajout des nouvelles entrées dans hotelCatalog.generated.ts (avant la ligne "};")
  if (newCatalogEntries.length) {
    const catalogSource = await fs.readFile(PATHS.hotelCatalog, 'utf-8');
    const marker = '\n};\n\nexport function pickHotels';
    if (!catalogSource.includes(marker)) {
      console.warn(
        '  ⚠️  Impossible de localiser le point d’insertion dans hotelCatalog.generated.ts — ajoute les hôtels manuellement.',
      );
    } else {
      const updated = catalogSource.replace(
        marker,
        `\n${newCatalogEntries.join('\n\n')}\n};\n\nexport function pickHotels`,
      );
      await fs.writeFile(PATHS.hotelCatalog, updated, 'utf-8');
    }
  }

  return { constName, hotelIds };
}

/* ────────────────────────────────────────────
   Étape 5 — Assemblage du composant BlogArticleXxx.tsx
   ──────────────────────────────────────────── */
function buildRestaurantArrayLiteral(restaurants) {
  return `[\n${restaurants
    .map(
      (r) => `  {
    name: ${JSON.stringify(r.name)},
    city: ${JSON.stringify(r.city)},
    type: ${JSON.stringify(r.type)},
    speciality: ${JSON.stringify(r.speciality)},
    price: ${JSON.stringify(r.price)},
    mustTry: ${JSON.stringify(r.mustTry)},
    schedule: 'Horaires variables selon la saison',
    image: ${JSON.stringify(r.publicImagePath)},
    vibe: ${JSON.stringify(r.vibe)},
    tip: ${JSON.stringify(r.tip)},
  },`,
    )
    .join('\n')}\n]`;
}

function buildOwnTipJsx(ownTip) {
  if (!ownTip?.title) return '';
  return `        <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
            💛 Le vrai conseil GoQuébeCan — ${escapeJsxText(ownTip.category || 'testé par nous')}
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">${escapeJsxText(ownTip.title)}</h3>
          <p className="mt-3 text-base leading-7 text-slate-700">${escapeJsxText(ownTip.description || '')}</p>
        </section>`;
}

function buildGroceriesJsx(groceries) {
  if (!groceries?.length) return '';
  return `        <section className="space-y-5">
          <h2>Où faire l’épicerie et découvrir les producteurs locaux</h2>
          <div className="grid gap-4 md:grid-cols-3">
${groceries
  .map(
    (g) => `            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">${escapeJsxText(g.subtitle || '')}</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">${escapeJsxText(g.title)}</h3>
              <p className="mt-3 text-sm text-gray-700">${escapeJsxText(g.description || '')}</p>
            </div>`,
  )
  .join('\n')}
          </div>
        </section>`;
}

function buildSectionsJsx(sections) {
  return sections
    .map(
      (s) => `        <section className="space-y-5">
          <h2>${escapeJsxText(s.heading)}</h2>
${s.paragraphs.map((p) => `          <p>${escapeJsxText(p)}</p>`).join('\n')}
${
  s.bullets?.length
    ? `          <ul className="list-disc space-y-3 pl-6">
${s.bullets.map((b) => `            <li>${escapeJsxText(b)}</li>`).join('\n')}
          </ul>`
    : ''
}
        </section>`,
    )
    .join('\n\n');
}

function escapeJsxText(text) {
  return String(text).replace(/[{}]/g, (m) => (m === '{' ? '&#123;' : '&#125;'));
}

async function writeArticleComponent(brief, content, heroPublicPath, hotelMeta) {
  const componentName = `BlogArticle${toPascalCase(brief.slug)}`;
  const hasHotels = brief.hotels.length > 0;
  const hasRestaurants = brief.restaurants.length > 0;

  const faqJsx = content.faqs
    .map(
      (f) => `          <div className="space-y-4">
            <h3>${escapeJsxText(f.question)}</h3>
            <p>${escapeJsxText(f.answer)}</p>
          </div>`,
    )
    .join('\n\n');

  const tsx = `import React from 'react';
import Image from 'next/image';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
${hasHotels ? `import { HotelGrid } from '@/components/hotels/HotelGrid';\nimport { pickHotels } from '@/data/hotels/hotelCatalog.generated';\nimport { ${hotelMeta.constName} } from '@/data/hotels/byArticle/${brief.slug}';` : ''}
${hasRestaurants ? `import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';` : ''}

${hasHotels ? `const hotels = pickHotels(${hotelMeta.constName});\n` : ''}
${hasRestaurants ? `const ${brief.slug.replace(/-/g, '')}Restaurants = ${buildRestaurantArrayLiteral(brief.restaurants)};\n` : ''}
export default function ${componentName}() {
  return (
    <DestinationArticleTemplate
      title={${JSON.stringify(content.title)}}
      slug={${JSON.stringify(brief.slug)}}
      subtitle={${JSON.stringify(content.subtitle)}}
      hero={{
        image: (
          <Image
            src={${JSON.stringify(heroPublicPath)}}
            alt={${JSON.stringify(brief.heroAlt)}}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        ),
        eyebrow: ${JSON.stringify(brief.region)},
        caption: ${JSON.stringify(brief.heroAlt)},
      }}
      quickFacts={${JSON.stringify(content.quickFacts)}}
      intro={{
        title: ${JSON.stringify(content.introTitle)},
        paragraphs: ${JSON.stringify(content.introParagraphs)},
      }}
      ${
        hasHotels
          ? `hotelIntro={{ title: ${JSON.stringify(content.hotelIntro.title)}, text: ${JSON.stringify(content.hotelIntro.text)} }}
      hotelSection={<HotelGrid items={hotels} />}`
          : ''
      }
      ${
        hasRestaurants
          ? `restaurantIntro={{ title: ${JSON.stringify(content.restaurantIntro.title)}, text: ${JSON.stringify(content.restaurantIntro.text)} }}
      restaurantSection={<RestaurantPremiumGrid items={${brief.slug.replace(/-/g, '')}Restaurants} />}`
          : ''
      }
      faqIntro={{ title: 'FAQ : visiter ${brief.destinationName}' }}
      faqSection={
        <div className="space-y-5">
${faqJsx}
        </div>
      }
      conclusion={{
        title: ${JSON.stringify(content.conclusionTitle)},
        text: ${JSON.stringify(content.conclusionText)},
        ctas: [
          { label: 'Planifier mon itinéraire', href: '/planificateur', variant: 'primary' },
          { label: 'Voir les itinéraires partagés', href: '/itineraires-communaute', variant: 'outline' },
          { label: 'Explorer d’autres destinations', href: '/blog', variant: 'soft' },
        ],
      }}
    >
      <section className="space-y-12">
${buildSectionsJsx(content.sections)}

${buildGroceriesJsx(brief.groceries)}

${buildOwnTipJsx(brief.ownTip)}
      </section>
    </DestinationArticleTemplate>
  );
}
`;

  const filePath = path.join(PATHS.blogpostDir, `${componentName}.tsx`);
  await fs.writeFile(filePath, tsx, 'utf-8');
  return { componentName, filePath };
}

/* ────────────────────────────────────────────
   Étape 6 — Insertion dans componentMap.ts
   ──────────────────────────────────────────── */
async function registerInComponentMap(brief, componentName) {
  const source = await fs.readFile(PATHS.componentMap, 'utf-8');

  if (source.includes(`'${brief.slug}':`) || source.includes(`${brief.slug}:`)) {
    console.log(`  ℹ️  Le slug "${brief.slug}" existe déjà dans componentMap.ts — pas de doublon ajouté.`);
    return;
  }

  const newLine = `  '${brief.slug}': () => import('@/components/blogpost/${componentName}'),\n`;
  const marker = '};\n\n/** Export typed list of slugs';

  if (!source.includes(marker)) {
    console.warn('  ⚠️  Point d’insertion introuvable dans componentMap.ts — ajoute la ligne manuellement :\n', newLine);
    return;
  }

  const updated = source.replace(marker, `${newLine}};\n\n/** Export typed list of slugs`);
  await fs.writeFile(PATHS.componentMap, updated, 'utf-8');
}

/* ────────────────────────────────────────────
   Programme principal
   ──────────────────────────────────────────── */
async function main() {
  try {
    const brief = await interview();

    const restaurantSummary = brief.needsRestaurantResearch
      ? 'recherche automatique (4 restaurants)'
      : `${brief.restaurants.length} restaurant(s) saisis`;

    const confirm = await askYesNo(
      `\nRécapitulatif : "${brief.destinationName}" (/blog/${brief.slug}), ${brief.hotels.length} hôtel(s) à résoudre, ${restaurantSummary}. Générer l’article ?`,
    );
    if (!confirm) {
      console.log('Annulé.');
      rl.close();
      return;
    }

    // Résolution des hôtels à partir de leurs URLs
    if (brief.hotels.length) {
      console.log('\n🏨  Résolution des hôtels…');
      const resolved = [];
      for (const h of brief.hotels) {
        const data = await resolveHotelFromUrl(h.url, brief.destinationName);
        resolved.push({ ...data, imagePath: h.imagePath });
      }
      brief.hotels = resolved;
    }

    // Recherche automatique des restaurants si demandée
    if (brief.needsRestaurantResearch) {
      const found = await researchRestaurants(brief);
      if (found.length) {
        brief.restaurants = found;
        console.log(`  ✅  ${found.length} restaurant(s) trouvé(s) : ${found.map((r) => r.name).join(', ')}`);
      } else {
        console.log('  ℹ️  Aucun restaurant trouvé automatiquement — l’article sera généré sans section restaurants.');
      }
    }

    // Suggestion automatique d'une adresse épicerie si aucune n'a été fournie
    if (!brief.groceries.length) {
      const suggestion = await researchDefaultGrocery(brief);
      if (suggestion) brief.groceries = [suggestion];
    }

    const content = await generateContent(brief);
    const heroPublicPath = await handleImages(brief);
    const hotelMeta = brief.hotels.length ? await writeHotelFiles(brief) : { constName: '', hotelIds: [] };
    const { componentName, filePath } = await writeArticleComponent(brief, content, heroPublicPath, hotelMeta);
    await registerInComponentMap(brief, componentName);

    console.log('\n✅  Article créé avec succès !\n');
    console.log(`   Fichier      : ${filePath}`);
    console.log(`   Slug         : /blog/${brief.slug}`);
    console.log(`   Titre SEO    : ${content.seoTitle}`);
    console.log(`   Description  : ${content.seoDescription}`);
    console.log('\n📌  Prochaines étapes :');
    console.log('   1. pnpm prebuild   # régénère blogMeta.ts + sitemap-data.json');
    console.log('   2. pnpm build      # vérifie que tout compile sans erreur');
    console.log('   3. Relis l’article généré et ajuste le ton si besoin avant de publier.\n');
  } catch (err) {
    console.error('\n❌  Erreur :', err.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
