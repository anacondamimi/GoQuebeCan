const { check } = require('linkinator');
const fs = require('fs');
const path = require('path');

(async () => {
  // 1. Lancement du crawl sur ton site local
  const result = await check({
    path: 'http://localhost:3000',
    recurse: true,
    silent: true,
    // on peut limiter le scope interne :
    linksToSkip: [
      // ignore mails, tel, etc
      'mailto:',
      'tel:',
    ],
  });

  // 2. On garde uniquement les liens internes (ton domaine local)
  //    et on enlève les #ancres (qui ne sont pas des vraies pages)
  const isInternal = (url) =>
    url.startsWith('http://localhost:3000/') || url === 'http://localhost:3000';

  // chaque élément result.links ressemble à :
  // { url, status, state, parent }
  // parent = la page où le lien a été trouvé
  const brokenDetailed = result.links
    .filter((link) => {
      if (!isInternal(link.url)) return false;
      if (link.url.includes('#')) return false; // on ignore les ancres internes
      // BROKEN + code 404 (not found) ou 403 (forbidden)
      if (link.state !== 'BROKEN') return false;
      return link.status === 404 || link.status === 403;
    })
    .map((link) => ({
      url: link.url,
      status: link.status,
      parent: link.parent, // super utile pour corriger dans le bon fichier
    }));

  // 3. Dédupe (plusieurs pages peuvent pointer vers la même mauvaise URL)
  const uniqueMap = new Map();
  for (const item of brokenDetailed) {
    const key = item.url + '|' + item.parent;
    uniqueMap.set(key, item);
  }
  const uniqueBroken = Array.from(uniqueMap.values());

  // 4. Sauvegarde dans un dossier /tmp local du projet
  const outPath = path.join(process.cwd(), 'broken-urls.json');
  fs.writeFileSync(outPath, JSON.stringify(uniqueBroken, null, 2), 'utf8');

  console.log(`✅ ${uniqueBroken.length} liens cassés internes trouvés (404/403).`);
  console.log(`📄 Détails enregistrés dans ${outPath}`);
  console.log('');
  console.log('Exemple:');
  if (uniqueBroken[0]) {
    console.log(uniqueBroken[0]);
    // { url: 'http://localhost:3000/blog/voiture',
    //   status: 404,
    //   parent: 'http://localhost:3000/destinations/saguenay-chicoutimi-jonquiere-la-baie' }
  } else {
    console.log('Aucun lien cassé 🎉');
  }
})();
