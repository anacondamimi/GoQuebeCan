#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src', 'components', 'blogpost');

function getFiles(folder) {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((f) => f.isFile() && /^BlogArticle.*\.tsx$/.test(f.name))
    .map((f) => path.join(folder, f.name));
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function has(content, pattern) {
  return pattern.test(content);
}

function count(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

const files = getFiles(dir);

console.log('\n=== AUDIT STRUCTURE ARTICLES BLOG ===\n');

for (const file of files) {
  const content = read(file);
  const name = path.basename(file);

  const usesTemplate = has(content, /<DestinationArticleTemplate\b/);
  const hasHero = has(content, /\bhero=\{\{/);
  const hasHotelSection = has(content, /\bhotelSection=\{/);
  const hasRestaurantSection = has(content, /\brestaurantSection=\{/);
  const hotelGridCount = count(content, /<HotelGrid\b/g);
  const restaurantGridCount = count(content, /<RestaurantPremiumGrid\b/g);
  const nearbyDirect = has(content, /<NearbyDestinations\b/);
  const nearbyDisabled = has(content, /showNearbyDestinations=\{false\}/);
  const imageCount = count(content, /<Image\b/g);

  const warnings = [];

  if (!usesTemplate) warnings.push('pas de DestinationArticleTemplate');
  if (usesTemplate && !hasHero) warnings.push('pas de hero image');
  if (usesTemplate && nearbyDisabled) warnings.push('NearbyDestinations désactivé');
  if (nearbyDirect) warnings.push('NearbyDestinations utilisé directement');
  if (hasHotelSection && hotelGridCount > 1) warnings.push('HotelGrid probablement en doublon');
  if (hasRestaurantSection && restaurantGridCount > 1) {
    warnings.push('RestaurantPremiumGrid probablement en doublon');
  }
  if (usesTemplate && !hasHero && imageCount > 0) {
    warnings.push('image présente dans le contenu mais pas dans hero');
  }

  if (warnings.length) {
    console.log(`📄 ${name}`);
    for (const warning of warnings) {
      console.log(`   - ${warning}`);
    }
    console.log('');
  }
}

console.log('✅ Audit terminé.');
