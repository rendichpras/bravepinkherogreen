import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
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
    <div 
      {...getRootProps()} 
      className={cn(
        "w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
        isDragActive 
          ? "border-[#FF85C4] bg-[#FF85C410]" 
          : "border-gray-600 hover:border-[#FF85C4] hover:bg-[#FF85C410]",
        className
      )}
    >
      <input {...getInputProps()} />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-gray-400" />
        </div>
        <h2 className="text-lg font-medium mb-1">
          {isDragActive ? "Lepaskan gambar di sini..." : "Unggah Gambar"}
        </h2>
        <p className="text-sm text-gray-400">
          {isDragActive 
            ? "Gambar akan diproses otomatis" 
            : "Tarik dan lepas atau klik untuk memilih"
          }
        </p>
      </motion.div>
      
      <Button variant="pink" size="sm" className="flex items-center gap-2 mt-2">
        <Upload className="h-4 w-4" />
        Pilih Gambar
      </Button>
    </div>
  );
}