"use client";

import Image from "next/image";
import { MessageCircle, ShoppingCart, Ban } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const isAvailable = product.status !== "out_of_stock";
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(
    `Halo, saya ingin memesan ${product.name} ukuran ${product.size}. Apakah stoknya masih tersedia? 🐟`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white rounded-[2.5rem] p-4 border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 ${!isAvailable ? 'opacity-75 grayscale-[0.5]' : ''}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 mb-6 border border-slate-100">
        <Image
          src={product.image || "/images/lele.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {isAvailable ? (
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white">
               <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
               <span className="text-[9px] font-black uppercase text-[#0f172a] tracking-widest leading-none">Tersedia</span>
             </div>
           ) : (
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500 text-white shadow-lg border border-red-400">
               <Ban size={10} />
               <span className="text-[9px] font-black uppercase tracking-widest leading-none">Stok Habis</span>
             </div>
           )}

           {product.isRecommended && isAvailable && (
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0f172a] text-white shadow-lg">
               <span className="text-[9px] font-black uppercase tracking-widest leading-none">Pilihan Juara</span>
             </div>
           )}
        </div>

        {/* Subtle Bottom Shade */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="px-3 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-display font-black text-[#0f172a] tracking-tight group-hover:text-[#22c55e] transition-colors leading-none mb-2">
              {product.name}
            </h3>
            <p className="inline-block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Ukuran {product.size}
            </p>
          </div>
          <div className="text-right">
             <p className="text-lg font-black text-[#0f172a] leading-none mb-1">
               Rp{product.price.toLocaleString()}
             </p>
             <p className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Per Ekor</p>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium opacity-80">
          {product.description}
        </p>

        {/* CTA Button */}
        <a
          href={isAvailable ? waUrl : "#"}
          className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-300 ${
            isAvailable 
            ? "bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-xl shadow-[#22c55e]/20 hover:scale-[1.02] active:scale-95" 
            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
          onClick={(e) => !isAvailable && e.preventDefault()}
        >
          {isAvailable ? (
            <>
              <MessageCircle size={18} fill="white" />
              Pesan Sekarang
            </>
          ) : (
            <>
              <Ban size={18} />
              Belum Tersedia
            </>
          )}
        </a>
      </div>
    </motion.div>
  );
}
