import fs from 'node:fs';
import path from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';

const BLOG_DIR = path.resolve('src/components/blogpost');
const OUT_DATA_DIR = path.resolve('src/data/hotels');
const OUT_BYARTICLE_DIR = path.join(OUT_DATA_DIR, 'byArticle');
const REPORT_PATH = path.join(OUT_DATA_DIR, 'hotelExtraction.report.json');
const GENERATED_CATALOG_PATH = path.join(OUT_DATA_DIR, 'hotelCatalog.generated.ts');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function slugifyId(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 70);
}

function articleKeyFromFilename(file) {
  return file
    .replace(/^BlogArticle/i, '')
    .replace(/\.tsx$/i, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/** Unwrap: `as const`, `( ... )`, `satisfies`, `TypeAssertion`, non-null assertion */
function unwrapExpression(expr) {
  let cur = expr;

  while (cur) {
    const k = cur.getKind();

    if (
      k === SyntaxKind.AsExpression ||
      k === SyntaxKind.TypeAssertionExpression ||
      k === SyntaxKind.ParenthesizedExpression ||
      k === SyntaxKind.NonNullExpression
    ) {
      cur = cur.getExpression();
      continue;
    }

    if (k === SyntaxKind.SatisfiesExpression) {
      cur = cur.getExpression();
      continue;
    }

    break;
  }

  return cur;
}

function safeGetText(node) {
  try {
    return node?.getText?.() ?? '';
  } catch {
    return '';
  }
}

/** Read a TS value into plain JS when possible */
function readValue(node) {
  if (!node) return undefined;

  const cur = unwrapExpression(node);
  if (!cur) return undefined;

  const k = cur.getKind();

  if (k === SyntaxKind.StringLiteral) return cur.getLiteralValue();
  if (k === SyntaxKind.NoSubstitutionTemplateLiteral) return cur.getLiteralText();
  if (k === SyntaxKind.NumericLiteral) return Number(cur.getText());
  if (k === SyntaxKind.TrueKeyword) return true;
  if (k === SyntaxKind.FalseKeyword) return false;
  if (k === SyntaxKind.NullKeyword) return null;

  // On évite de "deviner" une template string dynamique
  if (k === SyntaxKind.TemplateExpression) return undefined;

  if (k === SyntaxKind.ArrayLiteralExpression) {
    return cur
      .getElements()
      .map((el) => readValue(el))
      .filter((v) => v !== undefined);
  }

  if (k === SyntaxKind.ObjectLiteralExpression) {
    return readObjectLiteral(cur);
  }

  if (k === SyntaxKind.CallExpression) {
    const exprText = safeGetText(cur.getExpression());
    const args = cur.getArguments?.() ?? [];

    // bookingAwin("https://booking.com/...")
    if (exprText.includes('bookingAwin') && args.length === 1) {
      const inside = readValue(args[0]);
      return inside ? String(inside) : undefined;
    }

    // String("...")
    if ((exprText === 'String' || exprText.endsWith('.toString')) && args.length >= 1) {
      const inside = readValue(args[0]);
      return inside !== undefined && inside !== null ? String(inside) : undefined;
    }

    return undefined;
  }

  return undefined;
}

/** Convert an object literal expression into a plain JS object */
function readObjectLiteral(objLit) {
  const out = {};
  const props = objLit.getProperties();

  for (const p of props) {
    const kind = p.getKind();

    if (kind === SyntaxKind.PropertyAssignment) {
      const name = p.getName?.();
      const init = p.getInitializer?.();
      if (!name || !init) continue;

      const value = readValue(init);
      if (value !== undefined) out[name] = value;
      continue;
    }

    // support minimal du shorthand: { name, description }
    if (kind === SyntaxKind.ShorthandPropertyAssignment) {
      const name = p.getName?.();
      if (name) {
        out[name] = undefined;
      }
      continue;
    }
  }

  return out;
}

function normalizeText(value) {
  if (value === undefined || value === null) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

function normalizeBookingUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  return trimmed;
}

function normalizeImage(obj) {
  const fallbackAlt = obj.alt ?? `${obj.name ?? 'Hébergement'} — hébergement recommandé`;

  if (obj.image && typeof obj.image === 'object') {
    return {
      src: normalizeText(obj.image.src) || '/images/carte.avif',
      alt: normalizeText(obj.image.alt) || normalizeText(fallbackAlt),
    };
  }

  if (typeof obj.image === 'string') {
    return {
      src: normalizeText(obj.image) || '/images/carte.avif',
      alt: normalizeText(fallbackAlt),
    };
  }

  return {
    src: '/images/carte.avif',
    alt: normalizeText(fallbackAlt),
  };
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((v) => normalizeText(v)).filter(Boolean);
}

function normalizeVariant(value) {
  return value === 'standard' ? 'standard' : 'compact';
}

function validateHotel(obj) {
  const issues = [];

  if (!normalizeText(obj.name)) issues.push('missing_name');
  if (!normalizeText(obj.description)) issues.push('missing_description');

  const bookingUrl = normalizeText(obj.link ?? obj.bookingUrl ?? '');
  if (!bookingUrl) issues.push('missing_booking_url');

  const hasImageString = typeof obj.image === 'string' && normalizeText(obj.image);
  const hasImageObject =
    obj.image &&
    typeof obj.image === 'object' &&
    typeof obj.image.src === 'string' &&
    normalizeText(obj.image.src);

  if (!hasImageString && !hasImageObject) {
    issues.push('missing_image');
  }

  return issues;
}

function normalizeHotelObject(obj) {
  const bookingUrl = normalizeBookingUrl(obj.link ?? obj.bookingUrl ?? '');
  const image = normalizeImage(obj);

  return {
    name: normalizeText(obj.name),
    category: normalizeText(obj.category),
    location: normalizeText(obj.location),
    description: normalizeText(obj.description),
    extra: normalizeText(obj.extra),
    price: normalizeText(obj.price),
    ratingText: normalizeText(obj.ratingText),
    perks: normalizeStringArray(obj.perks),
    tags: normalizeStringArray(obj.tags),
    bookingUrl,
    image,
    variant: normalizeVariant(obj.variant),
  };
}

function createCatalogSource(catalog) {
  return `import type { HotelItem } from "@/types/hotel";

export const HOTEL_CATALOG: Record<string, HotelItem> = ${JSON.stringify(catalog, null, 2)};

export function pickHotels(ids: string[]): HotelItem[] {
  return ids.map((id) => HOTEL_CATALOG[id]).filter(Boolean);
}
`;
}

function createByArticleSource(constName, ids) {
  return `export const ${constName} = ${JSON.stringify(ids, null, 2)};\n`;
}

ensureDir(OUT_DATA_DIR);
ensureDir(OUT_BYARTICLE_DIR);

const project = new Project({
  tsConfigFilePath: path.resolve('tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
});

const files = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => /^BlogArticle.*\.tsx$/i.test(f))
  .map((f) => path.join(BLOG_DIR, f));

files.forEach((f) => project.addSourceFileAtPath(f));

const catalog = {};
const byArticle = {};
const failures = [];
const warnings = [];
const duplicateNameMap = new Map();

for (const filePath of files) {
  const sf = project.getSourceFile(filePath);
  if (!sf) continue;

  const fileName = path.basename(filePath);
  const articleKey = articleKeyFromFilename(fileName);

  const decls = sf.getVariableDeclarations();
  const hotelsDecl = decls.find((d) => d.getName() === 'hotels');

  if (!hotelsDecl) {
    warnings.push({ file: fileName, reason: 'hotels_declaration_not_found' });
    continue;
  }

  const init = hotelsDecl.getInitializer();
  if (!init) {
    failures.push({ file: fileName, reason: 'hotels_no_initializer' });
    continue;
  }

  const unwrapped = unwrapExpression(init);

  if (!unwrapped || unwrapped.getKind() !== SyntaxKind.ArrayLiteralExpression) {
    failures.push({
      file: fileName,
      reason: 'hotels_not_array_literal',
      snippet: safeGetText(unwrapped).slice(0, 200),
    });
    continue;
  }

  const arr = unwrapped;
  const elements = arr.getElements();
  const ids = [];

  for (const el of elements) {
    const elUnwrapped = unwrapExpression(el);

    if (!elUnwrapped || elUnwrapped.getKind() !== SyntaxKind.ObjectLiteralExpression) {
      warnings.push({
        file: fileName,
        articleKey,
        reason: 'hotel_element_not_object_literal',
        snippet: safeGetText(elUnwrapped).slice(0, 200),
      });
      continue;
    }

    const rawObj = readObjectLiteral(elUnwrapped);

    if (!rawObj || !normalizeText(rawObj.name)) {
      warnings.push({
        file: fileName,
        articleKey,
        reason: 'hotel_missing_name_or_unreadable',
        snippet: safeGetText(elUnwrapped).slice(0, 200),
      });
      continue;
    }

    const nameKey = normalizeText(rawObj.name).toLowerCase();
    duplicateNameMap.set(nameKey, (duplicateNameMap.get(nameKey) ?? 0) + 1);

    const issues = validateHotel(rawObj);
    if (issues.length) {
      failures.push({
        file: fileName,
        articleKey,
        hotel: normalizeText(rawObj.name) || '(sans nom)',
        reason: issues.join(','),
      });
    }

    const normalized = normalizeHotelObject(rawObj);
    const id = slugifyId(`${normalized.name}_${articleKey}`);

    if (!catalog[id]) {
      catalog[id] = {
        id,
        ...normalized,
      };
    }

    ids.push(id);
  }

  if (ids.length === 0) {
    failures.push({ file: fileName, articleKey, reason: 'no_object_hotels_extracted' });
    continue;
  }

  byArticle[articleKey] = ids;
}

// détecter les noms récurrents pour revue
const duplicateNames = [...duplicateNameMap.entries()]
  .filter(([, count]) => count > 1)
  .map(([name, count]) => ({ name, count }));

fs.writeFileSync(GENERATED_CATALOG_PATH, createCatalogSource(catalog), 'utf8');

for (const [articleKey, ids] of Object.entries(byArticle)) {
  const constName = 'HOTEL_IDS_' + articleKey.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  const content = createByArticleSource(constName, ids);
  fs.writeFileSync(path.join(OUT_BYARTICLE_DIR, `${articleKey}.ts`), content, 'utf8');
}

const report = {
  generatedAt: new Date().toISOString(),
  blogDir: BLOG_DIR,
  outDataDir: OUT_DATA_DIR,
  filesProcessed: files.length,
  articlesWithHotels: Object.keys(byArticle).length,
  hotelCount: Object.keys(catalog).length,
  duplicateNames,
  warnings,
  failures,
};

fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

console.log('✅ Extraction AST terminée');
console.log(`→ ${GENERATED_CATALOG_PATH}`);
console.log(`→ ${OUT_BYARTICLE_DIR}/*.ts`);
console.log(`→ ${REPORT_PATH}`);

if (warnings.length) {
  console.log(`⚠️ Warnings: ${warnings.length}`);
}

if (failures.length) {
  console.log(
    '⚠️ Échecs:',
    failures.map((x) => `${x.file}${x.hotel ? ` / ${x.hotel}` : ''} (${x.reason})`).join(', '),
  );
}
