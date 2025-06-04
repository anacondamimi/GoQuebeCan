'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, Filter } from 'lucide-react';
import { Metadata } from 'next';

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
    title: 'Guide Complet : Montréal',
    description: 'Découvrez la métropole culturelle et festive du Québec',
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80',
    category: 'Montréal',
  },
  {
    slug: 'charlevoix',
    title: 'Guide Complet : Charlevoix',
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
    {} as Record<string, typeof blogPosts>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Voyage GoQuebecan</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Découvrez nos guides détaillés, conseils d'experts et récits de voyage pour explorer le
          Québec et le Canada comme un local.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-indigo-600" />
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Aucun article ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Toutes');
            }}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </main>
  );
}
