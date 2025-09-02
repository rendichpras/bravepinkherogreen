import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
