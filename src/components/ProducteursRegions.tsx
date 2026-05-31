'use client';

import producers from '@/data/producers.json';

interface Props {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

export default function ProducteursRegions({ selectedRegion, onRegionSelect }: Props) {
  const regionCounts = producers.reduce((acc: Record<string, number>, p: any) => {
    if (!p.region) return acc;

    acc[p.region] = (acc[p.region] || 0) + 1;

    return acc;
  }, {});

  const regions = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]);

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Explorer par région</h2>

      <div className="flex flex-wrap gap-3">
        {regions.map(([region, count]) => (
          <button
            key={region}
            onClick={() => onRegionSelect(region)}
            className={`rounded-full px-4 py-2 transition ${
              selectedRegion === region ? 'bg-red-700 text-white' : 'bg-white border'
            }`}
          >
            {region} ({count})
          </button>
        ))}
      </div>
    </section>
  );
}
