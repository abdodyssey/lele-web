import { getProducts } from "@/lib/products";
import AnimatedProductList from "./AnimatedProductList";

export default async function Products() {
  const products = await getProducts();

  return (
    <section id="produk" className="py-24 md:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4">
             Katalog Bibit Ikan
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-dark tracking-tighter leading-none mb-6">
            Pilih Bibit Unggul Anda
          </h2>
          <p className="text-brown text-base sm:text-lg max-w-xl mx-auto opacity-60">
            Semua bibit dibesarkan di kolam kami sendiri dengan standar pengawasan yang ketat untuk menjamin kesehatan bibit.
          </p>
        </div>

        <AnimatedProductList products={products} />
      </div>
    </section>
  );
}
