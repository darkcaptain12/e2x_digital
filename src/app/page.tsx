"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import {
  Globe,
  Cpu,
  Zap,
  MessageSquare,
  Palette,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);

  const services = [
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
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
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
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px]"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/80"
            >
              E2X Dijital ile İşinizi <br /> <span className="text-primary">Geleceğe Taşıyın</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10"
            >
              Yapay zeka destekli yazılım, otomasyon ve dijital pazarlama çözümleriyle işletmenizin potansiyelini maksimize ediyoruz.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="#contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Hemen Başlayın <ArrowRight size={20} />
              </Link>
              <Link
                href="#services"
                className="border border-muted hover:bg-muted/50 text-foreground px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Hizmetlerimizi İnceleyin
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Uzmanlık Alanlarımız</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-foreground/60 max-w-xl mx-auto">
                Modern teknolojileri yaratıcılıkla birleştirerek size özel çözümler üretiyoruz.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
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

        {/* About Section */}
        <section id="about" className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full h-full">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card border border-muted p-4 rounded-xl flex items-center justify-center shadow-xl"
                    >
                      <CheckCircle2 size={48} className="text-primary" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card border border-muted p-4 rounded-xl flex items-center justify-center mt-8 shadow-xl"
                    >
                      <CheckCircle2 size={48} className="text-secondary" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card border border-muted p-4 rounded-xl flex items-center justify-center -mt-8 shadow-xl"
                    >
                      <CheckCircle2 size={48} className="text-accent" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card border border-muted p-4 rounded-xl flex items-center justify-center shadow-xl"
                    >
                      <CheckCircle2 size={48} className="text-white" />
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Neden E2X Dijital?</h2>
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  Dijital dünyada sadece var olmak yetmez, fark yaratmak gerekir. E2X Dijital olarak biz, en yeni teknolojileri ve yapay zeka araçlarını kullanarak markanızı rakiplerinizin önüne geçiriyoruz.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Kişiselleştirilmiş Yapay Zeka Entegrasyonları",
                    "Yüksek Performanslı ve Güvenli Yazılımlar",
                    "Veriye Dayalı Pazarlama Stratejileri",
                    "Kesintisiz Destek ve Geliştirme Süreci"
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className="inline-block border-b-2 border-primary text-primary font-bold hover:text-primary/80 transition-all"
                >
                  Hikayemizi Daha Yakından Tanıyın
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto bg-card border border-muted p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Bizimle İletişime Geçin</h2>
                <p className="text-foreground/60">
                  Projenizi birlikte hayata geçirelim. Hemen bir mesaj bırakın, size en kısa sürede dönüş yapalım.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Adınız Soyadınız</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">E-posta Adresiniz</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="orn@email.com"
                      className="w-full bg-background border border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Projenizden kısaca bahsedin..."
                    className="w-full bg-background border border-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-primary/20"
                >
                  Gönder
                </motion.button>

                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 text-center font-medium"
                  >
                    Mesajınız başarıyla gönderildi! Sizinle iletişime geçeceğiz.
                  </motion.p>
                )}
                {formStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-center font-medium"
                  >
                    Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
