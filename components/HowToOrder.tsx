"use client";

import { MessageCircle, ClipboardList, PackageCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Chat WhatsApp",
    desc: "Hubungi kami via WhatsApp. Ceritakan kebutuhan kamu — jenis bibit, ukuran, dan jumlah yang diinginkan.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Diskusi & Konfirmasi",
    desc: "Kami bantu pilihkan bibit yang paling cocok, informasikan stok & harga, lalu konfirmasi pesanan.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Proses & Kemas",
    desc: "Bibit dipilih yang terbaik, dikemas dengan plastik oksigen agar tetap hidup sampai tujuan.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Pengiriman",
    desc: "Dikirim via ekspedisi terpercaya atau bisa ambil langsung di lokasi kami di Palembang.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowToOrder() {
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent("Halo, saya mau tanya-tanya soal bibit lele dulu 🐟")}`;

  return (
    <section id="cara-order" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            Cara Order
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-4">
            Mudah, Cepat, <span className="text-primary">Langsung ke WA</span>
          </h2>
          <p className="text-brown text-base sm:text-lg max-w-md mx-auto">
            Hanya butuh beberapa langkah mudah untuk mendapatkan bibit lele
            berkualitas di kolam Anda.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-6 mb-16"
        >
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={item} className="relative group">
              {/* Connector line (Desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-20 w-[calc(100%-4rem)] h-px border-t-[1.5px] border-dashed border-primary/20 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={28} className="text-primary" />
                </div>
                <div className="text-xs font-bold text-primary/60 mb-2 tracking-widest uppercase">
                  Langkah {s.step}
                </div>
                <h3 className="font-display font-extrabold text-dark text-xl mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-brown leading-relaxed max-w-[240px] sm:max-w-none">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-primary rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-100"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
              Siap order bibit lele Anda?
            </h3>
            <p className="text-white/80 text-base md:text-lg">
              Tim kami online setiap hari. Respon cepat, konsultasi gratis!
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-3 bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:bg-cream transition-all hover:scale-105 active:scale-95 shadow-xl text-base"
          >
            <MessageCircle size={22} fill="currentColor" className="text-white" />
            Chat WhatsApp Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}