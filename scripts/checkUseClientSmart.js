const fs = require('fs');
const path = require('path');

const appDir = path.resolve(__dirname, '../app');

function isClientComponent(content) {
  const reactImports = [
    'useState',
    'useEffect',
    'useRef',
    'useCallback',
    'useMemo',
    'useReducer',
    'useContext',
  ];

  const lower = content.toLowerCase();
  const usesReactHooks = reactImports.some((hook) => lower.includes(hook.toLowerCase() + '('));
  const usesBrowserApis =
    lower.includes('document.') || lower.includes('window.') || lower.includes('localstorage');

  return usesReactHooks || usesBrowserApis;
}

function scanDirForTSX(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDirForTSX(fullPath);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
      const isClient = isClientComponent(content);

      if (isClient && !hasUseClient) {
        console.log(`🟠 Il manque "use client" dans ${fullPath}`);
      } else if (!isClient && hasUseClient) {
        console.log(`🔵 "use client" est inutile dans ${fullPath}`);
      } else {
        console.log(`✅ OK: ${fullPath}`);
      }
    }
  }
}

console.log('🔍 Analyse des fichiers page.tsx dans /app...');
scanDirForTSX(appDir);
console.log('✅ Analyse terminée.');
