"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle2, Sparkles, Loader2, Send } from "lucide-react";

const industries = [
  { id: "e-commerce", name: "E-Ticaret", multiplier: 1.5 },
  { id: "corporate", name: "Kurumsal", multiplier: 1.2 },
  { id: "startup", name: "Startup", multiplier: 1.0 },
  { id: "health", name: "Sağlık", multiplier: 1.3 },
  { id: "education", name: "Eğitim", multiplier: 1.1 },
  { id: "real-estate", name: "Gayrimenkul", multiplier: 1.4 },
  { id: "logistics", name: "Lojistik", multiplier: 1.25 },
  { id: "tech", name: "Teknoloji", multiplier: 1.35 },
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
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isSent, setIsSent] = useState(false);

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
    }, 1500);
  };

  const handleSendToExpert = async () => {
    // This would typically trigger the contact form or a specific lead capture
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <section id="calculator" className="py-24 bg-card/30 border-y border-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
            <Sparkles size={16} /> Hepsi Tek Panelde
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Akıllı Çözüm Paneli</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Tüm sektörler için özelleştirilebilir hizmet ve fiyatlandırma altyapımızla projenizi anında planlayın.</p>
        </div>

        <div className="bg-card border border-muted p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Calculator size={120} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Selections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Industry Selection */}
              <div>
                <label className="block text-lg font-bold mb-4">Sektörünüzü Seçin</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndustry(ind.id);
                        setEstimatedPrice(null);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all border ${
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
                <label className="block text-lg font-bold mb-4">Hizmetler</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        toggleService(service.id);
                        setEstimatedPrice(null);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedServices.includes(service.id)
                          ? "bg-primary/5 border-primary shadow-inner"
                          : "bg-background border-muted hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          selectedServices.includes(service.id) ? "bg-primary border-primary text-white" : "border-muted"
                        }`}>
                          {selectedServices.includes(service.id) && <CheckCircle2 size={14} />}
                        </div>
                        <span className="font-medium text-sm">{service.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-lg font-bold mb-4">Özel İstekleriniz (İsteğe Bağlı)</label>
                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="Projeniz hakkında eklemek istediğiniz detayları buraya yazabilirsiniz..."
                  className="w-full bg-background border border-muted rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px]"
                />
              </div>
            </div>

            {/* Right Column: Results & Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background/50 border border-muted rounded-[2rem] p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Calculator size={20} className="text-primary" /> Özet
                </h3>

                <div className="flex-grow space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Sektör:</span>
                    <span className="font-bold text-primary">{industries.find(i => i.id === selectedIndustry)?.name}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-foreground/60 text-sm">Seçilen Hizmetler:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedServices.length > 0 ? (
                        selectedServices.map(sid => (
                          <span key={sid} className="text-[10px] px-2 py-1 bg-muted rounded-md font-bold">
                            {services.find(s => s.id === sid)?.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs italic text-foreground/40">Henüz seçim yapılmadı</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <AnimatePresence mode="wait">
                    {estimatedPrice !== null ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-4 bg-primary/10 rounded-2xl border border-primary/20"
                      >
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Tahmini Fiyat</span>
                        <div className="text-3xl font-black text-primary mt-1">
                          {estimatedPrice.toLocaleString('tr-TR')} ₺
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        onClick={calculatePrice}
                        disabled={selectedServices.length === 0 || isCalculating}
                        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                      >
                        {isCalculating ? <Loader2 className="animate-spin" size={20} /> : "Fiyatı Gör"}
                      </button>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleSendToExpert}
                    className="w-full border border-muted hover:border-primary/50 text-foreground/70 hover:text-foreground font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Send size={16} /> Uzmana Danışın
                  </button>

                  {isSent && (
                    <p className="text-xs text-green-500 text-center font-bold animate-pulse">
                      Talebiniz uzmanlarımıza iletildi!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
