#!/usr/bin/env node
// scripts/audit-ai-knowledge-base.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const KB_FILE = path.join(ROOT, 'public', 'ai-knowledge-base.json');

const MIN_DESCRIPTION_LENGTH = 80;
const MIN_KEYWORDS = 2;
const MIN_SECTIONS = 2;
const MIN_INTERNAL_LINKS = 1;

const errors = [];
const warnings = [];
const infos = [];

function addError(message) {
  errors.push(`❌ ${message}`);
}

function addWarning(message) {
  warnings.push(`⚠️ ${message}`);
}

function addInfo(message) {
  infos.push(`ℹ️ ${message}`);
}

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isArray(value) {
  return Array.isArray(value);
}

function normalizeSlug(slug) {
  return String(slug || '')
    .trim()
    .toLowerCase();
}

function isValidUrl(url) {
  return typeof url === 'string' && url.startsWith('/blog/');
}

function hasSuspiciousCharacters(text) {
  if (!text) return false;
  return /�|Ã|Â|â€™|â€œ|â€|&nbsp;/.test(text);
}

function auditEntry(entry, index, slugCount) {
  const label = entry?.slug || entry?.title || `entrée #${index + 1}`;

  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    addError(`Entrée #${index + 1} invalide : objet attendu.`);
    return;
  }

  const slug = normalizeSlug(entry.slug);

  if (!isString(entry.slug)) {
    addError(`${label} : slug manquant.`);
  }

  if (slug && slugCount.get(slug) > 1) {
    addError(`${label} : slug en double "${slug}".`);
  }

  if (!isString(entry.title)) {
    addError(`${label} : title manquant.`);
  }

  if (!isString(entry.description)) {
    addWarning(`${label} : description manquante.`);
  } else if (entry.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    addWarning(`${label} : description courte (${entry.description.trim().length} caractères).`);
  }

  if (!isString(entry.url)) {
    addWarning(`${label} : url manquante.`);
  } else if (!isValidUrl(entry.url)) {
    addWarning(`${label} : url suspecte "${entry.url}". Attendu : /blog/slug`);
  }

  if (slug && entry.url && entry.url !== `/blog/${slug}`) {
    addWarning(`${label} : incohérence slug/url. slug="${slug}", url="${entry.url}".`);
  }

  if (!isArray(entry.keywords)) {
    addWarning(`${label} : keywords doit être un tableau.`);
  } else if (entry.keywords.length < MIN_KEYWORDS) {
    addWarning(`${label} : peu de keywords (${entry.keywords.length}).`);
  }

  if (!isArray(entry.sections)) {
    addWarning(`${label} : sections doit être un tableau.`);
  } else if (entry.sections.length < MIN_SECTIONS) {
    addWarning(`${label} : peu de sections (${entry.sections.length}).`);
  }

  if (!isArray(entry.internalLinks)) {
    addWarning(`${label} : internalLinks doit être un tableau.`);
  } else if (entry.internalLinks.length < MIN_INTERNAL_LINKS) {
    addWarning(`${label} : aucun lien interne détecté.`);
  }

  if (entry.images !== undefined && !isArray(entry.images)) {
    addWarning(`${label} : images doit être un tableau.`);
  }

  const textToCheck = [
    entry.slug,
    entry.title,
    entry.description,
    entry.url,
    ...(Array.isArray(entry.keywords) ? entry.keywords : []),
    ...(Array.isArray(entry.sections)
      ? entry.sections.map((s) => (typeof s === 'string' ? s : JSON.stringify(s)))
      : []),
  ].join(' ');

  if (hasSuspiciousCharacters(textToCheck)) {
    addWarning(`${label} : caractères suspects détectés.`);
  }
}

function main() {
  console.log('\n🧠 Audit de ai-knowledge-base.json\n');

  if (!fs.existsSync(KB_FILE)) {
    addError(`Fichier introuvable : ${KB_FILE}`);
    printReport();
    process.exit(1);
  }

  let raw = '';

  try {
    raw = fs.readFileSync(KB_FILE, 'utf-8');
  } catch (error) {
    addError(`Impossible de lire le fichier : ${error.message}`);
    printReport();
    process.exit(1);
  }

  if (!raw.trim()) {
    addError('Le fichier ai-knowledge-base.json est vide.');
    printReport();
    process.exit(1);
  }

  let data;

  try {
    data = JSON.parse(raw);
    addInfo('JSON valide.');
  } catch (error) {
    addError(`JSON invalide : ${error.message}`);
    printReport();
    process.exit(1);
  }

  let entries = [];

  if (Array.isArray(data)) {
    entries = data;
  } else if (data && typeof data === 'object') {
    entries = [
      ...(Array.isArray(data.articles) ? data.articles : []),
      ...(Array.isArray(data.producers) ? data.producers : []),
    ];
  } else {
    addError('Format JSON non reconnu.');
    printReport();
    process.exit(1);
  }

  if (!entries.length) {
    addError('Aucune entrée trouvée dans ai-knowledge-base.json.');
    printReport();
    process.exit(1);
  }

  addInfo(`Nombre total d’entrées : ${entries.length}`);

  const slugCount = new Map();

  for (const entry of entries) {
    const slug = normalizeSlug(entry?.slug);
    if (!slug) continue;
    slugCount.set(slug, (slugCount.get(slug) || 0) + 1);
  }

  entries.forEach((entry, index) => auditEntry(entry, index, slugCount));

  const uniqueSlugs = [...slugCount.keys()];
  addInfo(`Slugs uniques : ${uniqueSlugs.length}`);

  printReport();

  if (errors.length > 0) {
    process.exit(1);
  }
}

function printReport() {
  console.log('==============================');
  console.log('📋 RAPPORT D’AUDIT');
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
    console.log('❌ Erreurs critiques');
    errors.forEach((msg) => console.log(msg));
    console.log('');
  }

  console.log('==============================');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('🎉 Audit parfait : ta base IA est propre.');
  } else if (errors.length === 0) {
    console.log(
      `✅ Audit terminé avec ${warnings.length} avertissement(s), mais aucune erreur critique.`,
    );
  } else {
    console.log(
      `🚨 Audit terminé avec ${errors.length} erreur(s) critique(s) et ${warnings.length} avertissement(s).`,
    );
  }

  console.log('==============================\n');
}

main();
