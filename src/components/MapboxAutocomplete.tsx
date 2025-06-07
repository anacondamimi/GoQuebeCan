"use client";
import React, { useEffect, useState, useRef } from 'react';

interface MapboxAutocompleteProps {
  label: string;
  placeholder?: string;
  onSelect: (coords: [number, number], label: string) => void;
  token: string;
}

export default function MapboxAutocomplete({
  label,
  placeholder,
  onSelect,
  token,
}: MapboxAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!inputValue) {
        setSuggestions([]);
        return;
      }

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        inputValue
      )}.json?access_token=${token}&autocomplete=true&country=CA&language=fr`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Erreur Mapbox:', error);
        setSuggestions([]);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [inputValue, token]);

  const handleSelect = (feature: any) => {
    const coords: [number, number] = [feature.center[1], feature.center[0]];
    setInputValue(feature.place_name);
    setSuggestions([]);
    onSelect(coords, feature.place_name);
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className="w-full border px-3 py-2 rounded"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
          {suggestions.map((feature) => (
            <li
              key={feature.id}
              onClick={() => handleSelect(feature)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {feature.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
