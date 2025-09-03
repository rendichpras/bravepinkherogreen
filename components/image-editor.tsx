import React, { useState } from 'react';

import { Download, RefreshCw, ArrowRightLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageEditorProps {
  onReset: () => void;
  isReversed: boolean;
  toggleReverse: () => void;
  intensity: number;
  setIntensity: (value: number) => void;
  showOriginal: boolean;
  toggleOriginalPreview: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isProcessing: boolean;
  downloadImage: () => void;
}

export function ImageEditor({
  onReset,
  isReversed,
  toggleReverse,
  intensity,
  setIntensity,
  showOriginal,
  toggleOriginalPreview,
  canvasRef,
  isProcessing,
  downloadImage
}: ImageEditorProps) {
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  
  // Wrapper untuk fungsi download dengan feedback
  const handleDownload = () => {
    downloadImage();
    setShowDownloadSuccess(true);
    setTimeout(() => setShowDownloadSuccess(false), 2000);
  };
  return (
    <div className="w-full flex flex-col items-center">
      {/* Preview panel */}
      <Card className="relative w-full max-w-4xl overflow-hidden border-border shadow-sm p-0 mb-4">
        <div className="absolute top-3 right-3 z-10 bg-gray-800/70 backdrop-blur-md rounded-md px-3 py-1 text-xs sm:text-sm font-medium text-white">
          {showOriginal ? "Asli" : "Duotone"}
        </div>
        
        <div className="w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
          />
        </div>
        
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/70 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full border-t-2 border-b-2 border-brave-pink animate-spin" />
              <p className="mt-3 text-sm text-white">Memproses...</p>
            </div>
          </div>
        )}
        
        {/* Before/after toggle control */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-gray-800/70 backdrop-blur-md rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 sm:py-2">
          <span className={cn(
            "text-xs transition-colors",
            !showOriginal ? "font-bold text-white" : "text-gray-300"
          )}>
            Duotone
          </span>
          <Switch 
            checked={showOriginal} 
            onCheckedChange={toggleOriginalPreview}
            aria-label="Tampilkan gambar asli"
            title="Tampilkan gambar asli"
            className="transition-colors duration-200"
          />
          <span className={cn(
            "text-xs transition-colors",
            showOriginal ? "font-bold text-white" : "text-gray-300"
          )}>
            Asli
          </span>
        </div>
      </Card>

      {/* Controls panel */}
      <Card className="w-full max-w-4xl bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm text-card-foreground">Pengaturan Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 mb-2">
          {/* Intensity slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-card-foreground">Intensitas Efek</label>
              <span className="text-sm font-medium text-card-foreground bg-muted rounded-md px-2 py-1">{intensity}%</span>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[intensity]}
              onValueChange={(values) => setIntensity(values[0])}
              className="[&_[role=slider]]:bg-brave-pink [&_[role=slider]]:border-brave-pink [&_[data-orientation=horizontal]]:bg-brave-pink"
            />
          </div>
          
          {/* Color direction toggle - simplified */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-card-foreground">Balik Warna</label>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="inline-block w-3 h-3 rounded-full bg-brave-pink"></span>
                <ArrowRightLeft className="w-3 h-3" />
                <span className="inline-block w-3 h-3 rounded-full bg-hero-green"></span>
              </div>
            </div>
            <Switch 
              checked={isReversed} 
              onCheckedChange={toggleReverse}
              aria-label="Balik warna"
              title="Balik warna"
              className="color-toggle-switch transition-colors duration-200"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="default"
            onClick={handleDownload}
            disabled={isProcessing}
            aria-label="Unduh gambar"
            className="w-full sm:flex-1 bg-brave-pink hover:bg-brave-pink/90 relative transition-all-smooth"
          >
            {showDownloadSuccess ? (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md">
                  <Check className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Unduh</span>
                </div>
              )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onReset}
            disabled={isProcessing}
            aria-label="Ganti gambar"
            className="w-full sm:flex-1 border-border hover:bg-muted transition-all-smooth"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Ganti</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}