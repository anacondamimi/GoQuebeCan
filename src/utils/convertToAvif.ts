// ✅ Fonction utilitaire : convertit une image en base64 .avif
export async function convertToAvif(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const newReader = new FileReader();
            newReader.readAsDataURL(blob);
            newReader.onloadend = () => {
              resolve(newReader.result as string);
            };
          },
          'image/avif',
          0.7, // compression qualité moyenne
        );
      };
    };
  });
}
