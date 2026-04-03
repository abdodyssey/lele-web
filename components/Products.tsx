import { getProducts } from "@/lib/products";
import AnimatedProductList from "./AnimatedProductList";

export default async function Products() {
  const products = await getProducts();

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
