'use client';

import React, { Suspense } from 'react';
import type { FC } from 'react';
import { loadBlogComponent, type BlogSlug } from '@/components/blog/BlogComponents';

export interface BlogArticleClientProps {
  slug: BlogSlug;
}

/**
 * Ce composant client affiche dynamiquement l'article
 * correspondant au slug via loadBlogComponent().
 */
const BlogArticleClient: FC<BlogArticleClientProps> = ({ slug }) => {
  // ✅ loadBlogComponent renvoie un vrai composant React
  const ArticleComponent = loadBlogComponent(slug);

  // ✅ Ici, on REND ce composant dans un Suspense (clé du fix)
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] animate-pulse flex-col items-center justify-center text-gray-500">
          <span className="text-base sm:text-lg">Chargement de l’article…</span>
        </div>
      }
    >
      {/* 👇 On le rend ici (avec JSX), et non pas en le retournant */}
      <ArticleComponent />
    </Suspense>
  );
};

export default BlogArticleClient;
