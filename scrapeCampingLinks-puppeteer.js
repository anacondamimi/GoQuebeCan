const puppeteer = require('puppeteer');
const fs = require('fs');

const campings = [
  'Camping Aventure Mégantic',
  'Parc national de la Jacques-Cartier',
  'Parc national de la Gaspésie',
  'Camping Falaise-sur-Mer',
  'Camping Valcartier',
  'Camping Pointe-aux-Oies',
  'Camping Parc Bromont',
  'Camping Etsanha',
  'Camping la Clé des Champs',
  'Camping Domaine Tournesol',
  'Camping Carleton-Sur-Mer',
  'Camping Belle-Vie',
  'Camping Amqui',
  "Camping de L'Île",
  'Camping De Compton',
  'Camping Chalets Lac St-Augustin',
  'Camping du Fort De La Martiniere',
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const name of campings) {
    const query = `${name} site officiel`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    try {
      const firstLink = await page.$eval('a[href^="http"]', (el) => el.href);
      results.push({ name, url: firstLink });
      console.log(`✔ ${name} → ${firstLink}`);
    } catch (error) {
      results.push({ name, url: 'Non trouvé' });
      console.log(`❌ ${name} → Non trouvé`);
    }
  }

  await browser.close();

  fs.writeFileSync('campings_avec_urls.json', JSON.stringify(results, null, 2), 'utf-8');
})();
