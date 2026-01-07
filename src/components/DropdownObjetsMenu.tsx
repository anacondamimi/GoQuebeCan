'use client';

import React from 'react';
import Link from 'next/link';

export default function DropdownObjetsMenu() {
  return (
    <div
      className="grid min-w-[320px] grid-cols-2 gap-6 rounded-xl bg-white p-6 shadow-xl"
      role="menu"
      aria-label="Objets de voyage"
    >
      {/* Lien principal */}
      <div>
        <Link
          href="/objets"
          className="text-sm font-bold text-gray-700 transition duration-200 hover:text-[#e11d48]"
        >
          🎒 Produits indispensables
        </Link>
      </div>

      {/* Liens par catégorie */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-[#e11d48]">Par catégorie</h4>
        <ul className="space-y-1">
          <li>
            <Link
              href="/blog/voyage-hotel"
              className="text-sm text-gray-600 transition duration-200 hover:text-[#e11d48]"
            >
              🏨 Hôtel
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voyage-camping"
              className="text-sm text-gray-600 transition duration-200 hover:text-[#e11d48]"
            >
              ⛺ Camping
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voyage-avion"
              className="text-sm text-gray-600 transition duration-200 hover:text-[#e11d48]"
            >
              ✈️ Avion
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voyage-voiture"
              className="text-sm text-gray-600 transition duration-200 hover:text-[#e11d48]"
            >
              🔌 Voiture
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
