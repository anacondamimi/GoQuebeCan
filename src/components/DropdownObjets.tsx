'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function DropdownObjets() {
  return (
    <div className="relative group">
      <Link
        href="/objets"
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 px-2 py-2 rounded-md"
      >
        <ShoppingBag className="w-5 h-5" />
        Objets
      </Link>
      <div className="absolute left-0 mt-2 w-64 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <ul className="py-2">
          <li>
            <Link href="/blog/voyage-hotel" className="block px-4 py-2 hover:bg-gray-100 text-sm">
              🏨 Produits pour l'hôtel
            </Link>
          </li>
          <li>
            <Link href="/blog/voyage-camping" className="block px-4 py-2 hover:bg-gray-100 text-sm">
              ⛺ Produits pour le camping
            </Link>
          </li>
          <li>
            <Link href="/blog/voyage-avion" className="block px-4 py-2 hover:bg-gray-100 text-sm">
              ✈️ Produits pour l’avion
            </Link>
          </li>
          <li>
            <Link
              href="/blog/voiture-electrique"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              🔌 Produits pour VE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
