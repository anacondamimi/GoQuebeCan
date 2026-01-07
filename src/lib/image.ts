// src/lib/image.ts
export function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (!canvas.toBlob) {
      try {
        const dataUrl = canvas.toDataURL(type, quality);
        const comma = dataUrl.indexOf(',');
        const meta = dataUrl.substring(0, comma);
        const base64 = dataUrl.substring(comma + 1);
        const byteString = atob(base64);
        const mimeMatch = meta.match(/^data:([^;]+)/);
        const mime = mimeMatch ? mimeMatch[1] : type;
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);
        resolve(new Blob([ab], { type: mime }));
      } catch {
        resolve(null);
      }
      return;
    }
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function tryEncode(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number,
): Promise<Blob | null> {
  const blob = await canvasToBlob(canvas, mime, quality);
  return blob ?? null;
}

export async function convertToAvifOrWebp(
  file: File,
  opts: { maxSize?: number; quality?: number } = {},
): Promise<{ blob: Blob; mime: string; width: number; height: number }> {
  const maxSize = opts.maxSize ?? 1600;
  const quality = opts.quality ?? 0.8;

  const img = await fileToImage(file);
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unsupported');
  ctx.drawImage(img, 0, 0, width, height);

  const avif = await tryEncode(canvas, 'image/avif', quality);
  if (avif) return { blob: avif, mime: 'image/avif', width, height };

  const webp = await tryEncode(canvas, 'image/webp', quality);
  if (webp) return { blob: webp, mime: 'image/webp', width, height };

  const jpeg = await tryEncode(canvas, 'image/jpeg', 0.85);
  if (jpeg) return { blob: jpeg, mime: 'image/jpeg', width, height };

  return {
    blob: file,
    mime: file.type || 'application/octet-stream',
    width: img.width,
    height: img.height,
  };
}
