"use client";

import { useEffect, useState } from "react";
import { Instagram, Twitter, Linkedin, Github, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const socialLinks = settings?.site?.social || {};

  return (
    <footer className="bg-black border-t border-muted pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-black text-3xl tracking-tighter">
            E2X<span className="text-primary">DIJITAL</span>
          </div>
          <p className="text-foreground/60 font-medium leading-relaxed">
            Yapay zeka ve modern teknolojilerle işletmenizin dijital dönüşümüne liderlik ediyoruz.
          </p>
          <div className="flex gap-3">
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all">
                <Instagram size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all">
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Hızlı Linkler</h4>
          <ul className="space-y-4 text-foreground/60 font-medium">
            <li><Link href="#services" className="hover:text-primary transition-colors">Hizmetlerimiz</Link></li>
            <li><Link href="#about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link href="#calculator" className="hover:text-primary transition-colors">Fiyat Hesapla</Link></li>
            <li><Link href="#analysis" className="hover:text-primary transition-colors">Ücretsiz Analiz</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">Yasal</h4>
          <ul className="space-y-4 text-foreground/60 font-medium">
            <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
            <li><Link href="/legal/kvkk" className="hover:text-primary transition-colors">KVKK Metni</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold">İletişim</h4>
          <ul className="space-y-4 text-foreground/60 font-medium">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>{settings?.site?.contact?.address || "İstanbul, Türkiye"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-primary shrink-0" />
              <span>{settings?.site?.contact?.phone || "+90 500 000 00 00"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-primary shrink-0" />
              <span>{settings?.site?.contact?.email || "info@e2xdijital.com"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/40 text-sm font-medium">
        <div>© {new Date().getFullYear()} E2X Dijital. Tüm hakları saklıdır.</div>
        <div className="flex gap-6">
          <Link href="/legal/privacy" className="hover:text-foreground">Gizlilik</Link>
          <Link href="/legal/terms" className="hover:text-foreground">Şartlar</Link>
          <Link href="/legal/kvkk" className="hover:text-foreground">KVKK</Link>
        </div>
      </div>
    </footer>
  );
}
