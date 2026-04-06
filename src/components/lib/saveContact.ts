export type ContactForm = {
  nom: string;
  email: string;
  message: string;
  type: 'contact' | 'producteur' | 'itineraire';
};

export type SaveContactResult = { success: true } | { success: false; error: string };

type Grecaptcha = {
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
  ready?: (cb: () => void) => void;
};

type ContactApiError = {
  error?: string;
};

function getGrecaptcha(): Grecaptcha | null {
  if (typeof window === 'undefined') return null;
  const w = window as Window & { grecaptcha?: Grecaptcha };
  return w.grecaptcha ?? null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

async function waitForGrecaptcha(maxWaitMs = 4000): Promise<Grecaptcha | null> {
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    const gc = getGrecaptcha();
    if (gc) return gc;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return null;
}

async function maybeGetRecaptchaToken(action: string): Promise<string | undefined> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!isNonEmptyString(siteKey)) {
    console.warn('[saveContact] NEXT_PUBLIC_RECAPTCHA_SITE_KEY manquante');
    return undefined;
  }

  const gc = await waitForGrecaptcha();

  if (!gc) {
    console.warn('[saveContact] grecaptcha non chargé sur la page');
    return undefined;
  }

  try {
    if (typeof gc.ready === 'function') {
      await new Promise<void>((resolve) => gc.ready?.(resolve));
    }

    const token = await gc.execute(siteKey, { action });

    if (!isNonEmptyString(token)) {
      console.warn('[saveContact] token reCAPTCHA vide');
      return undefined;
    }

    return token;
  } catch (error) {
    console.warn('[saveContact] échec génération token reCAPTCHA', error);
    return undefined;
  }
}

async function parseJsonSafe<T = unknown>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function saveContact(form: ContactForm): Promise<SaveContactResult> {
  const nom = form.nom.trim();
  const email = form.email.trim();
  const message = form.message.trim();
  const type = form.type;

  if (!nom) {
    return { success: false, error: 'Veuillez indiquer votre nom.' };
  }

  if (!email) {
    return { success: false, error: 'Veuillez indiquer votre email.' };
  }

  if (!message) {
    return { success: false, error: 'Veuillez écrire un message.' };
  }

  const token = await maybeGetRecaptchaToken('contact');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const payload = {
      nom,
      email,
      message,
      type,
      token: token ?? null,
      honey: '',
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await parseJsonSafe<ContactApiError>(res);

    if (!res.ok) {
      const serverError =
        data && typeof data.error === 'string' && data.error.trim()
          ? data.error
          : `Erreur lors de l’envoi (code ${res.status})`;

      if (serverError.toLowerCase().includes('recaptcha')) {
        return {
          success: false,
          error:
            "La vérification anti-spam n'a pas pu être validée. Recharge la page puis réessaie.",
        };
      }

      return { success: false, error: serverError };
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        success: false,
        error: 'Le serveur a mis trop de temps à répondre. Réessaie dans quelques secondes.',
      };
    }

    const message =
      err instanceof Error && err.message ? err.message : "Une erreur réseau s'est produite.";

    return { success: false, error: message };
  } finally {
    clearTimeout(timeoutId);
  }
}
