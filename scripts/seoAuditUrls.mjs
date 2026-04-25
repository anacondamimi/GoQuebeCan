#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.SITE_URL || 'https://goquebecan.com';
const SRC_DIR = path.join(process.cwd(), 'src');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const EXCLUDED_URLS = ['mailto:', 'tel:', '#', 'javascript:'];

function getFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js', '.md', '.mdx']) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) return getFiles(full, exts);
    if (entry.isFile() && exts.includes(path.extname(entry.name))) return [full];

    return [];
  });
}

function extractUrls(content) {
  const urls = new Set();

  const patterns = [
    /href=["'`]([^"'`]+)["'`]/g,
    /src=["'`]([^"'`]+)["'`]/g,
    /url:\s*["'`]([^"'`]+)["'`]/g,
    /href:\s*["'`]([^"'`]+)["'`]/g,
    /bookingUrl:\s*["'`]([^"'`]+)["'`]/g,
    /image:\s*["'`]([^"'`]+)["'`]/g,
    /src:\s*["'`]([^"'`]+)["'`]/g,
  ];

  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const url = match[1]?.trim();
      if (url) urls.add(url);
    }
  }

  return [...urls];
}

function shouldSkip(url) {
  return EXCLUDED_URLS.some((prefix) => url.startsWith(prefix));
}

function normalizeUrl(url) {
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return url;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent': 'GoQuebeCAN SEO Audit Bot',
      },
    });

    if (res.status === 405 || res.status === 403) {
      const fallback = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'GoQuebeCAN SEO Audit Bot',
        },
      });

      return {
        url,
        status: fallback.status,
        ok: fallback.ok,
        finalUrl: fallback.url,
      };
    }

    return {
      url,
      status: res.status,
      ok: res.ok,
      finalUrl: res.url,
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      finalUrl: '',
      error: error.message,
    };
  }
}

async function main() {
  console.log('\n🔎 Audit SEO des URLs en cours...\n');

  const files = getFiles(SRC_DIR);
  const urlMap = new Map();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const urls = extractUrls(content);

    for (const rawUrl of urls) {
      if (shouldSkip(rawUrl)) continue;

      const normalized = normalizeUrl(rawUrl);

      if (!normalized.startsWith('http')) continue;

      if (!urlMap.has(normalized)) urlMap.set(normalized, []);
      urlMap.get(normalized).push(path.relative(process.cwd(), file));
    }
  }

  const urls = [...urlMap.keys()];
  console.log(`URLs détectées : ${urls.length}\n`);

  const broken = [];

  for (const url of urls) {
    const result = await checkUrl(url);

    if (!result.ok || result.status >= 400) {
      broken.push({
        ...result,
        files: urlMap.get(url),
      });

      console.log(`❌ ${result.status} - ${url}`);
    } else {
      console.log(`✅ ${result.status} - ${url}`);
    }
  }

  const reportDir = path.join(process.cwd(), 'seo-reports');
  fs.mkdirSync(reportDir, { recursive: true });

  const reportPath = path.join(reportDir, 'broken-urls-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(broken, null, 2), 'utf8');

  console.log('\n==============================');
  console.log('📊 Résumé SEO');
  console.log('==============================');
  console.log(`URLs testées : ${urls.length}`);
  console.log(`URLs problématiques : ${broken.length}`);
  console.log(`Rapport : ${path.relative(process.cwd(), reportPath)}`);

  if (broken.length) {
    console.log('\n⚠️ URLs à corriger :\n');

    for (const item of broken) {
      console.log(`❌ ${item.status} - ${item.url}`);
      for (const file of item.files) {
        console.log(`   ↳ ${file}`);
      }
      console.log('');
    }
  } else {
    console.log('\n✅ Aucun lien cassé détecté.');
  }
}

main();
