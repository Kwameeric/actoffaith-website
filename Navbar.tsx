"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/livestream", label: "Live Stream", icon: "🔴" },
  { href: "/media", label: "Media & Gallery", icon: "📷" },
  { href: "/events", label: "Events & Services", icon: "📅" },
  { href: "/bible-school", label: "Bible School", icon: "📖" },
  { href: "/church-project", label: "Church Project", icon: "🏗️" },
  { href: "/orphanage", label: "Orphanage", icon: "🏠" },
  { href: "/bookstore", label: "Bookstore", icon: "📚" },
  { href: "/giving", label: "Give", icon: "❤️" },
  { href: "/admin", label: "Admin", icon: "⚙️" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [siteName, setSiteName] = useState("Grace Community Church");
  const [shortName, setShortName] = useState("GCC");

  useEffect(() => {
    fetch("/api/content?keys=site_logo,site_name,site_short_name")
      .then(r => r.json())
      .then(d => {
        if (d.site_logo) setLogoUrl(d.site_logo);
        if (d.site_name) setSiteName(d.site_name);
        if (d.site_short_name) setShortName(d.site_short_name);
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-9 h-9 rounded-full object-cover border-2 border-accent" />
            ) : (
              <span className="text-accent text-2xl">✝</span>
            )}
            <span className="hidden sm:inline">{siteName}</span>
            <span className="sm:hidden">{shortName}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${l.href === "/admin" ? "bg-accent text-primary-dark hover:bg-accent-light" : "hover:bg-primary-light"}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Tablet nav */}
          <div className="hidden lg:flex xl:hidden items-center gap-1">
            {navLinks.slice(0, 5).map((l) => (
              <Link key={l.href} href={l.href}
                className="px-2 py-2 rounded-md text-xs font-medium hover:bg-primary-light transition-colors">
                {l.label}
              </Link>
            ))}
            <button onClick={() => setOpen(!open)}
              className="px-2 py-2 rounded-md text-xs font-medium hover:bg-primary-light">
              More ▾
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md hover:bg-primary-light" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile / overflow nav */}
        {open && (
          <div className="xl:hidden pb-4 space-y-1 border-t border-primary-light pt-2">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${l.href === "/admin" ? "bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30" : "hover:bg-primary-light"}`}>
                <span>{l.icon}</span>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
