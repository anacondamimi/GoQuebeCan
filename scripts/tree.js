#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const ROOT = path.resolve(process.argv[2] || '.');

const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.vercel',
  'dist',
  'build',
  'out',
  'coverage',
  '.turbo',
  '.idea',
  '.vscode',
  '.cache',
]);

const EXCLUDE_EXTS = new Set([
  '.map',
  '.zip',
  '.gz',
  '.rar',
  '.7z',
  '.pdf',
  '.dmg',
  '.exe',
  '.bin',
  '.wasm',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.mp4',
  '.mov',
  '.mkv',
  '.mp3',
  '.ogg',
  '.wav',
  '.ico',
  '.ttf',
  '.otf',
  '.woff',
  '.woff2',
  '.psd',
]);

function parseMax(arg) {
  const m = String(arg || '300k').match(/^(\d+(?:\.\d+)?)([kmg])?$/i);
  if (!m) return 300 * 1024;
  const n = parseFloat(m[1]);
  const u = (m[2] || '').toLowerCase();
  const mul = u === 'g' ? 1024 ** 3 : u === 'm' ? 1024 ** 2 : u === 'k' ? 1024 : 1;
  return Math.max(0, Math.round(n * mul));
}
const maxArg = (process.argv.find((a) => a.startsWith('--max=')) || '').split('=')[1];
const MAX_SIZE = parseMax(maxArg);
const depthArg = (process.argv.find((a) => a.startsWith('--depth=')) || '').split('=')[1];
const MAX_DEPTH = Number.isFinite(Number(depthArg)) ? Number(depthArg) : 6;

function fmtBytes(b) {
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0,
    n = b;
  while (n >= 1024 && i < u.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
}

async function safeLstat(p) {
  try {
    return await fsp.lstat(p);
  } catch (err) {
    console.warn(`lstat échoué: ${p} → ${err?.message ?? err}`);
    return null;
  }
}

const lines = [];
function push(line = '') {
  lines.push(line);
}

const totals = {
  files: 0,
  dirs: 0,
  skipped: 0,
  skippedBytes: 0,
  skippedByExt: 0,
  skippedBySize: 0,
};

async function walk(dir, prefix = '', depth = 0) {
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`readdir échoué: ${dir} → ${err?.message ?? err}`);
    return;
  }

  entries = entries.filter((d) => !(d.isDirectory() && IGNORE_DIRS.has(d.name)));
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  const lastIdx = entries.length - 1;

  for (let i = 0; i < entries.length; i++) {
    const ent = entries[i];
    const isLast = i === lastIdx;
    const branch = isLast ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');
    const full = path.join(dir, ent.name);

    const st = await safeLstat(full);
    if (!st) continue;
    if (st.isSymbolicLink()) {
      push(prefix + branch + ent.name + ' -> (symlink)');
      continue;
    }

    if (ent.isDirectory()) {
      totals.dirs++;
      push(prefix + branch + ent.name + '/');

      if (depth < MAX_DEPTH) {
        await walk(full, nextPrefix, depth + 1);
      } else {
        try {
          const rest = await fsp.readdir(full);
          if (rest && rest.length) {
            push(nextPrefix + `… (${rest.length} éléments masqués)`);
          }
        } catch (err) {
          // on indique au moins qu'on a coupé la descente ici
          push(nextPrefix + '… (contenu masqué)');
          console.warn(`readdir (palier) échoué: ${full} → ${err?.message ?? err}`);
        }
      }
    } else {
      const ext = path.extname(ent.name).toLowerCase();

      if (EXCLUDE_EXTS.has(ext)) {
        totals.skipped++;
        totals.skippedByExt++;
        totals.skippedBytes += st.size;
        continue;
      }
      if (st.size > MAX_SIZE) {
        totals.skipped++;
        totals.skippedBySize++;
        totals.skippedBytes += st.size;
        continue;
      }

      totals.files++;
      push(prefix + branch + ent.name);
    }
  }
}

async function main() {
  const outPath = path.join(ROOT, 'tree.txt');
  push(ROOT);
  await walk(ROOT);

  push('');
  push('— Résumé —');
  push(`Dossiers listés : ${totals.dirs}`);
  push(`Fichiers listés : ${totals.files}`);
  push(`Ignorés : ${totals.skipped}  |  ${fmtBytes(totals.skippedBytes)}`);
  if (totals.skippedByExt) push(`  ↳ par extension : ${totals.skippedByExt}`);
  if (totals.skippedBySize) push(`  ↳ par taille    : ${totals.skippedBySize}`);

  try {
    await fsp.writeFile(outPath, lines.join('\n'), 'utf8');
    console.log(`✅ Arborescense écrite dans: ${outPath}`);
  } catch (err) {
    console.error(`✗ Écriture échouée (${outPath}) → ${err?.message ?? err}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✗ Erreur fatale:', err?.stack || err?.message || err);
  process.exit(1);
});
