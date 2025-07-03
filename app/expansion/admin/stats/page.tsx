'use client';

import React, { useEffect, useState } from 'react';

export default function StatsPage() {
  type Stat = { asin: string; category: string; clicks: number };
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const mockStats = [
      { asin: 'B08FCX7L2L', category: 'security', clicks: 25 },
      { asin: 'B07P6X3VFW', category: 'baggage', clicks: 12 },
      { asin: 'B07FDFP99H', category: 'comfort', clicks: 42 },
    ];
    setStats(mockStats);
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📈 Statistiques Clics Affiliés (Test)</h1>
      <table className="w-full border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ASIN</th>
            <th className="p-2 text-left">Catégorie</th>
            <th className="p-2 text-left">Clics</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-mono">{item.asin}</td>
              <td className="p-2 capitalize">{item.category}</td>
              <td className="p-2">{item.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
