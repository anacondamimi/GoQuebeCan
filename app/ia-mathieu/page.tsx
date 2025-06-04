// app/ia-mathieu/page.tsx
'use client';

import React from 'react';
import Chatbot from '@/components/ui/Chatbot';
import Link from 'next/link';

export default function IAMathieuPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#aa7fd5]">
        Bienvenue dans mon univers augmenté 🤖
      </h1>

      <p className="mb-6 text-lg text-center">
        Je suis <strong>Mathieu Marciniak</strong>, entrepreneur passionné par l’<em>innovation</em>,
        la <em>qualité industrielle</em>, le <em>voyage authentique</em> et la <em>création assistée par IA</em>.
        Cette carte vous ouvre les portes de mes projets, de mes idées, et de mes outils IA.
      </p>

      <div className="mb-6">
        <Chatbot />
      </div>

      <section className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#36b5ff]">Découvrir mes projets</h2>
        <ul className="space-y-2">
          <li>
            <Link href="https://www.goquebecan.com" className="text-blue-600 hover:underline">
              🌍 GoQuébeCan – Explorer le Canada autrement
            </Link>
          </li>
          <li>
            <Link href="https://anamimiglobalwellness.com/fr" className="text-blue-600 hover:underline">
              😴 AnaMimi – Bien-être et anti-ronflement
            </Link>
          </li>
          <li>
            <Link href="https://spectacular-belekoy-84f3e7.netlify.app" className="text-blue-600 hover:underline">
              🏭 Gemba Walk – Application qualité augmentée
            </Link>
          </li>
        </ul>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mathieu Marciniak – Carte IA personnelle
      </footer>
    </main>
  );
}