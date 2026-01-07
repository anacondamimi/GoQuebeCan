#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const ROOT = path.resolve(process.argv[2] || '.');
const fsp = fs.promises;

// Filtres
const INCLUDE_KEYWORDS = ['map', 'leaflet', 'route', 'itineraire', 'ors', 'step', 'itinerary'];
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build', 'out'];

async function walk(dir) {
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const results = [];
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (IGNORE_DIRS.includes(ent.name)) continue;

    if (ent.isDirectory()) {
      results.push(...(await walk(full)));
    } else if (/\.(tsx?|js|json)$/i.test(ent.name)) {
      const name = ent.name.toLowerCase();
      if (INCLUDE_KEYWORDS.some((k) => name.includes(k))) {
        results.push(full);
      } else {
        // Cherche aussi dans le contenu du fichier
        const text = await fsp.readFile(full, 'utf8').catch(() => '');
        if (INCLUDE_KEYWORDS.some((k) => text.toLowerCase().includes(k))) {
          results.push(full);
        }
      }
    }
  }
  return results;
}

const main = async () => {
  const files = await walk(ROOT);
  const outPath = path.join(ROOT, 'tree-itinerary.txt');
  await fsp.writeFile(outPath, files.join('\n'), 'utf8');
  console.log(`✅ Liste ciblée écrite dans ${outPath} (${files.length} fichiers trouvés)`);
};
main();
