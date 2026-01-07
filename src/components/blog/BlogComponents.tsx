'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, FC } from 'react';
import componentMap from 'app/blog/componentMap';
import H1 from '@/components/typography/H1';

/* ───────────────────────────────────────────────
   Typage : slugs d'articles
   ─────────────────────────────────────────────── */
export type BlogSlug = keyof typeof componentMap;
export const BLOG_SLUGS = Object.freeze(Object.keys(componentMap)) as readonly BlogSlug[];

/* ───────────────────────────────────────────────
   Fallback article introuvable
   ─────────────────────────────────────────────── */
const NotFoundArticle: FC = () => (
  <div className="mx-auto max-w-3xl px-4 py-20 text-center">
    <H1 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-200">
      Article introuvable
    </H1>
    <p className="text-gray-600 dark:text-gray-400">
      Le contenu demandé n’existe pas encore ou a été déplacé.
    </p>
  </div>
);

/* ───────────────────────────────────────────────
   Loader dynamique typé (Next.js 14 compatible)
   ─────────────────────────────────────────────── */
export function loadBlogComponent(slug: BlogSlug): ComponentType {
  const map = componentMap as Record<BlogSlug, () => Promise<{ default: ComponentType }>>;
  const loader = map[slug];

  if (!loader) return NotFoundArticle;

  return dynamic(() => loader().then((mod) => mod.default), {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[40vh] animate-pulse flex-col items-center justify-center text-gray-500">
        <span className="text-base sm:text-lg">Chargement de l’article…</span>
      </div>
    ),
  });
}

export default loadBlogComponent;
