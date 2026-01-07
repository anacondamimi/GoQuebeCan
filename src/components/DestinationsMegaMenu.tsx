'use client';

import React from 'react';
import Link from 'next/link';
import { destinations } from '@/data/destinationsData';

export default function DestinationsMegaMenu() {
  return (
    <div className="grid max-h-[450px] w-[650px] grid-cols-2 gap-6 overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
      {destinations.map((region) => (
        <div key={region.slug}>
          {/* Titre de la région avec couleur + effet */}
          <h4 className="mb-2 text-sm font-semibold tracking-wide text-[#e11d48]">
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
                    className="text-sm text-gray-700 transition hover:text-[#e11d48]"
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
