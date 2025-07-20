'use client';

import React from 'react';
import Image from 'next/image';
import products from '@/data/comfort.json';

interface Product {
  asin: string;
  title: string;
  image: string;
  price: string;
  description: string;
  link: string;
}

export default function AffiliateCarousel() {
  const productsData = products as Product[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsData.map((product) => (
        <div
          key={product.asin}
          className="border p-4 rounded-xl shadow hover:shadow-lg transition bg-white flex flex-col justify-between"
        >
          <div>
            <div className="relative w-full h-48 mb-2">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
            <p className="text-blue-700 font-bold mb-1">{product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
          <a
            href={product.link}
            target="_blank"
            rel="noopener sponsored noreferrer"
            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
          >
            Voir sur Amazon
          </a>
        </div>
      ))}
    </div>
  );
}
