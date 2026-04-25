// ⚠️ blogMeta auto-généré : NE PAS MODIFIER
import { blogMeta } from '@/components/lib/data/blogMeta';
import type { BlogMetaItem } from '@/components/lib/data/blogMeta';

import { blogMetaSEOPatch } from '@/components/lib/data/blogMeta.seo';
import type { ExtendedBlogMetaItem } from '@/components/lib/types/blog';

const normalizeKeywords = (value?: string | readonly string[]): string[] => {
  if (!value) return [];

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((keyword: string) => keyword.trim())
      .filter(Boolean);
  }

  return [...value].map((keyword: string) => keyword.trim()).filter(Boolean);
};

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
