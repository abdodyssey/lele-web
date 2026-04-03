"use client";

import { MessageCircle, ClipboardList, PackageCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Chat WhatsApp",
    desc: "Hubungi kami via WhatsApp. Ceritakan kebutuhan Anda — jenis bibit, ukuran, dan jumlah yang diinginkan.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Diskusi & Stok",
    desc: "Kami bantu pilihkan bibit yang paling cocok, informasikan ketersediaan stok aktual, dan penawaran harga terbaik.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Pilih & Kemas",
    desc: "Bibit disortir ketat, dipilih yang paling sehat, lalu dikemas dengan kantong plastik beroksigen murni.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Kirim Cepat",
    desc: "Pesanan dikirim via ekspedisi khusus atau dapat diambil langsung ke hatchery kami di Gandus, Palembang.",
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
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HowToOrder() {
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent("Halo, saya mau tanya-tanya soal bibit lele dulu 🐟")}`;

  return (
    <section id="cara-order" className="py-24 md:py-40 bg-[#0f172a] overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[20%] left-0 w-64 h-64 bg-[#22c55e]/5 blur-[100px] rounded-full -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
             Alur Pemesanan
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Proses <span className="text-[#22c55e]">Mudah & Cepat</span>
          </h2>
          <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto font-medium">
            Hanya butuh 4 langkah sederhana untuk mendapatkan bibit ikan berkualitas tinggi langsung di kolam Anda.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-32"
        >
          {steps.map((s, i) => (
            <motion.div key={s.step} variants={item} className="relative group">
              {/* Connector line (Desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-24 w-[calc(100%-6rem)] h-px border-t border-white/10 z-0" />
              )}
              
              <div className="relative z-10 flex flex-col">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#22c55e]/40 transition-all duration-500 shadow-2xl group-hover:bg-[#22c55e]/10">
                  <s.icon size={32} className="text-[#22c55e]" />
                </div>
                <div className="text-[10px] font-black text-[#22c55e] mb-2 tracking-[0.2em] uppercase">
                   Step {s.step}
                </div>
                <h3 className="font-display font-black text-white text-2xl mb-4 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA Banner - High Performance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden bg-white/5 rounded-[3.5rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/10 backdrop-blur-sm"
        >
          <div className="text-center lg:text-left">
            <h3 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Siap Tebar Bibit <br className="hidden md:block" /> Berkualitas Sekarang?
            </h3>
            <p className="text-white/50 text-lg md:text-xl font-medium">
              Konsultasi gratis dengan tim ahli kami setiap hari. Respon cepat via WA.
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-black px-12 py-6 rounded-2xl transition-all shadow-2xl shadow-[#22c55e]/20 text-xs sm:text-sm uppercase tracking-[0.2em]"
          >
            <MessageCircle size={24} fill="currentColor" />
            Tanya Admin via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}