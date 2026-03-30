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
    _id: "2",
    name: "Bibit Nila",
    size: "Campur",
    price: 400,
    minOrder: "500 ekor",
    description: "Bibit ikan nila pilihan, kondisi sehat dan pertumbuhan cepat.",
    image: "/images/nila.jpg",
    isRecommended: false,
  },
  {
    _id: "3",
    name: "Bibit Gurami",
    size: "Kukuan/Jempol",
    price: 3000,
    minOrder: "100 ekor",
    description: "Ukuran gurami kukuan, jempolan, silet biasa, hingga silet super.",
    image: "/images/gurami.jpg",
    isRecommended: false,
  },
  {
    _id: "4",
    name: "Bibit Patin",
    size: "1 - 2,5 inch",
    price: 350,
    minOrder: "500 ekor",
    description: "Ikan patin ukuran 1 - 2,5 inch, kondisi sehat dan lincah.",
    image: "/images/patin.jpg",
    isRecommended: false,
  },
  {
    _id: "5",
    name: "Bibit Lele",
    size: "2-3 s/d 4-6 cm",
    price: 150,
    minOrder: "1.000 ekor",
    description: "Bibit lele dari ukuran 2-3, 3-4, 3-5, hingga 4-6 cm.",
    image: "/images/lele.jpg",
    isRecommended: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const waText = encodeURIComponent(
    `Halo, saya mau pesan:\n*${product.name} ukuran ${product.size}*\nMin. order: ${product.minOrder}\n\nMohon info ketersediaan stok ya.`,
  );
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${waText}`;

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border ${product.isRecommended ? "border-primary" : "border-cream-dark"}`}
    >
      {product.isRecommended && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
          <Star size={10} fill="white" />
          TERLARIS
        </div>
      )}

      {/* Image */}
      <div className="aspect-4/3 bg-linear-to-br from-green/5 to-cream-dark/30 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={
              typeof product.image === "string"
                ? product.image
                : urlFor(product.image).width(400).height(300).url()
            }
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-5xl">🐟</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green" />
          <span className="text-[10px] text-green font-bold uppercase tracking-wider">
            Stok Ready
          </span>
        </div>
        <h3 className="font-display font-extrabold text-dark text-xl mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-brown/70 font-medium mb-3">
          Ukuran: <span className="text-dark">{product.size}</span>
        </p>
        <p className="text-sm text-brown leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-6 p-3 bg-cream rounded-2xl border border-cream-dark/50">
          <div>
            <div className="text-[10px] text-brown/60 uppercase font-bold mb-0.5 tracking-tight">Harga Mulai</div>
            <div className="font-display font-black text-xl text-primary flex items-baseline gap-0.5">
              <span className="text-xs font-bold italic">Rp</span>
              {product.price.toLocaleString("id-ID")}
              <span className="text-[10px] font-bold text-brown/40">/ekor</span>
            </div>
          </div>
          <div className="text-right border-l border-cream-dark/50 pl-3">
            <div className="text-[10px] text-brown/60 uppercase font-bold mb-0.5 tracking-tight">Min. Order</div>
            <div className="text-sm font-bold text-dark">
              {product.minOrder}
            </div>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-100 hover:shadow-orange-200 text-sm active:scale-95"
        >
          <MessageCircle size={18} fill="currentColor" className="text-white/20" />
          Pesan via WhatsApp
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
    <section id="produk" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            Produk Kami
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-3">
            Jenis Bibit Tersedia
          </h2>
          <p className="text-brown text-base max-w-md mx-auto">
            Semua bibit dibesarkan di kolam kami sendiri dengan standar QC yang
            ketat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
