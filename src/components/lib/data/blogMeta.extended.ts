// ⚠️ blogMeta auto-généré : NE PAS MODIFIER
import { blogMeta } from '@/components/lib/data/blogMeta';
import type { BlogMetaItem } from '@/components/lib/data/blogMeta';

import { blogMetaSEOPatch } from '@/components/lib/data/blogMeta.seo';
import type { ExtendedBlogMetaItem } from '@/components/lib/types/blog';

const BRAND = 'GoQuébeCan';

const normalizeKeywords = (value?: string | readonly string[]): string[] => {
  if (!value) return [];

  const keywords: string[] = typeof value === 'string' ? value.split(',') : Array.from(value);

  return keywords.map((keyword: string) => keyword.trim()).filter(Boolean);
};

const cleanTitle = (title: string): string => {
  return title
    .replace(/\bMontreal\b/g, 'Montréal')
    .replace(/\bQuebec\b/g, 'Québec')
    .replace(/\bGaspesie\b/g, 'Gaspésie')
    .replace(/\bPerce\b/g, 'Percé')
    .replace(/\bSept Iles\b/g, 'Sept-Îles')
    .replace(/\bRivieredu Loup\b/g, 'Rivière-du-Loup')
    .replace(/\bPort Cartier\b/g, 'Port-Cartier')
    .replace(/\bBaie Saint Paul\b/g, 'Baie-Saint-Paul')
    .replace(/\bAnse Saint Jean\b/g, "L'Anse-Saint-Jean")
    .replace(/\bMagog Orford\b/g, 'Magog-Orford')
    .replace(/\bOrleans\b/g, "Île d'Orléans")
    .trim();
};

const buildSeoTitle = (base: BlogMetaItem): string => {
  const title = cleanTitle(base.title);
  const region = cleanTitle(base.region || 'Québec');

  if (title.length >= 45) {
    return `${title} | ${BRAND}`;
  }

  if (base.activites?.length >= 2) {
    return `${title} : que faire, activités et conseils voyage | ${BRAND}`;
  }

  if (region && region !== 'Québec') {
    return `${title} : guide de voyage en ${region} | ${BRAND}`;
  }

  return `${title} : guide complet de voyage au Québec | ${BRAND}`;
};

const buildSeoDescription = (base: BlogMetaItem): string => {
  const title = cleanTitle(base.title);
  const region = cleanTitle(base.region || 'Québec');
  const activities = base.activites?.slice(0, 3).join(', ');

  if (activities) {
    return `Découvrez ${title} : ${activities}, idées d’activités, conseils pratiques et lieux à visiter pour préparer votre voyage en ${region}.`;
  }

  return `Découvrez ${title} : activités incontournables, conseils pratiques, idées de visite et inspirations pour préparer votre voyage en ${region}.`;
};

if (process.env.NODE_ENV !== 'production') {
  Object.keys(blogMetaSEOPatch).forEach((slug: string) => {
    if (!(slug in blogMeta)) {
      console.warn(
        `[blogMetaExtended] Patch SEO ignoré : aucun article ne correspond au slug "${slug}".`,
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

        title: patch.title ?? buildSeoTitle(base),
        description: patch.description ?? buildSeoDescription(base),

        keywords: normalizeKeywords(patch.keywords ?? base.keywords),
        locale: patch.locale ?? 'fr_CA',
      },
    ];
  }),
);
