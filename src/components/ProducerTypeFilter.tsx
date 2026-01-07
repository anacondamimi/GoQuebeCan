import React from 'react';
import { type ProducerCategory } from '@/utils/producersFilters';

interface Props {
  selected: ProducerCategory[];
  onToggle: (category: ProducerCategory) => void;
}

const categories: ReadonlyArray<{ id: ProducerCategory; label: string }> = [
  { id: 'cidrerie', label: '🍎 Pomme' },
  { id: 'vignoble', label: '🍇 Raisin' },
  { id: 'fromage', label: '🧀 Fromage' },
  { id: 'petitfruit', label: '🫐 Petits-Fruits' },
  { id: 'miel', label: '🐝 Miel' },
  { id: 'microbrasserie', label: '🍺 Bière' },
  { id: 'ferme', label: '🚜 Ferme' },
];

export default function ProducerTypeFilter({ selected, onToggle }: Props) {
  return (
    <div
      className="mb-4 flex flex-wrap gap-2"
      role="group"
      aria-label="Filtre par type de producteurs"
    >
      {categories.map(({ id, label }) => {
        const isSelected = selected.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={isSelected}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
