import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const projectDir = './';
const results = [];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Match <Image ... > sans width ou height
    const imageTagRegex = /<Image([^>]*?)\/?>/g;

    const updatedContent = content.replace(imageTagRegex, (match, attrs) => {
        if (!attrs.includes('width=') || !attrs.includes('height=')) {
            const corrected = `<Image${attrs} width={800} height={600} />`;
            results.push(`${filePath}: ${match.trim()} -> ${corrected.trim()}`);
            modified = true;
            return corrected;
        }
        return match;
    });

    if (modified) {
        const backupPath = `${filePath}.bak`;
        fs.writeFileSync(backupPath, content, 'utf8');
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✅ Corrigé : ${filePath} (backup : ${backupPath})`);
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

// Écrire un rapport
const reportFile = 'image-dimension-fix-report.txt';
fs.writeFileSync(reportFile, results.join('\n'), 'utf8');
console.log(`\n📄 Rapport généré : ${reportFile}`);
