import type { MetadataRoute } from 'next';
import sitemapData from '@/generated/sitemap-data.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (sitemapData.siteUrl || 'https://www.goquebecan.com').replace(/\/+$/, '');

  return sitemapData.entries.map((entry: any) => {
    const url = `${siteUrl}${entry.route}`;

    return {
      url,
      lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
      changeFrequency: entry.changeFrequency || 'monthly',
      priority: entry.priority ?? 0.6,

      // 🔥 AJOUT IMAGE SITEMAP
      images: entry.image
        ? [
            {
              url: entry.image,
              title: entry.imageTitle || '',
            },
          ]
        : [],
    };
  });
}
