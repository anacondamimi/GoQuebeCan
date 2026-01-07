import React from 'react';
import { Link } from 'react-router-dom';
import H3 from '@/components/typography/H3';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  isExternal?: boolean;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  link,
  isExternal = false,
  className = '',
}: FeatureCardProps) {
  const content = (
    <div
      className={`rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg${className}`}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <H3 className="mb-2 text-xl font-semibold text-gray-900">{title}</H3>
      <p className="mb-4 text-gray-600">{description}</p>
      {link && (
        <div className="mt-auto">
          <span className="inline-flex items-center font-medium text-indigo-600 transition-colors hover:text-indigo-700">
            En savoir plus
            <svg className="ml-1 size-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );

  if (link) {
    if (isExternal) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {content}
        </a>
      );
    }
    return (
      <Link to={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
