"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Smartphone, Instagram, Twitter, Linkedin, Image as ImageIcon, Briefcase, TrendingUp, Zap, Shield, Cpu, FileText } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const auth = localStorage.getItem("admin_auth");
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth || ""
        },
        body: JSON.stringify(settings),
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_auth");
        window.location.reload();
        return;
      }

      setMessage({ text: "Ayarlar başarıyla kaydedildi!", type: "success" });
    } catch (error) {
      setMessage({ text: "Hata oluştu!", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  if (loading || !settings) {
    return <div className="flex items-center justify-center h-64 text-foreground/60">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Site Ayarları</h1>
          <p className="text-foreground/60 mt-1">Sitedeki tüm dinamik verileri buradan yönetin.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
          Kaydet
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl font-bold text-center ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8 pb-20">
        {/* İletişim ve Sosyal Medya */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Smartphone size={20} className="text-primary" /> İletişim & Sosyal Medya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">WhatsApp Numarası (90...)</label>
              <input
                type="text"
                value={settings.site.contact.whatsapp}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, contact: { ...settings.site.contact, whatsapp: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">E-Posta Adresi</label>
              <input
                type="text"
                value={settings.site.contact.email}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, contact: { ...settings.site.contact, email: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Telefon</label>
              <input
                type="text"
                value={settings.site.contact.phone}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, contact: { ...settings.site.contact, phone: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Adres</label>
              <input
                type="text"
                value={settings.site.contact.address}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, contact: { ...settings.site.contact, address: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40"><Instagram size={14} className="inline mr-1" /> Instagram</label>
              <input
                type="text"
                value={settings.site.social.instagram}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, social: { ...settings.site.social, instagram: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40"><Twitter size={14} className="inline mr-1" /> Twitter (X)</label>
              <input
                type="text"
                value={settings.site.social.twitter}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, social: { ...settings.site.social, twitter: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40"><Linkedin size={14} className="inline mr-1" /> LinkedIn</label>
              <input
                type="text"
                value={settings.site.social.linkedin}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, social: { ...settings.site.social, linkedin: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hakkımızda Bölümü */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Hakkımızda (Neden Biz) Bölümü
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Başlık</label>
              <input
                type="text"
                value={settings.site.about.title}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, about: { ...settings.site.about, title: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Açıklama</label>
              <textarea
                value={settings.site.about.description}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, about: { ...settings.site.about, description: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none h-24"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Özellikler (Virgülle ayırın)</label>
              <input
                type="text"
                value={settings.site.about.features.join(", ")}
                onChange={(e) => setSettings({
                  ...settings,
                  site: {
                    ...settings.site,
                    about: {
                      ...settings.site.about,
                      features: e.target.value.split(",").map(f => f.trim())
                    }
                  }
                })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Logo & Branding */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-primary" /> Logo & Marka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Logo Tipi</label>
              <select
                value={settings.site.logo.type}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, logo: { ...settings.site.logo, type: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              >
                <option value="text">Metin</option>
                <option value="image">Görsel</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Logo Metni (Tipi Metin ise)</label>
              <input
                type="text"
                value={settings.site.logo.text}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, logo: { ...settings.site.logo, text: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Logo Görsel URL (Tipi Görsel ise)</label>
              <input
                type="text"
                value={settings.site.logo.image}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, logo: { ...settings.site.logo, image: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Hero Arkaplan Görseli (URL)</label>
              <input
                type="text"
                value={settings.site.heroImage}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, heroImage: e.target.value } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Bölümü */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap size={20} className="text-primary" /> Hero (Banner) Metinleri
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Ana Başlık</label>
              <input
                type="text"
                value={settings.site.hero.title}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, hero: { ...settings.site.hero, title: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Alt Başlık</label>
              <textarea
                value={settings.site.hero.subtitle}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, hero: { ...settings.site.hero, subtitle: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none h-24"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-foreground/40">Buton 1 Metni</label>
                <input
                  type="text"
                  value={settings.site.hero.buttonText}
                  onChange={(e) => setSettings({ ...settings, site: { ...settings.site, hero: { ...settings.site.hero, buttonText: e.target.value } } })}
                  className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-foreground/40">Buton 2 Metni</label>
                <input
                  type="text"
                  value={settings.site.hero.calcButtonText}
                  onChange={(e) => setSettings({ ...settings, site: { ...settings.site, hero: { ...settings.site.hero, calcButtonText: e.target.value } } })}
                  className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hizmet Fiyatları */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Briefcase size={20} className="text-primary" /> Hizmet Fiyatları (Baz Fiyatlar)
          </h2>
          <div className="space-y-4">
            {settings.services.map((service: any, index: number) => (
              <div key={service.id} className="grid grid-cols-2 gap-4 items-center">
                <span className="font-bold">{service.name}</span>
                <input
                  type="number"
                  value={service.basePrice}
                  onChange={(e) => {
                    const newServices = [...settings.services];
                    newServices[index].basePrice = parseInt(e.target.value);
                    setSettings({ ...settings, services: newServices });
                  }}
                  className="bg-background border border-muted rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* AI Ayarları */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-primary" /> AI Fiyatlandırma Ayarları
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Google Gemini API Key</label>
              <input
                type="password"
                value={settings.site.ai.geminiApiKey}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, ai: { ...settings.site.ai, geminiApiKey: e.target.value } } })}
                placeholder="AI desteği için API key girin"
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
              />
              <p className="text-[10px] text-foreground/40 italic">* API Key girilmezse klasik hesaplama mantığı kullanılacaktır.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-foreground/40">Yapay Zeka Talimatı (Prompt)</label>
              <textarea
                value={settings.site.ai.pricingModel}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, ai: { ...settings.site.ai, pricingModel: e.target.value } } })}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none h-32"
              />
            </div>
          </div>
        </div>

        {/* Yasal Sayfalar */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield size={20} className="text-primary" /> Yasal Sayfalar
          </h2>
          <div className="space-y-8">
            {Object.entries(settings.legal).map(([key, page]: [string, any]) => (
              <div key={key} className="space-y-4 border-b border-muted pb-6 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-foreground/40">{key.toUpperCase()} - Başlık</label>
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) => setSettings({
                      ...settings,
                      legal: {
                        ...settings.legal,
                        [key]: { ...page, title: e.target.value }
                      }
                    })}
                    className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-foreground/40">{key.toUpperCase()} - İçerik</label>
                  <textarea
                    value={page.content}
                    onChange={(e) => setSettings({
                      ...settings,
                      legal: {
                        ...settings.legal,
                        [key]: { ...page, content: e.target.value }
                      }
                    })}
                    className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none h-40"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sektör Çarpanları */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Sektör Zorluk Çarpanları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {settings.industries.map((ind: any, index: number) => (
              <div key={ind.id} className="flex justify-between items-center">
                <span className="font-medium text-sm">{ind.name}</span>
                <input
                  type="number"
                  step="0.1"
                  value={ind.multiplier}
                  onChange={(e) => {
                    const newIndustries = [...settings.industries];
                    newIndustries[index].multiplier = parseFloat(e.target.value);
                    setSettings({ ...settings, industries: newIndustries });
                  }}
                  className="w-24 bg-background border border-muted rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none text-right"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
