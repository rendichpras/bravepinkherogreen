import React from 'react';

import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SocialTrendInfo() {
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="py-3">
          <div className="flex flex-wrap items-start sm:items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 flex-shrink-0 mt-0.5 sm:mt-0 text-brave-pink" />
            <p className="flex-1">
              Warna Brave Pink dan Hero Green sedang viral di media sosial Indonesia sebagai simbol solidaritas.
            </p>
            <a 
              href="https://www.detik.com/jateng/berita/d-8092753/arti-warna-resistance-blue-brave-pink-dan-hero-green-yang-viral-di-medsos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brave-pink hover:underline whitespace-nowrap transition-all-smooth"
              aria-label="Pelajari lebih lanjut tentang warna Brave Pink dan Hero Green"
            >
              Pelajari lebih lanjut
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
