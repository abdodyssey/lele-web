import { ShoppingCart, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const waText = encodeURIComponent(
    `Halo, saya mau pesan:\n*${product.name} ukuran ${product.size}*\n\nMohon info ketersediaan stok ya.`,
  );
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${waText}`;

  return (
    <div
      className={`group relative bg-white rounded-4xl overflow-hidden shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-2 transition-all duration-500 border ${product.isRecommended ? "border-accent/20" : "border-dark/5"}`}
    >
      {product.isRecommended && (
        <div className="absolute top-4 right-4 z-10 bg-accent text-white text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-accent/20 uppercase">
          <Star size={10} fill="white" className="animate-pulse" />
          Best Choice
        </div>
      )}

      {/* Image Area */}
      <div className="aspect-[5/4] bg-cream/30 flex items-center justify-center overflow-hidden relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-dark/2 opacity-20">
             <span className="text-4xl">🐟</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 md:p-8 space-y-4">
        {/* Badge & Info */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 px-2.5 py-1 bg-accent/10 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] text-accent font-black uppercase tracking-widest">
                Stok Melimpah
              </span>
           </div>
           <span className="text-[10px] text-dark/30 font-black uppercase tracking-tighter">
              Ukuran: {product.size}
           </span>
        </div>
        
        {/* Title */}
        <div className="min-h-12">
           <h3 className="font-display font-black text-dark text-xl md:text-2xl mb-1 tracking-tight leading-tight">
             {product.name}
           </h3>
           <p className="text-xs text-brown font-medium leading-relaxed opacity-50 line-clamp-2">
             {product.description}
           </p>
        </div>

        {/* Pricing Segment */}
        <div className="pt-4 border-t border-dark/5">
           <p className="text-[9px] text-dark/30 uppercase font-black tracking-widest mb-1 items-center flex gap-2">
              <span className="w-4 h-px bg-dark/10" /> Penawaran Terbaik
           </p>
           <div className="flex items-end justify-between">
              <div className="font-display font-black text-2xl md:text-3xl text-primary flex items-baseline gap-1 italic leading-none">
                 <span className="text-xs font-bold leading-none -mb-0.5 tracking-tighter text-primary/60">Rp</span>
                 {product.price.toLocaleString("id-ID")}
                 <span className="text-[10px] font-black text-dark/20 lowercase tracking-tight leading-none -mb-0.5 ml-1">/ ekor</span>
              </div>
           </div>
        </div>

        {/* Improved CTA Button with Hardcoded Fallback Color */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full flex items-center justify-center h-16 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#22c55e]/20 group/btn overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <div className="relative flex items-center justify-center gap-3 z-10 px-4">
            <ShoppingCart size={18} className="text-white shrink-0" />
            <span className="text-xs uppercase tracking-widest text-white whitespace-nowrap">Pesan Sekarang</span>
            <ChevronRight size={16} className="text-white/40 shrink-0 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </a>
      </div>
    </div>
  );
}
