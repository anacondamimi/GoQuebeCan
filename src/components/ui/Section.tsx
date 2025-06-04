import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'gradient' | 'none';
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({
  children,
  className = '',
  id,
  background = 'white',
  paddingY = 'lg',
}: SectionProps) {
  const backgroundClass = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-b from-white to-gray-50',
    none: '',
  }[background];

  const paddingClass = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-24',
  }[paddingY];

  return (
    <section id={id} className={`${backgroundClass} ${paddingClass} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
