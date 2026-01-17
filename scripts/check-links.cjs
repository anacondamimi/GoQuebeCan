/* eslint-disable no-console */
const { check } = require('linkinator');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const BASE_URL = process.env.LINKCHECK_BASE_URL || 'http://localhost:3000';
const OUT_FILE = path.join(process.cwd(), 'broken-urls.json');

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const tryRequest = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server not reachable at ${url}`));
        } else {
          setTimeout(tryRequest, 500);
        }
      });
    };
    tryRequest();
  });
}

(async () => {
  console.log('🚀 Starting Next.js server for link check...');

  const server = spawn('pnpm', ['start', '-p', '3000'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: '3000' },
  });

  try {
    await waitForServer(BASE_URL);

    console.log('🔍 Crawling internal links...');

    const result = await check({
      path: BASE_URL,
      recurse: true,
      silent: true,
      linksToSkip: [
        /^mailto:/i,
        /^tel:/i,
        /^javascript:/i,
        /^#/,
        /^http:\/\/localhost:3000\/_next\//i, // ignore Next internals
      ],

      concurrency: 25,
      timeout: 15_000,
    });

    const links = Array.isArray(result.links) ? result.links : [];

    const isInternal = (url) => url === BASE_URL || url.startsWith(`${BASE_URL}/`);

    const broken = links
      .filter((link) => {
        if (!link?.url) return false;
        if (!isInternal(link.url)) return false;
        if (link.url.includes('#')) return false;
        if (link.state !== 'BROKEN') return false;
        return link.status === 404;
      })
      .map((link) => ({
        url: link.url,
        status: link.status,
        parent: link.parent,
      }));

    // Group by URL
    const grouped = new Map();
    for (const item of broken) {
      const entry = grouped.get(item.url) || {
        url: item.url,
        status: item.status,
        parents: [],
      };
      entry.parents.push(item.parent);
      grouped.set(item.url, entry);
    }

    const report = Array.from(grouped.values()).map((x) => ({
      ...x,
      parents: Array.from(new Set(x.parents)).sort(),
    }));

    fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');

    console.log(`\n📄 Rapport écrit dans ${OUT_FILE}`);
    console.log(`❌ ${report.length} URL(s) internes en 404 détectées\n`);

    if (report.length > 0) {
      console.log('Exemple :', report[0]);
      process.exitCode = 1; // bloque CI / predeploy
    }
  } catch (err) {
    console.error('❌ Link check failed:', err.message);
    process.exitCode = 2;
  } finally {
    server.kill('SIGTERM');
  }
})();
