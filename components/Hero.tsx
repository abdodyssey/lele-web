"use client";

import { ArrowDown, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-cream)]"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[var(--color-green)]/10 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Text */}
        <div>
          <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            🐟 Supplier Bibit Lele Terpercaya
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--color-dark)] leading-tight mb-4">
            Segar.{" "}
            <span className="text-[var(--color-primary)]">Sehat.</span>
            <br />
            Siap Tebar.
          </h1>
          <p className="text-[var(--color-brown)] text-lg leading-relaxed mb-8 max-w-md">
            Bibit lele unggul langsung dari kolam kami. Ukuran lengkap, harga
            bersahabat, pengiriman ke seluruh wilayah.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Halo, saya mau tanya soal bibit lele`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-orange-200"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
            <a
              href="#produk"
              className="inline-flex items-center gap-2 border border-[var(--color-brown)]/30 text-[var(--color-brown)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Lihat Produk
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { val: "50rb+", label: "Bibit Terjual" },
              { val: "200+", label: "Pelanggan" },
              { val: "5 Th", label: "Pengalaman" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-[var(--color-dark)]">
                  {s.val}
                </div>
                <div className="text-xs text-[var(--color-brown)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image placeholder — ganti dengan foto kolam/bibit asli */}
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-[var(--color-green)]/20 to-[var(--color-primary)]/20 flex items-center justify-center border-2 border-dashed border-[var(--color-primary)]/30">
            <div className="text-center text-[var(--color-brown)]/50">
              <div className="text-6xl mb-2">🐟</div>
              <div className="text-sm">Ganti dengan foto kolam / bibit</div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <div className="font-bold text-[var(--color-dark)] text-sm">4.9 / 5</div>
              <div className="text-xs text-[var(--color-brown)]">Rating pelanggan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#tentang"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-brown)]/50 hover:text-[var(--color-primary)] transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}