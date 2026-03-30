import { Leaf, Shield, Truck, HeartHandshake } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Leaf,
    title: "Bibit Alami",
    desc: "Dibesarkan tanpa hormon buatan, pakan berkualitas, air bersih terjaga.",
  },
  {
    icon: Shield,
    title: "Terjamin Sehat",
    desc: "Setiap bibit dicek sebelum pengiriman, bebas penyakit & cacat fisik.",
  },
  {
    icon: Truck,
    title: "Pengiriman Aman",
    desc: "Dikemas khusus dengan oksigen, survival rate tinggi sampai tujuan.",
  },
  {
    icon: HeartHandshake,
    title: "Konsultasi Gratis",
    desc: "Kami siap bantu dari pemilihan ukuran sampai tips budidaya via WA.",
  },
];

export default function About() {
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden aspect-4/3 border-2 border-green/30 shadow-2xl">
              <Image
                src="/images/about-farming.png"
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
          </div>

          {/* Text side */}
          <div className="order-1 md:order-2">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Tentang Kami
            </span>
            <h2 className="font-display text-4xl font-bold text-dark leading-tight mb-4">
              Hatchery Lokal,{" "}
              <span className="text-primary">
                Kualitas Juara
              </span>
            </h2>
            <p className="text-brown leading-relaxed mb-4">
              Kami adalah usaha budidaya bibit lele yang berpusat di{" "}
              <strong className="text-dark">
                Palembang, Sumatera Selatan
              </strong>
              . Kami melayani petambak rumahan hingga
              pengusaha budidaya skala menengah di seluruh Sumatera.
            </p>
            <p className="text-brown leading-relaxed mb-8">
              Setiap bibit yang kami jual dibesarkan dengan standar kebersihan
              kolam yang ketat, pakan berprotein tinggi, dan dipantau langsung
              oleh tim berpengalaman.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-3 p-3 rounded-xl hover:bg-cream transition-colors"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <v.icon size={18} className="text-primary" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
