import type { MetadataRoute } from 'next';
import sitemapData from '../src/generated/sitemap-data.json';

type Entry = {
  route: string;
  lastModified?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (sitemapData.siteUrl || 'https://www.goquebecan.com').replace(/\/+$/, '');

  return (sitemapData.entries as Entry[]).map((entry) => ({
    url: `${siteUrl}${entry.route}`,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
    changeFrequency: entry.changeFrequency || 'monthly',
    priority: typeof entry.priority === 'number' ? entry.priority : 0.6,
  }));
}
