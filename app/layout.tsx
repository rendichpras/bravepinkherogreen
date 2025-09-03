import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brave Pink & Hero Green | #WargaBantuWarga #IndonesiaBerbenah",
  description: "Aplikasi filter duotone dengan warna Brave Pink dan Hero Green yang sedang viral di media sosial Indonesia. Terapkan filter solidaritas pada gambar Anda dan bagikan semangat kebersamaan.",
  keywords: "duotone filter, brave pink, hero green, indonesia, solidaritas, media sosial, filter gambar",
  authors: [{ name: "Rendi Ichtiar Prasetyo" }],
  openGraph: {
    title: "Brave Pink & Hero Green",
    description: "Aplikasi filter duotone dengan warna Brave Pink dan Hero Green yang sedang viral di media sosial Indonesia.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
