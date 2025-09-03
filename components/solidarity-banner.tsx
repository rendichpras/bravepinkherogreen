import React from 'react';

import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SolidarityBanner() {
  return (
    <div className="w-full max-w-4xl">
      <Card className="relative overflow-hidden bg-gradient-to-r from-brave-pink-light to-hero-green-light border-border shadow-sm">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-brave-pink-light"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-hero-green-light"></div>
        
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-brave-pink" />
              <p className="text-sm font-medium text-card-foreground">
                Bagikan Solidaritasmu
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 rounded-full bg-brave-pink-light border-brave-pink/20 text-card-foreground px-2 sm:px-3 py-1.5 hover:bg-brave-pink/20 transition-all-smooth text-xs"
                aria-label="Hashtag WargaJagaWarga"
              >
                #WargaJagaWarga
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 rounded-full bg-hero-green-light border-hero-green/20 text-card-foreground px-2 sm:px-3 py-1.5 hover:bg-hero-green/20 transition-all-smooth text-xs"
                aria-label="Hashtag IndonesiaBerbenah"
              >
                #IndonesiaBerbenah
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
