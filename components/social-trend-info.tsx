import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export function SocialTrendInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mt-4 mb-2 px-1"
    >
      <div className="flex flex-wrap items-start sm:items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
        <TrendingUp className="h-3 w-3 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="flex-1">
          Warna Brave Pink dan Hero Green sedang viral di media sosial Indonesia sebagai simbol solidaritas.
        </p>
        <a 
          href="https://www.detik.com/jateng/berita/d-8092753/arti-warna-resistance-blue-brave-pink-dan-hero-green-yang-viral-di-medsos" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#FF85C4] hover:underline whitespace-nowrap"
        >
          Pelajari lebih lanjut
        </a>
      </div>
    </motion.div>
  );
}
