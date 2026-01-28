"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle2, Sparkles, Loader2, Send, MessageSquare, AlertCircle } from "lucide-react";

export default function PriceCalculator() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [authorizedPerson, setAuthorizedPerson] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [isAi, setIsAi] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
        setSelectedIndustry(data.industries[2].id);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculatePrice = async () => {
    if (selectedServices.length === 0) return;

    setIsCalculating(true);
    setEstimatedPrice(null);
    setExplanation("");

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices,
          industryId: selectedIndustry,
          requirements: specialRequirements
        }),
      });
      const data = await res.json();
      setEstimatedPrice(data.price);
      setExplanation(data.explanation || "");
      setIsAi(data.isAi);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSendToExpert = async (viaWhatsApp = false) => {
    if (!authorizedPerson || !companyName) {
      alert("Lütfen Ad Soyad ve Firma adı alanlarını doldurunuz.");
      return;
    }

    const leadData = {
      type: "calculator",
      authorizedPerson,
      company: companyName,
      industry: settings.industries.find((i: any) => i.id === selectedIndustry)?.name,
      selectedServices: selectedServices.map(sid => settings.services.find((s: any) => s.id === sid)?.name),
      estimatedPrice,
      specialRequirements,
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (viaWhatsApp) {
        const servicesText = leadData.selectedServices.join(", ");
        const message = `Merhaba, E2X Dijital! Bir fiyat teklifi aldım.%0A%0A*Müşteri Detayları:*%0A- Yetkili: ${authorizedPerson}%0A- Firma: ${companyName}%0A- Sektör: ${leadData.industry}%0A%0A*Hizmetler:*%0A${servicesText}%0A%0A*Tahmini Fiyat:* ${estimatedPrice?.toLocaleString('tr-TR')} TL%0A%0A*Özel İstekler:* ${specialRequirements || 'Yok'}`;
        window.open(`https://wa.me/${settings.site.whatsapp}?text=${message}`, '_blank');
      }

      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  if (loading || !settings) return null;

  return (
    <section id="calculator" className="py-24 bg-card/30 border-y border-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Sparkles size={16} /> Hepsi Tek Panelde
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Akıllı Çözüm Paneli</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Sektörünüze özel dinamik fiyatlandırma altyapımızla projenizi anında planlayın.</p>
        </div>

        <div className="bg-card border border-muted p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60 ml-2">Yetkili Ad Soyad</label>
                  <input
                    type="text"
                    value={authorizedPerson}
                    onChange={(e) => setAuthorizedPerson(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-background border border-muted rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60 ml-2">Firma Adı</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Şirketinizin Adı"
                    className="w-full bg-background border border-muted rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold mb-4">Sektörünüz</label>
                <div className="flex flex-wrap gap-2">
                  {settings.industries.map((ind: any) => (
                    <button
                      key={ind.id}
                      onClick={() => { setSelectedIndustry(ind.id); setEstimatedPrice(null); }}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all border ${
                        selectedIndustry === ind.id ? "bg-primary border-primary text-white" : "bg-background border-muted text-foreground/70"
                      }`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold mb-4">Hizmetler</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {settings.services.map((service: any) => (
                    <div
                      key={service.id}
                      onClick={() => { toggleService(service.id); setEstimatedPrice(null); }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedServices.includes(service.id) ? "bg-primary/5 border-primary" : "bg-background border-muted"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        selectedServices.includes(service.id) ? "bg-primary border-primary text-white" : "border-muted"
                      }`}>
                        {selectedServices.includes(service.id) && <CheckCircle2 size={14} />}
                      </div>
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold mb-4">Özel İstekler</label>
                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="Eklemek istediğiniz detaylar..."
                  className="w-full bg-background border border-muted rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/50 outline-none min-h-[100px]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-background/50 border border-muted rounded-[2rem] p-6 h-full flex flex-col sticky top-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calculator size={20} className="text-primary" /> Teklif Özeti
                </h3>

                <div className="flex-grow space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Firma:</span>
                    <span className="font-bold">{companyName || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Sektör:</span>
                    <span className="font-bold text-primary">{settings.industries.find((i: any) => i.id === selectedIndustry)?.name}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <AnimatePresence mode="wait">
                    {estimatedPrice !== null ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                        <div className="text-center p-4 bg-primary/10 rounded-2xl border border-primary/20">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">Tahmini Fiyat {isAi && "(AI Destekli)"}</span>
                          <div className="text-3xl font-black text-primary mt-1">{estimatedPrice.toLocaleString('tr-TR')} ₺</div>
                          {explanation && <p className="text-[10px] text-foreground/50 mt-2 italic leading-tight">{explanation}</p>}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                          <AlertCircle size={14} className="shrink-0" />
                          <span>Bu fiyat yaklaşık bir değerdir, nihai teklif için iletişime geçiniz.</span>
                        </div>
                        <button
                          onClick={() => handleSendToExpert(true)}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                        >
                          <MessageSquare size={20} /> WhatsApp ile Al
                        </button>
                      </motion.div>
                    ) : (
                      <button
                        onClick={calculatePrice}
                        disabled={selectedServices.length === 0 || isCalculating}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                      >
                        {isCalculating ? <Loader2 className="animate-spin" size={20} /> : "Fiyatı Hesapla"}
                      </button>
                    )}
                  </AnimatePresence>

                  {isSent && <p className="text-xs text-green-500 text-center font-bold animate-pulse">Talebiniz kaydedildi!</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
