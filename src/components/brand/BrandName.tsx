import * as React from 'react';

/**
 * BrandName — Affichage texte du nom GoQuébeCan avec couleurs de marque.
 * - "Go" en rouge drapeau canadien (par défaut #D32F2F)
 * - "QuébeCan" en vert (par défaut #2E7D32)
 * - Options de tag, nowrap, tailles, et override couleurs via props
 */

export type BrandNameProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'span' | 'div' | 'h1' | 'h2' | 'a';
  /** Empêcher le retour à la ligne entre les deux segments */
  nowrap?: boolean;
  /** Taille (classes Tailwind) */
  size?: 'md' | 'lg' | 'sm';
  /** Rouge (hex/tailwind var) pour « Go » */
  red?: string;
  /** Vert (hex/tailwind var) pour « QuébeCan » */
  green?: string;
  /** URL si as="a" */
  href?: string;
  /** Aria label personnalisé */
  ariaLabel?: string;
};

export default function BrandName({
  as = 'span',
  nowrap = true,
  size = 'md',
  red = '#D32F2F',
  green = '#2E7D32',
  href,
  ariaLabel,
  className = '',
  ...rest
}: BrandNameProps) {
  // Element à rendre (typé sans `any`)
  const Tag = (as ?? 'span') as React.ElementType;

  const sizeCls =
    size === 'lg'
      ? 'text-2xl sm:text-3xl md:text-4xl'
      : size === 'sm'
        ? 'text-base sm:text-lg'
        : 'text-lg sm:text-xl';

  // On passe `href` uniquement si on rend un <a>
  const maybeHrefProps =
    as === 'a' && href
      ? ({ href } as React.AnchorHTMLAttributes<HTMLAnchorElement>)
      : ({} as React.HTMLAttributes<HTMLElement>);

  return (
    <Tag
      {...maybeHrefProps}
      {...rest}
      className={[
        'inline-flex items-baseline font-serif font-bold tracking-tight leading-tight',
        sizeCls,
        nowrap ? 'whitespace-nowrap' : '',
        className,
      ].join(' ')}
      aria-label={ariaLabel ?? 'GoQuébeCan'}
      title={ariaLabel ?? 'GoQuébeCan'}
    >
      <span style={{ color: red }}>Go</span>
      <span style={{ color: green }}>QuébeCan</span>
    </Tag>
  );
}
