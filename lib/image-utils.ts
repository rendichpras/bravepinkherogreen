// Fungsi untuk mengkonversi hex ke RGB
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

// Worker untuk pemrosesan gambar
export const processImageData = (
  data: Uint8ClampedArray,
  width: number,
  height: number,
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
  intensityFactor: number
) => {
  // Optimasi: Batch size yang lebih besar untuk gambar besar
  const totalPixels = width * height;
  const batchSize = Math.max(100000, Math.floor(totalPixels / 10)); // Minimal 100k piksel per batch
  let index = 0;

  return new Promise<Uint8ClampedArray>((resolve) => {
    const processNextBatch = () => {
      const end = Math.min(index + batchSize, data.length);

      // Optimasi: Gunakan loop yang lebih efisien
      for (let i = index; i < end; i += 4) {
        // Mengkonversi RGB ke grayscale (formula yang lebih efisien)
        const gray = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) | 0;

        // Menerapkan warna duotone berdasarkan nilai grayscale dengan intensitas
        const factor = gray / 255;

        // Menghitung warna baru dengan intensitas (optimasi matematika)
        const r = (color1.r * (1 - factor) + color2.r * factor) | 0;
        const g = (color1.g * (1 - factor) + color2.g * factor) | 0;
        const b = (color1.b * (1 - factor) + color2.b * factor) | 0;

        // Menerapkan intensitas (blend antara warna asli dan warna duotone)
        data[i] = (data[i] * (1 - intensityFactor) + r * intensityFactor) | 0;
        data[i + 1] = (data[i + 1] * (1 - intensityFactor) + g * intensityFactor) | 0;
        data[i + 2] = (data[i + 2] * (1 - intensityFactor) + b * intensityFactor) | 0;
      }

      index = end;

      if (index < data.length) {
        // Gunakan requestAnimationFrame untuk performa yang lebih baik
        requestAnimationFrame(processNextBatch);
      } else {
        // Semua data telah diproses
        resolve(data);
      }
    };

    // Mulai pemrosesan batch pertama
    processNextBatch();
  });
};
