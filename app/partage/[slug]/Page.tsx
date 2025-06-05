'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/components/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import html2pdf from 'html2pdf.js';
import { saveFeedback } from '@/components/lib/saveFeedback';

interface Step {
  id: string;
  name: string;
  coordinates: [number, number];
}

export default function SharedItineraryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchItinerary() {
      const { data, error } = await supabase
        .from('itineraries')
        .select('title, data')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Erreur chargement:', error.message);
        return;
      }

      setTitle(data.title);
      setSteps(data.data.steps || []);
    }

    fetchItinerary();
  }, [slug]);

  async function handleDuplicate() {
    const newSlug = uuidv4();

    const { error } = await supabase.from('itineraries').insert([
      {
        slug: newSlug,
        title: title + ' (copie)',
        data: { steps },
      },
    ]);

    if (!error) router.push(`/partage/${newSlug}`);
    else console.error('Erreur duplication:', error.message);
  }

  const handleExportPDF = () => {
    const content = document.getElementById('pdf-section');
    if (content) {
      html2pdf(content, {
        margin: 0.5,
        filename: `itineraire-${slug}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      });
    }
  };

  const handleSendFeedback = async () => {
    try {
      await saveFeedback(slug as string, feedback); // ✅ corrigé pour fonctionner avec la nouvelle signature
      setSubmitted(true);
      setFeedback('');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l’envoi');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">🧭 Itinéraire partagé</h1>

      <p className="text-gray-600 mb-4">
        Lien :
        <code className="text-sm bg-gray-100 px-2 py-1 rounded ml-2">{slug}</code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('🔗 Lien copié dans le presse-papier');
          }}
          className="ml-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Copier
        </button>
      </p>

      {steps ? (
        <>
          <div id="pdf-section" className="bg-white p-4 rounded shadow space-y-2 mb-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <ul className="mt-2">
              {steps.map((step, index) => (
                <li key={step.id} className="border-b pb-2">
                  <strong>
                    {index === 0 && '📍 Départ : '}
                    {index === steps.length - 1 && '🏁 Arrivée : '}
                    {index > 0 && index < steps.length - 1 && `🛑 Étape ${index} : `}
                  </strong>
                  {step.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleDuplicate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ➕ Dupliquer cet itinéraire
            </button>

            <button
              onClick={handleExportPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              📄 Exporter en PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic">Chargement...</p>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">💬 Laisser un avis</h2>
        {submitted ? (
          <p className="text-green-600">Merci pour votre retour 🙏</p>
        ) : (
          <>
            <textarea
              placeholder="Une remarque ou une suggestion ?"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded p-2 text-sm"
            />
            <button
              onClick={handleSendFeedback}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Envoyer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
