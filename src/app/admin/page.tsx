"use client";

import { useState, useEffect } from "react";
import { Trash2, ExternalLink, Calendar, User, Building, Phone, Globe, MessageSquare } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const auth = localStorage.getItem("admin_auth");
      const res = await fetch("/api/leads", {
        headers: { "Authorization": auth || "" }
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_auth");
        window.location.reload();
        return;
      }
      const data = await res.json();
      setLeads(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    try {
      const auth = localStorage.getItem("admin_auth");
      await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": auth || "" }
      });
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-foreground/60">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Gelen Talepler</h1>
          <p className="text-foreground/60 mt-1">Sitedeki tüm form gönderimleri burada listelenir.</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
          Toplam: {leads.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {leads.length === 0 ? (
          <div className="bg-card border border-muted p-10 rounded-3xl text-center text-foreground/40 italic">
            Henüz hiç talep gelmedi.
          </div>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="bg-card border border-muted rounded-3xl p-6 hover:border-primary/30 transition-all shadow-sm">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-grow">
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      lead.type === 'calculator' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {lead.type === 'calculator' ? 'Fiyat Teklifi' : 'Ücretsiz Analiz'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-medium">
                      <Calendar size={14} /> {new Date(lead.createdAt).toLocaleString('tr-TR')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold uppercase">
                        <User size={14} /> Yetkili
                      </div>
                      <div className="font-bold">{lead.name || lead.authorizedPerson || 'Belirtilmedi'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold uppercase">
                        <Building size={14} /> Firma
                      </div>
                      <div className="font-bold">{lead.company || 'Belirtilmedi'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold uppercase">
                        <Phone size={14} /> İletişim
                      </div>
                      <div className="font-bold text-primary">{lead.email || lead.phone || 'Belirtilmedi'}</div>
                    </div>
                  </div>

                  {lead.type === 'calculator' && (
                    <div className="p-4 bg-background rounded-2xl border border-muted/50 space-y-2">
                      <div className="text-xs font-bold text-foreground/40 uppercase">Teklif Detayları</div>
                      <div className="flex flex-wrap gap-2">
                        {lead.selectedServices?.map((s: string) => (
                          <span key={s} className="px-2 py-1 bg-muted rounded-md text-[10px] font-bold">{s}</span>
                        ))}
                      </div>
                      <div className="text-lg font-black text-primary">Tahmini: {lead.estimatedPrice?.toLocaleString('tr-TR')} ₺</div>
                      {lead.specialRequirements && (
                        <p className="text-sm text-foreground/70 italic border-l-2 border-primary/30 pl-3 mt-2">{lead.specialRequirements}</p>
                      )}
                    </div>
                  )}

                  {lead.type === 'analysis' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lead.website && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe size={16} className="text-primary" />
                            <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" className="hover:underline font-medium">{lead.website}</a>
                          </div>
                        )}
                        {lead.socialLinks && (
                          <div className="flex items-center gap-2 text-sm">
                            <MessageSquare size={16} className="text-primary" />
                            <span className="font-medium">{lead.socialLinks}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start md:items-center">
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Sil"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
