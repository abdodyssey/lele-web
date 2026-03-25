import { Star, Quote } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/types";
import { client, urlFor } from "@/lib/sanity";

async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`);
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Pak Hendra",
    location: "Palembang",
    message:
      "Bibitnya sehat semua, nyampe rumah masih pada lincah. Udah 3x order di sini, ga pernah kecewa. Packaging-nya aman banget.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Bu Sari",
    location: "Ogan Ilir",
    message:
      "Responsif banget kalau chat WA, sabar jelasin mana ukuran yang cocok buat kolam saya. Bibit 2cm tumbuhnya cepet!",
    rating: 5,
  },
  {
    _id: "3",
    name: "Mas Eko",
    location: "Banyuasin",
    message:
      "Harganya bersaing, kualitasnya ga kalah sama yang mahal. Survival rate-nya tinggi, recommended lah buat yang baru mulai budidaya.",
    rating: 5,
  },
  {
    _id: "4",
    name: "Pak Darmawan",
    location: "Lahat",
    message:
      "Pengiriman jauh tapi bibitnya selamat sampai tujuan. Cara kemasnnya bagus, dikasih oksigen. Puas!",
    rating: 4,
  },
  {
    _id: "5",
    name: "Bu Ratna",
    location: "Musi Banyuasin",
    message:
      "Udah langganan setahun lebih. Konsisten kualitasnya. Kalau ada pertanyaan soal budidaya selalu dibantu.",
    rating: 5,
  },
  {
    _id: "6",
    name: "Kak Rendi",
    location: "Palembang",
    message:
      "Beli 500 ekor bibit 3cm, tumbuh pesat semua. Panen pertama sukses besar. Makasih ya!",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default async function Testimonials() {
  let testimonials: Testimonial[] = [];

  try {
    testimonials = await getTestimonials();
    if (!testimonials.length) testimonials = fallbackTestimonials;
  } catch {
    testimonials = fallbackTestimonials;
  }

  return (
    <section id="testimoni" className="py-24 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Testimoni
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-dark)] mb-3">
            Kata Mereka yang Sudah Order
          </h2>
          <p className="text-[var(--color-brown)] max-w-md mx-auto">
            Ratusan petambak sudah percayakan kebutuhan bibit lele mereka kepada
            kami.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[var(--color-cream-dark)]"
            >
              <Quote
                size={24}
                className="text-[var(--color-primary)]/20 mb-3"
              />
              <p className="text-[var(--color-brown)] text-sm leading-relaxed mb-5">
                &quot;{t.message}&quot;
              </p>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center font-display font-bold text-[var(--color-primary)] text-sm shrink-0">
                  {t.avatar ? (
                    <Image
                      src={urlFor(t.avatar).width(80).height(80).url()}
                      alt={t.name}
                      width={80}
                      height={80}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    t.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[var(--color-dark)] text-sm truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--color-brown)]">
                    {t.location}
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
