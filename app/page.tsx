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