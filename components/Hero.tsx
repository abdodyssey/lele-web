"use client";

import { ArrowDown, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green/10 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
        {/* Text */}
        <div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-dark leading-tight mb-4">
            Segar. <span className="text-primary">Sehat.</span>
            <br />
            Siap Tebar.
          </h1>
          <p className="text-brown text-lg leading-relaxed mb-8 max-w-md">
            Bibit lele unggul langsung dari kolam kami. Ukuran lengkap, harga
            bersahabat, pengiriman ke seluruh wilayah.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=Halo, saya mau tanya soal bibit lele`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-orange-200"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
            <a
              href="#produk"
              className="inline-flex items-center gap-2 border border-brown/30 text-brown hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Lihat Produk
            </a>
          </div>
        </div>

        {/* Image placeholder */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl">
            <Image
              src="/images/hero-pond.png"
              alt="Kolam Bibit Lele"
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#tentang"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brown/50 hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}