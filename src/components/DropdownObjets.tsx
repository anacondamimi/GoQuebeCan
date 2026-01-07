'use client';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function DropdownObjets() {
  return (
    <div className="group relative">
      <Link
        href="/objets"
        className="flex items-center gap-2 rounded-md p-2 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
      >
        <ShoppingBag className="size-5" />
        Objets
      </Link>
      <div className="absolute left-0 z-50 mt-2 w-64 rounded-md border bg-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        <ul className="py-2">
          <li>
            <Link href="/blog/voyage-hotel" className="block px-4 py-2 text-sm hover:bg-gray-100">
              🏨 Produits pour l'hôtel
            </Link>
          </li>
          <li>
            <Link href="/blog/voyage-camping" className="block px-4 py-2 text-sm hover:bg-gray-100">
              ⛺ Produits pour le camping
            </Link>
          </li>
          <li>
            <Link href="/blog/voyage-avion" className="block px-4 py-2 text-sm hover:bg-gray-100">
              ✈️ Produits pour l’avion
            </Link>
          </li>
          <li>
            <Link href="/blog/voyage-voiture" className="block px-4 py-2 text-sm hover:bg-gray-100">
              🔌 Produits pour VE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
