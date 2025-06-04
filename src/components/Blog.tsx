'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { CampingGuide } from './CampingGuide';

interface BlogProps {
  hideCampingGuide?: boolean;
  onScrollToSection?: (section: string) => void;
  onOpenChat?: () => void;
}

export default function Blog({ hideCampingGuide = false }: BlogProps) {
  return (
    <section id="blog_section" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideCampingGuide && <CampingGuide />}

        <div className="flex items-center justify-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Guides et Conseils de Voyage
          </h2>
        </div>

        <p className="text-xl text-center text-gray-600 mb-12">
          Ressources et articles pour mieux explorer le Québec et ses campings
        </p>
      </div>
    </section>
  );
}
