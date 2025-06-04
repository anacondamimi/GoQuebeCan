import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  icon,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      {icon && (
        <div
          className={`${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''} flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6`}
        >
          <div className="text-indigo-600">{icon}</div>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}
