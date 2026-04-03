"use client";

import {
  Fish,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Instagram, Youtube } from "./BrandIcons";
import { motion } from "framer-motion";

interface FooterProps {
  contact: {
    address: string;
    mapUrl: string;
    phone: string;
  };
}

export default function Footer({ contact }: FooterProps) {
  const waUrl = `https://wa.me/${contact.phone}`;

  return (
    <footer id="footer" className="bg-[#0f172a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e] flex items-center justify-center shadow-lg shadow-[#22c55e]/20">
                <Fish size={24} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-2xl uppercase tracking-tighter">
                  BIBIT IKAN <span className="text-[#22c55e] italic">ARI</span>
                </span>
                <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] mt-1">
                  Hatchery & Budidaya
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm font-medium">
              Supplier bibit lele dan ikan air tawar terpercaya di Palembang.
              Mengutamakan kualitas benih unggul dengan tingkat mortalitas
              rendah untuk kesuksesan panen Anda.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="#" icon={<Instagram size={20} />} />
              <SocialIcon href="#" icon={<Youtube size={20} />} />
              <SocialIcon href={waUrl} icon={<MessageCircle size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Navigasi
            </h4>
            <ul className="space-y-4">
              {[
                ["Beranda", "#hero"],
                ["Tentang Kami", "#tentang"],
                ["Produk Kami", "#produk"],
                ["Galeri Foto", "#galeri"],
                ["Cara Order", "#cara-order"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/80 hover:text-[#22c55e] font-bold transition-all flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] scale-0 group-hover:scale-100 transition-transform" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Hubungi Kami
            </h4>
            <div className="space-y-14 ">
              <ContactItem
                icon={<MapPin size={18} />}
                label="Lokasi Hatchery"
                value={contact.address}
                href={contact.mapUrl}
              />
              <ContactItem
                icon={<Phone size={18} />}
                label="WhatsApp"
                value={`+${contact.phone.slice(0, 2)} ${contact.phone.slice(2, 5)}-${contact.phone.slice(5, 9)}-${contact.phone.slice(9)}`}
                href={waUrl}
              />
              <ContactItem
                icon={<Clock size={18} />}
                label="Jam Operasional"
                value="Setiap Hari, 07.00 – 22.00"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-center md:text-left">
          <span>
            © 2025 BIBIT IKAN ARI. ALL RIGHTS RESERVED. PALEMBANG, INDONESIA.
          </span>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 hover:bg-[#22c55e] hover:border-[#22c55e] hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
    >
      {icon}
    </a>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start  gap-5 group pb-5">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#22c55e] group-hover:bg-[#22c55e] group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-3">
          {label}
        </p>
        <p
          className={`text-sm font-bold text-white/80 group-hover:text-white transition-colors flex items-center gap-1 leading-relaxed ${href ? "underline decoration-white/20 underline-offset-4 decoration-1 hover:decoration-[#22c55e]" : ""}`}
        >
          {value}
          {href && <ExternalLink size={12} className="opacity-50" />}
        </p>
      </div>
    </div>
  );

  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  return content;
}
