import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  padding?: boolean;
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
  maxWidth = '7xl',
  padding = true,
}: ContainerProps) {
  const maxWidthClass = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }[maxWidth];

  const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <Component className={`mx-auto ${maxWidthClass} ${paddingClass} ${className}`}>
      {children}
    </Component>
  );
}
