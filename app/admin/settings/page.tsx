"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password minimal 6 karakter!");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success("Password Admin berhasil diperbarui!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Gagal memperbarui password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 max-w-2xl mx-auto lg:mx-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-4xl font-display font-black text-[#0f172a] tracking-tight">Pengaturan Keamanan</h1>
          <p className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mt-2">Account & Access Control</p>
        </div>
      </div>

      <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#22c55e]/5 blur-3xl rounded-full" />
        
        <form onSubmit={handleUpdatePassword} className="space-y-8 relative z-10">
          <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] mb-10">
            <div className="w-12 h-12 bg-[#22c55e] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#22c55e]/20">
               <ShieldCheck size={20} />
            </div>
            <div>
               <p className="text-sm font-black text-[#0f172a]">Keamanan Terpusat</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Update kredensial secara rutin</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* New Password */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Password Baru</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-16 pr-16 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#22c55e]/5 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Konfirmasi Password</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#22c55e] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-16 pr-16 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#22c55e]/5 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-18 bg-[#0f172a] hover:bg-black text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-slate-900/10"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Simpan Perubahan Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
