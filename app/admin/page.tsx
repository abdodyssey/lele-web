import { getProducts } from "@/lib/products";
import Link from "next/link";
import { Fish, Settings, ArrowRight, Package, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const products = await getProducts();
  const totalItems = products.length;
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / (totalItems || 1);
  const outOfStockCount = products.filter(p => p.status === "out_of_stock").length;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Welcome Message */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 lg:p-16 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/10">
         <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#22c55e]/20 blur-[120px] rounded-full pointer-events-none" />
         <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Administrasi Portal</span>
            <h1 className="text-4xl lg:text-5xl font-display font-black mb-6 leading-tight tracking-tight">Pusat Kendali <br/> Bibit Ikan Ari</h1>
            <p className="text-white/60 text-lg font-medium leading-relaxed mb-10 max-w-xl">
               Selamat datang di dashboard pintar Anda. Pantau stok, kelola katalog, dan perbarui konten website hanya dalam satu tempat.
            </p>
            <div className="flex flex-wrap gap-4">
               <Link href="/admin/products" className="h-14 px-8 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3">
                  Kelola Stok <ArrowRight size={16} />
               </Link>
               <Link href="/admin/content" className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border border-white/10">
                  Update Konten
               </Link>
            </div>
         </div>
      </div>

      {/* Stats Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard 
           title="Katalog Aktif" 
           value={totalItems.toString()} 
           subValue="Jenis Bibit Tersedia"
           icon={<Fish size={24} />} 
        />
        <DashboardCard 
           title="Rata-rata Harga" 
           value={`Rp${Math.round(avgPrice).toLocaleString()}`} 
           subValue="Estimasi Harga Jual"
           icon={<DollarSign size={24} />} 
        />
        <DashboardCard 
           title="Status Inventory" 
           value={outOfStockCount.toString()} 
           subValue="Perlu Restock"
           icon={<Package size={24} />} 
           isDanger={outOfStockCount > 0}
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, subValue, icon, isDanger = false }: { title: string; value: string; subValue: string; icon: React.ReactNode; isDanger?: boolean }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 ${isDanger ? 'bg-red-50 text-red-500 border-red-100' : 'bg-[#22c55e]/5 text-[#22c55e] border-[#22c55e]/10'}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{title}</p>
        <p className="text-3xl font-display font-black text-[#0f172a] tracking-tighter mb-1">{value}</p>
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{subValue}</p>
      </div>
    </div>
  );
}
