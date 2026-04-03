"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Home, 
  LogOut, 
  Fish, 
  Menu, 
  X,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-cream flex font-body text-dark overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-dark text-white p-6 hidden lg:flex flex-col border-r border-dark/10">
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
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-dark text-white p-6 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">
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
        <header className="h-16 lg:h-20 bg-white border-b border-dark/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-dark/70 hover:bg-dark/5 rounded-xl transition-colors"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-base lg:text-xl font-display font-bold text-dark truncate">
              {pathname === "/admin" ? "Dashboard Overview" : "Admin Panel"}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-dark">Admin</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-tighter font-black">Manager</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center shadow-inner overflow-hidden">
                <User size={18} className="text-primary" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarContent({ pathname, onItemClick }: { pathname: string; onItemClick?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="w-9 h-9 bg-primary/20 text-primary border border-primary/20 rounded-xl flex items-center justify-center shadow-lg shadow-primary/10">
          <Fish className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-black text-base text-white leading-tight tracking-tight">BIBIT IKAN <span className="text-primary italic">ARI</span></h1>
          <p className="text-[10px] text-white/30 tracking-[0.2em] font-black uppercase">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        <SidebarLink 
          href="/admin" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard Utama" 
          active={pathname === "/admin"} 
          onClick={onItemClick}
        />
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-1.5 mb-2">
        <SidebarLink 
          href="/" 
          icon={<Home size={18} />} 
          label="Lihat Situs" 
          onClick={onItemClick}
        />
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-bold mt-2 uppercase tracking-widest">
          <LogOut size={16} />
          Keluar
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
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-bold tracking-wide ${
        active 
          ? "bg-primary text-white shadow-xl shadow-primary/30" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-primary/60'}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}
