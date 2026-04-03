"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { GalleryItem } from "@/lib/products";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  // Helper to determine column span like the original design
  const getClassName = (index: number) => {
    if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
    return "col-span-1";
  };

  return (
    <section id="galeri" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            Galeri
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-3">
            Dokumentasi Kami
          </h2>
          <p className="text-brown text-base max-w-md mx-auto">
            Kegiatan pengiriman dan pembibitan di kolam kami
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]"
        >
          {items.map((image, index) => (
            <motion.div
              key={image._id}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow ${getClassName(index)}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
