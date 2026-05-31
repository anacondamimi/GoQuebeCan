'use client';

import producers from '@/data/producers.json';

export default function ProducteursStats() {
  const total = producers.length;

  const byType = (type: string) => producers.filter((p) => p.type === type).length;

  const regions = new Set(producers.map((p: any) => p.region).filter(Boolean)).size;

  const cards = [
    {
      value: total,
      label: 'Producteurs',
      icon: '🍁',
    },
    {
      value: regions,
      label: 'Régions',
      icon: '🗺️',
    },
    {
      value: byType('microbrasserie'),
      label: 'Microbrasseries',
      icon: '🍺',
    },
    {
      value: byType('fromage'),
      label: 'Fromageries',
      icon: '🧀',
    },
    {
      value: byType('cidrerie'),
      label: 'Cidreries',
      icon: '🍎',
    },
    {
      value: byType('vignoble'),
      label: 'Vignobles',
      icon: '🍷',
    },
  ];

  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border bg-white p-5 text-center shadow-sm">
          <div className="mb-2 text-2xl">{card.icon}</div>

          <div className="text-3xl font-bold text-red-700">{card.value}</div>

          <div className="mt-1 text-sm text-gray-600">{card.label}</div>
        </div>
      ))}
    </section>
  );
}
