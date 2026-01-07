'use client';

import React from 'react';
import Image from 'next/image';
import products from '@/data/comfort.json';
import H3 from '@/components/typography/H3';

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {productsData.map((product) => (
        <div
          key={product.asin}
          className="flex flex-col justify-between rounded-xl border bg-white p-4 shadow transition hover:shadow-lg"
        >
          <div>
            <div className="relative mb-2 h-48 w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="rounded object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <H3 className="mb-1 text-lg font-semibold">{product.title}</H3>
            <p className="mb-1 font-bold text-blue-700">{product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
          <a
            href={product.link}
            target="_blank"
            rel="noopener sponsored noreferrer"
            className="mt-3 inline-block rounded bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
          >
            Voir l’offre — livraison rapide
          </a>
        </div>
      ))}
    </div>
  );
}
