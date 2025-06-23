const fs = require('fs');
const path = require('path');

const producers = JSON.parse(fs.readFileSync('./src/data/producers.json', 'utf-8'));
const microbreweries = JSON.parse(
  fs.readFileSync('./public/microbreweriesWithCoords.json', 'utf-8')
);

const all = [...producers, ...microbreweries];

fs.writeFileSync('./public/allProducers.json', JSON.stringify(all, null, 2), 'utf-8');
console.log('🎉 Fichier fusionné : public/allProducers.json');
