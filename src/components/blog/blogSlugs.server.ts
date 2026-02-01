// src/components/blog/blogSlugs.server.ts
import componentMap from '@/lib/blog/componentMap';

/**
 * 💡 Liste statique des slugs disponibles (server-safe)
 * Aucun import client, aucun React — pur Node.js.
 */
export const BLOG_SLUGS = Object.freeze(Object.keys(componentMap)) as readonly string[];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
