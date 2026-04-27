#!/usr/bin/env node
// scripts/audit-ai-coverage.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const KB_FILE = path.join(ROOT, 'public', 'ai-knowledge-base.json');
const BLOGPOST_DIR = path.join(ROOT, 'src', 'components', 'blogpost');
const PRODUCERS_FILE = path.join(ROOT, 'src', 'data', 'producers.json');

const errors = [];
const warnings = [];
const infos = [];

function logInfo(msg) {
  infos.push(`ℹ️ ${msg}`);
}

function logWarning(msg) {
  warnings.push(`⚠️ ${msg}`);
}

function logError(msg) {
  errors.push(`❌ ${msg}`);
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) {
    logError(`${label} introuvable : ${filePath}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    logError(`${label} JSON invalide : ${error.message}`);
    return null;
  }
}

function normalizeSlug(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^blogarticle/i, '')
    .replace(/\.tsx?$/i, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getBlogArticleSlugs() {
  if (!fs.existsSync(BLOGPOST_DIR)) {
    logError(`Dossier blogpost introuvable : ${BLOGPOST_DIR}`);
    return [];
  }

  return fs
    .readdirSync(BLOGPOST_DIR)
    .filter((file) => /\.(tsx|ts)$/.test(file))
    .filter((file) => file.startsWith('BlogArticle'))
    .map((file) => ({
      file,
      slug: normalizeSlug(file),
    }));
}

function extractKbItems(data) {
  let items = [];

  if (Array.isArray(data)) {
    items = data;
  } else if (data && typeof data === 'object') {
    items = [
      ...(Array.isArray(data.articles) ? data.articles : []),
      ...(Array.isArray(data.destinations) ? data.destinations : []),
      ...(Array.isArray(data.blogPosts) ? data.blogPosts : []),
      ...(Array.isArray(data.producers) ? data.producers : []),
      ...(Array.isArray(data.producteurs) ? data.producteurs : []),
      ...(Array.isArray(data.items) ? data.items : []),
    ];
  } else {
    logError('Format ai-knowledge-base.json non reconnu.');
    return [];
  }

  if (!items.length) {
    logWarning(
      'Aucune entrée exploitable trouvée. Vérifie les clés du fichier : articles, destinations, blogPosts, producers, producteurs ou items.',
    );
  }

  return items.map((item, index) => ({
    index,
    slug: normalizeSlug(item.slug || item.url || item.title || item.name || item.nom || ''),
    title: item.title || item.name || item.nom || '',
    type: item.type || item.category || item.kind || '',
    raw: item,
  }));
}

function getProducerItems(data) {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data.producers)) return data.producers;
  if (Array.isArray(data.producteurs)) return data.producteurs;
  if (Array.isArray(data.items)) return data.items;

  logError('Format producers.json non reconnu : tableau attendu.');
  return [];
}

function getProducerKey(producer) {
  return normalizeSlug(
    producer.slug || producer.id || producer.name || producer.nom || producer.title || '',
  );
}

function auditBlogCoverage(kbItems) {
  const blogFiles = getBlogArticleSlugs();
  const kbSlugSet = new Set(kbItems.map((item) => item.slug).filter(Boolean));

  logInfo(`Articles TSX trouvés : ${blogFiles.length}`);

  const missing = blogFiles.filter((article) => !kbSlugSet.has(article.slug));

  if (missing.length) {
    logWarning(`${missing.length} article(s) absents de ai-knowledge-base.json :`);
    missing.forEach((article) => {
      console.log(`   - ${article.file} → slug attendu : ${article.slug}`);
    });
  } else {
    logInfo('Tous les articles TSX semblent présents dans la base IA.');
  }

  return {
    totalArticles: blogFiles.length,
    missingArticles: missing.length,
  };
}

function auditProducerCoverage(kbItems) {
  const producersData = readJson(PRODUCERS_FILE, 'producers.json');
  if (!producersData) return { totalProducers: 0, missingProducers: 0 };

  const producers = getProducerItems(producersData);

  const kbProducerKeys = new Set();

  for (const item of kbItems) {
    const raw = item.raw;

    const candidates = [
      raw.slug,
      raw.id,
      raw.name,
      raw.nom,
      raw.title,
      raw.producerSlug,
      raw.producerId,
    ];

    for (const candidate of candidates) {
      const key = normalizeSlug(candidate);
      if (key) kbProducerKeys.add(key);
    }
  }

  logInfo(`Producteurs trouvés dans producers.json : ${producers.length}`);

  const missing = producers.filter((producer) => {
    const key = getProducerKey(producer);
    return key && !kbProducerKeys.has(key);
  });

  if (missing.length) {
    logWarning(`${missing.length} producteur(s) absents de ai-knowledge-base.json :`);
    missing.forEach((producer) => {
      const name = producer.name || producer.nom || producer.title || producer.id || 'Sans nom';
      const key = getProducerKey(producer);
      console.log(`   - ${name} → clé attendue : ${key}`);
    });
  } else {
    logInfo('Tous les producteurs semblent présents dans la base IA.');
  }

  return {
    totalProducers: producers.length,
    missingProducers: missing.length,
  };
}

function auditDuplicates(kbItems) {
  const count = new Map();

  for (const item of kbItems) {
    if (!item.slug) continue;
    count.set(item.slug, (count.get(item.slug) || 0) + 1);
  }

  const duplicates = [...count.entries()].filter(([, value]) => value > 1);

  if (duplicates.length) {
    logWarning(`${duplicates.length} doublon(s) détecté(s) dans la base IA :`);
    duplicates.forEach(([slug, amount]) => {
      console.log(`   - ${slug} présent ${amount} fois`);
    });
  } else {
    logInfo('Aucun doublon évident détecté dans la base IA.');
  }
}

function main() {
  console.log('\n🧠 Audit couverture IA : articles + producteurs\n');

  const kbData = readJson(KB_FILE, 'ai-knowledge-base.json');
  if (!kbData) {
    printReport();
    process.exit(1);
  }

  const kbItems = extractKbItems(kbData);

  logInfo(`Entrées dans ai-knowledge-base.json : ${kbItems.length}`);

  auditDuplicates(kbItems);

  const blogResult = auditBlogCoverage(kbItems);
  const producerResult = auditProducerCoverage(kbItems);

  printReport();

  if (errors.length || blogResult.missingArticles > 0 || producerResult.missingProducers > 0) {
    process.exit(1);
  }
}

function printReport() {
  console.log('\n==============================');
  console.log('📋 RAPPORT COUVERTURE IA');
  console.log('==============================\n');

  if (infos.length) {
    console.log('✅ Infos');
    infos.forEach((msg) => console.log(msg));
    console.log('');
  }

  if (warnings.length) {
    console.log('⚠️ Avertissements');
    warnings.forEach((msg) => console.log(msg));
    console.log('');
  }

  if (errors.length) {
    console.log('❌ Erreurs');
    errors.forEach((msg) => console.log(msg));
    console.log('');
  }

  console.log('==============================');

  if (!errors.length && !warnings.length) {
    console.log('🎉 Couverture parfaite : articles + producteurs sont présents.');
  } else if (!errors.length) {
    console.log('✅ Audit terminé avec avertissements.');
  } else {
    console.log('🚨 Audit terminé avec erreurs.');
  }

  console.log('==============================\n');
}

main();
