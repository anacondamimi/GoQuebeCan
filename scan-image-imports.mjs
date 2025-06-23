import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const projectDir = './';
const results = [];

function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        if (line.includes('import Image')) {
            const msg = `${filePath}:${index + 1}: ${line.trim()}`;
            console.log(msg);
            results.push(msg);
        }
    });
}

function scanDir(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            scanDir(filePath);
        } else if (targetExtensions.includes(path.extname(file))) {
            scanFile(filePath);
        }
    });
}

scanDir(projectDir);

// (Facultatif) Sauvegarde le résultat dans un fichier
const reportFile = 'image-imports-report.txt';
fs.writeFileSync(reportFile, results.join('\n'), 'utf8');
console.log(`\n✅ Rapport généré : ${reportFile}`);
