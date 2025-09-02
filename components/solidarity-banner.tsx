import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function SolidarityBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-4xl mb-6 mt-2"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF85C4]/20 to-[#045F33]/20 backdrop-blur-md border border-white/5 p-4">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#FF85C4]/20"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#045F33]/20"></div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-[#FF85C4]" />
            <p className="text-sm font-medium text-white">
              Bagikan Solidaritasmu
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-white/10 border border-white/20 text-white px-2 py-1 rounded-full">
              #WargaBantuWarga
            </span>
            <span className="bg-white/10 border border-white/20 text-white px-2 py-1 rounded-full">
              #IndonesiaBerbenah
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
