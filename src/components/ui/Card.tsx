'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import H3 from '@/components/typography/H3';

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
      className={`overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            className={`size-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
            loading="lazy"
            width={800}
            height={600}
          />
          {badge && (
            <div className="absolute right-3 top-3">
              <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <H3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
          {title}
          {isExternal && <ExternalLink className="ml-1 inline-block size-4" />}
        </H3>
        {description && <p className="mb-4 text-gray-600">{description}</p>}
        {children}
      </div>
      {footer && <div className="border-t bg-gray-50 px-5 py-3">{footer}</div>}
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
    <div onClick={onClick} className={onClick ? 'group cursor-pointer' : 'group'}>
      <CardContent />
    </div>
  );
}
