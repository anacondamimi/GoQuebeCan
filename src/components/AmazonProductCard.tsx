'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  asin: string;
}

export default function AmazonProductCard({ asin }: Props) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/amazon-product?asin=${asin}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [asin]);

  if (!product) return <p>Chargement...</p>;

  const item = product.ItemsResult.Items[0];

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md">
      <Image
        src={item.Images.Primary.Medium.URL}
        alt={item.ItemInfo.Title.DisplayValue}
        width={300}
        height={300}
        className="rounded"
      />
      <h2 className="font-semibold mt-2">{item.ItemInfo.Title.DisplayValue}</h2>
      <p className="text-green-600 font-bold">{item.Offers.Listings[0].Price.DisplayAmount}</p>
      <a
        href={`https://www.amazon.ca/dp/${asin}/?tag=${process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
      >
        Voir sur Amazon
      </a>
    </div>
  );
}
