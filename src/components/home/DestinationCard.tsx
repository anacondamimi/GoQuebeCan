'use client';
import Image from 'next/image';
import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          width={800}
          height={600}
        />
        {location && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
              <MapPin className="h-3 w-3 mr-1 text-indigo-600" />
              {location}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>
      </div>
      <div className="px-5 pb-5">
        <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 transition-all duration-300">
          <span className="inline-block text-indigo-600 font-medium">
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
