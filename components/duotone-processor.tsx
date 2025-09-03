"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { ImageDropzone } from "./image-dropzone";
import { ImageEditor } from "./image-editor";
import { hexToRgb, processImageData } from "@/lib/image-utils";

interface DuotoneProcessorProps {
  bravePink: string;
  heroGreen: string;
}

export function DuotoneProcessor({ bravePink, heroGreen }: DuotoneProcessorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [intensity, setIntensity] = useState(100);
  const [showOriginal, setShowOriginal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement | null>(null);

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

  // Fungsi untuk mengunduh gambar yang berfungsi di semua browser termasuk in-app browser
  const downloadImage = useCallback(() => {
    if (!canvasRef.current) return;

    try {
      // Mendapatkan data URL dari canvas
      const dataUrl = canvasRef.current.toDataURL("image/png");
      
      // Metode 1: Menggunakan a.click() (metode standar)
      const link = document.createElement("a");
      link.download = "duotone-image.png";
      link.href = dataUrl;
      
      // Metode 2: Untuk browser yang tidak mendukung a.click()
      // Tambahkan link ke DOM, klik, lalu hapus (lebih kompatibel)
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Metode 3: Fallback untuk browser in-app seperti IG, FB, dll
      // Buka gambar di tab baru dan berikan instruksi untuk menyimpan
      if (navigator.userAgent.match(/(Instagram|FBAV|FBAN|Line|KAKAOTALK|NAVER|Snapchat|Pinterest|Twitter|WhatsApp|WeChat)/i)) {
        // Simpan referensi ke tab baru untuk mencegah pemblokiran popup
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`
            <html>
              <head>
                <title>Simpan Gambar</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background-color: #fafafa; }
                  h2 { text-align: center; color: #FF85C4; margin-bottom: 20px; }
                  img { max-width: 100%; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                  .instructions { background: #fff9fb; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: left; border: 1px solid rgba(255,133,196,0.3); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                  .instructions p { margin: 8px 0; }
                  .instructions p strong { color: #FF85C4; }
                  .step { display: flex; align-items: flex-start; margin-bottom: 10px; }
                  .step-number { background: #FF85C4; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold; flex-shrink: 0; }
                  .step-text { flex: 1; }
                </style>
              </head>
              <body>
                <h2>Gambar Duotone Anda</h2>
                <div class="instructions">
                  <p><strong>Cara Menyimpan Gambar:</strong></p>
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Tekan lama pada gambar di bawah</div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">Pilih "Simpan Gambar" atau "Download"</div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">Jika tidak bisa, ambil screenshot gambar dari layar Anda</div>
                  </div>
                </div>
                <img src="${dataUrl}" alt="Duotone Image" />
              </body>
            </html>
          `);
          newTab.document.close();
        }
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      
      // Fallback terakhir: Buka gambar di tab baru jika semua metode gagal
      try {
        window.open(canvasRef.current.toDataURL("image/png"));
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
      }
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
    <>
      {!image ? (
        <ImageDropzone onImageDrop={processFile} />
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
    </>
  );
}
