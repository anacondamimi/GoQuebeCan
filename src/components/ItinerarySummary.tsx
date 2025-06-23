'use client';

import React, { useEffect, useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ItinerarySummary() {
  const [summary, setSummary] = useState<any[]>([]);
  const [producers, setProducers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = localStorage.getItem('itinerary');
    const prod = localStorage.getItem('producerSuggestions');
    if (steps) setSummary(JSON.parse(steps));
    if (prod) setProducers(JSON.parse(prod));
  }, []);

  const translate = (fr: string) => {
    const dict: Record<string, string> = {
      fromage: 'cheese',
      cidre: 'cider',
      ferme: 'farm',
      vignoble: 'winery',
      bière: 'beer',
      'petits fruits': 'berries',
      Départ: 'Start',
      Arrivée: 'Arrival',
      Étape: 'Stop',
    };
    return dict[fr.toLowerCase()] || fr;
  };

  const generateAIComment = () => {
    if (!summary || summary.length === 0) return '';
    const from = summary[0]?.name || 'le départ';
    const to = summary[summary.length - 1]?.name || 'la destination finale';
    const count = summary.length - 2;
    return `Vous partez de ${from} pour un voyage jusqu’à ${to} avec ${count > 0 ? count + ' étape(s)' : 'aucune étape'}, ponctué de découvertes locales. 
    // You are traveling from ${from} to ${to} with ${count > 0 ? count + ' stop(s)' : 'no stops'}, featuring local discoveries.`;
  };

  const handleExportPDF = () => {
    if (!pdfRef.current) return;
    html2pdf(pdfRef.current, {
      margin: 0.5,
      filename: 'itinerary-bilingual.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    });
  };

  const handleSendEmail = async () => {
    alert('Fonctionnalité à connecter à Mailjet ou Resend');
  };

  if (!summary || summary.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-10">
      <div id="pdf-section" ref={pdfRef}>
        <h2 className="text-2xl font-bold mb-2">
          🧾 Résumé de votre itinéraire / Itinerary summary
        </h2>
        <p className="text-gray-600 italic mb-4">{generateAIComment()}</p>

        <ul className="list-decimal list-inside text-gray-800 space-y-2 mb-4">
          {summary.map((step, index) => (
            <li key={index}>
              <strong>
                {index === 0 && 'Départ / Start'}
                {index === summary.length - 1 && 'Arrivée / Arrival'}
                {index > 0 && index < summary.length - 1 && `Étape ${index} / Stop ${index}`}
              </strong>
              : {step.name}
            </li>
          ))}
        </ul>

        {producers && producers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">🍓 Suggestions locales / Local stops</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {producers.map(({ producer, distance }, i) => (
                <li key={i}>
                  <strong>{producer.name}</strong> ({producer.type} / {translate(producer.type)}) à
                  ~{distance.toFixed(1)} km
                  {producer.website && (
                    <>
                      {' — '}
                      <a
                        href={producer.website}
                        className="text-indigo-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        site web
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          📤 Exporter en PDF
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendEmail();
          }}
          className="flex flex-col sm:flex-row gap-2 items-center"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full sm:w-auto"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            📧 Envoyer par email / Send by email
          </button>
        </form>
      </div>
    </div>
  );
}
