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
