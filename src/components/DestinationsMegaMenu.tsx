'use client';

import React from 'react';
import Link from 'next/link';
import { destinations } from '@/data/destinationsData';

export default function DestinationsMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl w-[650px] max-h-[450px] overflow-y-auto">
      {destinations.map((region) => (
        <div key={region.slug}>
          {/* Titre de la région avec couleur + effet */}
          <h4 className="text-sm font-semibold text-[#e11d48] mb-2 tracking-wide">
            {region.title}
          </h4>

          {/* Liste des destinations */}
          <ul className="space-y-1">
            {region.articles
              .filter((article) => article.published !== false)
              .map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-sm text-gray-700 hover:text-[#e11d48] transition"
                    aria-label={`Voir l'article sur ${article.title}`}
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
