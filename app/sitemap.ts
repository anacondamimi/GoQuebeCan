import type { MetadataRoute } from 'next';
import sitemapData from '@/generated/sitemap-data.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (sitemapData.siteUrl || 'https://www.goquebecan.com').replace(/\/+$/, '');

  const excludedPatterns = [
    /^\/admin/i,
    /^\/api/i,
    /^\/_next/i,
    /^\/static-page/i,
    /^\/expansion/i,
    /^\/ia-mathieu/i,
    /^\/experiences/i,
    /^\/destinations\//i,
    /^\/destinations-monde/i,
    /^\/objets/i,
  ];

  return sitemapData.entries
    .filter((entry: any) => {
      const route = entry.route || '';
      return !excludedPatterns.some((pattern) => pattern.test(route));
    })
    .map((entry: any) => {
      const route = entry.route?.startsWith('/') ? entry.route : `/${entry.route || ''}`;

      const url = `${siteUrl}${route}`;

      return {
        url,
        lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),

        changeFrequency: entry.changeFrequency || 'monthly',

        priority: entry.priority ?? 0.6,

        images:
          typeof entry.image === 'string' && entry.image.length > 0
            ? [
                {
                  url: entry.image.startsWith('http') ? entry.image : `${siteUrl}${entry.image}`,

                  title: entry.imageTitle || '',
                },
              ]
            : [],
      };
    });
}
