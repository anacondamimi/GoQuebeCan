import React from 'react';
import BrandName from '@/components/brand/BrandName';

type Testimonial = {
  id: string;
  name: string;
  quote: React.ReactNode;
};

const testimonials: Testimonial[] = [
  {
    id: 'sophie',
    name: 'Sophie L.',
    quote: (
      <>
        Grâce à <BrandName />, notre road trip en famille a été magique. Le planificateur nous a
        fait gagner un temps fou et les adresses locales étaient incroyables.
      </>
    ),
  },
  {
    id: 'marc',
    name: 'Marc D.',
    quote: (
      <>
        Les vidéos m’ont vraiment aidé à choisir mes étapes. Je recommande vivement <BrandName /> !
      </>
    ),
  },
  {
    id: 'amelie',
    name: 'Amélie R.',
    quote: (
      <>
        Découvrir les producteurs locaux et réserver en quelques clics, c’est un vrai plus. Merci{' '}
        <BrandName /> !
      </>
    ),
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={t.id}
          className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <blockquote className="mb-4 italic text-gray-800">“{t.quote}”</blockquote>
          <figcaption className="text-right font-semibold">— {t.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
