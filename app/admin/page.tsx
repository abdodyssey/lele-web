import Image from "next/image";
import { getProducts, getSettings, getGallery } from "@/lib/products";
import { 
  Fish, 
  TrendingUp, 
  DollarSign, 
  Filter, 
  Search,
  MoreVertical
} from "lucide-react";
import ClientActions from "./ClientActions";
import SectionActions from "./SectionActions";

export default async function AdminDashboard() {
  const products = await getProducts();
  const settings = await getSettings();
  const gallery = await getGallery();
  
  const totalItems = products.length;
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / (totalItems || 1);
  const recommendedCount = products.filter(p => p.isRecommended).length;

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      {/* Settings Section (Tabs) */}
      <SectionActions initialSettings={settings} initialGallery={gallery} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <StatsCard 
          title="Total Jenis" 
          value={totalItems.toString()} 
          icon={<Fish size={18} className="text-primary" />} 
          className="col-span-1"
        />
        <StatsCard 
          title="Rata-rata Harga" 
          value={`Rp${Math.round(avgPrice).toLocaleString()}`} 
          icon={<DollarSign size={18} className="text-green-500" />} 
          className="col-span-1"
        />
        <StatsCard 
          title="Unggulan" 
          value={recommendedCount.toString()} 
          icon={<TrendingUp size={18} className="text-orange-500" />} 
          className="col-span-2 md:col-span-1"
        />
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-dark/5 overflow-hidden border border-dark/5">
        <div className="p-5 md:p-8 border-b border-dark/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-display font-bold text-dark">Manajemen Stok</h3>
            <p className="text-xs md:text-sm text-dark/40">Daftar bibit ikan yang tersedia.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari..." 
                className="pl-10 pr-4 py-2.5 bg-dark/5 border border-dark/5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full sm:w-48 lg:w-64"
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-dark/5 text-dark/70 rounded-xl hover:bg-dark/10 transition-colors sm:hidden">
                <Filter size={18} />
              </button>
              <div className="flex-1 sm:flex-none">
                <ClientActions products={products} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile List (Hidden on Desktop) */}
        <div className="block md:hidden">
          {products.map((product) => (
            <div key={product._id} className="p-4 border-b border-dark/5 last:border-b-0 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-dark/5 overflow-hidden relative shrink-0 border border-dark/5">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-dark/20"><Fish size={24} /></div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-sm leading-tight">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-dark/40 uppercase tracking-tighter bg-dark/3 px-1.5 py-0.5 rounded-md">{product.size}</span>
                    <span className="text-xs font-black text-primary italic">Rp{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ClientActions mode="edit" product={product} />
                <ClientActions mode="delete" product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark/2">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-dark/30 border-b border-dark/5">Produk</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-dark/30 border-b border-dark/5">Ukuran</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-dark/30 border-b border-dark/5">Harga</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-dark/30 border-b border-dark/5">Status</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-dark/30 border-b border-dark/5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark/5">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-dark/1 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-dark/5 overflow-hidden shrink-0 border border-dark/5 relative">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill sizes="40px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-dark/20"><Fish size={18} /></div>
                        )}
                      </div>
                      <p className="font-bold text-dark text-sm">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs font-bold text-dark/50">{product.size}</td>
                  <td className="px-8 py-4 text-sm font-black text-primary italic">Rp{product.price.toLocaleString()}</td>
                  <td className="px-8 py-4">
                    {product.isRecommended ? (
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-orange-100 text-orange-600 uppercase tracking-tighter">Unggulan</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-green-100 text-green-600 uppercase tracking-tighter">Reguler</span>
                    )}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ClientActions mode="edit" product={product} />
                      <ClientActions mode="delete" product={product} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 md:p-6 bg-dark/2 border-t border-dark/5 flex items-center justify-between text-[10px] font-black text-dark/30 uppercase tracking-widest">
          <span>Menampilkan {products.length} item</span>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, className = "" }: { title: string; value: string; icon: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-dark/5 border border-dark/5 flex flex-col gap-2 md:gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-dark/3 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-dark/30 uppercase tracking-widest">{title}</p>
        <p className="text-xl md:text-2xl font-display font-black text-dark mt-0.5">{value}</p>
      </div>
    </div>
  );
}
