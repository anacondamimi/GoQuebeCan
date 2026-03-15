'use client';

import { useEffect, useId, useRef, useState } from 'react';

export interface MapboxAutocompleteProps {
  label: string;
  placeholder: string;
  token: string;
  eventChannel: string;
  className?: string;
  onGeoClick?: () => void;
  proximity?: [number, number] | null; // [lng, lat]
  minLength?: number;
}

type MapboxFeature = {
  id?: string;
  place_name: string;
  text?: string;
  center: [number, number]; // [lng, lat]
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
  proximity = null,
  minLength = 3,
}: MapboxAutocompleteProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [selected, setSelected] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [apiError, setApiError] = useState('');

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const autoId = useId();
  const inputId = `mapbox-autocomplete-${autoId}`;
  const listboxId = `mapbox-listbox-${autoId}`;

  const closeSuggestions = () => {
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const dispatchSelection = (feature: MapboxFeature) => {
    const [lng, lat] = feature.center;

    setInput(feature.place_name);
    setSelected(true);
    setHasSearched(true);
    setApiError('');
    closeSuggestions();

    const detail = {
      coordinates: [lng, lat] as [number, number],
      label: feature.place_name,
    };

    window.dispatchEvent(new CustomEvent(eventChannel, { detail }));
  };

  useEffect(() => {
    if (!token) {
      console.warn(
        '[MapboxAutocomplete] Token Mapbox manquant. Le champ est affiché mais les suggestions sont désactivées.',
      );
      return;
    }

    const trimmed = input.trim();

    if (trimmed.length < minLength) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
      setSuggestions((prev) => (prev.length ? [] : prev));
      setHasSearched(false);
      setHighlightedIndex(-1);
      setApiError('');
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (abortRef.current) abortRef.current.abort();

    timeoutRef.current = setTimeout(async () => {
      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const proximityParam =
          proximity && Number.isFinite(proximity[0]) && Number.isFinite(proximity[1])
            ? `&proximity=${proximity[0]},${proximity[1]}`
            : '';

        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmed)}.json` +
          `?access_token=${token}` +
          '&autocomplete=true' +
          '&country=CA' +
          '&language=fr' +
          '&types=place,locality,region,district,address,postcode' +
          '&limit=6' +
          proximityParam;

        const res = await fetch(url, {
          signal: controller.signal,
          cache: 'no-store',
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('[MapboxAutocomplete] HTTP error', {
            status: res.status,
            statusText: res.statusText,
            body: errorText,
            url,
          });
          throw new Error(`Mapbox ${res.status}: ${errorText}`);
        }

        const data = (await res.json()) as MapboxResponse;
        const feats = Array.isArray(data.features) ? data.features : [];

        setHasSearched(true);
        setApiError('');
        setHighlightedIndex(feats.length > 0 ? 0 : -1);

        setSuggestions((prev) => {
          if (
            prev.length === feats.length &&
            prev.every(
              (p, i) =>
                p.place_name === feats[i]?.place_name &&
                p.center[0] === feats[i]?.center?.[0] &&
                p.center[1] === feats[i]?.center?.[1],
            )
          ) {
            return prev;
          }
          return feats;
        });
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          console.error('[MapboxAutocomplete] Erreur Mapbox :', err);

          const message = (err as Error).message || '';

          let userMessage =
            'La recherche de lieux est temporairement indisponible. Vérifiez votre connexion puis réessayez.';

          if (message.includes('401')) {
            userMessage = 'Le service de recherche n’est pas autorisé pour le moment.';
          } else if (message.includes('403')) {
            userMessage =
              'Le service de recherche est bloqué sur ce domaine. Vérifiez la configuration du token Mapbox.';
          } else if (message.includes('422')) {
            userMessage = 'La recherche a échoué à cause d’un paramètre invalide.';
          } else if (message.includes('429')) {
            userMessage =
              'Le service de recherche est temporairement saturé. Réessayez dans quelques instants.';
          }

          setSuggestions([]);
          setHasSearched(true);
          setHighlightedIndex(-1);
          setApiError(userMessage);
        }
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [input, token, proximity, minLength]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        closeSuggestions();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const showChooseMessage =
    input.trim().length >= minLength && hasSearched && !selected && suggestions.length > 0;

  const showNoResultsMessage =
    input.trim().length >= minLength &&
    hasSearched &&
    suggestions.length === 0 &&
    !selected &&
    !apiError;

  const activeDescendant =
    highlightedIndex >= 0 && suggestions[highlightedIndex]
      ? `${listboxId}-option-${highlightedIndex}`
      : undefined;

  return (
    <div ref={wrapperRef} className={`relative mb-4 ${className}`}>
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
            setApiError('');
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setHighlightedIndex(0);
            }
          }}
          onKeyDown={(e) => {
            if (!suggestions.length) {
              if (e.key === 'Escape') {
                closeSuggestions();
              }
              return;
            }

            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlightedIndex((prev) => {
                const next = prev < suggestions.length - 1 ? prev + 1 : 0;
                return next;
              });
            }

            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlightedIndex((prev) => {
                const next = prev > 0 ? prev - 1 : suggestions.length - 1;
                return next;
              });
            }

            if (e.key === 'Enter') {
              if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                e.preventDefault();
                dispatchSelection(suggestions[highlightedIndex]);
              }
            }

            if (e.key === 'Escape') {
              e.preventDefault();
              closeSuggestions();
            }
          }}
          className={`w-full rounded border px-3 py-2 pr-12 ${
            showChooseMessage || showNoResultsMessage || apiError ? 'border-red-500' : ''
          }`}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={suggestions.length > 0}
          aria-activedescendant={activeDescendant}
          role="combobox"
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

      {showChooseMessage && !apiError && (
        <p className="mt-1 text-sm text-red-500">Veuillez choisir une destination dans la liste.</p>
      )}

      {showNoResultsMessage && (
        <p className="mt-1 text-sm text-red-500">
          Aucune destination trouvée au Canada. Essayez un autre nom ou ajoutez plus de détails.
        </p>
      )}

      {apiError && <p className="mt-1 text-sm text-red-500">{apiError}</p>}

      {suggestions.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white shadow"
        >
          {suggestions.map((sugg, idx) => {
            const isActive = idx === highlightedIndex;

            return (
              <li
                key={`${sugg.id ?? sugg.place_name}-${idx}`}
                id={`${listboxId}-option-${idx}`}
                role="option"
                aria-selected={isActive}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  isActive ? 'bg-blue-100' : 'hover:bg-blue-50'
                }`}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  dispatchSelection(sugg);
                }}
              >
                {sugg.place_name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
