import fs from 'fs';
import path from 'path';
import util from 'util';

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const ignoreDirs = [
  'node_modules',
  '.git',
  '.next',
  '.vercel',
  'build',
  'dist',
  'out',
  'public',
  '.turbo',
  '.idea',
  '.vscode',
  'coverage',
  'scripts',
];

async function printDirStructure(dir, prefix = '') {
  let files;
  try {
    files = await readdir(dir);
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
    return;
  }

  for (const file of files) {
    if (ignoreDirs.includes(file)) continue;
    const filePath = path.join(dir, file);
    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch (err) {
      console.error(`Error getting stats for ${filePath}:`, err);
      continue;
    }

    console.log(`${prefix}${file}`);
    if (fileStat.isDirectory()) {
      await printDirStructure(filePath, `${prefix}  `);
    }
  }
}

// Encapsulation pour autoriser le top-level await
async function main() {
  const targetDir = process.argv[2] || '.';
  await printDirStructure(targetDir);
}

main();
