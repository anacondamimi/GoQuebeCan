// src/components/lib/saveFeedback.ts
export async function saveFeedback(slug: string, feedback: string) {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, feedback }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Erreur lors de la sauvegarde du feedback');
  }
}
