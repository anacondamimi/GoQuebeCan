/* eslint-disable no-console */
const { check } = require('linkinator');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const BASE_URL = process.env.LINKCHECK_BASE_URL || 'http://localhost:3000';
const OUT_FILE = path.join(process.cwd(), 'broken-urls.json');
const PORT = 3000;

/* =========================
   Utils
========================= */

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
          setTimeout(tryRequest, 500);
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
  return /\/_next\//i.test(url) || /\/api\//i.test(url) || /\/favicon/i.test(url);
}

/* =========================
   Main
========================= */

(async () => {
  console.log('🚀 Starting Next.js (prod build) for link check...');

  const server = spawn('pnpm', ['start'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(BASE_URL);

    console.log('🔍 Crawling site for broken links...');

    const result = await check({
      path: BASE_URL,
      recurse: true,
      silent: true,
      concurrency: 25,
      timeout: 15_000,
      linksToSkip: [/^mailto:/i, /^tel:/i, /^javascript:/i, /^#/],
    });

    const links = Array.isArray(result.links) ? result.links : [];

    const broken = links
      .filter((link) => {
        if (!link?.url) return false;
        if (!isInternal(link.url)) return false;
        if (isIgnored(link.url)) return false;

        return link.state === 'BROKEN' || [403, 404, 500].includes(link.status);
      })
      .map((link) => ({
        url: link.url,
        status: link.status,
        state: link.state,
        source: link.parent || 'unknown',
      }));

    // Group by URL
    const grouped = new Map();

    for (const item of broken) {
      const entry = grouped.get(item.url) || {
        url: item.url,
        status: item.status,
        sources: [],
      };
      entry.sources.push(item.source);
      grouped.set(item.url, entry);
    }

    const report = Array.from(grouped.values()).map((x) => ({
      ...x,
      sources: Array.from(new Set(x.sources)).sort(),
    }));

    fs.writeFileSync(OUT_FILE, JSON.stringify(report, null, 2), 'utf8');

    console.log('\n📄 Rapport généré : broken-urls.json');
    console.log(`❌ ${report.length} problème(s) détecté(s)\n`);

    if (report.length > 0) {
      console.log('🔎 Exemple :');
      console.log(report[0]);
      process.exitCode = 1;
    } else {
      console.log('✅ Aucun lien cassé détecté');
    }
  } catch (err) {
    console.error('❌ Link check failed:', err.message);
    process.exitCode = 2;
  } finally {
    server.kill('SIGTERM');
  }
})();
