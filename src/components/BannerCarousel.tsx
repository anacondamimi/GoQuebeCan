'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MessageSquareText, ArrowDown } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  onScrollToSection?: (id: string) => void;
  onOpenChat?: () => void;
}

const images = [
  '/images/banner1.avif',
  '/images/banner2.avif',
  '/images/banner3.avif',
  '/images/banner4.avif',
];

export default function BannerCarousel({ title, subtitle, onOpenChat }: Props) {
  const [index, setIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hydrated]);

  if (!hydrated) {
    return <div className="w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[600px] bg-black" />;
  }

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[600px] overflow-hidden bg-black">
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.05,
          }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={src}
            alt={`Bannière ${i + 1}`}
            fill
            sizes="100vw"
            priority={i === index}
            className="object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          key={title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white text-3xl sm:text-5xl font-bold"
        >
          {title}
        </motion.h1>

        <motion.h2
          key={subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-purple-300 text-2xl sm:text-4xl font-extrabold mt-2"
        >
          {subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl"
        >
          Guides experts, itinéraires personnalisés et conseils locaux pour une aventure inoubliable
          en 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => router.push('/planificateur')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-lg font-semibold"
          >
            Planifier mon voyage <span className="ml-2">▼</span>
          </button>

          <button
            onClick={onOpenChat}
            className="border border-white hover:bg-white hover:text-black text-white py-3 px-6 rounded-lg text-lg font-semibold flex items-center gap-2"
          >
            <MessageSquareText size={20} />
            Parler à notre assistant
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-6 animate-bounce"
        >
          <ArrowDown size={32} className="text-white opacity-70" />
        </motion.div>
      </div>
    </div>
  );
}
