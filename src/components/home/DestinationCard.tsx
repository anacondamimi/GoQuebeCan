'use client';
import Image from 'next/image';
import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import H3 from '@/components/typography/H3';

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
  location?: string;
  blogId?: string;
  link?: string;
}

export function DestinationCard({
  name,
  description,
  image,
  location,
  blogId,
  link,
}: DestinationCardProps) {
  const handleClick = () => {
    if (typeof document !== 'undefined' && blogId) {
      const element = document.getElementById(blogId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const content = (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          width={800}
          height={600}
        />
        {location && (
          <div className="absolute left-3 top-3">
            <div className="flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
              <MapPin className="mr-1 size-3 text-indigo-600" />
              {location}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      <div className="p-5">
        <H3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
          {name}
        </H3>
        <p className="line-clamp-2 text-gray-600">{description}</p>
      </div>
      <div className="px-5 pb-5">
        <div className="h-0 overflow-hidden transition-all duration-300 group-hover:mt-2 group-hover:h-auto">
          <span className="inline-block font-medium text-indigo-600">
            {blogId ? "Lire l'article →" : 'Découvrir →'}
          </span>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        {content}
      </Link>
    );
  }

  if (blogId) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {content}
      </div>
    );
  }

  return content;
}
