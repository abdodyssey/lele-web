import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const waText = encodeURIComponent(
    `Halo, saya mau pesan:\n*${product.name} ukuran ${product.size}*\n\nMohon info ketersediaan stok ya.`,
  );
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${waText}`;

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border ${product.isRecommended ? "border-primary" : "border-cream-dark"}`}
    >
      {product.isRecommended && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
          <Star size={10} fill="white" />
          TERLARIS
        </div>
      )}

      {/* Image */}
      <div className="aspect-4/3 bg-linear-to-br from-green/5 to-cream-dark/30 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-5xl">🐟</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green" />
          <span className="text-[10px] text-green font-bold uppercase tracking-wider">
            Stok Ready
          </span>
        </div>
        <h3 className="font-display font-extrabold text-dark text-xl mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-brown/70 font-medium mb-3">
          Ukuran: <span className="text-dark">{product.size}</span>
        </p>
        <p className="text-sm text-brown leading-relaxed mb-6 line-clamp-2 min-h-10">
          {product.description}
        </p>

        <div className="mb-6 p-4 bg-cream rounded-2xl border border-cream-dark/50 flex flex-col items-center justify-center">
          <div className="text-[10px] text-brown/60 uppercase font-bold mb-1 tracking-widest">Harga Mulai</div>
          <div className="font-display font-black text-2xl text-primary flex items-baseline gap-1">
            <span className="text-sm font-bold italic">Rp</span>
            {product.price.toLocaleString("id-ID")}
            <span className="text-xs font-bold text-brown/40">/ekor</span>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 text-sm active:scale-95"
        >
          <MessageCircle size={18} fill="currentColor" className="text-white/20" />
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}
