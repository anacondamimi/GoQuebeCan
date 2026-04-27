#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(SRC_DIR, 'generated');
const OUT_FILE = path.join(OUT_DIR, 'ai-knowledge-base.json');

const SITE_URL = 'https://www.goquebecan.com';

const SOURCES = {
  publicDestinations: path.join(PUBLIC_DIR, 'destinations.json'),
  srcDestinations: path.join(SRC_DIR, 'data', 'destinations.json'),
  producers: path.join(SRC_DIR, 'data', 'producers.json'),
  offers: path.join(SRC_DIR, 'data', 'offers-data.ts'),
  blogMeta: path.join(SRC_DIR, 'components', 'lib', 'data', 'blogMeta.ts'),
};

async function readFileSafe(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return '';
  }
}

async function readJsonSafe(filePath, fallback = []) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function normalizeSlug(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/^blog\//, '')
    .replace(/^destinations\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim();
}

function uniq(values = []) {
  return [
    ...new Set(
      values
        .filter(Boolean)
        .map((v) => cleanText(v))
        .filter(Boolean),
    ),
  ];
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractBlogMeta(raw) {
  const match = raw.match(/export const blogMeta = ([\s\S]*?) as const satisfies/);
  if (!match?.[1]) return {};

  try {
    return JSON.parse(match[1]);
  } catch {
    return {};
  }
}

function extractOffers(raw) {
  const offers = [];

  const titleMatches = [...raw.matchAll(/title\s*:\s*['"`]([^'"`]+)['"`]/g)];
  const urlMatches = [...raw.matchAll(/url\s*:\s*['"`]([^'"`]+)['"`]/g)];

  titleMatches.forEach((match, index) => {
    offers.push({
      title: cleanText(match[1]),
      url: urlMatches[index]?.[1] || null,
    });
  });

  return offers;
}

function normalizeDestinationItem(item) {
  const slug = normalizeSlug(
    item.slug || item.href || item.url || item.path || item.id || item.title || item.name,
  );

  if (!slug) return null;

  const title = cleanText(item.title || item.name || titleFromSlug(slug));

  return {
    slug,
    title,
    region: cleanText(item.region || item.area || item.province || 'Québec'),
    summary: cleanText(item.summary || item.description || item.excerpt || ''),
    image: item.image || item.imageUrl || `/images/destinations/${slug}.avif`,
    links: uniq([
      `/blog/${slug}`,
      `/destinations/${slug}`,
      '/planificateur',
      '/producteurs',
      '/videos',
    ]),
    keywords: uniq([
      title,
      item.region,
      item.category,
      ...(Array.isArray(item.tags) ? item.tags : []),
      ...(Array.isArray(item.keywords) ? item.keywords : []),
    ]),
  };
}

function normalizeBlogItem(slug, meta) {
  return {
    slug,
    title: cleanText(meta.title || titleFromSlug(slug)),
    region: cleanText(meta.region || 'Québec'),
    summary: cleanText(meta.description || ''),
    image: meta.image || `/images/destinations/${slug}.avif`,
    activities: uniq(meta.activites || []),
    hotels: uniq(meta.hebergements || []),
    audiences: uniq(meta.publics || []),
    keywords: uniq(meta.keywords || []),
    links: uniq([
      `/blog/${slug}`,
      `/destinations/${slug}`,
      '/planificateur',
      '/producteurs',
      '/videos',
    ]),
  };
}

function groupProducersByDestination(producers = []) {
  const map = new Map();

  for (const producer of producers) {
    const rawDestination =
      producer.destination ||
      producer.city ||
      producer.ville ||
      producer.region ||
      producer.nearbyDestination ||
      '';

    const key = normalizeSlug(rawDestination);
    if (!key) continue;

    const current = map.get(key) || [];

    current.push({
      name: cleanText(producer.name || producer.nom || ''),
      type: cleanText(producer.type || producer.category || producer.categorie || ''),
      city: cleanText(producer.city || producer.ville || ''),
      description: cleanText(producer.description || ''),
    });

    map.set(key, current);
  }

  return map;
}

async function main() {
  const publicDestinations = await readJsonSafe(SOURCES.publicDestinations, []);
  const srcDestinations = await readJsonSafe(SOURCES.srcDestinations, []);
  const producers = await readJsonSafe(SOURCES.producers, []);
  const blogMetaRaw = await readFileSafe(SOURCES.blogMeta);
  const offersRaw = await readFileSafe(SOURCES.offers);

  const blogMeta = extractBlogMeta(blogMetaRaw);
  const offers = extractOffers(offersRaw);
  const producersByDestination = groupProducersByDestination(producers);

  const destinationMap = new Map();

  for (const item of [...publicDestinations, ...srcDestinations]) {
    const normalized = normalizeDestinationItem(item);
    if (!normalized) continue;

    destinationMap.set(normalized.slug, {
      ...(destinationMap.get(normalized.slug) || {}),
      ...normalized,
    });
  }

  for (const [slug, meta] of Object.entries(blogMeta)) {
    const blogItem = normalizeBlogItem(slug, meta);
    const existing = destinationMap.get(slug) || {};

    destinationMap.set(slug, {
      ...existing,
      ...blogItem,
      summary: blogItem.summary || existing.summary || '',
      links: uniq([...(existing.links || []), ...(blogItem.links || [])]),
      keywords: uniq([...(existing.keywords || []), ...(blogItem.keywords || [])]),
    });
  }

  const destinations = [...destinationMap.values()]
    .map((destination) => {
      const producerMatches = producersByDestination.get(destination.slug) || [];

      return {
        ...destination,
        producers: producerMatches.slice(0, 8),
        suggestedQuestions: [
          `Que faire à ${destination.title} ?`,
          `Où dormir près de ${destination.title} ?`,
          `Quels producteurs visiter près de ${destination.title} ?`,
          `Peux-tu me créer un itinéraire vers ${destination.title} ?`,
        ],
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'));

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    purpose:
      'Base de connaissances utilisée par l’agent IA GoQuébeCAN pour répondre aux questions des visiteurs.',
    rules: {
      tone: 'Conseiller voyage chaleureux, clair, utile et orienté action.',
      answerStyle: 'Réponse courte d’abord, puis suggestions concrètes avec liens internes utiles.',
      preferredLinks: ['/planificateur', '/producteurs', '/videos', '/blog'],
      avoid:
        'Ne pas inventer de prix, horaires, disponibilités ou informations non présentes dans la base.',
    },
    counts: {
      destinations: destinations.length,
      producers: Array.isArray(producers) ? producers.length : 0,
      offers: offers.length,
    },
    destinations,
    offers,
    globalLinks: [
      {
        label: 'Planificateur d’itinéraire',
        url: '/planificateur',
        intent: 'Créer un itinéraire personnalisé.',
      },
      {
        label: 'Producteurs locaux',
        url: '/producteurs',
        intent: 'Trouver des fermes, fromageries, vignobles, microbrasseries et arrêts gourmands.',
      },
      {
        label: 'Vidéos populaires',
        url: '/videos',
        intent: 'Voir des vidéos inspirantes par destination.',
      },
      {
        label: 'Blog destinations',
        url: '/blog',
        intent: 'Lire les guides complets.',
      },
      {
        label: 'Offres spéciales',
        url: '/offres',
        intent: 'Voir les offres et bons plans.',
      },
    ],
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`✅ Base IA générée : ${OUT_FILE}`);
  console.log(payload.counts);
}

main().catch((error) => {
  console.error('❌ Erreur génération base IA');
  console.error(error);
  process.exit(1);
});
