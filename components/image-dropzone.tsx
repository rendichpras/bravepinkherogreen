import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onImageDrop: (file: File) => void;
  className?: string;
}

export function ImageDropzone({ onImageDrop, className }: ImageDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageDrop(acceptedFiles[0]);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <Card 
      {...getRootProps()} 
      className={cn(
        "w-full border-2 border-dashed p-0 transition-all-smooth bg-card shadow-sm",
        isDragActive 
          ? "border-brave-pink bg-brave-pink-light" 
          : "border-border hover:border-brave-pink hover:bg-brave-pink-light",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 text-center">
        <input {...getInputProps()} />
        
        <div className="mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
            <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="text-base sm:text-lg font-medium mb-1 text-card-foreground">
            {isDragActive ? "Lepaskan gambar di sini..." : "Unggah Gambar"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isDragActive 
              ? "Gambar akan diproses otomatis" 
              : "Tarik dan lepas atau klik untuk memilih"
            }
          </p>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-2 mt-2 bg-brave-pink hover:bg-brave-pink/90 transition-all-smooth"
          aria-label="Pilih gambar untuk diunggah"
        >
          <Upload className="h-4 w-4" />
          Pilih Gambar
        </Button>
      </CardContent>
    </Card>
  );
}