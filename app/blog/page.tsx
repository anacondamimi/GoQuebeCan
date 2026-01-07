'use client';
import Image from 'next/image';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Filter } from 'lucide-react';

export const dynamic = 'force-static';

const blogPosts = [
  {
    slug: 'Quebec',
    title: 'Guide Complet du Vieux-Québec',
    description: "Découvrez les trésors cachés de la seule ville fortifiée d'Amérique du Nord",
    image: 'https://images.unsplash.com/photo-1583266368698-234ffaa5350c?auto=format&fit=crop&q=80',
    category: 'Ville de Québec',
  },
  {
    slug: 'gaspesie',
    title: 'Parc national de la Gaspésie',
    description: 'Guide complet du camping au cœur des monts Chic-Chocs',
    image: 'https://images.unsplash.com/photo-1578607974203-0e5657088821?auto=format&fit=crop&q=80',
    category: 'Gaspésie',
  },
  {
    slug: 'montreal',
    title: ' Montréal',
    description: 'Découvrez la métropole culturelle et festive du Québec',
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80',
    category: 'Montréal',
  },
  {
    slug: 'charlevoix',
    title: ' Charlevoix',
    description: 'Entre mer et montagnes, découvrez cette région spectaculaire',
    image: 'https://images.unsplash.com/photo-1572463459372-70c9cf5cb795?auto=format&fit=crop&q=80',
    category: 'Charlevoix',
  },
];

const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Toutes' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const groupedPosts = filteredPosts.reduce(
    (acc, post) => {
      if (!acc[post.category]) acc[post.category] = [];
      acc[post.category].push(post);
      return acc;
    },
    {} as Record<string, typeof blogPosts>,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="mb-12">
        <H1 className="mb-4 text-4xl font-bold text-gray-900">Blog Voyage GoQuebecan</H1>
        <p className="max-w-3xl text-xl text-gray-600">
          Découvrez nos guides détaillés, conseils d'experts et récits de voyage pour explorer le
          Québec et le Canada comme un local.
        </p>
      </section>

      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none rounded-lg border bg-white py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="Toutes">Toutes les catégories</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {Object.entries(groupedPosts).map(([category, posts]) => (
        <section key={category} className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <MapPin className="size-6 text-indigo-600" />
            {category}
          </H2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-6">
                  <H3 className="mb-2 text-xl font-semibold text-gray-900">{post.title}</H3>
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-600">Aucun article ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Toutes');
            }}
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </main>
  );
}
