#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src');
const SHOULD_FIX = process.argv.includes('--fix');

function getFiles(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) return getFiles(full);
    if (entry.isFile() && /\.(tsx|ts|js|jsx)$/.test(entry.name)) return [full];
    return [];
  });
}

const files = getFiles(dir);
let count = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  if (content.includes('https://goquebecan.com')) {
    count++;
    console.log(`🔍 ${file}`);

    if (SHOULD_FIX) {
      const updated = content.replaceAll('https://goquebecan.com', 'https://www.goquebecan.com');

      fs.writeFileSync(`${file}.backup-domain`, content);
      fs.writeFileSync(file, updated);
      console.log(`✅ corrigé`);
    }
  }
}

console.log(`\nTotal fichiers impactés : ${count}`);
console.log(SHOULD_FIX ? '✔️ Correction terminée' : '👉 relance avec --fix');
