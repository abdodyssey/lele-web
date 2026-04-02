import type { Product } from "@/types";
import AnimatedProductList from "./AnimatedProductList";

const products: Product[] = [
  {
    _id: "2",
    name: "Bibit Nila",
    size: "Campur",
    price: 400,
    description:
      "Bibit ikan nila pilihan, kondisi sehat dan pertumbuhan cepat.",
    image: "/images/nila.jpg",
    isRecommended: false,
  },
  {
    _id: "3",
    name: "Bibit Gurami",
    size: "Kukuan/Jempol",
    price: 3000,
    description:
      "Ukuran gurami kukuan, jempolan, silet biasa, hingga silet super.",
    image: "/images/gurami.jpg",
    isRecommended: false,
  },
  {
    _id: "4",
    name: "Bibit Patin",
    size: "1 - 2,5 inch",
    price: 350,
    description: "Ikan patin ukuran 1 - 2,5 inch, kondisi sehat dan lincah.",
    image: "/images/patin.jpg",
    isRecommended: false,
  },
  {
    _id: "5",
    name: "Bibit Lele",
    size: "2-3 s/d 4-6 cm",
    price: 150,
    description: "Bibit lele dari ukuran 2-3, 3-4, 3-5, hingga 4-6 cm.",
    image: "/images/lele.jpg",
    isRecommended: true,
  },
];

export default function Products() {
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

        <AnimatedProductList products={products} />
      </div>
    </section>
  );
}
