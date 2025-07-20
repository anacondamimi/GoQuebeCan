// scripts/fix-ssr-issues.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const problematicLibraries = ['leaflet', 'react-leaflet', 'html2pdf.js', 'react-chatbot-kit'];

function findProblematicFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules') {
      findProblematicFiles(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Vérifier les imports problématiques
      problematicLibraries.forEach((lib) => {
        if (content.includes(`from '${lib}'`) || content.includes(`import('${lib}')`)) {
          console.log(`⚠️  ${filePath} - Utilise ${lib} sans protection SSR`);
        }
      });

      // Vérifier les usages directs de window/document/localStorage
      if (
        (content.includes('window.') ||
          content.includes('document.') ||
          content.includes('localStorage')) &&
        !content.includes('useEffect') &&
        !content.includes('typeof window') &&
        !content.includes('ClientOnly')
      ) {
        console.log(`⚠️  ${filePath} - Utilise des APIs browser sans protection`);
      }
    }
  });
}

console.log('🔍 Recherche des problèmes SSR...');
findProblematicFiles(path.join(__dirname, '..'));
console.log('✅ Analyse terminée');
