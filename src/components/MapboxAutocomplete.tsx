'use client';

import { useEffect, useId, useRef, useState } from 'react';

export interface MapboxAutocompleteProps {
  label: string;
  placeholder: string;
  token: string;
  eventChannel: string;
  className?: string;
  onGeoClick?: () => void; // ✅ ajouté
}

type MapboxFeature = {
  place_name: string;
  center: [number, number]; // [lng, lat] (Mapbox)
};

type MapboxResponse = {
  features?: MapboxFeature[];
};

export default function MapboxAutocomplete({
  label,
  placeholder,
  token,
  eventChannel,
  className = '',
  onGeoClick,
}: MapboxAutocompleteProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [selected, setSelected] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // id unique pour éviter les conflits entre plusieurs instances
  const autoId = useId();
  const inputId = `mapbox-autocomplete-${autoId}`;
  const listboxId = `mapbox-listbox-${autoId}`;

  useEffect(() => {
    const MIN_LEN = 3;

    if (!token) {
      console.warn(
        '[MapboxAutocomplete] Token Mapbox manquant. Le champ sera affiché mais aucune suggestion ne sera chargée.',
      );
      return;
    }

    if (input.length < MIN_LEN) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
      setSuggestions((prev) => (prev.length ? [] : prev));
      setHasSearched(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (abortRef.current) abortRef.current.abort();

    timeoutRef.current = setTimeout(async () => {
      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json` +
          `?access_token=${token}` +
          '&autocomplete=true' +
          '&country=CA' +
          '&language=fr' +
          '&types=address,place,locality,postcode' +
          '&limit=5';

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Mapbox ${res.status}`);

        const data = (await res.json()) as MapboxResponse;
        const feats = Array.isArray(data.features) ? data.features : [];

        setHasSearched(true);

        setSuggestions((prev) => {
          if (
            prev.length === feats.length &&
            prev.every((p, i) => p.place_name === feats[i]?.place_name)
          ) {
            return prev;
          }
          return feats;
        });
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          console.error('Erreur Mapbox:', err);
          setSuggestions((prev) => (prev.length ? [] : prev));
          setHasSearched(true);
        }
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [input, token]);

  const showChooseMessage = input.length >= 3 && hasSearched && !selected && suggestions.length > 0;

  const showNoResultsMessage =
    input.length >= 3 && hasSearched && suggestions.length === 0 && !selected;

  return (
    <div className={`relative mb-4 ${className}`}>
      <label htmlFor={inputId} className="mb-1 block font-semibold">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected(false);
          }}
          className={`w-full rounded border px-3 py-2 pr-12 ${
            showChooseMessage || showNoResultsMessage ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={undefined}
        />

        {onGeoClick && (
          <button
            type="button"
            onClick={onGeoClick}
            className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md border bg-white text-lg hover:bg-gray-50"
            title="Utiliser ma position"
            aria-label="Utiliser ma position"
          >
            🎯
          </button>
        )}
      </div>

      {showChooseMessage && (
        <p className="mt-1 text-sm text-red-500">Veuillez choisir une ville dans la liste.</p>
      )}

      {showNoResultsMessage && (
        <p className="mt-1 text-sm text-red-500">
          Aucune ville trouvée pour cette recherche. Essayez un autre nom ou ajoutez des détails.
        </p>
      )}

      {suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white shadow"
        >
          {suggestions.map((sugg, idx) => (
            <li
              key={`${sugg.place_name}-${idx}`}
              role="option"
              aria-selected={false}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-100"
              onClick={() => {
                const [lng, lat] = sugg.center;
                setInput(sugg.place_name);
                setSuggestions([]);
                setSelected(true);

                const detail = {
                  coordinates: [lng, lat] as [number, number],
                  label: sugg.place_name,
                };

                window.dispatchEvent(new CustomEvent(eventChannel, { detail }));
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
