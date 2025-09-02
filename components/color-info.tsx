import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function ColorInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mb-4 sm:mb-6"
    >
      <Card className="bg-white/5 backdrop-blur-md border-white/5">
        <CardContent className="p-3 sm:p-5">
          {/* Header - Always visible */}
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleExpand}
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF85C4] flex-shrink-0" />
              <h3 className="font-medium text-sm sm:text-base text-white">Tentang Warna Brave Pink dan Hero Green</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
          
          {/* Expandable content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-3 text-xs sm:text-sm border-t border-white/10 mt-3">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="inline-block w-4 h-4 rounded-md bg-[#FF85C4] mt-0.5"></span>
                      <p><span className="font-medium">Brave Pink</span> - Warna ini terinspirasi dari sosok Ibu Ana yang dikenal berani menyuarakan aspirasinya.</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <span className="inline-block w-4 h-4 rounded-md bg-[#045F33] mt-0.5"></span>
                      <p><span className="font-medium">Hero Green</span> - Warna ini terinspirasi dari para pengemudi ojek online yang bersolidaritas tinggi.</p>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-2">
                      Kedua warna ini menjadi simbol perjuangan dan keberanian masyarakat Indonesia dalam menyampaikan aspirasi.
                    </p>
                    
                    <div className="mt-3 text-xs text-gray-400 flex items-center gap-1 flex-wrap">
                      <span>Sumber:</span>
                      <a 
                        href="https://www.detik.com/jateng/berita/d-8092753/arti-warna-resistance-blue-brave-pink-dan-hero-green-yang-viral-di-medsos" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#FF85C4] hover:underline break-all"
                      >
                        detik.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
