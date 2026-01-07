// scripts/scan-next-routes.js
// Usage: node scripts/scan-next-routes.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');
const BLOG_APP_DIR = path.join(APP_DIR, 'blog');
const BLOG_CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');

const PAGE_CANDIDATES = new Set(['page.tsx', 'page.ts', 'page.mdx', 'page.jsx', 'page.md']);
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', 'public', '.vercel', '.vscode']);

function safeStat(p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}
function safeReadDir(p) {
  try {
    return fs.readdirSync(p, { withFileTypes: true });
  } catch {
    return [];
  }
}
function isFile(p) {
  const s = safeStat(p);
  return !!s && s.isFile();
}
function isDir(p) {
  const s = safeStat(p);
  return !!s && s.isDirectory();
}

/**
 * Détecte les pages “pilier” dans app/ (niveau 1)
 * Ex: /page.tsx, /contact/page.tsx, /videos/page.tsx
 */
function detectMainPages() {
  const result = [];
  if (!isDir(APP_DIR)) return result;

  // racine: /app/page.*
  for (const cand of PAGE_CANDIDATES) {
    const rootPage = path.join(APP_DIR, cand);
    if (isFile(rootPage)) result.push('/');
  }

  const entries = safeReadDir(APP_DIR).filter(
    (e) => e.isDirectory() && !e.name.startsWith('(') && !e.name.startsWith('_'),
  );

  for (const dirent of entries) {
    const sub = path.join(APP_DIR, dirent.name);
    // skip segments spéciaux
    if (IGNORE_DIRS.has(dirent.name)) continue;

    for (const cand of PAGE_CANDIDATES) {
      const p = path.join(sub, cand);
      if (isFile(p)) {
        result.push(`/${dirent.name}`);
        break;
      }
    }
  }

  // dédupe + tri
  return Array.from(new Set(result)).sort();
}

/**
 * Détecte les slugs de blog dans app/blog/<slug>/page.*
 */
function detectBlogAppPages() {
  const result = [];
  if (!isDir(BLOG_APP_DIR)) return result;

  const entries = safeReadDir(BLOG_APP_DIR).filter((e) => e.isDirectory());
  for (const dirent of entries) {
    const slug = dirent.name;
    if (slug.startsWith('(') || slug.startsWith('_') || slug === 'not-found') continue;

    const folder = path.join(BLOG_APP_DIR, slug);
    let found = false;
    for (const cand of PAGE_CANDIDATES) {
      const p = path.join(folder, cand);
      if (isFile(p)) {
        result.push(slug);
        found = true;
        break;
      }
    }
    if (!found) {
      // rien à faire
    }
  }

  return result.sort();
}

/**
 * Détecte les slugs de blog dans src/content/blog/*.(md|mdx|json…)
 */
function detectBlogContentFiles() {
  const result = [];
  if (!isDir(BLOG_CONTENT_DIR)) return result;

  const files = safeReadDir(BLOG_CONTENT_DIR).filter((e) => e.isFile());
  for (const f of files) {
    const ext = path.extname(f.name);
    const slug = path.basename(f.name, ext);
    if (!slug) continue;
    result.push(slug);
  }
  return result.sort();
}

const data = {
  mainPages: detectMainPages(),
  blogAppPages: detectBlogAppPages(),
  blogContentFiles: detectBlogContentFiles(),
};

fs.writeFileSync('next-routes-scan.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ Routes Next scannées → next-routes-scan.json');
