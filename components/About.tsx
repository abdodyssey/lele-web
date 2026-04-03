"use client";

import { Leaf, Shield, Truck, HeartHandshake, MapPin } from "lucide-react";
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
            <div className="relative rounded-[3.5rem] p-4 bg-slate-50 border border-slate-200 shadow-2xl group transition-transform hover:-translate-y-2 duration-500">
              <div className="rounded-[3rem] overflow-hidden aspect-[4/5] border border-slate-200 relative">
                <Image
                  src={settings.image || "/images/gallery-1.jpeg"}
                  alt="Kegiatan Budidaya Lele"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#22c55e]/5 rounded-full blur-[100px] -z-10" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#22c55e] text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-6">
                <MapPin size={14} />
                Lokal Melayani Seluruh Sumatera
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-[#0f172a] leading-[1.0] tracking-tighter mb-8 whitespace-pre-line">
                {settings.title}
              </h2>
            </div>
            
            <div className="space-y-8">
              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed border-l-4 border-[#22c55e] pl-8 font-medium">
                {settings.description1}
              </p>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed pl-8">
                {settings.description2}
              </p>
            </div>

            {/* Values grid - High Contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
              {settings.values.map((v) => {
                const IconComp = iconMap[v.icon] || Shield;
                return (
                  <div
                    key={v.title}
                    className="flex gap-6 p-8 rounded-[2.5rem] border border-slate-100 hover:border-[#22c55e]/20 hover:shadow-2xl hover:shadow-[#22c55e]/5 bg-slate-50 transition-all duration-300 group"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-[#22c55e] transition-colors duration-500">
                      <IconComp size={24} className="text-[#22c55e] group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="font-display font-black text-[#0f172a] text-lg tracking-tight uppercase mb-2">
                        {v.title}
                      </div>
                      <div className="text-sm text-slate-500 leading-relaxed font-medium">
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
