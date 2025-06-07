import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const files = await glob('./src/**/*.tsx');

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    if (!content.includes('"use client"') && !content.includes("'use client'")) continue;

    // Si "use client" est déjà en haut => on ne touche pas
    const lines = content.split('\n').map((line) => line.trim());
    if (lines[0] === '"use client"' || lines[0] === "'use client'") continue;

    // Supprimer toute occurrence de "use client"
    const newLines = content
        .split('\n')
        .filter((line) => !line.trim().startsWith('"use client"') && !line.trim().startsWith("'use client'"));

    // Recréer le contenu avec "use client" en tout premier
    const updated = `"use client";\n` + newLines.join('\n');
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✅ Corrigé : ${file}`);
}

console.log('\n🎯 Tous les fichiers "use client" sont corrigés.');
