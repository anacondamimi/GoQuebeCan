'use client';

import React from 'react';
import Link from 'next/link';

export default function DropdownObjetsMenu() {
  return (
    <div
      className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl min-w-[320px]"
      role="menu"
      aria-label="Objets de voyage"
    >
      {/* Lien principal */}
      <div>
        <Link
          href="/objets"
          className="text-sm font-bold text-gray-700 hover:text-[#e11d48] transition duration-200"
        >
          🎒 Produits indispensables
        </Link>
      </div>

      {/* Liens par catégorie */}
      <div>
        <h4 className="text-sm font-semibold text-[#e11d48] mb-2">Par catégorie</h4>
        <ul className="space-y-1">
          <li>
            <Link
              href="/blog/voyage-hotel"
              className="text-sm text-gray-600 hover:text-[#e11d48] transition duration-200"
            >
              🏨 Hôtel
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voyage-camping"
              className="text-sm text-gray-600 hover:text-[#e11d48] transition duration-200"
            >
              ⛺ Camping
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voyage-avion"
              className="text-sm text-gray-600 hover:text-[#e11d48] transition duration-200"
            >
              ✈️ Avion
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voiture-electrique"
              className="text-sm text-gray-600 hover:text-[#e11d48] transition duration-200"
            >
              🔌 Voiture électrique
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
