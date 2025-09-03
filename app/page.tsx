"use client";


import { ColorInfo } from "@/components/color-info";
import { SocialTrendInfo } from "@/components/social-trend-info";
import { SolidarityBanner } from "@/components/solidarity-banner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DuotoneProcessor } from "@/components/duotone-processor";

export default function Home() {
  // Warna duotone berdasarkan tren viral di media sosial
  // Brave Pink mendekati pantone Rhodamine Red U
  const bravePink = "#FF85C4";
  // Hero Green mendekati pantone 2423C
  const heroGreen = "#045F33";

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center p-4 sm:p-6">
      {/* Header - Disederhanakan */}
      <div className="w-full max-w-4xl mb-4">
        <Card className="backdrop-blur-md bg-white/10 border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF85C4] to-[#045F33]"></div>
          <CardHeader className="p-3 sm:p-4">
            <div className="flex flex-col items-center text-center">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white flex flex-wrap items-center justify-center gap-2">
                <span>
                  Brave Pink & Hero Green Filter
                </span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md">
                Ikuti tren media sosial Indonesia dengan warna Brave Pink & Hero Green
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Gambar akan dioptimasi maksimal 1200px untuk performa optimal
              </p>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Informasi tentang warna Brave Pink dan Hero Green */}
      <ColorInfo />

      <main className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full">
          <DuotoneProcessor bravePink={bravePink} heroGreen={heroGreen} />
        </div>
      </main>

      <SocialTrendInfo />

      {/* Banner solidaritas */}
      <SolidarityBanner />

      <footer className="mt-auto pt-6 pb-4 text-center w-full max-w-4xl">
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] sm:text-xs text-gray-500">
            <span>
              Dibuat dengan 💖 oleh{" "}
              <a
                href="https://instagram.com/rendiichtiar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF85C4] hover:underline"
              >
                @rendiichtiar
              </a>{" "}
              untuk indonesia
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}