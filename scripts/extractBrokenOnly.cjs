const { check } = require('linkinator');
const fs = require('fs');

(async () => {
  const result = await check({
    path: 'http://localhost:3000',
    recurse: true,
    format: 'json',
  });

  const outputPath = './broken-links.json';
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

  console.log(`✅ Rapport généré : ${outputPath}`);
})();
