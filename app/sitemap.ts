import { MetadataRoute } from 'next';

// Liste des articles de blog
const blogPosts = [
  { slug: 'Quebec' },
  { slug: 'gaspesie' },
  { slug: 'montreal' },
  { slug: 'charlevoix' },
  { slug: 'tadoussac' },
  { slug: 'perce' },
  { slug: 'magog-orford' },
  { slug: 'wasaga-beach' },
  { slug: 'eeyou-istchee' },
  { slug: 'forillon' },
  { slug: 'carleton' },
  { slug: 'baie-saint-paul' },
  { slug: 'hautes-gorges' },
  { slug: 'massif' },
  { slug: 'bromont-granby' },
  { slug: 'sherbrooke' },
  { slug: 'riviere-du-loup' },
  { slug: 'kamouraska' },
  { slug: 'mingan' },
  { slug: 'sept-iles' },
  { slug: 'port-cartier' },
  { slug: 'sauble-beach' },
  { slug: 'sandbanks' },
  { slug: 'grand-bend' },
  { slug: 'port-dover' },
  { slug: 'singing-sands' },
  { slug: 'bic' },
  { slug: 'kuururjuaq' },
  { slug: 'levis' },
  { slug: 'anse-saint-jean' },
  { slug: 'port-au-persil' },
  { slug: 'canyon' },
  { slug: 'sabrevois' },
  { slug: 'orleans' },
  { slug: 'montmorency' },
];

// Liste des pages principales
const mainPages = [
  { path: '/' },
  { path: '/destinations' },
  { path: '/carte' },
  { path: '/vols' },
  { path: '/experiences' },
  { path: '/camping' },
  { path: '/objets' },
  { path: '/videos' },
  { path: '/vr' },
  { path: '/blog' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goquebecan.com';
  const currentDate = new Date().toISOString();

  // Pages principales
  const mainRoutes = mainPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.path === '/' ? 'weekly' : ('monthly' as 'weekly' | 'monthly'),
    priority: page.path === '/' ? 1 : 0.8,
  }));

  // Pages de blog
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }));

  return [...mainRoutes, ...blogRoutes];
}
