import { Leaf, Shield, Truck, HeartHandshake } from "lucide-react";

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
          {/* Image side */}
          <div className="relative order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[var(--color-green)]/20 to-[var(--color-cream-dark)] flex items-center justify-center border-2 border-dashed border-[var(--color-green)]/30">
              <div className="text-center text-[var(--color-brown)]/40">
                <div className="text-6xl mb-2">🏊</div>
                <div className="text-sm">Foto kolam / kegiatan ternak</div>
              </div>
            </div>
            {/* Decorative card */}
            <div className="absolute -top-4 -right-4 bg-[var(--color-primary)] text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-display text-3xl font-bold">5+</div>
              <div className="text-xs opacity-90">Tahun Pengalaman</div>
            </div>
            {/* Decorative dot grid */}
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
            <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Tentang Kami
            </span>
            <h2 className="font-display text-4xl font-bold text-[var(--color-dark)] leading-tight mb-4">
              Hatchery Lokal,{" "}
              <span className="text-[var(--color-primary)]">
                Kualitas Juara
              </span>
            </h2>
            <p className="text-[var(--color-brown)] leading-relaxed mb-4">
              Kami adalah usaha budidaya bibit lele yang berpusat di{" "}
              <strong className="text-[var(--color-dark)]">
                Palembang, Sumatera Selatan
              </strong>
              . Sudah lebih dari 5 tahun kami melayani petambak rumahan hingga
              pengusaha budidaya skala menengah di seluruh Sumatera.
            </p>
            <p className="text-[var(--color-brown)] leading-relaxed mb-8">
              Setiap bibit yang kami jual dibesarkan dengan standar kebersihan
              kolam yang ketat, pakan berprotein tinggi, dan dipantau langsung
              oleh tim berpengalaman.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-3 p-3 rounded-xl hover:bg-[var(--color-cream)] transition-colors"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <v.icon size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-dark)] text-sm">
                      {v.title}
                    </div>
                    <div className="text-xs text-[var(--color-brown)] leading-relaxed mt-0.5">
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
