// app/sitemap.ts

import { MetadataRoute } from 'next';
import destinations from '@/data/destinations.json';

// Slugs d'articles (tu peux ajouter ici facilement si besoin)
const blogPosts = [
  'quebec', 'gaspesie', 'montreal', 'charlevoix', 'tadoussac', 'perce',
  'magog-orford', 'wasaga-beach', 'eeyou-istchee', 'forillon', 'carleton',
  'baie-saint-paul', 'hautes-gorges', 'massif', 'bromont-granby', 'sherbrooke',
  'riviere-du-loup', 'kamouraska', 'mingan', 'sept-iles', 'port-cartier',
  'sauble-beach', 'sandbanks', 'grand-bend', 'port-dover', 'singing-sands',
  'bic', 'kuururjuaq', 'levis', 'anse-saint-jean', 'port-au-persil', 'canyon',
  'sabrevois', 'orleans', 'parc-aquatique', 'montmorency'
];

// Pages principales
const mainPages = [
  '/', '/destinations', '/carte', '/vols', '/experiences', '/camping',
  '/objets', '/videos', '/vr', '/blog', '/planificateur', '/contact',
  '/notre-mission', '/conditions-utilisation', '/confidentialite', '/mentions-legales', '/accessibilite'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.goquebecan.com';
  const currentDate = new Date().toISOString();

  // Génération des pages principales
  const mainRoutes = mainPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '/' ? 'weekly' : ('monthly' as 'weekly' | 'monthly'),
    priority: path === '/' ? 1 : 0.8,
  }));

  // Génération des articles de blog
  const blogRoutes = blogPosts.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Génération des destinations à partir de destinations.json
  const destinationRoutes = destinations.map(dest => ({
    url: `${baseUrl}/destinations/${dest.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...mainRoutes, ...blogRoutes, ...destinationRoutes];
}
