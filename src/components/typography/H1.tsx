import React, { type CSSProperties, type HTMLAttributes, type ElementType } from 'react';

/**
 * H1 — Titre principal réutilisable (Next.js + Tailwind + Playfair)
 * Design harmonisé avec GoQuébeCAN 2025 : police Playfair Display, barre d'accent douce, couleur personnalisable.
 */

type H1OwnProps = {
  as?: 'h1' | 'h2' | 'div';
  align?: 'center' | 'left';
  accent?: 'bar' | 'none';
  size?: 'md' | 'lg' | 'sm';
  textColor?: string;
  accentColor?: string;
};

export type H1Props = Omit<HTMLAttributes<HTMLElement>, 'color'> &
  H1OwnProps & {
    style?: CSSProperties;
    children?: React.ReactNode;
  };

export default function H1({
  as = 'h1',
  align = 'center',
  accent = 'bar',
  size = 'md',
  textColor = '#B73A3A',
  accentColor = '#C24A45',
  className = '',
  style,
  children,
  ...rest
}: H1Props) {
  const Tag: ElementType = as;

  const sizeCls =
    size === 'sm'
      ? 'text-2xl sm:text-3xl' // petit H1 si tu en as besoin
      : 'text-3xl sm:text-4xl md:text-5xl'; // taille standard pour md & lg

  const alignWrap = align === 'left' ? '' : 'text-center';
  const accentWidth = size === 'sm' ? 'w-12' : 'w-16';

  const mergedStyle: CSSProperties = {
    ...(style || {}),
    color: textColor,
    fontFamily: 'var(--font-playfair), serif',
  };

  return (
    <div className={[alignWrap, className].filter(Boolean).join(' ')}>
      <Tag
        className={`text-balance font-bold leading-tight tracking-tight ${sizeCls} mb-4`}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>

      {accent === 'bar' ? (
        <div
          className={`h-[3px] rounded-full ${accentWidth} ${align === 'left' ? '' : 'mx-auto'}`}
          style={{ backgroundColor: accentColor, marginTop: '-0.25rem' }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
