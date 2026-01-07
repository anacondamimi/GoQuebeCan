import React from 'react';
import H2 from '@/components/typography/H2';

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
          className={`${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''} mb-6 flex size-16 items-center justify-center rounded-full bg-indigo-100`}
        >
          <div className="text-indigo-600">{icon}</div>
        </div>
      )}
      <H2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</H2>
      {subtitle && <p className="mx-auto max-w-3xl text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
}
