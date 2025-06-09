'use client';

import { useEffect, useRef, useState } from 'react';

interface MapboxAutocompleteProps {
  label: string;
  placeholder: string;
  token: string;
  onSelect: (coordinates: [number, number], label: string) => void;
  className?: string;
}

export default function MapboxAutocomplete({
  label,
  placeholder,
  token,
  onSelect,
  className = '',
}: MapboxAutocompleteProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selected, setSelected] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            input
          )}.json?access_token=${token}&autocomplete=true&language=fr`
        );
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Erreur Mapbox:', error);
        setSuggestions([]);
      }
    }, 300);
  }, [input, token]);

  return (
    <div className={`mb-4 relative ${className}`}>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setSelected(false);
        }}
        className={`border px-3 py-2 w-full rounded ${
          !selected && input.length > 3 ? 'border-red-500' : ''
        }`}
        placeholder={placeholder}
      />
      {!selected && input.length > 3 && (
        <p className="text-red-500 text-sm mt-1">
          Veuillez choisir une ville dans la liste.
        </p>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((sugg, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              onClick={() => {
                const [lng, lat] = sugg.center;
                setInput(sugg.place_name);
                setSuggestions([]);
                setSelected(true);
                onSelect([lat, lng], sugg.place_name);
              }}
            >
              {sugg.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
