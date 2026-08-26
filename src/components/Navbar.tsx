"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/levels", label: "Journey", icon: "🗺️" },
    { href: "/reading", label: "Reading", icon: "📚" },
    { href: "/tongue-twister", label: "Twisters", icon: "👅" },
    { href: "/progress", label: "Progress", icon: "📈" },
    { href: "/about", label: "About", icon: "ℹ️" },
  ];

  return (
    <div className="navbar-wrapper">
      <header className="navbar">
        <Link href="/" className="logo text-gradient-primary">
          🐝 BeeSpell
        </Link>
        <nav className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-actions">
          <Link href="/levels" className="btn btn-primary" style={{ padding: "12px 28px", fontSize: "1.1rem" }}>
            Play Now ▶
          </Link>
        </div>
      </header>
    </div>
  );
}
