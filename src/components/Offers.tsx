'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

interface Offer {
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
  image: string;
  discount?: string;
  validUntil?: string;
  tag?: 'Nouveau' | 'Populaire';
  bookingLink: string;
}

export default function Offers() {
  const offers: Offer[] = [
    {
      title: 'Forfait Découverte Gaspésie',
      description: '3 jours de road trip incluant hébergement et activités',
      price: '599',
      duration: '3 jours',
      location: 'Gaspésie',
      image:
        'https://images.unsplash.com/photo-1578607974203-0e5657088821?auto=format&fit=crop&q=80',
      discount: '20%',
      validUntil: '30 juin 2025',
      tag: 'Nouveau',
      bookingLink: '/offres/gaspesie',
    },
    {
      title: 'Week-end Charlevoix',
      description: 'Séjour romantique avec spa et gastronomie locale',
      price: '399',
      duration: '2 jours',
      location: 'Charlevoix',
      image:
        'https://images.unsplash.com/photo-1542397284385-6010376c5337?auto=format&fit=crop&q=80',
      discount: '15%',
      validUntil: '31 mai 2025',
      tag: 'Populaire',
      bookingLink: '/offres/charlevoix',
    },
    {
      title: 'Aventure Laurentides',
      description: 'Activités de plein air et hébergement en chalet',
      price: '499',
      duration: '4 jours',
      location: 'Laurentides',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
      bookingLink: '/offres/laurentides',
    },
  ];

  return (
    <Section background="gradient" paddingY="xl">
      <SectionTitle
        title="Offres Spéciales"
        subtitle="Profitez de nos forfaits exclusifs pour découvrir le Québec"
        icon={<Tag className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {offer.discount && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                  -{offer.discount}
                </div>
              )}
              {offer.tag && (
                <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {offer.tag}
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {offer.title}
              </h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1 text-indigo-600" />
                  <span>{offer.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 text-indigo-600" />
                  <span>{offer.location}</span>
                </div>
              </div>

              {offer.validUntil && (
                <div className="text-xs text-gray-500 mb-4">
                  Valable jusqu’au <strong>{offer.validUntil}</strong>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">{offer.price}$</span>
                <Link href={offer.bookingLink}>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="h-4 w-4 animate-bounce" />}
                    iconPosition="right"
                    aria-label={`Réserver l’offre ${offer.title}`}
                  >
                    Réserver
                  </Button>
                </Link>
              </div>
            </div>

            <div className="h-1 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300 ease-in-out" />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/offres">
          <Button variant="outline" size="lg">
            Voir toutes nos offres
          </Button>
        </Link>
      </div>
    </Section>
  );
}
