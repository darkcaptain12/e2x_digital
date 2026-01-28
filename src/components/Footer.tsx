import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
              E2X<span className="text-foreground">DIJITAL</span>
            </Link>
            <p className="mt-4 text-foreground/60 max-w-sm">
              E2X Dijital, işletmenizin dijital dönüşümünü hızlandıran, AI destekli yazılım ve pazarlama çözümleri sunan bir teknoloji ajansıdır.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Hizmetler</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#services" className="text-foreground/60 hover:text-primary">Web Tasarım</Link></li>
              <li><Link href="#services" className="text-foreground/60 hover:text-primary">Yapay Zeka</Link></li>
              <li><Link href="#services" className="text-foreground/60 hover:text-primary">Otomasyon</Link></li>
              <li><Link href="#services" className="text-foreground/60 hover:text-primary">Sosyal Medya</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">İletişim</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-foreground/60">info@e2xdijital.com</li>
              <li className="text-foreground/60">+90 (5XX) XXX XX XX</li>
              <li className="text-foreground/60">İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/40">
            &copy; {new Date().getFullYear()} E2X Dijital. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social links placeholder */}
            <span className="text-foreground/40 text-sm">Profesyonel Dijital Çözüm Ortağınız</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
