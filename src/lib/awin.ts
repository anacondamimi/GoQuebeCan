// src/lib/awin.ts
export const AWIN_BOOKING = {
  awinmid: 6776, // Booking.com Amérique du Nord
  awinaffid: 1950847, // ton Publisher ID
  domain: 'www.awin1.com',
};

/**
 * Nettoie une URL Booking pour éviter les paramètres inutiles (utm, label, sid, checkin...)
 * et garder un lien "propre" qui convertit bien.
 */
export function cleanBookingUrl(input: string) {
  try {
    const u = new URL(input);

    // Sécurité: on ne nettoie que Booking
    if (!u.hostname.includes('booking.com')) return input;

    // Paramètres qu'on garde (minimaux, utiles à la page)
    // - ss (recherche), dest_id/dest_type (ville/région), lang
    // Le reste (aid, label, utm, sid, checkin, checkout...) est du bruit marketing.
    const keep = new Set(['ss', 'dest_id', 'dest_type', 'lang', 'checkin', 'checkout']);

    // Si tu veux éviter de figer des dates dans tes liens, commente ces 2 lignes:
    keep.delete('checkin');
    keep.delete('checkout');

    // Reconstruire les searchParams
    const params = new URLSearchParams();
    for (const [k, v] of u.searchParams.entries()) {
      if (keep.has(k)) params.set(k, v);
    }

    u.search = params.toString() ? `?${params.toString()}` : '';
    u.hash = '';
    return u.toString();
  } catch {
    return input;
  }
}

/**
 * Transforme une URL Booking (ville/hôtel/recherche) en lien affilié AWIN.
 */
export function bookingAwin(url: string) {
  const clean = cleanBookingUrl(url);
  const ued = encodeURIComponent(clean);
  const { domain, awinmid, awinaffid } = AWIN_BOOKING;
  return `https://${domain}/cread.php?awinmid=${awinmid}&awinaffid=${awinaffid}&ued=${ued}`;
}
