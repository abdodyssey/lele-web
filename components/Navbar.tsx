"use client";

import { useState, useEffect } from "react";
import { Menu, X, Fish, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#tentang" },
  { label: "Produk", href: "#produk" },
  { label: "Galeri", href: "#galeri" },
  { label: "Cara Order", href: "#cara-order" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-dark/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <Fish size={18} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-dark text-lg tracking-tighter uppercase">
              BIBIT IKAN <span className="text-primary italic">ARI</span>
            </span>
            <span className="text-[8px] font-black uppercase text-dark/30 tracking-[0.2em] mt-0.5">Premium Hatchery</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 translate-x-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative group ${scrolled ? 'text-dark/40 hover:text-primary' : 'text-dark/60 hover:text-dark'}`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
           <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            className="h-11 px-6 bg-primary hover:bg-dark text-white rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            <MessageCircle size={14} fill="currentColor" />
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-10 h-10 rounded-xl bg-dark/5 flex items-center justify-center text-dark hover:bg-dark/10 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] lg:hidden bg-dark/40 backdrop-blur-lg"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white p-8 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                 <button onClick={() => setOpen(false)} className="p-2 text-dark/30 hover:text-dark transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-2xl font-display font-black text-dark hover:text-primary transition-colors flex items-center justify-between group"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                    <Fish size={18} className="text-dark/10 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
              
              <div className="pt-8 border-t border-dark/5">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                  className="w-full py-5 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                  <MessageCircle size={18} fill="currentColor" />
                  Hubungi Admin
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
