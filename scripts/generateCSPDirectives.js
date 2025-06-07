import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const domains = new Set();

const extractDomains = (code) => {
    const regex = /https?:\/\/([^\/"'\s]+)/g;
    let match;
    while ((match = regex.exec(code)) !== null) {
        domains.add(match[1]);
    }
};

const files = await glob('./src/**/*.{ts,tsx,js,jsx}');

for (const file of files) {
    const ext = path.extname(file);
    if (!extensions.includes(ext)) continue;

    const content = fs.readFileSync(file, 'utf8');
    extractDomains(content);
}

const cspDirectives = {
    'connect-src': [],
    'frame-src': [],
    'script-src': [],
};

for (const domain of domains) {
    const url = `https://${domain}`;
    // Heuristique simple (améliorable)
    if (domain.includes('youtube') || domain.includes('vimeo') || domain.includes('booking')) {
        cspDirectives['frame-src'].push(url);
    } else if (domain.includes('googletagmanager') || domain.includes('google-analytics') || domain.includes('jsdelivr')) {
        cspDirectives['script-src'].push(url);
    } else {
        cspDirectives['connect-src'].push(url);
    }
}

// Nettoyage doublons
for (const key in cspDirectives) {
    cspDirectives[key] = [...new Set(cspDirectives[key])];
}

console.log('\n🛡️  Suggested CSP directives based on your code:\n');
for (const key in cspDirectives) {
    if (cspDirectives[key].length > 0) {
        console.log(`${key} ${cspDirectives[key].join(' ')};`);
    }
}
