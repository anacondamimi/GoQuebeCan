// src/lib/pickImageLoader.ts
import type { ImageLoaderProps } from 'next/image';

function contentfulLoader({ src, width, quality }: ImageLoaderProps) {
  const u = new URL(src, 'https://images.ctfassets.net');
  u.searchParams.set('w', String(width));
  u.searchParams.set('fm', 'webp');
  u.searchParams.set('q', String(quality ?? 60));
  return u.toString();
}

function expediaLoader({ src, width }: ImageLoaderProps) {
  const u = new URL(src, 'https://images.trvl-media.com');
  // Expedia: rw (resize width) + ra (fit)
  u.searchParams.set('rw', String(width));
  u.searchParams.set('ra', 'fit');
  return u.toString();
}

/** Choisit automatiquement le loader d'image selon le domaine */
export function pickImageLoader(src: string) {
  try {
    const url = new URL(src);
    if (url.hostname.includes('images.ctfassets.net')) return contentfulLoader;
    if (url.hostname.includes('images.trvl-media.com')) return expediaLoader;
  } catch {
    // src relatif (local) → Next loader par défaut
  }
  return undefined;
}
