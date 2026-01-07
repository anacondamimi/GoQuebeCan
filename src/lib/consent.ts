export type ConsentPrefs = { functional: boolean; statistics: boolean; marketing: boolean };

export function getConsent(): (ConsentPrefs & { version?: string; date?: number }) | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('cookie_consent');
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasConsented(category: keyof ConsentPrefs): boolean {
  const c = getConsent();
  return !!c?.[category];
}
