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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Text color logic: White on Hero (transparent), Slate on Scroll/Other (glass)
  const textColor = scrolled ? "text-[#0f172a]" : "text-white";
  const labelColor = scrolled ? "text-[#0f172a]/40" : "text-white/60";
  const logoColor = scrolled ? "text-[#0f172a]" : "text-white";
  const logoBox = scrolled ? "bg-[#0f172a]" : "bg-white/10";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-[#0f172a]/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className={`w-9 h-9 rounded-xl ${logoBox} flex items-center justify-center shadow-lg transition-all group-hover:rotate-12`}>
            <Fish size={18} className={scrolled ? "text-white" : "text-[#22c55e]"} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-display font-black ${logoColor} text-lg tracking-tighter uppercase transition-colors`}>
              BIBIT IKAN <span className={scrolled ? "text-[#22c55e] italic" : "text-[#22c55e] italic"}>ARI</span>
            </span>
            <span className={`text-[8px] font-black uppercase ${labelColor} tracking-[0.2em] mt-0.5 transition-colors`}>Premium Hatchery</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 translate-x-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative group ${labelColor} hover:text-[#22c55e]`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#22c55e] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
           <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            className="h-11 px-6 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#22c55e]/20 transition-all active:scale-95"
          >
            <MessageCircle size={14} fill="currentColor" />
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${scrolled ? 'bg-[#0f172a]/5 text-[#0f172a]' : 'bg-white/10 text-white'}`}
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
            className="fixed inset-0 z-[110] lg:hidden bg-[#0f172a]/60 backdrop-blur-lg"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white p-10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                 <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center text-white">
                    <Fish size={18} />
                 </div>
                 <button onClick={() => setOpen(false)} className="p-2 text-slate-300 hover:text-[#0f172a] transition-colors">
                    <X size={28} />
                 </button>
              </div>

              <div className="flex-1 flex flex-col gap-8">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-3xl font-display font-black text-[#0f172a] hover:text-[#22c55e] transition-colors flex items-center justify-between group"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                    <Fish size={22} className="text-[#0f172a]/10 group-hover:text-[#22c55e] transition-colors" />
                  </a>
                ))}
              </div>
              
              <div className="pt-10 border-t border-slate-100">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                  className="w-full py-6 bg-[#22c55e] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#22c55e]/20"
                >
                  <MessageCircle size={20} fill="currentColor" />
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
