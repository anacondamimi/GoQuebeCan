import type { ImageLoaderProps } from 'next/image';

// Utilise fm=webp et baisse q à ~60 par défaut
export default function contentfulLoader({ src, width, quality }: ImageLoaderProps) {
  const q = quality ?? 60;
  const url = new URL(src, 'https://images.ctfassets.net');
  url.searchParams.set('w', String(width));
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('q', String(q));
  return url.toString();
}
