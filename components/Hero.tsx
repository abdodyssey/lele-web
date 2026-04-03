"use client";

import { ArrowDown, MessageCircle, Play } from "lucide-react";
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
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-16 md:pt-0"
    >
      {/* Background Ornaments */}
      <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-accent/5 blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] -z-10" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Text Content */}
        <div className="text-center lg:text-left z-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Sedia Stok Ribuan Bibit
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-primary leading-[1.05] tracking-tight mb-6">
              {settings.title}
            </h1>
            <p className="text-brown text-base sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 opacity-80">
              {settings.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                className="w-full sm:w-auto h-16 px-8 bg-primary hover:bg-dark text-white rounded-2xl flex items-center justify-center gap-3 font-bold transition-shadow shadow-2xl shadow-primary/30 text-base"
              >
                <div className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center -ml-2">
                  <MessageCircle size={20} fill="white" />
                </div>
                {settings.cta1Text}
              </motion.a>
              <a
                href="#produk"
                className="group flex items-center gap-3 text-primary/60 hover:text-primary font-bold transition-all text-sm uppercase tracking-widest"
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                   <Play size={14} fill="currentColor" className="ml-1" />
                </div>
                {settings.cta2Text}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-square max-w-[600px] mx-auto group">
            {/* Main Image Card */}
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
            <div className="absolute inset-0 bg-accent/10 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)] border-8 border-white group-hover:-translate-y-4 transition-transform duration-700">
              <Image
                src={settings.image || "/images/lele.jpg"}
                alt="Hatchery Ari"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curve/Shadow or Indicator */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        href="#tentang"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-8 h-12 border-2 border-primary/20 rounded-full hidden md:flex items-start justify-center p-2"
      >
        <motion.div 
           animate={{ y: [0, 16, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="w-1.5 h-1.5 bg-primary rounded-full shadow-lg"
        />
      </motion.a>
    </section>
  );
}