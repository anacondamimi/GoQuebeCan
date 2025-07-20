'use client';

import React from 'react';
import Link from 'next/link';
import { travelObjects } from '@/data/objectsData';

export default function TravelObjectsMegaMenu() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-[320px]">
      <ul className="space-y-3">
        {travelObjects.map((obj) => (
          <li key={obj.slug}>
            <Link
              href={`/blog/${obj.slug}`}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e11d48] transition"
            >
              <span className="text-lg">{obj.icon}</span>
              {obj.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
