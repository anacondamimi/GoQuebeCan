"use client";
import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { Mail, FileText, Scale, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = [
  {
    title: 'Découvrir',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Camping', href: '/camping' },
      { label: 'Expériences', href: '/experiences' },
      { label: 'Vidéos', href: '/videos' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Planifier',
    links: [
      { label: 'Carte Interactive', href: '/carte' },
      { label: 'Comparateur de Vols', href: '/vols' },
      { label: 'Équipements', href: '/objets' },
      { label: 'Le Canada en VR', href: '/vr' },
    ],
  },
  {
    title: 'À Propos',
    links: [
      { label: 'Notre Mission', href: '/notre-mission' },
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Politique de Confidentialité', href: '/confidentialite' },
      { label: 'Mentions Légales', href: '/mentions-legales' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/goquebecan', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/goquebecan', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/goquebecan', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/goquebecan', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center" aria-label="Accueil">
              <Image
  src="/images/logo.jpg"
  alt="Logo GoQuebecan"
  width={133}
  height={75}
/>
            </Link>
            <p className="text-gray-400 text-sm">
              Votre guide complet pour explorer le Québec et le Canada avec des conseils d'experts
              et des offres exclusives.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                      aria-label={link.label}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GoQuebecan. Tous droits réservés.
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              <span>Contact</span>
            </Link>
            <Link
              href="/confidentialite"
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span>Confidentialité</span>
            </Link>
            <Link
              href="/conditions-utilisation"
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <span>Conditions d’utilisation</span>
            </Link>
            <Link
              href="/accessibilite"
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <span>Accessibilité</span>
            </Link>
            <Link
              href="/mentions-legales"
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <Scale className="h-4 w-4 mr-2" />
              <span>Mentions Légales</span>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('cookie_consent');
                window.location.reload();
              }}
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <span>🎛 Cookies</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
