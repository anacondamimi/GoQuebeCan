import type { ImageLoaderProps } from 'next/image';
export default function expediaLoader({ src, width }: ImageLoaderProps) {
  const url = new URL(src, 'https://images.trvl-media.com');
  url.searchParams.set('rw', String(width));
  url.searchParams.set('ra', 'fit');
  // Pas de param 'q' standard sur cette CDN, on laisse Next gérer 'quality'
  return url.toString();
}
