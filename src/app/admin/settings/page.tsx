"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Smartphone, Instagram, Twitter, Linkedin, Image as ImageIcon, Briefcase, TrendingUp } from "lucide-react";

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
                value={settings.site.whatsapp}
                onChange={(e) => setSettings({ ...settings, site: { ...settings.site, whatsapp: e.target.value } })}
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

        {/* Görseller */}
        <div className="bg-card border border-muted rounded-[2.5rem] p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-primary" /> Görseller
          </h2>
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
