"use client";

import { Leaf, Shield, Truck, HeartHandshake } from "lucide-react";
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
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div className="rounded-3xl overflow-hidden aspect-4/3 border-2 border-green/30 shadow-2xl">
              <Image
                src={settings.image || "/images/gallery-1.jpeg"}
                alt="Kegiatan Budidaya Lele"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(var(--color-primary) 1.5px, transparent 1.5px)",
                backgroundSize: "8px 8px",
              }}
            />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2 text-center md:text-left"
          >
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Tentang Kami
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark leading-tight mb-4 mx-auto md:mx-0 max-w-sm whitespace-pre-line">
              {settings.title}
            </h2>
            <p className="text-brown text-base leading-relaxed mb-4">
              {settings.description1}
            </p>
            <p className="text-brown text-base leading-relaxed mb-8">
              {settings.description2}
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {settings.values.map((v) => {
                const IconComp = iconMap[v.icon] || Shield;
                return (
                  <div
                    key={v.title}
                    className="flex gap-3 p-3 rounded-xl hover:bg-cream transition-colors text-left"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComp size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark text-sm">
                        {v.title}
                      </div>
                      <div className="text-xs text-brown leading-relaxed mt-0.5">
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
