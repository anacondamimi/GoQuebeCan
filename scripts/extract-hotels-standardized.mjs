import path from 'node:path';
import fs from 'node:fs/promises';
import fg from 'fast-glob';
import { Project, Node, SyntaxKind } from 'ts-morph';

const ROOT = process.cwd();
const BLOG_GLOB = 'src/components/blogpost/**/*.{ts,tsx}';

const REPORT_FILE = path.join(ROOT, 'hotelExtraction.report.json');
const STANDARDIZED_FILE = path.join(ROOT, 'standardizedHotels.json');

const project = new Project({
  tsConfigFilePath: path.join(ROOT, 'tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
});

const files = await fg(BLOG_GLOB, {
  cwd: ROOT,
  absolute: true,
  ignore: ['**/node_modules/**', '**/.next/**'],
});

files.forEach((file) => {
  project.addSourceFileAtPath(file);
});

const HOTEL_ARRAY_NAMES = new Set([
  'hotels',
  'hotelList',
  'featuredHotels',
  'recommendedHotels',
  'hebergements',
  'accommodations',
  'whereToStay',
  'lodgings',
  'stays',
]);

const HOTEL_CARD_NAMES = new Set(['HotelCard', 'AccommodationCard', 'StayCard']);

const HOTEL_OBJECT_KEYS = new Set([
  'name',
  'title',
  'hotelName',
  'label',

  'description',
  'subtitle',
  'summary',
  'excerpt',
  'poi',
  'text',

  'price',
  'priceText',
  'rate',
  'tarif',

  'link',
  'bookingUrl',
  'href',
  'url',
  'booking',
  'website',

  'image',
  'cover',
  'img',
  'thumbnail',

  'distance',
  'rating',
  'badge',
  'category',
  'type',
]);

function cleanText(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

function inferSlugFromFile(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  return base
    .replace(/^BlogArticle/i, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function getLiteralValue(node) {
  if (!node) return undefined;

  if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return node.getLiteralValue();
  }

  if (Node.isNumericLiteral(node)) {
    return node.getText();
  }

  if (Node.isTemplateExpression(node)) {
    return cleanText(node.getText().replace(/`/g, ''));
  }

  if (Node.isJsxExpression(node)) {
    const expr = node.getExpression();
    if (!expr) return undefined;
    return getLiteralValue(expr) ?? expr.getText();
  }

  if (node.getKind() === SyntaxKind.TrueKeyword || node.getKind() === SyntaxKind.FalseKeyword) {
    return node.getText();
  }

  return undefined;
}

function standardizeHotel(raw, sourceFile) {
  const name = cleanText(raw.name || raw.title || raw.hotelName || raw.label || '');
  const description = cleanText(
    raw.description || raw.subtitle || raw.summary || raw.excerpt || raw.poi || raw.text || '',
  );
  const price = cleanText(raw.price || raw.priceText || raw.rate || raw.tarif || '');
  const bookingUrl = cleanText(
    raw.bookingUrl || raw.link || raw.href || raw.url || raw.booking || raw.website || '',
  );
  const image = cleanText(raw.image || raw.cover || raw.img || raw.thumbnail || '');
  const distance = cleanText(raw.distance || '');
  const rating = cleanText(raw.rating || '');
  const badge = cleanText(raw.badge || '');
  const category = cleanText(raw.category || raw.type || '');
  const sourceSlug = inferSlugFromFile(sourceFile);

  if (!name || !bookingUrl) return null;

  return {
    name,
    description: description || 'Description non renseignée',
    price: price || 'Voir tarif selon les dates',
    bookingUrl,
    image: image || undefined,
    distance: distance || undefined,
    rating: rating || undefined,
    badge: badge || undefined,
    category: category || undefined,
    sourceFile: path.relative(ROOT, sourceFile).replace(/\\/g, '/'),
    sourceSlug,
  };
}

function objectLiteralToPlain(obj) {
  const result = {};

  for (const prop of obj.getProperties()) {
    if (Node.isPropertyAssignment(prop)) {
      const key = prop
        .getNameNode()
        .getText()
        .replace(/^['"]|['"]$/g, '');
      const initializer = prop.getInitializer();
      if (!initializer) continue;

      if (Node.isObjectLiteralExpression(initializer)) {
        result[key] = objectLiteralToPlain(initializer);
        continue;
      }

      if (Node.isArrayLiteralExpression(initializer)) {
        result[key] = initializer.getElements().map((el) => {
          if (Node.isObjectLiteralExpression(el)) return objectLiteralToPlain(el);
          return getLiteralValue(el) ?? el.getText();
        });
        continue;
      }

      result[key] = getLiteralValue(initializer) ?? initializer.getText();
    }

    if (Node.isShorthandPropertyAssignment(prop)) {
      const key = prop.getName();
      result[key] = key;
    }
  }

  return result;
}

function looksLikeHotelObject(raw) {
  const hasName = 'name' in raw || 'title' in raw || 'hotelName' in raw || 'label' in raw;

  const hasUrl =
    'link' in raw ||
    'bookingUrl' in raw ||
    'href' in raw ||
    'url' in raw ||
    'booking' in raw ||
    'website' in raw;

  const hasDesc =
    'description' in raw ||
    'subtitle' in raw ||
    'summary' in raw ||
    'excerpt' in raw ||
    'poi' in raw ||
    'text' in raw;

  const hasImage = 'image' in raw || 'cover' in raw || 'img' in raw || 'thumbnail' in raw;

  const hasPrice = 'price' in raw || 'priceText' in raw || 'rate' in raw || 'tarif' in raw;

  const score = [hasName, hasUrl, hasDesc, hasImage, hasPrice].filter(Boolean).length;

  return hasName && hasUrl && score >= 2;
}

function extractHotelsFromArrayNode(arrayNode, sourceFile, context) {
  const hotels = [];

  for (const element of arrayNode.getElements()) {
    if (Node.isObjectLiteralExpression(element)) {
      const raw = objectLiteralToPlain(element);
      if (!looksLikeHotelObject(raw)) continue;
      const standardized = standardizeHotel(raw, sourceFile);
      if (standardized) hotels.push(standardized);
      continue;
    }

    if (Node.isSpreadElement(element)) {
      const expr = element.getExpression();
      const resolved = resolveArrayLikeNode(expr, context);
      if (resolved) {
        hotels.push(...extractHotelsFromArrayNode(resolved, sourceFile, context));
      }
      continue;
    }

    if (Node.isIdentifier(element)) {
      const resolved = resolveIdentifierToArrayNode(element.getText(), context);
      if (resolved) {
        hotels.push(...extractHotelsFromArrayNode(resolved, sourceFile, context));
      }
      continue;
    }
  }

  return hotels;
}

function buildVariableIndex(sourceFile) {
  const index = new Map();

  for (const decl of sourceFile.getVariableDeclarations()) {
    const name = decl.getName();
    const init = decl.getInitializer();
    if (init) index.set(name, init);
  }

  return index;
}

function resolveIdentifierToNode(name, context, depth = 0) {
  if (depth > 5) return null;
  const node = context.variableIndex.get(name);
  if (!node) return null;

  if (Node.isIdentifier(node)) {
    return resolveIdentifierToNode(node.getText(), context, depth + 1);
  }

  return node;
}

function resolveIdentifierToArrayNode(name, context, depth = 0) {
  if (depth > 5) return null;

  const node = resolveIdentifierToNode(name, context, depth);
  if (!node) return null;

  if (Node.isArrayLiteralExpression(node)) return node;

  if (Node.isAsExpression(node) || Node.isTypeAssertion(node)) {
    const expr = node.getExpression();
    if (Node.isArrayLiteralExpression(expr)) return expr;
  }

  return null;
}

function resolveArrayLikeNode(node, context, depth = 0) {
  if (!node || depth > 5) return null;

  if (Node.isArrayLiteralExpression(node)) return node;

  if (Node.isIdentifier(node)) {
    return resolveIdentifierToArrayNode(node.getText(), context, depth + 1);
  }

  if (Node.isAsExpression(node) || Node.isTypeAssertion(node)) {
    return resolveArrayLikeNode(node.getExpression(), context, depth + 1);
  }

  if (Node.isParenthesizedExpression(node)) {
    return resolveArrayLikeNode(node.getExpression(), context, depth + 1);
  }

  return null;
}

function collectHotelsPropertiesDeep(node, sourceFile, context, results = [], trail = []) {
  if (!node) return results;

  if (Node.isObjectLiteralExpression(node)) {
    for (const prop of node.getProperties()) {
      if (!Node.isPropertyAssignment(prop)) continue;

      const propName = prop.getName();
      const propInit = prop.getInitializer();
      if (!propInit) continue;

      const nextTrail = [...trail, propName];

      if (HOTEL_ARRAY_NAMES.has(propName)) {
        const resolvedArray = resolveArrayLikeNode(propInit, context);
        if (resolvedArray) {
          results.push({
            kind: 'deep-object-property',
            name: nextTrail.join('.'),
            hotels: extractHotelsFromArrayNode(resolvedArray, sourceFile, context),
          });
        }
      }

      collectHotelsPropertiesDeep(propInit, sourceFile, context, results, nextTrail);
    }
  }

  if (Node.isArrayLiteralExpression(node)) {
    for (const el of node.getElements()) {
      collectHotelsPropertiesDeep(el, sourceFile, context, results, trail);
    }
  }

  if (Node.isCallExpression(node)) {
    for (const arg of node.getArguments()) {
      collectHotelsPropertiesDeep(arg, sourceFile, context, results, trail);
    }
  }

  if (Node.isParenthesizedExpression(node)) {
    collectHotelsPropertiesDeep(node.getExpression(), sourceFile, context, results, trail);
  }

  if (Node.isAsExpression(node) || Node.isTypeAssertion(node)) {
    collectHotelsPropertiesDeep(node.getExpression(), sourceFile, context, results, trail);
  }

  if (Node.isPropertyAccessExpression(node)) {
    collectHotelsPropertiesDeep(node.getExpression(), sourceFile, context, results, trail);
  }

  return results;
}

function extractHotelsFromJsxHotelCards(sourceFile) {
  const hotels = [];
  const sourceFilePath = sourceFile.getFilePath();

  const jsxNodes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
  const jsxOpeningNodes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
  const allJsxNodes = [...jsxNodes, ...jsxOpeningNodes];

  for (const node of allJsxNodes) {
    const tagName = node.getTagNameNode().getText();
    if (!HOTEL_CARD_NAMES.has(tagName)) continue;

    const raw = {};

    for (const attr of node.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) continue;

      const name = attr.getNameNode().getText();
      const initializer = attr.getInitializer();
      if (!initializer) continue;

      if (Node.isStringLiteral(initializer)) {
        raw[name] = initializer.getLiteralValue();
        continue;
      }

      if (Node.isJsxExpression(initializer)) {
        const expr = initializer.getExpression();
        if (!expr) continue;
        raw[name] = getLiteralValue(expr) ?? expr.getText();
      }
    }

    const standardized = standardizeHotel(raw, sourceFilePath);
    if (standardized) hotels.push(standardized);
  }

  return hotels;
}

function extractHotelsFromHotelCardMapPatterns(sourceFile, context) {
  const hotels = [];
  const callExprs = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  for (const call of callExprs) {
    const expr = call.getExpression();

    if (!Node.isPropertyAccessExpression(expr)) continue;
    if (expr.getName() !== 'map') continue;

    const leftExpr = expr.getExpression();
    const sourceArray = resolveArrayLikeNode(leftExpr, context);
    if (!sourceArray) continue;

    const callback = call.getArguments()[0];
    if (!callback) continue;

    const callbackText = callback.getText();
    if (!/HotelCard/.test(callbackText)) continue;

    hotels.push(...extractHotelsFromArrayNode(sourceArray, sourceFile.getFilePath(), context));
  }

  return hotels;
}

function extractHeuristicHotelArrays(sourceFile, context) {
  const found = [];

  for (const [name, init] of context.variableIndex.entries()) {
    const resolved = resolveArrayLikeNode(init, context);
    if (!resolved) continue;

    const extracted = extractHotelsFromArrayNode(resolved, sourceFile.getFilePath(), context);
    if (extracted.length === 0) continue;

    if (HOTEL_ARRAY_NAMES.has(name) || /hotel|heberg|stay|lodg|accommodation/i.test(name)) {
      found.push({
        kind: 'heuristic-variable',
        name,
        hotels: extracted,
      });
    }
  }

  return found;
}
function collectCandidateObjectKeysFromFile(sourceFile) {
  const samples = [];

  for (const obj of sourceFile.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)) {
    const raw = objectLiteralToPlain(obj);
    const keys = Object.keys(raw);

    if (keys.length === 0) continue;

    const hasInterestingKey = keys.some((k) => HOTEL_OBJECT_KEYS.has(k));
    if (!hasInterestingKey) continue;

    samples.push(keys);

    if (samples.length >= 5) break;
  }

  return samples;
}
function findAllHotelsDeclarations(sourceFile) {
  const variableIndex = buildVariableIndex(sourceFile);
  const context = { variableIndex };
  const found = [];

  for (const decl of sourceFile.getVariableDeclarations()) {
    const name = decl.getName();
    const init = decl.getInitializer();
    if (!init) continue;

    const resolvedArray = resolveArrayLikeNode(init, context);

    if (HOTEL_ARRAY_NAMES.has(name) && resolvedArray) {
      found.push({
        kind: 'variable',
        name,
        hotels: extractHotelsFromArrayNode(resolvedArray, sourceFile.getFilePath(), context),
      });
    }

    collectHotelsPropertiesDeep(init, sourceFile.getFilePath(), context, found, [name]);
  }

  for (const stmt of sourceFile.getStatements()) {
    if (Node.isExportAssignment(stmt)) {
      const expr = stmt.getExpression();
      collectHotelsPropertiesDeep(expr, sourceFile.getFilePath(), context, found, [
        'defaultExport',
      ]);
    }
  }

  const jsxHotels = extractHotelsFromJsxHotelCards(sourceFile);
  if (jsxHotels.length > 0) {
    found.push({
      kind: 'jsx-hotel-card',
      name: 'HotelCard',
      hotels: jsxHotels,
    });
  }

  const mapHotels = extractHotelsFromHotelCardMapPatterns(sourceFile, context);
  if (mapHotels.length > 0) {
    found.push({
      kind: 'hotelcard-map-pattern',
      name: 'map(HotelCard)',
      hotels: mapHotels,
    });
  }

  found.push(...extractHeuristicHotelArrays(sourceFile, context));

  return found;
}

function dedupeHotels(hotels) {
  const seen = new Map();

  for (const hotel of hotels) {
    const key = [hotel.sourceFile, hotel.name.toLowerCase(), hotel.bookingUrl.toLowerCase()].join(
      '::',
    );

    if (!seen.has(key)) {
      seen.set(key, hotel);
    }
  }

  return Array.from(seen.values());
}

const report = {
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  standardizedHotels: [],
  fileSummaries: [],
  errors: [],
};

for (const sf of project.getSourceFiles()) {
  try {
    const sourcePath = sf.getFilePath();
    const relativePath = path.relative(ROOT, sourcePath).replace(/\\/g, '/');
    const fileText = sf.getFullText();

    const matches = findAllHotelsDeclarations(sf);
    const mergedHotels = dedupeHotels(matches.flatMap((m) => m.hotels));

    if (mergedHotels.length === 0) {
      const mentionsHotels =
        /\bhotels\b/i.test(fileText) ||
        /\bHotelCard\b/.test(fileText) ||
        /\bhotelList\b/i.test(fileText) ||
        /\bfeaturedHotels\b/i.test(fileText) ||
        /\bhebergements\b/i.test(fileText) ||
        /\baccommodations\b/i.test(fileText) ||
        /\bwhereToStay\b/i.test(fileText) ||
        /\blodgings\b/i.test(fileText) ||
        /\bstays\b/i.test(fileText);

      report.errors.push({
        file: relativePath,
        reason: mentionsHotels
          ? 'hotels_key_present_but_not_extracted'
          : 'no_structured_hotels_found',
        debug: {
          containsHotelsWord: /\bhotels\b/i.test(fileText),
          containsHotelCard: /\bHotelCard\b/.test(fileText),
          containsWhereToStay: /\bwhereToStay\b/i.test(fileText),
          candidateObjectKeySamples: collectCandidateObjectKeysFromFile(sf),
        },
      });
      continue;
    }

    report.standardizedHotels.push(...mergedHotels);

    report.fileSummaries.push({
      file: relativePath,
      detections: matches.map((m) => ({
        kind: m.kind,
        name: m.name,
        count: m.hotels.length,
      })),
      count: mergedHotels.length,
    });
  } catch (error) {
    report.errors.push({
      file: path.relative(ROOT, sf.getFilePath()).replace(/\\/g, '/'),
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

report.standardizedHotels = dedupeHotels(report.standardizedHotels).sort((a, b) => {
  if (a.sourceSlug !== b.sourceSlug) return a.sourceSlug.localeCompare(b.sourceSlug);
  return a.name.localeCompare(b.name);
});

await fs.writeFile(REPORT_FILE, JSON.stringify(report, null, 2), 'utf8');
await fs.writeFile(STANDARDIZED_FILE, JSON.stringify(report.standardizedHotels, null, 2), 'utf8');

console.log(`✅ Rapport généré : ${REPORT_FILE}`);
console.log(`✅ JSON standardisé généré : ${STANDARDIZED_FILE}`);
console.log(`📦 Fichiers scannés : ${report.scannedFiles}`);
console.log(`🏨 Hôtels standardisés : ${report.standardizedHotels.length}`);
console.log(`⚠️ Erreurs : ${report.errors.length}`);
