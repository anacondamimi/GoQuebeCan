import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const projectDir = './';

function isReactFile(content) {
  return content.includes('import React') || content.includes('from "react"') || content.includes("from 'react'");
}

function hasJSX(content) {
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    return ast.program.body.some(node => node.type === 'ExpressionStatement' || node.type === 'JSXElement');
  } catch (e) {
    return false;
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!isReactFile(content) || !hasJSX(content)) {
    console.log(`⏭ Ignoré : ${filePath} (pas un fichier React ou pas de JSX)`);
    return;
  }

  const imgRegex = /<img(\s[^>]*)>/g;
  if (imgRegex.test(content)) {
    const backupPath = `${filePath}.bak`;
    fs.writeFileSync(backupPath, content, 'utf8');
    console.log(`✔ Backup créé : ${backupPath}`);

    content = content.replace(imgRegex, '<Image$1>');

    if (!content.includes("from 'next/image'") && !content.includes('from "next/image"')) {
      if (content.startsWith("'use client'") || content.startsWith('"use client"')) {
        const lines = content.split('\n');
        lines.splice(1, 0, "import Image from 'next/image';");
        content = lines.join('\n');
      } else {
        content = `import Image from 'next/image';\n` + content;
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Modifié : ${filePath}`);
  } else {
    console.log(`⏭ Aucun <img> trouvé : ${filePath}`);
  }
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanDir(filePath);
    } else if (targetExtensions.includes(path.extname(file))) {
      processFile(filePath);
    }
  });
}

scanDir(projectDir);
