import React, { type CSSProperties, type HTMLAttributes, type ElementType } from 'react';

type H2OwnProps = {
  as?: 'h2' | 'h3' | 'div';
  align?: 'center' | 'left';
  accent?: 'bar' | 'none';
  size?: 'md' | 'sm';
  textColor?: string;
  accentColor?: string;
};

export type H2Props = Omit<HTMLAttributes<HTMLElement>, 'color'> &
  H2OwnProps & {
    style?: CSSProperties;
    children?: React.ReactNode;
  };

export default function H2({
  as = 'h2',
  align = 'left',
  accent = 'none',
  size = 'md',
  textColor = '#111827', // gris très foncé
  accentColor = '#C24A45', // même rouge que H1 par défaut
  className = '',
  style,
  children,
  ...rest
}: H2Props) {
  const Tag: ElementType = as;

  const sizeCls = size === 'sm' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'; // taille standard H2

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
        className={`text-balance font-semibold leading-tight tracking-tight ${sizeCls} mb-4 mt-10`}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>

      {accent === 'bar' ? (
        <div
          className={`h-[2px] rounded-full ${accentWidth} ${align === 'left' ? '' : 'mx-auto'}`}
          style={{ backgroundColor: accentColor, marginTop: '-0.25rem' }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
