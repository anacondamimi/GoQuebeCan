// 📂 src/components/lib/saveContact.ts

export type ContactForm = {
  nom: string;
  email: string;
  message: string;
  type: 'contact' | 'producteur' | 'itineraire';
};

export type SaveContactResult = { success: true } | { success: false; error: string };

// ---- reCAPTCHA (client) helpers ----
type Grecaptcha = {
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  ready?: (cb: () => void) => void;
};

function getGrecaptcha(): Grecaptcha | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { grecaptcha?: Grecaptcha };
  return w.grecaptcha ?? null;
}

async function maybeGetRecaptchaToken(action: string): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const gc = getGrecaptcha();
  if (!siteKey || !gc) return undefined;

  try {
    // `ready` n’est pas toujours nécessaire, mais on le gère si présent
    if (typeof gc.ready === 'function') {
      await new Promise<void>((resolve) => gc.ready!(resolve));
    }
    const token = await gc.execute(siteKey, { action });
    return typeof token === 'string' && token.length > 0 ? token : undefined;
  } catch {
    return undefined;
  }
}

// ---- JSON parsing safe (aucun any) ----
async function parseJsonSafe(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// ---- Public API ----
export async function saveContact(form: ContactForm): Promise<SaveContactResult> {
  // Optionnel : token recaptcha (si configuré côté client)
  const token = await maybeGetRecaptchaToken('contact');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000); // 10s

  try {
    const payload = {
      ...form,
      token, // peut être undefined : la route serveur gère le cas
      honey: '', // honeypot vide par défaut (tu peux le remplir côté UI si besoin)
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const dataU = await parseJsonSafe(res);
      // Essaie d’extraire un message serveur si présent
      const msg =
        (typeof (dataU as { error?: unknown })?.error === 'string'
          ? (dataU as { error: string }).error
          : null) ?? `Erreur lors de l’envoi (code ${res.status})`;
      return { success: false, error: msg };
    }

    // OK
    return { success: true };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    // Timeout / Abort
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { success: false, error: '⏳ Le serveur a mis trop de temps à répondre.' };
    }

    const message = err instanceof Error ? err.message : 'Erreur réseau inconnue';
    return { success: false, error: message };
  }
}
