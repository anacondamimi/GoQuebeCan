// scan-browser-apis.js
import fs from 'fs';
import path from 'path';

const directory = './';

function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (
      fs.statSync(fullPath).isDirectory() &&
      !fullPath.includes('node_modules') &&
      !fullPath.includes('.next') &&
      !fullPath.includes('dist') &&
      !fullPath.includes('.git')
    ) {
      scanDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.match(/\b(window|document|localStorage|sessionStorage)\b/)) {
          console.log(`${fullPath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  });
}

scanDir(directory);
