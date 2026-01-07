import React, { type CSSProperties, type HTMLAttributes, type ElementType } from 'react';

type H3OwnProps = {
  as?: 'h3' | 'div';
  align?: 'center' | 'left';
  accent?: 'dot' | 'none'; // accent plus discret que H1/H2
  size?: 'md' | 'sm';
  textColor?: string;
};

export type H3Props = Omit<HTMLAttributes<HTMLElement>, 'color'> &
  H3OwnProps & {
    style?: CSSProperties;
    children?: React.ReactNode;
  };

export default function H3({
  as = 'h3',
  align = 'left',
  accent = 'none',
  size = 'md',
  textColor = '#111827',
  className = '',
  style,
  children,
  ...rest
}: H3Props) {
  const Tag: ElementType = as;

  const sizeCls = size === 'sm' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'; // H3 en-dessous du H2

  const alignCls = align === 'left' ? 'text-left' : 'text-center';

  const mergedStyle: CSSProperties = {
    ...(style || {}),
    color: textColor,
    fontFamily: 'var(--font-playfair), serif',
  };

  return (
    <div className={[alignCls, className].filter(Boolean).join(' ')}>
      <Tag
        className={`text-balance font-semibold leading-snug tracking-tight ${sizeCls} mb-3 mt-6`}
        style={mergedStyle}
        {...rest}
      >
        {accent === 'dot' ? '• ' : null}
        {children}
      </Tag>
    </div>
  );
}
