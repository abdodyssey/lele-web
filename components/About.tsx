"use client";

import { Leaf, Shield, Truck, HeartHandshake, Fish, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const iconMap: { [key: string]: any } = {
  Leaf,
  Shield,
  Truck,
  HeartHandshake
};

interface AboutProps {
  settings: {
    title: string;
    description1: string;
    description2: string;
    image: string | null;
    values: { title: string; desc: string; icon: string }[];
  }
}

export default function About({ settings }: AboutProps) {
  return (
    <section id="tentang" className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Image side with modern layering */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-[3rem] p-4 bg-cream border border-dark/5 shadow-2xl group transition-transform hover:-translate-y-2 duration-500">
              <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-dark/10 relative">
                <Image
                  src={settings.image || "/images/gallery-1.jpeg"}
                  alt="Kegiatan Budidaya Lele"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-accent text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4">
                <MapPin size={14} />
                Lokal Melayani Seluruh Sumatera
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-[1.05] tracking-tight mb-8 whitespace-pre-line">
                {settings.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-brown text-base sm:text-lg leading-relaxed opacity-70 border-l-4 border-accent pl-6">
                {settings.description1}
              </p>
              <p className="text-brown text-base sm:text-lg leading-relaxed opacity-70 mb-10 pl-6">
                {settings.description2}
              </p>
            </div>

            {/* Values grid - Clean and Modern */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
              {settings.values.map((v) => {
                const IconComp = iconMap[v.icon] || Shield;
                return (
                  <div
                    key={v.title}
                    className="flex gap-5 p-6 rounded-3xl border border-dark/5 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 bg-cream/50 transition-all duration-300 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-dark/5 flex items-center justify-center shadow-sm group-hover:bg-[#22c55e] transition-colors duration-500">
                      <IconComp size={20} className="text-[#22c55e] group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="font-display font-black text-dark text-base tracking-tighter uppercase mb-1">
                        {v.title}
                      </div>
                      <div className="text-xs text-brown leading-relaxed opacity-60">
                        {v.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
