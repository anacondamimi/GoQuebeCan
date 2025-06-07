import fs from 'fs';
import { glob } from 'glob';

const files = await glob('./src/**/*.tsx');

const REACT_IMPORT_REGEX = /^import\s+React.*from\s+['"]react['"];?$/gm;
const USE_CLIENT_REGEX = /^['"]use client['"];?$/;

for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const lines = code.split('\n');

    // Check if file contains "use client"
    const hasUseClient = lines.some((line) => USE_CLIENT_REGEX.test(line));
    if (!hasUseClient) continue;

    // Nettoyage de tous les import React en doublon
    const linesWithoutDuplicateReact = lines.filter((line) => !REACT_IMPORT_REGEX.test(line));

    // Recrée le fichier sans les vieux "use client" ni import React
    const newBody = linesWithoutDuplicateReact.filter((line) => !USE_CLIENT_REGEX.test(line));

    // Trouve la première ligne de code valide (évite les sauts de ligne vides en haut)
    const indexToInsert = newBody.findIndex(line => line.trim() !== '');

    // Crée un tableau final avec :
    // - "use client" tout en haut
    // - import React si nécessaire
    const needsReactImport = !newBody.some(line => /import\s+React.*from\s+['"]react['"]/.test(line));
    const header = [`'use client';`];
    if (needsReactImport) {
        header.push(`import React from 'react';`);
    }

    // Reconstruit le fichier
    const updated = [...header, '', ...newBody].join('\n');
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✅ Corrigé : ${file}`);
}

console.log('\n🎯 Tous les fichiers .tsx contenant "use client" ont été nettoyés proprement.');
