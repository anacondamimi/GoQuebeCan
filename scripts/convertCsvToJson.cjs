const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFilePath = path.resolve(__dirname, '../src/data/microbiere.csv');
const outputFilePath = path.resolve(__dirname, '../src/data/producersWithCategories.json');

const results = [];

fs.createReadStream(inputFilePath)
    .pipe(csv({ separator: ';' }))  // 🔑 on indique que c'est un CSV séparé par ;
    .on('data', (row) => {
        results.push({
            name: row['RaisonSociale'],
            adresse: row['AdresseEtabl'],
            ville: row['Ville'],
            code_postal: row['CodePostal'],
            categorie: row['TypePermis'],
            website: null
        });
    })
    .on('end', () => {
        fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), 'utf-8');
        console.log(`✅ Fichier généré : ${outputFilePath}`);
    })
    .on('error', (err) => {
        console.error('❌ Erreur lors de la lecture du CSV :', err);
    });

