// scripts/scanBrokenLinks.ts

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const brokenLinks = [
  'https://twitter.com/goquebecan',
  'https://youtube.com/goquebecan',
  'href="/carte"',
];

const scanDirs = ['app', 'components', 'src'];

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (/\.(js|jsx|ts|tsx|mdx)$/.test(fullPath)) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

function scanFiles() {
  const allFiles = scanDirs.flatMap((dir) => getAllFiles(resolve(__dirname, '..', dir)));
  const found: { file: string; broken: string }[] = [];

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const broken of brokenLinks) {
      if (content.includes(broken)) {
        found.push({ file, broken });
      }
    }
  }

  if (found.length > 0) {
    console.log('\n🚨 Liens cassés trouvés :\n');
    for (const { file, broken } of found) {
      console.log(`❌ ${broken} → dans ${file}`);
    }
  } else {
    console.log('\n✅ Aucun lien cassé trouvé dans le code.');
  }
}

scanFiles();
