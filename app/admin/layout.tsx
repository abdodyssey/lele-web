"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Home, 
  LogOut, 
  Fish, 
  Menu, 
  X,
  User,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex font-body text-slate-900 overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-[#020617] text-white p-8 hidden lg:flex flex-col border-r border-white/5 relative overflow-hidden">
        {/* Subtle Glows */}
        <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-[#22c55e]/10 blur-[100px] rounded-full pointer-events-none" />
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#020617] text-white p-8 z-50 lg:hidden flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#22c55e]/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="flex justify-end mb-6 relative z-10">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent pathname={pathname} onItemClick={() => setIsMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-3 -ml-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-xl lg:text-2xl font-display font-black text-[#0f172a] tracking-tight">
                {pathname === "/admin" ? "Dashboard" : "Admin Panel"}
              </h2>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mt-0.5">Management Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-[#0f172a]">Administrator</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                   <p className="text-[9px] text-[#22c55e] uppercase tracking-widest font-black">Online Now</p>
                </div>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner overflow-hidden group hover:border-[#22c55e]/30 transition-all">
                <User size={20} className="text-slate-400 group-hover:text-[#22c55e] transition-colors" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}

function SidebarContent({ pathname, onItemClick }: { pathname: string; onItemClick?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-16 px-2 relative z-10">
        <div className="w-11 h-11 bg-[#22c55e] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[#22c55e]/20 rotate-3 group-hover:rotate-0 transition-transform">
          <Fish className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-black text-lg text-white leading-tight tracking-tighter">BIBIT IKAN <span className="text-[#22c55e] italic">ARI</span></h1>
          <p className="text-[9px] text-white/30 tracking-[0.3em] font-black uppercase mt-1">Control Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 relative z-10">
        <SidebarLink 
          href="/admin" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard Utama" 
          active={pathname === "/admin"} 
          onClick={onItemClick}
        />
        <SidebarLink 
          href="/admin/products" 
          icon={<Fish size={18} />} 
          label="Kelola Ikan" 
          active={pathname === "/admin/products"} 
          onClick={onItemClick}
        />
        <SidebarLink 
          href="/admin/content" 
          icon={<LayoutDashboard size={18} />} 
          label="Isi Website" 
          active={pathname === "/admin/content"} 
          onClick={onItemClick}
        />
      </nav>

      <div className="pt-8 border-t border-white/10 space-y-2 mb-4 relative z-10">
        <SidebarLink 
          href="/" 
          icon={<ExternalLink size={18} />} 
          label="Lihat Situs" 
          onClick={onItemClick}
        />
        <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-[0.15em] mt-4">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </>
  );
}

function SidebarLink({ 
  href, 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-[0.15em] group ${
        active 
          ? "bg-[#22c55e] text-white shadow-2xl shadow-[#22c55e]/30 scale-[1.02]" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className={`transition-colors ${active ? 'text-white' : 'text-[#22c55e]/60 group-hover:text-[#22c55e]'}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}
