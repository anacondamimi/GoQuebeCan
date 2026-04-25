// src/lib/awin.ts

export const AWIN_BOOKING = {
  awinmid: 6776,
  awinaffid: 1950847,
  domain: 'www.awin1.com',
} as const;

function isBookingHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return host === 'booking.com' || host === 'www.booking.com' || host.endsWith('.booking.com');
}

export function cleanBookingUrl(input: string): string {
  try {
    const url = new URL(input);

    if (!isBookingHost(url.hostname)) {
      return input;
    }

    url.protocol = 'https:';
    url.hash = '';

    const keepParams = new Set(['ss', 'dest_id', 'dest_type', 'lang']);

    const cleanedParams = new URLSearchParams();

    for (const [key, value] of url.searchParams.entries()) {
      if (!keepParams.has(key)) continue;
      if (!value?.trim()) continue;
      cleanedParams.set(key, value);
    }

    url.search = cleanedParams.toString() ? `?${cleanedParams.toString()}` : '';

    return url.toString();
  } catch {
    return input;
  }
}

export function bookingAwin(input: string): string {
  const cleanedUrl = cleanBookingUrl(input);
  const encodedDestination = encodeURIComponent(cleanedUrl);

  return `https://${AWIN_BOOKING.domain}/cread.php?awinmid=${AWIN_BOOKING.awinmid}&awinaffid=${AWIN_BOOKING.awinaffid}&ued=${encodedDestination}`;
}
