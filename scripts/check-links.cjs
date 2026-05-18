/* eslint-disable no-console */
const { check } = require('linkinator');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.LINKCHECK_BASE_URL || `http://localhost:${PORT}`;
const OUT_FILE = path.join(process.cwd(), 'broken-urls.json');

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const tryRequest = () => {
      const req = http.get(url, (res) => {
        res.resume();

        if (res.statusCode && res.statusCode < 500) {
          resolve();
        } else {
          retry();
        }
      });

      req.on('error', retry);

      function retry() {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server not reachable at ${url}`));
        } else {
          setTimeout(tryRequest, 700);
        }
      }
    };

    tryRequest();
  });
}

function isInternal(url) {
  return url === BASE_URL || url.startsWith(`${BASE_URL}/`);
}

function isIgnored(url) {
  return (
    /\/_next\//i.test(url) ||
    /\/api\//i.test(url) ||
    /\/favicon/i.test(url) ||
    /\.(avif|webp|jpg|jpeg|png|gif|svg|ico|pdf|zip|xml|txt)$/i.test(url)
  );
}

function stopServer(child) {
  if (!child?.pid) return;

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
  } else {
    child.kill('SIGTERM');
  }
}

(async () => {
  const alreadyRunning = await isPortBusy(PORT);

if (alreadyRunning) {
  console.log(`⚠️ Port ${PORT} déjà utilisé`);
  console.log('➡️ Utilisation du serveur existant...');
} else {
  console.log('🚀 Démarrage du serveur Next.js...');
}
  console.log(`🌐 URL testée : ${BASE_URL}`);
async function isPortBusy(port) {
  return new Promise((resolve) => {
    const tester = http
      .createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        tester.close();
        resolve(false);
      })
      .listen(port);
  });
}
  const server = alreadyRunning
    ? null
    : spawn('pnpm', ['start'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, PORT: String(PORT) },
      });

  try {
    await waitForServer(`${BASE_URL}/blog`);
await new Promise((r) => setTimeout(r, 8000));

    console.log('🔍 Analyse des liens internes...');

    const result = await check({
  path: BASE_URL,
  recurse: true,
  silent: false,
  concurrency: 3,
  timeout: 30_000,
  retry: false,
  maxDepth: 2,
retryErrors: true,
directoryListing: false,
      linksToSkip: [
        /^mailto:/i,
        /^tel:/i,
        /^javascript:/i,
        /\/_next\//i,
         /^#/,
/\.(avif|webp|jpg|jpeg|png|gif|svg|ico|css|js|map|json|pdf)$/i,
/booking\.com/i,
/awin1\.com/i,
/youtube\.com/i,
/google/i,
/facebook/i,
/instagram/i,
      ],
    });

    const links = Array.isArray(result.links) ? result.links : [];

    const broken = links
      .filter((link) => {
        if (!link?.url) return false;
        if (!isInternal(link.url)) return false;
        if (isIgnored(link.url)) return false;

        return (
          ['BROKEN', 'ERROR'].includes(link.state) &&
          [403, 404, 500].includes(Number(link.status || 0))
        );
      })
      .map((link) => ({
        url: link.url,
        status: link.status,
        state: link.state,
        source: link.parent || 'unknown',
      }));

    const grouped = new Map();

    for (const item of broken) {
      const entry = grouped.get(item.url) || {
        url: item.url,
        status: item.status,
        state: item.state,
        sources: [],
      };

      entry.sources.push(item.source);
      grouped.set(item.url, entry);
    }

    const report = Array.from(grouped.values()).map((item) => ({
      ...item,
      sources: Array.from(new Set(item.sources)).sort(),
    }));

    fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');

    console.log('\n📄 Rapport généré : broken-urls.json');
    console.log(`❌ ${report.length} lien(s) interne(s) problématique(s)\n`);

    if (report.length > 0) {
      console.log('🔎 Premier problème détecté :');
      console.log(report[0]);
      process.exitCode = 1;
    } else {
      console.log('✅ Aucun lien interne cassé détecté');
    }
  } catch (err) {
    console.error('❌ Échec du contrôle des liens :', err.message);
    process.exitCode = 2;
  } finally {
    stopServer(server);
  }
})();
