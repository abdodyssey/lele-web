import { getProducts } from "@/lib/products";
import AnimatedProductList from "./AnimatedProductList";

export default async function Products() {
  const products = await getProducts();

  return (
    <section id="produk" className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 md:mb-32">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a]/5 text-[#0f172a] text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-6">
             Katalog Bibit Ikan Terbaik
          </span>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#0f172a] tracking-tighter leading-[0.95] mb-8">
            Bibit Pilihan. <br className="hidden md:block" /> Hasil Panen Juara.
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
            Bibit dibesarkan di kolam kami dengan standar pengawasan yang ketat <br className="hidden lg:block" /> untuk menjamin kesehatan & ketahanan bibit Anda.
          </p>
        </div>

        <AnimatedProductList products={products} />
      </div>
    </section>
  );
}
