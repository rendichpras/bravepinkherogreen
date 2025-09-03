"use client";


import { ColorInfo } from "@/components/color-info";
import { SocialTrendInfo } from "@/components/social-trend-info";
import { SolidarityBanner } from "@/components/solidarity-banner";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DuotoneProcessor } from "@/components/duotone-processor";

export default function Home() {
  // Warna duotone berdasarkan tren viral di media sosial
  // Brave Pink mendekati pantone Rhodamine Red U
  const bravePink = "#FF85C4";
  // Hero Green mendekati pantone 2423C
  const heroGreen = "#045F33";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 gap-6">
      {/* Header - Disederhanakan */}
      <div className="w-full max-w-4xl">
        <Card className="bg-card border-border shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brave-pink to-hero-green"></div>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground text-center">
              Brave Pink & Hero Green Filter
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Ikuti tren media sosial Indonesia dengan warna Brave Pink & Hero Green
            </CardDescription>
            
            {/* Peringatan dan Tips */}
            <div className="mt-4">
              <div className="p-3 bg-hero-green/10 border border-hero-green/30 rounded-md shadow-sm">
                <div className="text-xs text-left">
                  <p className="font-medium mb-2 text-sm text-hero-green flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    Peringatan Penting:
                  </p>
                  <div className="space-y-1.5 text-gray-700 pl-1">
                    <p className="flex items-start">
                      <span className="text-hero-green mr-1.5">•</span> 
                      <span>Foto yang diunggah <strong>tidak tersimpan di server</strong>, semua proses dilakukan di browser Anda</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-hero-green mr-1.5">•</span> 
                      <span>Pastikan menggunakan browser modern seperti Chrome, Safari, Firefox, atau Edge</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-hero-green mr-1.5">•</span> 
                      <span>Jika tombol unduh tidak berfungsi, coba buka di browser eksternal</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Informasi tentang warna Brave Pink dan Hero Green */}
      <ColorInfo />

      <main className="w-full max-w-4xl flex flex-col items-center gap-6">
        <DuotoneProcessor bravePink={bravePink} heroGreen={heroGreen} />
      </main>

      <SocialTrendInfo />

      {/* Banner solidaritas */}
      <SolidarityBanner />

      <footer className="mt-auto pt-6 pb-4 text-center w-full max-w-4xl">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="py-3">
            <CardDescription className="text-muted-foreground text-xs">
              Dibuat dengan 💖 oleh{" "}
              <a
                href="https://instagram.com/rendiichtiar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brave-pink hover:underline transition-all-smooth"
              >
                @rendiichtiar
              </a>{" "}
              untuk indonesia
            </CardDescription>
          </CardHeader>
        </Card>
      </footer>
    </div>
  );
}