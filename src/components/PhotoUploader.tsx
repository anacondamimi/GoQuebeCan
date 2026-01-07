'use client';

import React, { useRef } from 'react';
import { convertToAvifOrWebp } from '@/lib/image';
import { useItineraryStore } from '@/store/useItineraryStore';

interface Props {
  stepIndex: number;
}

export default function PhotoUploader({ stepIndex }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { itinerary, addPhoto, removePhoto, movePhoto, setPhotoCaption } = useItineraryStore();

  const photos = itinerary[stepIndex]?.photos ?? [];

  async function onSelectFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      try {
        const { blob, mime, width, height } = await convertToAvifOrWebp(file, {
          maxSize: 1600,
          quality: 0.8,
        });
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(String(fr.result));
          fr.onerror = reject;
          fr.readAsDataURL(blob);
        });
        addPhoto(stepIndex, {
          id: crypto.randomUUID(),
          dataUrl,
          mime,
          width,
          height,
          caption: '',
        });
      } catch (err) {
        console.error('Image conversion error:', err);
      }
    }

    // reset input to allow re-uploading same files
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onSelectFiles}
          className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-white file:px-3 file:py-1.5 file:text-sm hover:file:bg-gray-50"
        />
      </div>

      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, idx) => (
            <li key={p.id} className="rounded-lg border bg-white p-2 shadow-sm">
              <img
                src={p.dataUrl}
                alt={p.caption || `photo-${idx + 1}`}
                className="h-32 w-full rounded-md object-cover"
              />
              <input
                type="text"
                value={p.caption ?? ''}
                onChange={(e) => setPhotoCaption(stepIndex, p.id, e.target.value)}
                placeholder="Ajouter une légende…"
                className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {p.mime.replace('image/', '').toUpperCase()} · {p.width ?? '—'}×{p.height ?? '—'}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => idx > 0 && movePhoto(stepIndex, idx, idx - 1)}
                    className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    title="Monter"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => idx < photos.length - 1 && movePhoto(stepIndex, idx, idx + 1)}
                    className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    title="Descendre"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(stepIndex, p.id)}
                    className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    title="Supprimer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
