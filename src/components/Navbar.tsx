'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import DropdownDestinations from '@/components/DropdownDestinations';
import DropdownObjets from '@/components/DropdownObjets';
import DropdownObjetsMobile from '@/components/DropdownObjetsMobile';

import { Tent, Video, Menu, X, Compass, Plane, Route, Laptop, Users, Mail } from 'lucide-react';

const navLinks = [
  { href: '/planificateur', label: 'Planifier son itinéraire', icon: Route },
  { href: '/vols', label: 'Vols', icon: Plane },
  { href: '/experiences', label: 'Expériences', icon: Compass },
  { href: '/camping', label: 'Camping', icon: Tent },
  { href: '/videos', label: 'Vidéos', icon: Video },
  { href: '/blog/location-vr', label: 'Le Canada en VR', icon: Laptop },
  { href: '/itineraires-communaute', label: 'Itinéraires de la communauté', icon: Users },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link href="/" aria-label="Accueil" className="flex-shrink-0">
            <Image
              src="/logo.avif"
              alt="Logo GoQuébeCan"
              width={48}
              height={48}
              unoptimized
              priority
              className="object-contain"
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownDestinations />
            <DropdownObjets />
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 px-2 py-2 rounded-md"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menu Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#e11d48]"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-xl">
            <DropdownDestinations />
            <DropdownObjetsMobile />
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 transition-colors"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
