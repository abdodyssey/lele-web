import { getProducts } from "@/lib/products";
import ProductManagement from "../ProductManagement";

export const metadata = {
  title: "Kelola Ikan - Admin Panel",
};

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-[#0f172a] tracking-tight">Katalog Bibit Ikan</h1>
          <p className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mt-2">Inventory Management Hub</p>
        </div>
      </div>

      <ProductManagement initialProducts={products} />
    </div>
  );
}
