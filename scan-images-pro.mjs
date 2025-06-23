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

    // Match les blocs <Image ... />
    const imageRegex = /<Image[\s\S]*?\/?>/g;
    const matches = content.match(imageRegex);

    if (matches) {
        matches.forEach((match) => {
            const hasWidth = /width\s*=\s*{?\s*\d+/.test(match);
            const hasHeight = /height\s*=\s*{?\s*\d+/.test(match);
            const hasFill = /\sfill(?![a-zA-Z])/.test(match);

            if (!hasWidth && !hasFill) {
                results.push(`${filePath} → ${match.trim().replace(/\s+/g, ' ')}`);
            }
        });
    }
}

function scanDir(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        // Ignore node_modules
        if (filePath.includes('node_modules')) return;

        if (fs.statSync(filePath).isDirectory()) {
            scanDir(filePath);
        } else if (targetExtensions.includes(path.extname(file))) {
            processFile(filePath);
        }
    });
}


scanDir(projectDir);

if (results.length > 0) {
    const reportFile = 'image-scan-report.txt';
    fs.writeFileSync(reportFile, results.join('\n'), 'utf8');
    console.log(`⚠ Images sans width/fill détectées : ${results.length}`);
    console.log(`📄 Rapport généré : ${reportFile}`);
    results.forEach(r => console.log(r));
} else {
    console.log('✅ Aucune image sans dimensions manquantes détectée.');
}
