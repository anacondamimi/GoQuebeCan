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
];

export default function ProducerTypeFilter({ selected, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onToggle(cat.id)}
          className={`
            px-3 py-1.5 rounded-full text-sm font-medium transition
            ${
              selected.includes(cat.id)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
