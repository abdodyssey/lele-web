"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { GalleryItem } from "@/lib/products";
import { Plus } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  // Balanced grid sizing like a modern magazine
  const getClassName = (index: number) => {
    if (index === 0) return "col-span-2 row-span-2";
    if (index === 3 || index === 6) return "col-span-1 row-span-2";
    return "col-span-1";
  };

  return (
    <section id="galeri" className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4">
             Dokumentasi Proyek
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-dark tracking-tighter leading-none mb-6">
            Keseharian di Hatchery
          </h2>
          <p className="text-brown text-base sm:text-lg max-w-xl mx-auto opacity-60">
            Intip proses pembibitan, pengemasan, hingga pengiriman bibit lele kualitas unggul kami ke setiap pelanggan.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[220px]"
        >
          {items.map((image, index) => (
            <motion.div
              key={image._id}
              variants={itemVariants}
              className={`relative rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700 bg-cream ${getClassName(index % 8)}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              {/* Overlay (Subtle Gradient only) */}
              <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] pointer-events-none" />
              
              {/* Image Info hint */}
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 delay-100">
                 <p className="text-[10px] font-black uppercase text-white tracking-[0.2em] leading-none mb-1 opacity-70">Photo Gallery</p>
                 <p className="text-sm font-bold text-white leading-none tracking-tight">Kualitas Terjamin</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
