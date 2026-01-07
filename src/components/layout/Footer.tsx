import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { Mail, FileText, Scale, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import BrandName from '@/components/brand/BrandName';
import ResetCookieConsentButton from './ResetCookieConsentButton';

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterLinkGroup = {
  title: string;
  links: FooterLinkItem[];
};

const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Découvrir',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Camping', href: '/camping' },
      { label: 'Expériences', href: '/experiences' },
      { label: 'Producteurs locaux', href: '/producteurs' },
      { label: 'Vidéos', href: '/videos' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Planifier',
    links: [
      { label: 'Carte interactive', href: '/planificateur' },
      { label: 'Comparateur de vols', href: '/vols' },
      { label: 'Équipements de voyage', href: '/objets' },
      { label: 'Offres spéciales', href: '/offres' },
      { label: 'Le Canada en VR', href: '/vr' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Notre mission', href: '/notre-mission' },
      { label: 'Producteurs partenaires', href: '/producteurs' },
      { label: 'Contactez-nous', href: '/contact' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
      { label: 'Mentions légales', href: '/mentions-legales' },
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Haut du footer */}
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Colonne marque */}
          <section
            aria-labelledby="footer-brand-heading"
            className="space-y-4 text-center md:text-left"
          >
            <H2 id="footer-brand-heading" className="sr-only">
              À propos de GoQuébeCan
            </H2>

            <Link href="/" aria-label="Accueil GoQuébeCan" className="inline-block">
              <Image
                src="/images/logo.avif"
                alt="Logo GoQuébeCan"
                width={130}
                height={130}
                className="mx-auto rounded-lg shadow-md md:mx-0"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Le guide indépendant pour préparer vos road trips au Québec et au Canada.
            </p>

            <p className="text-xs text-gray-500">
              Certains liens sont affiliés, sans frais supplémentaires pour vous.
            </p>

            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={social.label}
                >
                  <social.icon className="size-5" />
                  <span className="sr-only">Suivez-nous sur {social.label}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Colonnes de liens */}
          <nav
            aria-label="Liens de navigation du pied de page"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-1 lg:col-span-3 lg:grid-cols-3"
          >
            {footerLinks.map((group) => {
              const headingId = `footer-section-${group.title.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <section key={group.title} aria-labelledby={headingId}>
                  <H3 id={headingId} className="mb-4 text-lg font-semibold text-white">
                    {group.title}
                  </H3>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          aria-label={link.label}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </nav>
        </div>

        {/* Bas du footer */}
        <div className="flex flex-col items-center justify-between space-y-3 border-t border-gray-800 py-4 md:flex-row md:space-y-0">
          <div className="text-center text-sm text-gray-400 md:text-left">
            © {new Date().getFullYear()} <BrandName />. Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Mail className="mr-1 size-4" />
              Contact
            </Link>

            <Link
              href="/confidentialite"
              className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <FileText className="mr-1 size-4" />
              Confidentialité
            </Link>

            <Link
              href="/conditions-utilisation"
              className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Conditions d’utilisation
            </Link>

            <Link
              href="/accessibilite"
              className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Accessibilité
            </Link>

            <Link
              href="/mentions-legales"
              className="inline-flex items-center rounded-sm text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Scale className="mr-1 size-4" />
              Mentions légales
            </Link>

            <ResetCookieConsentButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
