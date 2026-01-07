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
      className="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-3 text-center font-semibold text-white shadow transition hover:from-blue-600 hover:to-blue-500"
    >
      {text}
    </a>
  );
}
