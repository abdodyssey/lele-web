"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryItem } from "@/lib/products";

interface Props {
  items: GalleryItem[];
}

export default function Gallery({ items }: Props) {
  // If no items from data, use internal defaults
  const displayItems = items && items.length > 0 ? items : [
    { _id: "1", src: "/images/gallery-1.jpeg", alt: "Kolam Pembesaran" },
    { _id: "2", src: "/images/gallery-2.jpeg", alt: "Penyortiran Bibit" },
    { _id: "3", src: "/images/gallery-3.jpeg", alt: "Pengepakan Aman" },
    { _id: "4", src: "/images/lele.jpg", alt: "Bibit Siap Tebar" },
  ];

  return (
    <section id="galeri" className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a]/5 text-[#0f172a] text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-6">
               Dokumentasi Kolam
            </span>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#0f172a] tracking-tighter leading-none mb-6">
              Aktivitas Hatchery
            </h2>
            <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-xl opacity-70">
              Lihat bagaimana kami membesarkan bibit ikan Anda dengan penuh dedikasi di fasilitas Hatchery Ari Gandus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayItems.map((item, i) => (
            <motion.div
              key={item._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-xl aspect-[4/5] ${
                i % 2 === 1 ? "lg:translate-y-12" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt || "Galeri Bibit Ikan Ari"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              {/* Overlay (Subtle Gradient only) */}
              <div className="absolute inset-0 bg-[#0f172a]/30 group-hover:bg-[#0f172a]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] pointer-events-none" />
              
              {/* Image Info hint */}
              <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 delay-100">
                 <p className="text-[10px] font-black uppercase text-white tracking-[0.3em] leading-none mb-2 opacity-60">Hatchery Photo</p>
                 <p className="text-xl font-bold text-white leading-tight tracking-tight uppercase">
                    {item.alt || "Kualitas Terjamin"}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
