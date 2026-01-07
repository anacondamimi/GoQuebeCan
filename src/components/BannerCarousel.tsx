'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import NextImage from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowDown } from 'lucide-react';
import { getBannerTitle } from '@/data/bannerTitles';
import ChatBannerButton from '@/components/ChatBannerButton';

// LQIP (safe)
const shimmer = (w: number, h: number) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
     <defs><linearGradient id="g">
       <stop stop-color="#202020" offset="20%"/><stop stop-color="#4a4a4a" offset="50%"/><stop stop-color="#202020" offset="70%"/>
     </linearGradient></defs>
     <rect width="${w}" height="${h}" fill="#202020"/>
     <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
     <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"/>
   </svg>`;

const toBase64 = (str: string) => {
  if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
  return window.btoa(unescape(encodeURIComponent(str)));
};

interface Props {
  title?: string;
  onOpenChat?: () => void;
  onScrollToSection?: (id: string) => void;
}

const images = [
  '/images/banner1.avif',
  '/images/banner2.avif',
  '/images/banner3.avif',
  '/images/banner4.avif',
];

export default function BannerCarousel({ title }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const touchX = useRef<number | null>(null);

  const nextIndex = (index + 1) % images.length;
  const activeSrc = images[index];
  const nextSrc = images[nextIndex];

  // Auto défilement
  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const id = window.setInterval(() => setIndex((p) => (p + 1) % images.length), 5000);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused]);

  // Précharge l’image suivante (très important pour transition)
  useEffect(() => {
    const img = new window.Image();
    img.src = nextSrc;
  }, [nextSrc]);

  // Pause onglet inactif
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Gestes tactiles
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const t = 40;
    if (dx > t) setIndex((p) => (p - 1 + images.length) % images.length);
    if (dx < -t) setIndex((p) => (p + 1) % images.length);
    touchX.current = null;
  };

  const resolvedTitle =
    (typeof title === 'string' && title) || getBannerTitle(pathname) || 'Découvrir le Québec';

  return (
    <div
      className="relative h-[68svh] min-h-[340px] w-full overflow-hidden bg-black sm:h-[72svh] lg:h-[78svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ✅ On rend seulement 2 images : active + next */}
      <div className="absolute inset-0">
        {/* Active */}
        <motion.div
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9 }}
          className="absolute inset-0"
        >
          <NextImage
            src={activeSrc}
            alt={`Bannière ${index + 1}`}
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            loading="eager"
            decoding="async"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 630))}`}
            quality={70}
            className="object-cover"
          />
        </motion.div>

        {/* Next (préparée derrière) */}
        {!prefersReducedMotion && (
          <div className="pointer-events-none absolute inset-0 opacity-0">
            <NextImage
              src={nextSrc}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              decoding="async"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 630))}`}
              quality={70}
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="bg-black/18 md:bg-black/14 absolute inset-0" />

      {/* Contenu */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-3 sm:px-6">
        <div className="w-full max-w-5xl space-y-4 text-center sm:space-y-5">
          <motion.h1
            key={resolvedTitle}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
            className="text-[clamp(1.7rem,5.2vw,3.2rem)] font-extrabold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.35)]"
          >
            {resolvedTitle}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.25 }}
            className="mt-1 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => router.push('/planificateur')}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-[clamp(0.95rem,2.2vw,1.125rem)] font-semibold text-white shadow-md shadow-black/25 hover:bg-indigo-700 sm:px-6 sm:py-3"
            >
              Planifier mon voyage <span className="ml-2">▼</span>
            </button>

            <ChatBannerButton />

            <button
              onClick={() => router.push('/producteurs')}
              className="rounded-lg bg-green-600 px-4 py-2.5 text-[clamp(0.95rem,2.2vw,1.125rem)] font-semibold text-white shadow-md shadow-black/25 hover:bg-green-700 sm:px-6 sm:py-3"
            >
              🧀 Découvrir les producteurs québécois
            </button>
          </motion.div>

          <div className="pt-2">
            <ArrowDown size={24} className="mx-auto text-white/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
