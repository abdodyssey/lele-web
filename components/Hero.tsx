"use client";

import { MessageCircle, Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ 
  settings 
}: { 
  settings: { 
    title: string; 
    description: string; 
    image: string | null; 
    cta1Text: string; 
    cta2Text: string; 
  } 
}) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a] pt-16 md:pt-0"
    >
      {/* Background Ornaments */}
      <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#22c55e]/10 blur-[130px] -z-0 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[120px] -z-0" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
              Sedia Stok Ribuan Bibit
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-tight mb-8">
              {settings.title.split('.').map((part, i, arr) => (
                <span key={i} className="block">
                  {part}{i < arr.length - 1 ? '.' : ''}
                </span>
              ))}
            </h1>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
              {settings.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                className="w-full sm:w-auto h-16 px-10 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-2xl shadow-[#22c55e]/20 text-xs sm:text-sm uppercase tracking-widest"
              >
                <MessageCircle size={20} fill="white" />
                {settings.cta1Text}
              </motion.a>
              <a
                href="#produk"
                className="group flex items-center gap-4 text-white/50 hover:text-white font-black transition-all text-[10px] uppercase tracking-[0.2em]"
              >
                <div className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-[#22c55e]/40 group-hover:bg-[#22c55e]/10 transition-all">
                   <Play size={16} fill="white" className="ml-1" />
                </div>
                {settings.cta2Text}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-[600px] mx-auto group">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-white/5 rounded-[3.5rem] -rotate-6 transition-transform group-hover:rotate-0 duration-700" />
            <div className="absolute inset-0 bg-[#22c55e]/5 rounded-[3.5rem] rotate-6 transition-transform group-hover:rotate-0 duration-700" />
            
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10 group-hover:-translate-y-4 transition-transform duration-700">
              <Image
                src={settings.image || "/images/lele.jpg"}
                alt="Hatchery Ari"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Subtle Overlay to make it dark and premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Scroll Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}