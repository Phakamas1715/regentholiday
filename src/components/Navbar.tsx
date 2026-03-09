// Navbar component
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoImg from "@/assets/logo-regent.png";

const navItems = [
  { label: "หน้าแรก", path: "/" },
  { label: "จองทัวร์", path: "/booking" },
  { label: "แพ็คเกจ", path: "/packages" },
  { label: "เกี่ยวกับเรา", path: "https://www.regentholiday.com/about", external: true },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-foreground">
          <img src={logoImg} alt="Regent Holidays" className="h-10 object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">เข้าสู่ระบบ</Button>
          <Button variant="hero" size="sm">เริ่มวางแผนทริป</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border p-4 space-y-3">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-body text-base text-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block py-2 font-body text-base text-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
          <Button variant="hero" className="w-full mt-2">เริ่มวางแผนทริป</Button>
        </div>
      )}
    </nav>
  );
}
