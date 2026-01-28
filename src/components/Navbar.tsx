"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  const navLinks = [
    { name: "Hizmetler", href: "#services" },
    { name: "Hakkımızda", href: "#about" },
    { name: "İletişim", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
              {settings?.site?.logo?.type === "image" ? (
                <div className="relative w-12 h-12">
                   <Image
                    src={settings.site.logo.image}
                    alt={settings.site.name || "E2X Dijital"}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  {settings?.site?.logo?.text ? (
                    settings.site.logo.text
                  ) : (
                    <>E2X<span className="text-foreground">DIJITAL</span></>
                  )}
                </>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-medium transition-all"
              >
                Teklif Al
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-muted">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-foreground/80 hover:text-primary font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-primary font-bold underline underline-offset-4"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
