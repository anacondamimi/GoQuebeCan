// ⚠️ blogMeta auto-généré : NE PAS MODIFIER
import { blogMeta } from '@/components/lib/data/blogMeta';
import type { BlogMetaItem } from '@/components/lib/data/blogMeta';

import { blogMetaSEOPatch } from '@/components/lib/data/blogMeta.seo';
import type { ExtendedBlogMetaItem } from '@/components/lib/types/blog';

const normalizeKeywords = (value?: string | readonly string[]): string[] => {
  if (!value) return [];

  const keywords: string[] = typeof value === 'string' ? value.split(',') : Array.from(value);

  return keywords.map((keyword: string) => keyword.trim()).filter(Boolean);
};

/**
 * Alerte en développement si une clé SEO ne correspond à aucun slug réel.
 * Exemple : "blog_article_kuujjuaq" au lieu de "kuujjuaq".
 */
if (process.env.NODE_ENV !== 'production') {
  (Object.keys(blogMetaSEOPatch) as Array<keyof typeof blogMetaSEOPatch>).forEach((slug) => {
    if (!(slug in blogMeta)) {
      console.warn(
        `[blogMetaExtended] Patch SEO ignoré : aucun article ne correspond au slug "${String(
          slug,
        )}".`,
      );
    }
  });
}

export const blogMetaExtended: Record<
  string,
  ExtendedBlogMetaItem<BlogMetaItem>
> = Object.fromEntries(
  Object.entries(blogMeta).map(([slug, base]) => {
    const patch = blogMetaSEOPatch[slug] ?? {};

    return [
      slug,
      {
        ...base,
        ...patch,
        keywords: normalizeKeywords(patch.keywords ?? base.keywords),
      },
    ];
  }),
);
