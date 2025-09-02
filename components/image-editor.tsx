import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, ArrowRightLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent } from './ui/card';
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-4xl mb-6 rounded-xl overflow-hidden shadow-xl border border-white/5"
      >
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md rounded-md px-3 py-1 text-xs sm:text-sm font-medium">
          {showOriginal ? "Asli" : "Duotone"}
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
        />
        
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-10 w-10 rounded-full border-t-2 border-b-2 border-[#FF85C4]"
              />
              <p className="mt-3 text-sm text-white">Memproses...</p>
            </div>
          </div>
        )}
        
        {/* Before/after toggle control */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-lg px-4 py-2">
          <span className={cn(
            "text-xs sm:text-sm transition-colors",
            !showOriginal ? "font-bold text-white" : "text-gray-300"
          )}>
            Duotone
          </span>
          <Switch 
            checked={showOriginal} 
            onCheckedChange={toggleOriginalPreview}
          />
          <span className={cn(
            "text-xs sm:text-sm transition-colors",
            showOriginal ? "font-bold text-white" : "text-gray-300"
          )}>
            Asli
          </span>
        </div>
      </motion.div>

      {/* Controls panel */}
      <Card className="w-full max-w-4xl bg-white/5 backdrop-blur-md border-white/5">
        <CardContent className="p-5 space-y-5">
          {/* Intensity slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">Intensitas Efek</label>
              <span className="text-sm font-medium text-white bg-white/10 rounded-md px-2 py-1">{intensity}%</span>
            </div>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[intensity]}
              onValueChange={(values) => setIntensity(values[0])}
              className="[&_[role=slider]]:bg-[#FF85C4] [&_[role=slider]]:border-[#FF85C4] [&_[data-orientation=horizontal]]:bg-[#FF85C4]"
            />
          </div>
          
          {/* Color direction toggle - simplified */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-white">Balik Warna</label>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="inline-block w-3 h-3 rounded-full bg-[#FF85C4]"></span>
                <ArrowRightLeft className="w-3 h-3" />
                <span className="inline-block w-3 h-3 rounded-full bg-[#045F33]"></span>
              </div>
            </div>
            <Switch 
              checked={isReversed} 
              onCheckedChange={toggleReverse}
              className="data-[state=checked]:bg-[#045F33] data-[state=unchecked]:bg-[#FF85C4]"
            />
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              variant="pink"
              onClick={handleDownload}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 relative"
            >
              <AnimatePresence mode="wait">
                {showDownloadSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md"
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="download"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            <Button
              variant="outline"
              onClick={onReset}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 border-white/20 hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Ganti</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}