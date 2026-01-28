"use client";

import { useEffect, useState } from "react";
import { Instagram, Twitter, Linkedin, Github } from "lucide-react";
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
    <footer className="bg-black border-t border-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          E2X<span className="text-primary">DIJITAL</span>
        </div>

        <div className="text-foreground/40 text-sm font-medium">
          © {new Date().getFullYear()} E2X Dijital. Tüm hakları saklıdır.
        </div>

        <div className="flex gap-4">
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all"
            >
              <Instagram size={20} />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all"
            >
              <Twitter size={20} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              className="w-10 h-10 rounded-xl bg-card border border-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
