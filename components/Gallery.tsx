"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const images = [
  { id: 1, src: "/images/gallery-1.jpeg", alt: "Galeri 1", className: "col-span-2 md:col-span-2 row-span-2" },
  { id: 2, src: "/images/gallery-2.jpeg", alt: "Galeri 2", className: "col-span-1" },
  { id: 3, src: "/images/gallery-3.jpeg", alt: "Galeri 3", className: "col-span-1 md:col-span-1" },
  { id: 4, src: "/images/gallery-4.jpeg", alt: "Galeri 4", className: "col-span-1 md:col-span-1" },
  { id: 5, src: "/images/gallery-5.jpeg", alt: "Galeri 5", className: "col-span-1 md:col-span-1" },
];

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

export default function Gallery() {
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
          {images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow ${image.className}`}
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
