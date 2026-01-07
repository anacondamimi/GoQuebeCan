'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import H2 from '@/components/typography/H2';

interface Props {
  asin: string;
}

type AmazonAPIResponse = {
  ItemsResult: {
    Items: {
      Images: { Primary: { Medium: { URL: string } } };
      ItemInfo: { Title: { DisplayValue: string } };
      Offers: { Listings: { Price: { DisplayAmount: string } }[] };
    }[];
  };
};

export default function AmazonProductCard({ asin }: Props) {
  const [product, setProduct] = useState<AmazonAPIResponse | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/amazon-product?asin=${asin}`);
      const data: AmazonAPIResponse = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [asin]);

  if (!product) return <p>Chargement...</p>;

  const item = product.ItemsResult.Items[0];

  return (
    <div className="rounded-lg border p-4 shadow hover:shadow-md">
      <Image
        src={item.Images.Primary.Medium.URL}
        alt={item.ItemInfo.Title.DisplayValue}
        width={300}
        height={300}
        className="rounded"
      />
      <H2 className="mt-2 font-semibold">{item.ItemInfo.Title.DisplayValue}</H2>
      <p className="font-bold text-green-600">{item.Offers.Listings[0].Price.DisplayAmount}</p>
      <a
        href={`https://www.amazon.ca/dp/${asin}/?tag=${process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block rounded bg-yellow-400 px-4 py-2 hover:bg-yellow-500"
      >
        Voir l’offre — livraison rapide
      </a>
    </div>
  );
}
