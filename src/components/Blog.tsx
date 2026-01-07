'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { CampingGuide } from './CampingGuide';
import H2 from '@/components/typography/H2';

interface BlogProps {
  hideCampingGuide?: boolean;
  onScrollToSection?: (section: string) => void;
  onOpenChat?: () => void;
}

export default function Blog({ hideCampingGuide = false }: BlogProps) {
  return (
    <section id="blog_section" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideCampingGuide && <CampingGuide />}

        <div className="mb-6 flex items-center justify-center gap-3">
          <FileText className="size-8 text-indigo-600" />
          <H2 className="text-center text-4xl font-bold text-gray-900">
            Guides et Conseils de Voyage
          </H2>
        </div>

        <p className="mb-12 text-center text-xl text-gray-600">
          Ressources et articles pour mieux explorer le Québec et ses campings
        </p>
      </div>
    </section>
  );
}
