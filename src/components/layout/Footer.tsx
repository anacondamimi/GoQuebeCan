import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  FileText,
  Scale,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Sparkles,
} from 'lucide-react';

import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import ResetCookieConsentButton from './ResetCookieConsentButton';

type FooterLinkItem = { label: string; href: string };
type FooterLinkGroup = { title: string; links: FooterLinkItem[] };

const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Découvrir',
    links: [
      { label: 'Destinations populaires', href: '/#destinations' },
      { label: 'Camping', href: '/camping' },
      { label: 'Expériences', href: '/experiences' },
      { label: 'Producteurs locaux', href: '/producteurs' },
      { label: 'Vidéos', href: '/videos' },
    ],
  },
  {
    title: 'Planifier',
    links: [
      { label: 'Planificateur (carte)', href: '/planificateur' },
      { label: 'Comparateur de vols', href: '/vols' },
      { label: 'Objets indispensables', href: '/#objets' },
      { label: 'Offres spéciales', href: '/offres' },
      { label: 'Le Canada en VR', href: '/blog/location-vr' },
    ],
  },
  {
    title: 'Infos',
    links: [
      { label: 'Notre mission', href: '/notre-mission' },
      { label: 'Contact', href: '/contact' },
      { label: 'Confidentialité', href: '/confidentialite' },
      { label: 'Mentions légales', href: '/mentions-legales' },
    ],
  },
];

const coupsDeCoeur = [
  {
    title: 'Planificateur de road trip',
    desc: 'Construis ton itinéraire simplement, étape par étape.',
    href: '/planificateur',
    emoji: '🧭',
  },
  {
    title: 'Camping sans stress',
    desc: 'Nos essentiels testés pour partir l’esprit léger.',
    href: '/camping',
    emoji: '🏕️',
  },
  {
    title: 'Bons plans du moment',
    desc: 'Des offres utiles, sélectionnées avec soin.',
    href: '/offres',
    emoji: '🔥',
  },
];

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-neutral transition hover:text-primary">
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-background">
      {/* Bande chaude plein écran */}
      <div className="bg-autumn-gradient h-2 w-full" />

      {/* Contenu centré (mais fond du footer full width) */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Bloc principal */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-card">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="GoQuébeCAN" width={44} height={44} />
                <BrandName className="text-xl" />
              </div>

              {/* Phrase plus “feel good” */}
              <p className="mt-4 text-sm leading-relaxed text-neutral">
                L’idée : te donner envie de partir. Des destinations inspirantes, des outils
                simples, et des conseils concrets pour voyager au Québec et au Canada.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles size={14} />
                Inspire-toi, puis planifie en 2 minutes.
              </div>

              <div className="mt-6 flex items-center gap-3">
                <SocialIconLink href="https://www.facebook.com/" label="Facebook">
                  <Facebook size={18} />
                </SocialIconLink>
                <SocialIconLink href="https://twitter.com/" label="Twitter">
                  <Twitter size={18} />
                </SocialIconLink>
                <SocialIconLink href="https://www.instagram.com/" label="Instagram">
                  <Instagram size={18} />
                </SocialIconLink>
                <SocialIconLink href="https://www.youtube.com/" label="YouTube">
                  <Youtube size={18} />
                </SocialIconLink>
              </div>

              {/* Mini CTA chaleureux */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/#destinations" className="btn-secondary">
                  🗺️ Découvrir
                </Link>
                <Link href="/planificateur" className="btn-primary">
                  🧭 Planifier
                </Link>
              </div>
            </div>

            {/* Colonnes + Coup de coeur */}
            <div className="lg:col-span-8">
              <div className="grid gap-10 lg:grid-cols-12">
                {/* Liens */}
                <div className="lg:col-span-7">
                  <div className="grid gap-8 sm:grid-cols-3">
                    {footerLinks.map((group) => (
                      <div key={group.title}>
                        <H3 className="mb-4 text-sm font-semibold tracking-wide text-secondary">
                          {group.title}
                        </H3>
                        <ul className="space-y-3">
                          {group.links.map((l) => (
                            <li key={`${group.title}-${l.href}-${l.label}`}>
                              <FooterLink href={l.href}>{l.label}</FooterLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coup de cœur – plus “cozy” */}
                <div className="lg:col-span-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-primary" />
                    <H3 className="text-sm font-semibold tracking-wide text-secondary">
                      Coup de cœur
                    </H3>
                  </div>

                  <p className="mb-4 text-sm text-neutral">
                    Nos petits favoris du moment — juste de bonnes idées qui donnent envie. ✨
                  </p>

                  <div className="space-y-3">
                    {coupsDeCoeur.map((c) => (
                      <Link
                        key={c.title}
                        href={c.href}
                        className="group block rounded-2xl border border-gray-200 bg-primary/5 p-4 transition hover:bg-primary/10 hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
                            <span className="text-lg">{c.emoji}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-secondary group-hover:text-primary">
                              {c.title}
                            </p>
                            <p className="mt-1 text-sm text-neutral">{c.desc}</p>
                            <p className="mt-2 text-xs font-medium text-primary">Découvrir →</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Utility row – moins “administratif” */}
              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
                <Link href="/contact" className="btn-outline flex items-center gap-2">
                  <Mail size={16} /> Contact
                </Link>

                <Link href="/confidentialite" className="btn-outline flex items-center gap-2">
                  <Scale size={16} /> Confidentialité
                </Link>

                <Link href="/mentions-legales" className="btn-outline flex items-center gap-2">
                  <FileText size={16} /> Mentions légales
                </Link>

                <div className="ml-auto">
                  <ResetCookieConsentButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 text-xs text-neutral sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GoQuébeCAN — Tous droits réservés.</span>
          <span className="text-secondary">Fait avec cœur au Québec 🍁</span>
        </div>
      </div>
    </footer>
  );
}
