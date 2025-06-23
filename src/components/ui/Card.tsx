'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  isExternal?: boolean;
  badge?: string;
  footer?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  image,
  link,
  isExternal = false,
  badge,
  footer,
  className = '',
  imageClassName = '',
  onClick,
  children,
}: CardProps) {
  const CardContent = () => (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
            loading="lazy"
            width={800}
            height={600}
          />
          {badge && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {title}
          {isExternal && <ExternalLink className="inline-block ml-1 h-4 w-4" />}
        </h3>
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </div>
      {footer && <div className="px-5 py-3 bg-gray-50 border-t">{footer}</div>}
    </div>
  );

  if (link) {
    const LinkComponent = isExternal
      ? ({ children }: { children: React.ReactNode }) => (
          <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
            {children}
          </a>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <Link href={link!} className="group block">
            {children}
          </Link>
        );

    return (
      <LinkComponent>
        <CardContent />
      </LinkComponent>
    );
  }

  return (
    <div onClick={onClick} className={onClick ? 'cursor-pointer group' : 'group'}>
      <CardContent />
    </div>
  );
}
