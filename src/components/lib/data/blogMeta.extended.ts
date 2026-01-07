// ⚠️ blogMeta auto-généré : NE PAS MODIFIER
import { blogMeta } from '@/components/lib/data/blogMeta';
import type { BlogMetaItem } from '@/components/lib/data/blogMeta';

import { blogMetaSEOPatch } from '@/components/lib/data/blogMeta.seo';
import type { ExtendedBlogMetaItem } from '@/components/lib/types/blog';

export const blogMetaExtended: Record<
  string,
  ExtendedBlogMetaItem<BlogMetaItem>
> = Object.fromEntries(
  Object.entries(blogMeta).map(([slug, base]) => {
    const patch = blogMetaSEOPatch[slug] ?? {};
    return [slug, { ...base, ...patch }];
  }),
);
