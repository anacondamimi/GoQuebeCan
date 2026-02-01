'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DropdownObjetsMobile from './DropdownObjetsMobile';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-4 py-2 text-left font-medium text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="mt-1 space-y-1 pl-4">{children}</div>}
    </div>
  );
}

export default function MobileMenu() {
  return (
    <div className="space-y-4 p-4">
      <Section title="Découvrir le Québec">
        <Link href="/destinations" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          🌄 Destinations
        </Link>
        <Link href="/experiences" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          🌿 Vivre une expérience
        </Link>
        <Link href="/blog/location-vr" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          🚐 Le Canada en VR
        </Link>
        <Link href="/producteurs" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          🥖 Producteurs du Québec
        </Link>
        <Link href="/camping" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          ⛺ Camping
        </Link>
      </Section>

      <Section title="Préparer son voyage">
        <Link href="/planificateur" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          🗺️ Planifier son itinéraire
        </Link>
        <DropdownObjetsMobile />
        <Link href="/videos" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          📹 Vidéos inspirantes
        </Link>
        <Link href="/vols" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          ✈️ Vols
        </Link>
      </Section>

      <Section title="Communauté">
        <Link
          href="/itineraire-communaute"
          className="block text-sm text-gray-700 hover:text-[#e11d48]"
        >
          🧭 Itinéraires de la communauté
        </Link>
        <Link href="/contact" className="block text-sm text-gray-700 hover:text-[#e11d48]">
          📬 Contact
        </Link>
      </Section>
    </div>
  );
}
