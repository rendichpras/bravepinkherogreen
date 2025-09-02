"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ImageDropzone } from "@/components/image-dropzone";
import { ImageEditor } from "@/components/image-editor";
import { ColorInfo } from "@/components/color-info";
import { SocialTrendInfo } from "@/components/social-trend-info";
import { SolidarityBanner } from "@/components/solidarity-banner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Fungsi untuk mengkonversi hex ke RGB (dipisahkan dari komponen untuk efisiensi)
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

// Worker untuk pemrosesan gambar (simulasi, karena Next.js tidak mendukung Web Workers di client components)
const processImageData = (
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

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [intensity, setIntensity] = useState(100);
  const [showOriginal, setShowOriginal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement | null>(null);

  // Warna duotone berdasarkan tren viral di media sosial
  // Brave Pink mendekati pantone Rhodamine Red U
  const bravePink = "#FF85C4";
  // Hero Green mendekati pantone 2423C
  const heroGreen = "#045F33";

  // Memoize warna RGB untuk menghindari kalkulasi berulang
  const bravePinkRgb = useMemo(() => hexToRgb(bravePink), [bravePink]);
  const heroGreenRgb = useMemo(() => hexToRgb(heroGreen), [heroGreen]);

  // Fungsi untuk memproses file
  const processFile = useCallback((file: File) => {
    // Reset cache gambar
    imageCache.current = null;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setOriginalImage(result);
      setImage(result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Fungsi untuk menerapkan filter duotone dengan efisiensi yang ditingkatkan
  const applyDuotoneFilter = useCallback(async () => {
    if (!image || !canvasRef.current || !bravePinkRgb || !heroGreenRgb) return;

    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    try {
      // Gunakan cache gambar jika tersedia untuk menghindari pembuatan objek Image baru
      if (!imageCache.current) {
        imageCache.current = new Image();
        imageCache.current.src = originalImage || image;

        // Tunggu gambar dimuat
        if (!imageCache.current.complete) {
          await new Promise((resolve) => {
            if (imageCache.current) {
              imageCache.current.onload = resolve;
            }
          });
        }
      }

      const img = imageCache.current;

      // Optimasi: Batasi ukuran maksimum gambar untuk performa
      const maxDimension = 1200; // Maksimal 1200px untuk performa optimal
      let targetWidth = img.width;
      let targetHeight = img.height;
      
      if (img.width > maxDimension || img.height > maxDimension) {
        if (img.width > img.height) {
          targetWidth = maxDimension;
          targetHeight = (img.height * maxDimension) / img.width;
        } else {
          targetHeight = maxDimension;
          targetWidth = (img.width * maxDimension) / img.height;
        }
      }

      // Mengatur ukuran canvas sesuai dengan gambar yang dioptimasi
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Menggambar gambar asli dengan ukuran yang dioptimasi
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Jika menampilkan gambar asli, tidak perlu menerapkan filter
      if (showOriginal) {
        setIsProcessing(false);
        return;
      }

      // Mendapatkan data piksel
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Tentukan warna berdasarkan mode isReversed
      const color1 = isReversed ? heroGreenRgb : bravePinkRgb;
      const color2 = isReversed ? bravePinkRgb : heroGreenRgb;

      // Proses gambar dengan metode batch
      const intensityFactor = intensity / 100;
      await processImageData(data, canvas.width, canvas.height, color1, color2, intensityFactor);

      // Menggambar kembali gambar dengan filter duotone
      ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [image, originalImage, isReversed, showOriginal, intensity, bravePinkRgb, heroGreenRgb]);

  // Fungsi untuk membalik warna duotone
  const toggleReverse = useCallback(() => {
    setIsReversed(prev => !prev);
  }, []);

  // Fungsi untuk toggle preview asli
  const toggleOriginalPreview = useCallback(() => {
    setShowOriginal(prev => !prev);
  }, []);

  // Fungsi untuk mengunduh gambar
  const downloadImage = useCallback(() => {
    if (!canvasRef.current) return;

    try {
      const link = document.createElement("a");
      link.download = "duotone-image.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }, []);

  // Fungsi untuk memilih gambar baru
  const resetImage = useCallback(() => {
    setImage(null);
    setOriginalImage(null);
    setIsReversed(false);
    setIntensity(100);
    setShowOriginal(false);
    imageCache.current = null;
  }, []);

  // Fungsi untuk mengubah intensitas dengan debounce
  const handleIntensityChange = useCallback((value: number) => {
    setIntensity(value);
  }, []);



  // Menerapkan filter setiap kali parameter berubah
  useEffect(() => {
    if (image) {
      applyDuotoneFilter();
    }
  }, [image, isReversed, intensity, showOriginal, applyDuotoneFilter]);



  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center p-4 sm:p-6">
      {/* Header - Disederhanakan */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mb-4"
      >
        <Card className="backdrop-blur-md bg-white/10 border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF85C4] to-[#045F33]"></div>
          <CardHeader className="p-3 sm:p-4">
            <div className="flex flex-col items-center text-center">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white flex flex-wrap items-center justify-center gap-2">
                <span>
                  Brave Pink & Hero Green Filter
                </span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md">
                Ikuti tren media sosial Indonesia dengan warna Brave Pink & Hero Green
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Gambar akan dioptimasi maksimal 1200px untuk performa optimal
              </p>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Informasi tentang warna Brave Pink dan Hero Green */}
      <ColorInfo />

      <main className="w-full max-w-4xl flex flex-col items-center">
        {!image ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <ImageDropzone onImageDrop={processFile} />
          </motion.div>
        ) : (
          <ImageEditor
            onReset={resetImage}
            isReversed={isReversed}
            toggleReverse={toggleReverse}
            intensity={intensity}
            setIntensity={handleIntensityChange}
            showOriginal={showOriginal}
            toggleOriginalPreview={toggleOriginalPreview}
            canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
            isProcessing={isProcessing}
            downloadImage={downloadImage}
          />
        )}
      </main>

      <SocialTrendInfo />

      {/* Banner solidaritas */}
      <SolidarityBanner />

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-auto pt-6 pb-4 text-center w-full max-w-4xl"
      >
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] sm:text-xs text-gray-500">
            <span>
              Dibuat dengan 💖 oleh{" "}
              <a
                href="https://instagram.com/rendiichtiar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF85C4] hover:underline"
              >
                @rendiichtiar
              </a>{" "}
              untuk indonesia
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}