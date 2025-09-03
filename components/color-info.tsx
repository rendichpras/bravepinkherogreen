import React, { useState } from 'react';

import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ColorInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between cursor-pointer space-y-0 pb-2" onClick={toggleExpand}>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-brave-pink flex-shrink-0" />
            <CardTitle className="text-sm sm:text-base text-card-foreground">Tentang Warna Brave Pink dan Hero Green</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 transition-all-smooth" aria-label="Tampilkan informasi warna">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-2 border-t border-border">
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 rounded-md bg-brave-pink mt-0.5" aria-hidden="true"></span>
                  <CardDescription className="text-card-foreground text-xs sm:text-sm">
                    <span className="font-medium">Brave Pink</span> - Warna ini terinspirasi dari sosok Ibu Ana yang dikenal berani menyuarakan aspirasinya.
                  </CardDescription>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="inline-block w-4 h-4 rounded-md bg-hero-green mt-0.5" aria-hidden="true"></span>
                  <CardDescription className="text-card-foreground text-xs sm:text-sm">
                    <span className="font-medium">Hero Green</span> - Warna ini terinspirasi dari para pengemudi ojek online yang bersolidaritas tinggi.
                  </CardDescription>
                </div>
                
                <CardDescription className="text-muted-foreground text-xs mt-2">
                  Kedua warna ini menjadi simbol perjuangan dan keberanian masyarakat Indonesia dalam menyampaikan aspirasi.
                </CardDescription>
                
                <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1 flex-wrap">
                  <span>Sumber:</span>
                  <a 
                    href="https://www.detik.com/jateng/berita/d-8092753/arti-warna-resistance-blue-brave-pink-dan-hero-green-yang-viral-di-medsos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brave-pink hover:underline break-all transition-all-smooth"
                  >
                    detik.com
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
