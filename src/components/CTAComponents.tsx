'use client';

import React from 'react';

interface CTABannerProps {
  text: string;
  link: string;
}

export function CTABanner({ text, link }: CTABannerProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center font-semibold py-3 px-4 rounded-lg shadow hover:from-blue-600 hover:to-blue-500 transition"
    >
      {text}
    </a>
  );
}
