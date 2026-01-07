import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';

// Étend proprement le type pour accéder à lastAutoTable sans "any"
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

/**
 * Types publics
 */
export type StepLike = {
  id?: string | number;
  name?: string | null;
  title?: string | null;
  role: 'start' | 'via' | 'end';
  lat: number;
  lng: number;
  // Notes potentiellement hétérogènes (string, objet, tableau)
  notes?: unknown;
  // Champs optionnels fréquents (legacy)
  restaurants?: string | null;
  sorties?: string | null;
  recharge?: string | null;
  autresNotes?: string | null;
};

export type Branding = {
  brand?: string; // ex: 'GoQuébeCAN'
  logoUrl?: string; // ex: '/images/logo.png'
  cardUrl?: string; // ex: '/images/carte.avif'
  greeting?: string; // phrase d'accroche sous le titre
  shareCtaText?: string; // texte lien
  shareCtaUrl?: string; // URL lien (relative ou absolue)
  footerNote?: string; // phrase finale
};

function resolveBranding(b?: Branding): Required<Branding> {
  return {
    brand: b?.brand ?? 'GoQuébeCAN',
    logoUrl: b?.logoUrl ?? '/images/logo.png',
    cardUrl: b?.cardUrl ?? '/images/carte.avif',
    greeting:
      b?.greeting ??
      'Bonnes vacances au Québec ! Profitez des paysages, des saveurs locales et de la chaleur de nos producteurs — GoQuébeCAN vous accompagne à chaque étape.',
    shareCtaText: b?.shareCtaText ?? 'Partager mon itinéraire',
    shareCtaUrl: toAbsolute(b?.shareCtaUrl ?? '/contact'),
    footerNote: b?.footerNote ?? 'GoQuébeCAN vous souhaite de très bonnes vacances.',
  };
}

/**
 * Export principal
 */
export async function exportToPDF(
  filename: string,
  steps: ReadonlyArray<StepLike>,
  branding?: Branding,
): Promise<void> {
  const brand = resolveBranding(branding);

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40; // marge externe

  // Couleurs et typo
  const brandBlue: [number, number, number] = [33, 64, 154];
  const gray: [number, number, number] = [90, 90, 90];

  let y = margin;

  // 1) LOGO en haut gauche (petit) — on réserve la hauteur pour éviter tout chevauchement
  if (brand.logoUrl) {
    try {
      const logo = await loadImageAsPng(brand.logoUrl);
      const logoMaxH = 42; // hauteur visuelle souhaitée
      const scale = logo.height > 0 ? logoMaxH / logo.height : 1;
      const w = Math.min(logo.width * scale, 80);
      const h = Math.min(logo.height * scale, logoMaxH);
      doc.addImage(logo.dataURL, 'PNG', margin, y, w, h, undefined, 'FAST');
      y += h + 12; // espace sous le logo
    } catch {
      // pas bloquant
    }
  }

  // 2) TITRE centré
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(`Itinéraire ${brand.brand}`.trim(), pageW / 2, y, { align: 'center', baseline: 'top' });
  y += 26;

  // 3) Greeting centré (wrap)
  if (brand.greeting) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...gray);
    const lines = doc.splitTextToSize(brand.greeting, pageW - 2 * margin);
    doc.text(lines, pageW / 2, y, { align: 'center', baseline: 'top' });
    y += lines.length * 14 + 8;

    // CTA (petit lien) — centré sous l'accroche (URL ABSOLUE)
    if (brand.shareCtaText && brand.shareCtaUrl) {
      doc.setTextColor(...brandBlue);
      const fs = 12; // taille de police actuelle
      const text = brand.shareCtaText;
      const textWidth = doc.getTextWidth(text);
      const x = (pageW - textWidth) / 2;
      // texte
      doc.text(text, x, y);
      // zone cliquable
      doc.link(x, y - fs, Math.max(textWidth, 40), fs + 4, { url: brand.shareCtaUrl });
      y += fs + 6;
      doc.setTextColor(0, 0, 0);
    }
  }

  // 4) Tableau des étapes (role / lieu / notes)
  const rows: RowInput[] = steps.map((s, i) => [
    String(i + 1),
    roleLabel(s.role, i),
    displayLieu(s),
    buildNotes(s),
  ]);

  autoTable(doc, {
    head: [['#', 'Rôle', 'Lieu', 'Notes']],
    body: rows,
    startY: y + 6,
    theme: 'striped',
    styles: {
      font: 'helvetica',
      fontSize: 11,
      cellPadding: 6,
      overflow: 'linebreak',
      valign: 'top',
    },
    headStyles: {
      fillColor: brandBlue,
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 24 },
      1: { cellWidth: 72 },
      2: { cellWidth: (pageW - 2 * margin) * 0.45 },
      3: { cellWidth: (pageW - 2 * margin) * 0.35 },
    },
    margin: { left: margin, right: margin },
  });

  // y après le tableau (accès typé grâce à l'augmentation de module ci-dessus)
  y = doc.lastAutoTable?.finalY ?? y + 24;
  y += 14;

  // 5) Image "carte" CENTRÉE sous le tableau, AVANT la phrase finale
  if (brand.cardUrl) {
    try {
      const card = await loadImageAsPng(brand.cardUrl);
      const maxW = pageW - 2 * margin;
      const targetW = Math.min(maxW, 420); // largeur visuelle max
      const scale = card.width > 0 ? targetW / card.width : 1;
      const w = card.width * scale;
      const h = card.height * scale;

      // Si l'image dépasse la page, on saute de page
      if (y + h + 40 > pageH) {
        doc.addPage();
        y = margin;
      }
      const x = (pageW - w) / 2;
      doc.addImage(card.dataURL, 'PNG', x, y, w, h, undefined, 'FAST');
      y += h + 18;
    } catch {
      // non bloquant
    }
  }

  // 6) Phrase finale centrée
  if (brand.footerNote) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...gray);
    const lines = doc.splitTextToSize(brand.footerNote, pageW - 2 * margin);
    if (y + lines.length * 14 + margin > pageH) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, pageW / 2, y, { align: 'center', baseline: 'top' });
  }

  doc.save(filename);
}

/** Utils **/
function roleLabel(role: StepLike['role'], i: number): string {
  return role === 'start' ? 'Départ' : role === 'end' ? 'Arrivée' : `Étape ${i}`;
}

function displayLieu(s: StepLike): string {
  const base = (s.name ?? s.title)?.toString().trim();
  if (base) return base;
  // fallback coordonnées
  return `${s.lat.toFixed(4)}, ${s.lng.toFixed(4)}`;
}

// ➜ Nouvelle version tolérante : aplatit string / objet / tableau
function buildNotes(s: StepLike): string {
  const out: string[] = [];

  const pick = (v: unknown): void => {
    if (v == null) return;
    if (typeof v === 'string') {
      const t = v.trim();
      if (t) out.push(t);
    } else if (Array.isArray(v)) {
      (v as unknown[]).forEach(pick);
    } else if (typeof v === 'object') {
      Object.values(v as Record<string, unknown>).forEach(pick);
    }
  };

  // notes structurées (modal)
  pick(s.notes);

  // anciens champs à plat (si présents dans tes steps)
  pick((s as { sorties?: unknown }).sorties);
  pick((s as { restaurants?: unknown }).restaurants);
  pick((s as { recharge?: unknown }).recharge);
  pick((s as { autresNotes?: unknown }).autresNotes);

  return out.join('\n');
}

interface ImageInfo {
  dataURL: string;
  width: number;
  height: number;
}

async function loadImageAsPng(url: string): Promise<ImageInfo> {
  const abs = toAbsolute(url);
  const img = await loadImage(abs);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || (img as HTMLImageElement).width;
  canvas.height = img.naturalHeight || (img as HTMLImageElement).height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D non disponible');
  ctx.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL('image/png');
  return { dataURL, width: canvas.width, height: canvas.height };
}

function toAbsolute(u: string): string {
  if (/^https?:\/\//i.test(u)) return u;
  if (typeof window === 'undefined') return u; // SSR : on ne peut pas résoudre
  const base = typeof location !== 'undefined' ? location.origin : '';
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed: ' + src));
    img.src = src;
  });
}
