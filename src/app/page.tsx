"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import PriceCalculator from "@/components/PriceCalculator";
import {
  Globe,
  Cpu,
  Zap,
  MessageSquare,
  Palette,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Search,
  Phone,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [settings, setSettings] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => setSettings(data));
  }, []);

  const serviceIcons: Record<string, any> = {
    web: <Globe size={24} />,
    ai: <Cpu size={24} />,
    automation: <Zap size={24} />,
    social: <MessageSquare size={24} />,
    graphic: <Palette size={24} />,
  };

  const services = settings?.services?.map((s: any) => ({
    title: s.name,
    description: s.description,
    icon: serviceIcons[s.id] || <Zap size={24} />,
  })) || [
    {
      title: "Web Sitesi Tasarımı",
      description: "Hızlı, mobil uyumlu ve SEO dostu modern web siteleri ile dijital dünyada yerinizi alın.",
      icon: <Globe size={24} />,
    },
    {
      title: "Yapay Zeka Çözümleri",
      description: "İş süreçlerinizi akıllı hale getiren özel yapay zeka modelleri ve entegrasyonları.",
      icon: <Cpu size={24} />,
    },
    {
      title: "Süreç Otomasyonu",
      description: "Tekrarlayan işleri otomatiğe bağlayın, zamandan ve maliyetten tasarruf edin.",
      icon: <Zap size={24} />,
    },
    {
      title: "Sosyal Medya Yönetimi",
      description: "Markanızın dijital itibarını profesyonel içerik ve stratejilerle büyüterek yönetiyoruz.",
      icon: <MessageSquare size={24} />,
    },
    {
      title: "Grafik Tasarım",
      description: "Markanızın kimliğini yansıtan estetik ve dikkat çekici görsel tasarımlar.",
      icon: <Palette size={24} />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      type: "analysis",
      authorizedPerson: formData.get("authorizedPerson"),
      company: formData.get("company"),
      website: formData.get("website"),
      socialLinks: formData.get("socialLinks"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 overflow-hidden bg-black">
          {/* Animated Background Layers */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[140px] opacity-60"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[120px] opacity-50"
          />

          {settings?.site?.heroImage && (
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000"
              style={{ backgroundImage: `url(${settings.site.heroImage})` }}
            />
          )}

          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-8 tracking-wider uppercase"
            >
              <Rocket size={14} /> Yeni Nesil Dijital Ajans
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] md:leading-[0.85]"
            >
              {settings?.site?.hero?.title?.split(" ").slice(0, -2).join(" ") || "E2X Dijital ile"} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                {settings?.site?.hero?.title?.split(" ").slice(-2).join(" ") || "Geleceği Kodlayın"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
            >
              {settings?.site?.hero?.subtitle || "Yapay zeka odaklı yazılım mimarisi ve stratejik dijital pazarlama ile işletmenizi dijital çağın zirvesine taşıyoruz."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                href="#analysis"
                className="group relative bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] flex items-center gap-3 overflow-hidden"
              >
                {settings?.site?.hero?.buttonText || "Ücretsiz Keşif Al"} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#calculator"
                className="bg-card border-2 border-muted hover:border-primary/50 text-foreground px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center gap-2"
              >
                {settings?.site?.hero?.calcButtonText || "Fiyat Hesapla"}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-card/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Neler Yapıyoruz?</h2>
              <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full" />
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto font-medium">
                En karmaşık sorunlara en basit ve etkili teknolojik çözümleri sunuyoruz.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any, index: number) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AI Price Calculator Section */}
        <PriceCalculator />

        {/* About Section */}
        <section id="about" className="py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl -z-10" />
                <div className="aspect-square bg-card border border-muted rounded-[2.5rem] flex items-center justify-center p-12 shadow-2xl overflow-hidden relative group">
                   <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="grid grid-cols-2 gap-6 w-full h-full relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-background border border-muted p-6 rounded-3xl flex items-center justify-center shadow-xl hover:border-primary/50 transition-colors"
                    >
                      <CheckCircle2 size={56} className="text-primary" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="bg-background border border-muted p-6 rounded-3xl flex items-center justify-center mt-12 shadow-xl hover:border-secondary/50 transition-colors"
                    >
                      <CheckCircle2 size={56} className="text-secondary" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="bg-background border border-muted p-6 rounded-3xl flex items-center justify-center -mt-12 shadow-xl hover:border-accent/50 transition-colors"
                    >
                      <CheckCircle2 size={56} className="text-accent" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-background border border-muted p-6 rounded-3xl flex items-center justify-center shadow-xl hover:border-white/50 transition-colors"
                    >
                      <CheckCircle2 size={56} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
                  {settings?.site?.about?.title || "Neden E2X Dijital?"}
                </h2>
                <p className="text-foreground/70 mb-8 text-lg leading-relaxed font-medium">
                  {settings?.site?.about?.description || "Geleneksel yöntemleri bir kenara bırakın. E2X Dijital, hızın ve verimliliğin ön planda olduğu yeni nesil bir ekosistem sunar. Sadece kod yazmıyoruz, markanızın geleceğini inşa ediyoruz."}
                </p>
                <ul className="space-y-6 mb-10">
                  {(settings?.site?.about?.features || [
                    "Özel Geliştirilmiş AI Algoritmaları",
                    "Ultra Hızlı Next.js Mimarisi",
                    "Dönüşüm Odaklı Kullanıcı Deneyimi",
                    "7/24 Teknik Danışmanlık ve Destek"
                  ]).map((item: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-primary" size={18} />
                      </div>
                      <span className="font-bold text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="#analysis"
                  className="inline-flex items-center gap-2 border-b-2 border-primary text-primary font-black text-xl hover:text-primary/80 transition-all pb-1"
                >
                  Analiz İsteyin <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Free Analysis Form Section */}
        <section id="analysis" className="py-32 bg-card/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-card border border-muted p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-4 uppercase tracking-widest">
                  <Search size={16} /> Ücretsiz Analiz
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">Dijital Keşif Formu</h2>
                <p className="text-foreground/60 text-lg font-medium">
                  İşletmenizi analiz edelim, size en uygun büyüme stratejisini sunalım.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/40 ml-2">Yetkili Ad Soyad - Numara</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input
                        type="text"
                        name="authorizedPerson"
                        required
                        placeholder="Ahmet Yılmaz - 0530..."
                        className="w-full bg-background border border-muted rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/40 ml-2">Firma Adı</label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="Şirketiniz"
                      className="w-full bg-background border border-muted rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/40 ml-2">Web Sitesi (Var ise)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input
                        type="text"
                        name="website"
                        placeholder="www.siteniz.com"
                        className="w-full bg-background border border-muted rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/40 ml-2">Sosyal Medya Linkleri</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input
                        type="text"
                        name="socialLinks"
                        placeholder="Instagram, LinkedIn vb."
                        className="w-full bg-background border border-muted rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none text-lg"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-primary/30 text-xl flex items-center justify-center gap-3 mt-4"
                >
                  Analiz Talebi Gönder <ArrowRight size={24} />
                </motion.button>

                {formStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-center font-bold">
                    Talebiniz başarıyla alındı. Uzmanlarımız sizi arayacak.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
