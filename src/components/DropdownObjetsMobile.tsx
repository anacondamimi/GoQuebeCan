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
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-5" />
          Objets indispensables
        </div>
        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          <Link
            href="/blog/voyage-hotel"
            className="block rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          >
            🏨 Produits pour l'hôtel
          </Link>
          <Link
            href="/blog/voyage-camping"
            className="block rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          >
            ⛺ Produits pour le camping
          </Link>
          <Link
            href="/blog/voyage-avion"
            className="block rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          >
            ✈️ Produits pour l’avion
          </Link>
          <Link
            href="/blog/voyage-voiture"
            className="block rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          >
            🔌 Produits pour les longs trajets en voiture
          </Link>
        </div>
      )}
    </div>
  );
}
