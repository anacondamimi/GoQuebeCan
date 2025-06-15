"use client";
import React from 'react';

interface Props {
  selected: string[];
  onToggle: (category: string) => void;
}

const categories = [
  { id: 'apple', label: '🍎 Pomme' },
  { id: 'grape', label: '🍇 Raisin' },
  { id: 'cheese', label: '🧀 Fromage' },
  { id: 'berry', label: '🫐 Fruits' },
  { id: 'beer', label: '🍺 Bière' },
  { id: 'farm', label: '🚜 Ferme' },  // 🚜 Un pictogramme plus clair pour une ferme (vs 🥩 qui fait penser à un boucher)
];

export default function ProducerTypeFilter({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map(({ id, label }) => {
        const isSelected = selected.includes(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition
              ${isSelected
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
            aria-pressed={isSelected}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
