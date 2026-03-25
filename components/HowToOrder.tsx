import { MessageCircle, ClipboardList, PackageCheck, Truck } from "lucide-react";

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

export default function HowToOrder() {
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent("Halo, saya mau tanya-tanya soal bibit lele dulu 🐟")}`;

  return (
    <section id="cara-order" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Cara Order
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-dark)] mb-3">
            Mudah, Cepat, Langsung ke WA
          </h2>
          <p className="text-[var(--color-brown)] max-w-md mx-auto">
            Ga perlu ribet. Cukup chat kami, kami yang urus sisanya.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-20 w-[calc(100%-5rem+1.5rem-1rem)] h-px border-t-[1.5px] border-dashed border-primary/20 z-0" />
              )}
              <div className="relative z-10 flex flex-col items-start">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <s.icon size={28} className="text-[var(--color-primary)]" />
                </div>
                <div className="text-xs font-bold text-[var(--color-primary)]/40 mb-1 tracking-widest">
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-[var(--color-dark)] text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--color-brown)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-[var(--color-primary)] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              Siap order bibit lele sekarang?
            </h3>
            <p className="text-white/80 text-sm">
              Tim kami online setiap hari. Respon cepat, konsultasi gratis!
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[var(--color-primary)] font-bold px-8 py-4 rounded-2xl hover:bg-[var(--color-cream)] transition-colors shadow-lg text-sm"
          >
            <MessageCircle size={20} />
            Chat Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}