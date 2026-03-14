import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  FileText,
  Scale,
  Facebook,
  Instagram,
  Youtube,
  Heart,
  Sparkles,
  Map,
  Plane,
  Tent,
  Hotel,
  Wheat,
} from 'lucide-react';

import H3 from '@/components/typography/H3';
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
      { label: 'Destinations populaires', href: '/#destinations-populaires' },
      { label: 'Camping', href: '/camping' },
      { label: 'Expériences', href: '/experiences' },
      { label: 'Producteurs locaux', href: '/producteurs' },
      { label: 'Vidéos', href: '/videos' },
      { label: 'Coups de cœur', href: '/coups-de-coeur' },
    ],
  },
  {
    title: 'Préparer',
    links: [
      { label: 'Planificateur (carte)', href: '/planificateur' },
      { label: 'Comparateur de vols', href: '/vols' },
      { label: 'Guide voyage voiture', href: '/blog/voyage-voiture' },
      { label: 'Guide voyage hôtel', href: '/blog/voyage-hotel' },
      { label: 'Guide voyage camping', href: '/blog/voyage-camping' },
      { label: 'Guide voyage avion', href: '/blog/voyage-avion' },
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
    icon: <Map size={18} />,
  },
  {
    title: 'Découvrir les producteurs locaux',
    desc: 'Ajoute des haltes gourmandes et humaines à ton voyage.',
    href: '/producteurs',
    icon: <Wheat size={18} />,
  },
  {
    title: 'Nos coups de cœur du moment',
    desc: 'Des idées inspirantes pour préparer ta prochaine escapade.',
    href: '/coups-de-coeur',
    icon: <Heart size={18} />,
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
    <Link
      href={href}
      className="text-sm text-neutral underline-offset-4 transition hover:text-primary hover:underline"
    >
      {children}
    </Link>
  );
}

function QuickGuideButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-neutral transition hover:border-primary hover:bg-primary/5 hover:text-primary"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-background">
      <div className="bg-autumn-gradient h-2 w-full" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-card">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Bloc marque */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="GoQuébeCAN" width={44} height={44} />
                <BrandName className="text-xl" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral">
                Des idées qui donnent envie de partir, des outils simples pour mieux organiser ton
                séjour, et une vraie place pour les découvertes locales, les producteurs et les
                beaux arrêts sur la route.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles size={14} />
                Inspire-toi, planifie, puis profite vraiment du voyage.
              </div>

              <div className="mt-6 flex items-center gap-3">
                <SocialIconLink href="https://www.facebook.com/" label="Facebook">
                  <Facebook size={18} />
                </SocialIconLink>
                <SocialIconLink href="https://www.instagram.com/" label="Instagram">
                  <Instagram size={18} />
                </SocialIconLink>
                <SocialIconLink href="https://www.youtube.com/" label="YouTube">
                  <Youtube size={18} />
                </SocialIconLink>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/#destinations-populaires"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-neutral transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  🗺️ Découvrir
                </Link>
                <Link
                  href="/planificateur"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-105"
                >
                  🧭 Planifier
                </Link>
              </div>

              <div className="mt-8">
                <H3 className="mb-3 text-sm font-semibold tracking-wide text-secondary">
                  Guides rapides
                </H3>
                <div className="flex flex-wrap gap-2">
                  <QuickGuideButton
                    href="/blog/voyage-voiture"
                    icon={<Map size={16} />}
                    label="Voiture"
                  />
                  <QuickGuideButton
                    href="/blog/voyage-hotel"
                    icon={<Hotel size={16} />}
                    label="Hôtel"
                  />
                  <QuickGuideButton
                    href="/blog/voyage-camping"
                    icon={<Tent size={16} />}
                    label="Camping"
                  />
                  <QuickGuideButton
                    href="/blog/voyage-avion"
                    icon={<Plane size={16} />}
                    label="Avion"
                  />
                </div>
              </div>
            </div>

            {/* Colonnes et favoris */}
            <div className="lg:col-span-8">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="grid gap-8 sm:grid-cols-3">
                    {footerLinks.map((group) => (
                      <div key={group.title}>
                        <H3 className="mb-4 text-sm font-semibold tracking-wide text-secondary">
                          {group.title}
                        </H3>
                        <ul className="space-y-3">
                          {group.links.map((link) => (
                            <li key={`${group.title}-${link.href}-${link.label}`}>
                              <FooterLink href={link.href}>{link.label}</FooterLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-primary" />
                    <H3 className="text-sm font-semibold tracking-wide text-secondary">
                      Nos coups de cœur
                    </H3>
                  </div>

                  <p className="mb-4 text-sm text-neutral">
                    Trois portes d’entrée simples pour passer de l’inspiration à un vrai projet de
                    voyage.
                  </p>

                  <div className="space-y-3">
                    {coupsDeCoeur.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group block rounded-2xl border border-gray-200 bg-primary/5 p-4 transition hover:bg-primary/10 hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-secondary group-hover:text-primary">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm text-neutral">{item.desc}</p>
                            <p className="mt-2 text-xs font-medium text-primary">Découvrir →</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-neutral transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <Mail size={16} /> Contact
                </Link>

                <Link
                  href="/confidentialite"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-neutral transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <Scale size={16} /> Confidentialité
                </Link>

                <Link
                  href="/mentions-legales"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-neutral transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <FileText size={16} /> Mentions légales
                </Link>

                <div className="ml-auto">
                  <ResetCookieConsentButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-neutral sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GoQuébeCAN — Tous droits réservés.</span>
          <span className="text-secondary">Fait avec cœur au Québec 🍁</span>
        </div>
      </div>
    </footer>
  );
}
