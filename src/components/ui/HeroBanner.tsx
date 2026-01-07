'use client';
import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import H1 from '@/components/typography/H1';

interface HeroBannerProps {
  image: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export default function HeroBanner({
  image,
  title,
  subtitle,
  badge = 'Destination en vedette',
}: HeroBannerProps) {
  return (
    <header className="relative mb-16 h-[450px] w-full overflow-hidden rounded-xl shadow-md">
      {/* 🌅 Image de fond */}
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      {/* 🧊 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm" />

      {/* ✨ Texte centré */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold shadow-sm backdrop-blur-sm">
          <MapPin className="size-5 text-yellow-300" />
          {badge}
        </div>
        <H1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">{title}</H1>
        <p className="max-w-2xl text-lg text-white/90 sm:text-xl">{subtitle}</p>
      </div>
    </header>
  );
}
