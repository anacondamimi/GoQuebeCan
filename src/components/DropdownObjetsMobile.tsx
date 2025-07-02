'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

export default function DropdownObjetsMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Objets indispensables
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          <Link
            href="/blog/voyage-hotel"
            className="block px-3 py-1 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 rounded-md"
          >
            🏨 Produits pour l'hôtel
          </Link>
          <Link
            href="/blog/voyage-camping"
            className="block px-3 py-1 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 rounded-md"
          >
            ⛺ Produits pour le camping
          </Link>
          <Link
            href="/blog/voyage-avion"
            className="block px-3 py-1 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 rounded-md"
          >
            ✈️ Produits pour l’avion
          </Link>
          <Link
            href="/blog/voiture-electrique"
            className="block px-3 py-1 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 rounded-md"
          >
            🔌 Produits pour VE
          </Link>
        </div>
      )}
    </div>
  );
}
