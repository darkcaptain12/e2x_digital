"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const pageData = settings?.legal?.[slug];

  if (!pageData && settings) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Sayfa Bulunamadı</h1>
            <Link href="/" className="text-primary font-bold">Anasayfaya Dön</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors mb-8 font-bold">
              <ChevronLeft size={20} /> Geri Dön
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="text-primary" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{pageData?.title || "Yükleniyor..."}</h1>
            </div>

            <div className="w-20 h-2 bg-primary rounded-full mb-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none text-foreground/70 leading-relaxed font-medium"
          >
            {pageData?.content?.split('\n').map((line: string, i: number) => (
              <p key={i} className="mb-6">{line}</p>
            )) || "İçerik yükleniyor..."}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
