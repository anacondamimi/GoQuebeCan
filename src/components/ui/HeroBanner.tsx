'use client';
import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

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
    <header className="relative h-[450px] w-full rounded-xl overflow-hidden shadow-md mb-16">
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
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 text-white">
        <div className="flex items-center gap-2 mb-3 bg-white/20 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm">
          <MapPin className="h-5 w-5 text-yellow-300" />
          {badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
        <p className="text-lg sm:text-xl max-w-2xl text-white/90">{subtitle}</p>
      </div>
    </header>
  );
}
