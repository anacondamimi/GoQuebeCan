import React from 'react';

type Testimonial = {
  name: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Sophie L.',
    quote:
      'Grâce à GoQuebeCan, notre road trip en famille a été magique. Le planificateur a sauvé notre temps et les adresses locales étaient au top !',
  },
  {
    name: 'Marc D.',
    quote:
      'Les vidéos m’ont vraiment aidé à choisir mes étapes. Je recommande vivement GoQuebeCan !',
  },
  {
    name: 'Amélie R.',
    quote:
      'Découvrir les producteurs locaux et réserver en quelques clics, c’est un vrai plus. Merci !',
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <div key={i} className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
          <p className="mb-4 italic text-gray-800">“{t.quote}”</p>
          <p className="text-right font-semibold">— {t.name}</p>
        </div>
      ))}
    </div>
  );
}
