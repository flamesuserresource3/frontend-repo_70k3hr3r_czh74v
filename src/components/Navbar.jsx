import React, { useState } from 'react';
import { Menu, X, Rocket, Home, Newspaper, Users, Phone } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: '#home', label: 'Home', Icon: Home },
    { href: '#features', label: 'Features', Icon: Rocket },
    { href: '#about', label: 'About', Icon: Users },
    { href: '#blog', label: 'Blog', Icon: Newspaper },
    { href: '#contact', label: 'Contact', Icon: Phone },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#home" className="text-lg font-semibold tracking-tight text-white">NovaChain</a>
        <nav className="hidden items-center gap-6 sm:flex">
          {nav.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm text-white/70 transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <button className="rounded-lg p-2 text-white/70 hover:bg-white/10 sm:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-black/80 p-3 sm:hidden">
          <nav className="grid gap-2">
            {nav.map(({ href, label, Icon }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-white/80 hover:bg-white/10">
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
