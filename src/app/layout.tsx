import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E2X Dijital | AI Destekli Yazılım ve Pazarlama Çözümleri",
  description: "Web tasarım, yapay zeka, otomasyon, sosyal medya yönetimi ve grafik tasarım alanlarında profesyonel çözümler sunan teknoloji ajansı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
