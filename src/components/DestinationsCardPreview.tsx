'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const destinations = [
  {
    name: 'Montréal',
    image: '/images/montreal.avif',
    link: '/destinations/montreal',
  },
  {
    name: 'Québec',
    image: '/images/quebec.avif',
    link: '/destinations/quebec',
  },
  {
    name: 'Charlevoix',
    image: '/images/le-massif.avif',
    link: '/destinations/charlevoix',
  },
  {
    name: 'Gaspésie',
    image: '/images/parc-gaspesie.avif',
    link: '/destinations/gaspesie',
  },
];

export default function DestinationsCardPreview() {
  return (
    <div className="grid w-[350px] grid-cols-2 gap-4 rounded-xl bg-white p-4 shadow-xl">
      {destinations.map((dest) => (
        <Link key={dest.link} href={dest.link} className="group">
          <div className="relative h-28 w-full overflow-hidden rounded-lg">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2 text-sm font-medium text-gray-800 group-hover:text-[#e11d48]">
            {dest.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
