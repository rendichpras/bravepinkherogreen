import React from 'react';

import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SocialTrendInfo() {
  return (
    <div className="w-full max-w-4xl">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="py-3 space-y-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-brave-pink flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-3 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-brave-pink mt-0.5" aria-hidden="true"></span>
                  <p className="text-card-foreground">
                    <span className="font-medium">Brave Pink</span> - Warna ini terinspirasi dari sosok Ibu Ana yang dikenal berani menyuarakan aspirasinya.
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-hero-green mt-0.5" aria-hidden="true"></span>
                  <p className="text-card-foreground">
                    <span className="font-medium">Hero Green</span> - Warna ini terinspirasi dari para pengemudi ojek online yang bersolidaritas tinggi.
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full mt-0.5" style={{ backgroundColor: "#0038A8" }} aria-hidden="true"></span>
                  <p className="text-card-foreground">
                    <span className="font-medium" style={{ color: "#0038A8" }}>Resistance Blue</span> - Warna biru yang melambangkan perlawanan dan harapan, terinspirasi dari warna bendera.
                  </p>
                </div>
                
                <p className="text-muted-foreground text-xs mt-2">
                  Ketiga warna ini menjadi simbol perjuangan dan keberanian masyarakat Indonesia dalam menyampaikan aspirasi.
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap pt-1 border-t border-gray-100">
                <a 
                  href="https://tirto.id/asal-usul-brave-pink-hero-green-resistance-blue-yang-viral-hg6y?__cf_chl_tk=g3Ba3iyBjbt3s5qXMDfFRxGRC9rfZTLB.Oy2tN5gc_A-1756889696-1.0.1.1-._iy9eD9TuJyaaH7jJgy1VZL63j0zjd2uXUUMj8viwY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brave-pink hover:underline transition-all-smooth"
                  aria-label="Pelajari lebih lanjut tentang warna Brave Pink, Hero Green, dan Resistance Blue"
                >
                  Pelajari lebih lanjut
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
