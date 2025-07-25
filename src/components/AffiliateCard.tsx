import React from 'react';
import Image from 'next/image';
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
      className="block p-4 rounded-2xl shadow hover:shadow-lg bg-white transition"
    >
      <Image
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-lg mb-2"
        width={800}
        height={600}
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      {label && <p className="text-sm text-blue-600 mt-1">{label}</p>}
    </a>
  );
}
