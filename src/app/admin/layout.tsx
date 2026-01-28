"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Settings, LogOut, ShieldCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password for demo purposes
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", password);
      setError("");
    } else {
      setError("Hatalı şifre!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-muted p-8 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Girişi</h1>
            <p className="text-foreground/60 text-sm">E2X Dijital Yönetim Paneli</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Yönetici Şifresi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-muted rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-muted p-6 flex flex-col">
        <div className="flex items-center gap-2 font-black text-xl mb-10 text-primary">
          E2X<span className="text-foreground">PANEL</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all font-medium"
          >
            <LayoutDashboard size={20} /> Talepler (Leads)
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all font-medium"
          >
            <Settings size={20} /> Site Ayarları
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium mt-auto"
        >
          <LogOut size={20} /> Çıkış Yap
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
