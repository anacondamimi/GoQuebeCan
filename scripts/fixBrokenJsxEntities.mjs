#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const blogpostDir = path.join(process.cwd(), 'src', 'components', 'blogpost');
const SHOULD_FIX = process.argv.includes('--fix');

const replacements = [
  {
    from: /}nbsp;/g,
    to: '&nbsp;',
    label: '}nbsp; → &nbsp;',
  },
  {
    from: /}\s*nbsp;/g,
    to: '&nbsp;',
    label: '} nbsp; → &nbsp;',
  },
];

function getFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.endsWith('.tsx'))
    .map((f) => path.join(dir, f.name));
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function countMatches(content, regex) {
  return [...content.matchAll(regex)].length;
}

function main() {
  if (!fs.existsSync(blogpostDir)) {
    console.error('❌ Dossier introuvable :', blogpostDir);
    process.exit(1);
  }

  const files = getFiles(blogpostDir);
  const affected = [];

  for (const file of files) {
    const original = read(file);
    let next = original;
    const fixes = [];

    for (const replacement of replacements) {
      const count = countMatches(next, replacement.from);

      if (count > 0) {
        fixes.push(`${replacement.label} (${count})`);
        next = next.replace(replacement.from, replacement.to);
      }
    }

    if (fixes.length) {
      affected.push({
        file,
        fixes,
        original,
        next,
      });
    }
  }

  if (!affected.length) {
    console.log('✅ Aucun }nbsp; cassé détecté.');
    return;
  }

  console.log('\n⚠️ Fichiers avec entités JSX cassées :\n');

  for (const item of affected) {
    console.log(`📄 ${path.relative(process.cwd(), item.file)}`);
    for (const fix of item.fixes) {
      console.log(`   - ${fix}`);
    }
  }

  if (!SHOULD_FIX) {
    console.log('\nℹ️ Audit seulement. Pour corriger automatiquement :');
    console.log('node scripts/fixBrokenJsxEntities.mjs --fix');
    return;
  }

  for (const item of affected) {
    const backupPath = `${item.file}.backup-entities`;
    write(backupPath, item.original);
    write(item.file, item.next);
    console.log(`✅ Corrigé : ${path.relative(process.cwd(), item.file)}`);
  }

  console.log('\n✅ Terminé. Lance ensuite :');
  console.log('npm run build');
}

main();
