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
    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow-xl w-[350px]">
      {destinations.map((dest) => (
        <Link key={dest.link} href={dest.link} className="group">
          <div className="relative w-full h-28 overflow-hidden rounded-lg">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
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
