const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/PopularVideos.tsx'); // adapte le chemin si besoin

let content = fs.readFileSync(filePath, 'utf-8');

// Expression régulière pour repérer toutes les URL YouTube `watch?v=xxx`
const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;

// Remplace tous les liens par le format embed
const updatedContent = content.replace(regex, 'https://www.youtube.com/embed/$1');

fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log('✅ Les URLs YouTube ont été converties en format embed avec succès.');
