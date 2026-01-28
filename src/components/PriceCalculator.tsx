"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle2, Sparkles, Loader2 } from "lucide-react";

const industries = [
  { id: "e-commerce", name: "E-Ticaret", multiplier: 1.5 },
  { id: "corporate", name: "Kurumsal", multiplier: 1.2 },
  { id: "startup", name: "Startup", multiplier: 1.0 },
  { id: "health", name: "Sağlık", multiplier: 1.3 },
  { id: "education", name: "Eğitim", multiplier: 1.1 },
];

const services = [
  { id: "web", name: "Web Sitesi", basePrice: 15000 },
  { id: "ai", name: "Yapay Zeka Entegrasyonu", basePrice: 25000 },
  { id: "automation", name: "Süreç Otomasyonu", basePrice: 20000 },
  { id: "social", name: "Sosyal Medya Yönetimi", basePrice: 10000 },
  { id: "graphic", name: "Grafik Tasarım", basePrice: 8000 },
];

export default function PriceCalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[2].id);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculatePrice = () => {
    if (selectedServices.length === 0) return;

    setIsCalculating(true);
    setEstimatedPrice(null);

    // Simulate AI thinking
    setTimeout(() => {
      const industry = industries.find((i) => i.id === selectedIndustry);
      const multiplier = industry?.multiplier || 1.0;

      const baseTotal = selectedServices.reduce((sum, serviceId) => {
        const service = services.find((s) => s.id === serviceId);
        return sum + (service?.basePrice || 0);
      }, 0);

      setEstimatedPrice(Math.round(baseTotal * multiplier));
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <section id="calculator" className="py-24 bg-card/30 border-y border-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Sparkles size={16} /> AI Destekli Fiyatlandırma
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Proje Maliyetini Hesapla</h2>
          <p className="text-foreground/60 text-lg">Sektörünüzü ve ihtiyaç duyduğunuz hizmetleri seçin, AI asistanımız size özel bir teklif hazırlasın.</p>
        </div>

        <div className="bg-card border border-muted p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Calculator size={120} />
          </div>

          <div className="space-y-10">
            {/* Industry Selection */}
            <div>
              <label className="block text-lg font-bold mb-4">Sektörünüzü Seçin</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                      selectedIndustry === ind.id
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                        : "bg-background border-muted hover:border-primary/50 text-foreground/70"
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-lg font-bold mb-4">İhtiyacınız Olan Hizmetler</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedServices.includes(service.id)
                        ? "bg-primary/5 border-primary shadow-inner"
                        : "bg-background border-muted hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                        selectedServices.includes(service.id) ? "bg-primary border-primary text-white" : "border-muted"
                      }`}>
                        {selectedServices.includes(service.id) && <CheckCircle2 size={16} />}
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="pt-6">
              <button
                onClick={calculatePrice}
                disabled={selectedServices.length === 0 || isCalculating}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl text-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="animate-spin" /> Yapay Zeka Analiz Ediyor...
                  </>
                ) : (
                  <>Hemen Hesapla</>
                )}
              </button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {estimatedPrice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-8 bg-primary/10 rounded-3xl border border-primary/20 text-center"
                >
                  <h3 className="text-xl font-bold mb-2">Tahmini Proje Yatırımı</h3>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-4">
                    {estimatedPrice.toLocaleString('tr-TR')} ₺'den başlayan fiyatlarla
                  </div>
                  <p className="text-sm text-foreground/60 italic">
                    *Bu fiyat bir ön değerlendirmedir. Kesin teklif için lütfen bizimle iletişime geçin.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
