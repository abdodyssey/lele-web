"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Fish, 
  DollarSign, 
  Filter, 
  Search,
  Package,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
  Trash
} from "lucide-react";
import { Product } from "@/types";
import ClientActions from "./ClientActions";

export default function ProductManagement({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [activeMode, setActiveMode] = useState<"add" | "edit" | "delete">("add");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = products.length;
  const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / (totalItems || 1);
  const outOfStockCount = products.filter(p => p.status === "out_of_stock").length;

  const openAdd = () => {
    setSelectedProduct(undefined);
    setActiveMode("add");
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setActiveMode("edit");
    setIsModalOpen(true);
  };

  const openDelete = (product: Product) => {
    setSelectedProduct(product);
    setActiveMode("delete");
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-12">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Katalog" 
          value={totalItems.toString()} 
          subValue="Jenis Bibit"
          icon={<Fish size={24} />} 
          variant="primary"
        />
        <StatsCard 
          title="Nilai Rata-rata" 
          value={`Rp${Math.round(avgPrice).toLocaleString()}`} 
          subValue="Per Bibit"
          icon={<DollarSign size={24} />} 
          variant="accent"
        />
        <StatsCard 
          title="Peringatan Stok" 
          value={outOfStockCount.toString()} 
          subValue="Item Kosong"
          icon={<Package size={24} />} 
          variant="danger"
        />
      </div>

      {/* Main Stock Management */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="p-10 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display font-black text-[#0f172a] tracking-tight">Manajemen Persediaan</h3>
            <p className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mt-1.5">Inventory & Stock Tracking</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari jenis ikan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#22c55e]/10 transition-all w-full sm:w-64 lg:w-80"
              />
            </div>
            <div className="flex gap-3">
              <button className="h-14 w-14 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all">
                <Filter size={20} />
              </button>
              <button 
                onClick={openAdd}
                className="h-14 px-8 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#22c55e]/20 transition-all flex items-center gap-3 active:scale-95"
              >
                <Plus size={18} />
                Tambah Bibit
              </button>
            </div>
          </div>
        </div>

        {/* Global Modal Instance (Now outside the trapped containers) */}
        <ClientActions 
          isOpen={isModalOpen} 
          setIsOpen={setIsModalOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          mode={activeMode} 
          product={selectedProduct} 
          onSuccess={() => {
            // In a real app, you'd re-fetch, but for this demo, refresh the page context
            window.location.reload();
          }}
        />

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">Informasi Produk</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">Ketersediaan</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">Harga</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative shadow-inner">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300"><Fish size={24} /></div>
                        )}
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <p className="font-black text-[#0f172a] text-base tracking-tight">{product.name}</p>
                            {product.isRecommended && (
                               <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black bg-[#22c55e]/10 text-[#22c55e] uppercase tracking-widest border border-[#22c55e]/10">⭐</span>
                            )}
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    {product.status === "available" ? (
                      <div className="flex items-center gap-2 text-[#22c55e]">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tersedia</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <XCircle size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Stok Habis</span>
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-lg font-black text-[#0f172a] tracking-tight">Rp{product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => openEdit(product)}
                        className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all shadow-sm"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => openDelete(product)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total {filteredProducts.length} Entitas Terpilih</p>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, subValue, icon, variant }: { title: string; value: string; subValue: string; icon: React.ReactNode; variant: 'primary' | 'accent' | 'danger' }) {
  const colors = {
    primary: "bg-[#0f172a]/5 text-[#0f172a] border-slate-200",
    accent: "bg-[#22c55e]/5 text-[#22c55e] border-[#22c55e]/10",
    danger: "bg-red-50 text-red-500 border-red-100"
  };

  return (
    <div className={`bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl duration-500`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 hover:rotate-12 ${colors[variant]}`}>
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
