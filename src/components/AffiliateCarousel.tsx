'use client';

import React from 'react';
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
        <div key={product.asin} className="border p-4 rounded shadow hover:shadow-lg transition">
          <img
            src={product.image}
            alt={product.title}
            className="mb-2 w-full h-48 object-cover rounded"
          />
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-blue-700 font-bold">{product.price}</p>
          <p className="text-sm text-gray-600">{product.description}</p>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Voir sur Amazon
          </a>
        </div>
      ))}
    </div>
  );
}
