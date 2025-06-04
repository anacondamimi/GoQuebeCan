import React from 'react';
import { Link } from 'react-router-dom';

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
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {link && (
        <div className="mt-auto">
          <span className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors inline-flex items-center">
            En savoir plus
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
