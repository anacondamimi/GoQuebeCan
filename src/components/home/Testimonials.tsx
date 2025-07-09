import React from 'react';

type Testimonial = {
  name: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Sophie L.',
    quote:
      'Grâce à GoQuébeCan, notre road trip en famille a été magique. Le planificateur a sauvé notre temps et les adresses locales étaient au top !',
  },
  {
    name: 'Marc D.',
    quote:
      'Les vidéos m’ont vraiment aidé à choisir mes étapes. Je recommande vivement GoQuébeCan !',
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
        <div key={i} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-gray-800 italic mb-4">“{t.quote}”</p>
          <p className="text-right font-semibold">— {t.name}</p>
        </div>
      ))}
    </div>
  );
}
