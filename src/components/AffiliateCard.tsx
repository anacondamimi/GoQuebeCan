import React from 'react';
import Image from 'next/image';
import H3 from '@/components/typography/H3';
export default function AffiliateCard({
  title,
  image,
  link,
  label,
}: {
  title: string;
  image: string;
  link: string;
  label?: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="block rounded-2xl bg-white p-4 shadow transition hover:shadow-lg"
    >
      <Image
        src={image}
        alt={title}
        className="mb-2 h-40 w-full rounded-lg object-cover"
        width={800}
        height={600}
      />
      <H3 className="text-lg font-semibold">{title}</H3>
      {label && <p className="mt-1 text-sm text-blue-600">{label}</p>}
    </a>
  );
}
