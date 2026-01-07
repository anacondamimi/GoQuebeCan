// 📂 src/lib/webhook.ts
type WebhookParams = {
  text: string; // Titre / message principal
  fields?: Record<string, string>; // Paires clé/valeur optionnelles
};

// Récupère l’URL Slack depuis l’env, ou null si absente
function getSlackWebhookUrl(): string | null {
  const url = process.env.SLACK_WEBHOOK_URL;
  return typeof url === 'string' && url.length > 0 ? url : null;
}

// Construit un payload joli en blocks (Slack)
function buildSlackBody(p: WebhookParams) {
  const blocks: Array<Record<string, unknown>> = [
    { type: 'section', text: { type: 'mrkdwn', text: `*${p.text}*` } },
  ];
  if (p.fields && Object.keys(p.fields).length > 0) {
    blocks.push({
      type: 'section',
      fields: Object.entries(p.fields).map(([k, v]) => ({
        type: 'mrkdwn',
        text: `*${k}*\n${v}`,
      })),
    });
  }
  return { blocks } as const;
}

/**
 * Envoie un message vers Slack si SLACK_WEBHOOK_URL est défini.
 * Ne lève pas d’erreur si l’URL manque (no-op silencieux).
 */
export async function postWebhook(p: WebhookParams): Promise<void> {
  const url = getSlackWebhookUrl();
  if (!url) return; // pas configuré → on ignore

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildSlackBody(p)),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    // Log non bloquant
    console.error(`Slack webhook failed: ${res.status} ${res.statusText} ${txt}`);
  }
}
