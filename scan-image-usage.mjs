import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const projectDir = './';
const results = [];

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        if (line.includes('<Image') && !line.includes('width=') && !line.includes('fill')) {
            results.push(`${filePath}:${index + 1}: ${line.trim()}`);
        }
    });
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

if (results.length > 0) {
    const reportFile = 'image-usage-missing-dimensions.txt';
    fs.writeFileSync(reportFile, results.join('\n'), 'utf8');
    console.log(`📄 Rapport généré : ${reportFile}`);
} else {
    console.log('✅ Aucun <Image> sans width/fill détecté.');
}
