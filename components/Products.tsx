import { MessageCircle, Star, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import type { Product } from "@/types";

async function getProducts(): Promise<Product[]> {
  return client.fetch(`*[_type == "product"] | order(_createdAt asc)`);
}

// Fallback data kalau Sanity belum diisi
const fallbackProducts: Product[] = [
  {
    _id: "1",
    name: "Bibit Lele Sangkuriang",
    size: "1 cm",
    price: 150,
    minOrder: "1.000 ekor",
    description:
      "Ukuran paling kecil, cocok untuk yang mau membesarkan sendiri dari awal.",
    image: null,
    isRecommended: false,
  },
  {
    _id: "2",
    name: "Bibit Lele Sangkuriang",
    size: "2 cm",
    price: 250,
    minOrder: "500 ekor",
    description:
      "Ukuran paling populer. Survival rate tinggi, pertumbuhan cepat.",
    image: null,
    isRecommended: true,
  },
  {
    _id: "3",
    name: "Bibit Lele Sangkuriang",
    size: "3 cm",
    price: 400,
    minOrder: "300 ekor",
    description: "Sudah lebih kuat, cocok untuk kolam terpal atau kolam semen.",
    image: null,
    isRecommended: false,
  },
  {
    _id: "4",
    name: "Bibit Lele Dumbo",
    size: "2 cm",
    price: 300,
    minOrder: "500 ekor",
    description: "Lele dumbo berukuran besar, daging tebal, favorit pasar.",
    image: null,
    isRecommended: false,
  },
];

function ProductCard({ product }: { product: Product }) {
  const waText = encodeURIComponent(
    `Halo, saya mau pesan:\n*${product.name} ukuran ${product.size}*\nMin. order: ${product.minOrder}\n\nMohon info ketersediaan stok ya.`,
  );
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${waText}`;

  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border ${product.isRecommended ? "border-[var(--color-primary)]" : "border-[var(--color-cream-dark)]"}`}
    >
      {product.isRecommended && (
        <div className="absolute top-3 right-3 z-10 bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={10} fill="white" />
          Paling Laku
        </div>
      )}

      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-green)]/10 to-[var(--color-cream-dark)] flex items-center justify-center">
        {product.image ? (
          <Image
            src={urlFor(product.image).width(400).height(300).url()}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl">🐟</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <BadgeCheck size={14} className="text-[var(--color-green)]" />
          <span className="text-xs text-[var(--color-green)] font-semibold">
            Tersedia
          </span>
        </div>
        <h3 className="font-display font-bold text-[var(--color-dark)] text-lg">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--color-brown)] mb-3">
          Ukuran {product.size}
        </p>
        <p className="text-sm text-[var(--color-brown)] leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs text-[var(--color-brown)]">Harga mulai</div>
            <div className="font-display font-bold text-2xl text-[var(--color-primary)]">
              Rp {product.price.toLocaleString("id-ID")}
              <span className="text-sm font-normal text-[var(--color-brown)]">
                /ekor
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[var(--color-brown)]">Min. order</div>
            <div className="text-sm font-semibold text-[var(--color-dark)]">
              {product.minOrder}
            </div>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
        >
          <MessageCircle size={16} />
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}

export default async function Products() {
  let products: Product[] = [];

  try {
    products = await getProducts();
    if (!products.length) products = fallbackProducts;
  } catch {
    products = fallbackProducts;
  }

  return (
    <section id="produk" className="py-24 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Produk Kami
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-dark)] mb-3">
            Jenis Bibit Tersedia
          </h2>
          <p className="text-[var(--color-brown)] max-w-md mx-auto">
            Semua bibit dibesarkan di kolam kami sendiri. Pilih ukuran sesuai
            kebutuhan budidaya kamu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
