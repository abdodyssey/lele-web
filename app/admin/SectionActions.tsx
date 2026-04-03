"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Save, 
  Loader2, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash, 
  LayoutDashboard, 
  Users, 
  Images,
  ArrowRight
} from "lucide-react";
import { updateSettings, uploadImage, addGalleryItem, deleteGalleryItem } from "@/lib/products";
import { Settings, GalleryItem } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

const heroSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.string().nullable().optional(),
  cta1Text: z.string().min(2, "Teks CTA 1 minimal 2 karakter"),
  cta2Text: z.string().min(2, "Teks CTA 2 minimal 2 karakter"),
});

const aboutSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description1: z.string().min(10, "Deskripsi minimal 10 karakter"),
  description2: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.string().nullable().optional(),
});

type HeroFormData = z.infer<typeof heroSchema>;
type AboutFormData = z.infer<typeof aboutSchema>;

export default function SectionActions({ initialSettings, initialGallery }: { initialSettings: Settings, initialGallery: GalleryItem[] }) {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "gallery" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedHeroFile, setSelectedHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(initialSettings.hero.image || null);
  
  const [selectedAboutFile, setSelectedAboutFile] = useState<File | null>(null);
  const [aboutPreview, setAboutPreview] = useState<string | null>(initialSettings.about.image || null);

  const [galleryItems, setGalleryItems] = useState(initialGallery);
  const [selectedGalleryFile, setSelectedGalleryFile] = useState<File | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string | null>(null);

  const heroForm = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: initialSettings.hero,
  });

  const aboutForm = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialSettings.about,
  });

  const onHeroSubmit = async (data: HeroFormData) => {
    setIsLoading(true);
    try {
      let finalImagePath = data.image;
      if (selectedHeroFile) {
        const fd = new FormData();
        fd.append("file", selectedHeroFile);
        finalImagePath = await uploadImage(fd);
      }
      const updatedSettings = {
        ...initialSettings,
        hero: { ...data, image: finalImagePath ?? null }
      };
      await updateSettings(updatedSettings);
      alert("Hero Section diperbarui!");
      setActiveTab(null);
    } catch {
      alert("Gagal update Hero");
    } finally {
      setIsLoading(false);
    }
  };

  const onAboutSubmit = async (data: AboutFormData) => {
    setIsLoading(true);
    try {
      let finalPath = data.image;
      if (selectedAboutFile) {
        const fd = new FormData();
        fd.append("file", selectedAboutFile);
        finalPath = await uploadImage(fd);
      }
      await updateSettings({ ...initialSettings, about: { ...initialSettings.about, ...data, image: finalPath ?? null } });
      alert("About Section diperbarui!");
      setActiveTab(null);
    } catch {
      alert("Gagal memperbarui About");
    } finally {
      setIsLoading(false);
    }
  };

  const onAddGallery = async () => {
    if (!selectedGalleryFile) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", selectedGalleryFile);
      const url = await uploadImage(fd);
      const newItem = await addGalleryItem({ src: url, alt: "Gallery Image" });
      setGalleryItems([...galleryItems, newItem]);
      setSelectedGalleryFile(null);
      setGalleryPreview(null);
    } catch {
      alert("Gagal menambah foto galeri");
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteGallery = async (id: string) => {
    if (!confirm("Hapus foto ini?")) return;
    setIsLoading(true);
    try {
      await deleteGalleryItem(id);
      window.location.reload();
    } catch {
      alert("Gagal hapus foto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 md:p-3">
        <TabButton active={activeTab === "hero"} onClick={() => setActiveTab(activeTab === "hero" ? null : "hero")} icon={<LayoutDashboard size={18} />} label="Hero Section" />
        <TabButton active={activeTab === "about"} onClick={() => setActiveTab(activeTab === "about" ? null : "about")} icon={<Users size={18} />} label="Profil Usaha" />
        <TabButton active={activeTab === "gallery"} onClick={() => setActiveTab(activeTab === "gallery" ? null : "gallery")} icon={<Images size={18} />} label="Album Galeri" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-8 md:p-14 border-t border-slate-100">
              {activeTab === "hero" && (
                <form onSubmit={heroForm.handleSubmit(onHeroSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormSection label="Headline Utama" error={heroForm.formState.errors.title}>
                      <textarea {...heroForm.register("title")} rows={2} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#22c55e]/10 transition-all font-display font-black text-lg text-[#0f172a] shadow-inner" />
                    </FormSection>
                    <FormSection label="Narasi Deskripsi" error={heroForm.formState.errors.description}>
                      <textarea {...heroForm.register("description")} rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:ring-4 focus:ring-[#22c55e]/10 shadow-inner" />
                    </FormSection>
                    <div className="grid grid-cols-2 gap-4">
                      <FormSection label="Teks Tombol WA">
                        <input {...heroForm.register("cta1Text")} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold" />
                      </FormSection>
                      <FormSection label="Teks Tombol Produk">
                        <input {...heroForm.register("cta2Text")} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold" />
                      </FormSection>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <ImageUpload 
                        label="Background Image Overlay"
                        previewUrl={heroPreview}
                        selectedFile={selectedHeroFile}
                        onFileChange={(f: File) => {
                          setSelectedHeroFile(f);
                          setHeroPreview(URL.createObjectURL(f));
                        }}
                      />
                    </div>
                  </div>
                  <button disabled={isLoading} type="submit" className="w-full py-5 bg-[#0f172a] hover:bg-[#020617] text-white rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:scale-[1.01] transition-all active:scale-95">
                    {isLoading ? <Loader2 className="animate-spin text-[#22c55e]" size={20} /> : <><Save size={20} className="text-[#22c55e]" /> Update Hero Content</>}
                  </button>
                </form>
              )}

              {activeTab === "about" && (
                <form onSubmit={aboutForm.handleSubmit(onAboutSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormSection label="Judul Profil" error={aboutForm.formState.errors.title}>
                      <textarea {...aboutForm.register("title")} rows={2} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#22c55e]/10 font-black text-sm md:text-base text-[#0f172a] shadow-inner" />
                    </FormSection>
                    <div className="space-y-6">
                       <FormSection label="Paragraf Utama" error={aboutForm.formState.errors.description1}>
                         <textarea {...aboutForm.register("description1")} rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium shadow-inner" />
                       </FormSection>
                       <FormSection label="Paragraf Tambahan" error={aboutForm.formState.errors.description2}>
                         <textarea {...aboutForm.register("description2")} rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium shadow-inner" />
                       </FormSection>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <ImageUpload 
                        label="About History Image"
                        previewUrl={aboutPreview}
                        selectedFile={selectedAboutFile}
                        onFileChange={(f: File) => {
                          setSelectedAboutFile(f);
                          setAboutPreview(URL.createObjectURL(f));
                        }}
                      />
                    </div>
                  </div>
                  <button disabled={isLoading} type="submit" className="w-full py-5 bg-[#0f172a] hover:bg-[#020617] text-white rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:scale-[1.01] transition-all active:scale-95">
                    {isLoading ? <Loader2 className="animate-spin text-[#22c55e]" size={20} /> : <><Save size={20} className="text-[#22c55e]" /> Update Business Profile</>}
                  </button>
                </form>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-10">
                  <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Tambah Dokumentasi Hatchery</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                      <ImageUpload 
                        label=""
                        previewUrl={galleryPreview}
                        selectedFile={selectedGalleryFile}
                        onFileChange={(f: File) => {
                          setSelectedGalleryFile(f);
                          setGalleryPreview(URL.createObjectURL(f));
                        }}
                      />
                      <button 
                        onClick={onAddGallery}
                        disabled={!selectedGalleryFile || isLoading}
                        className="h-20 lg:h-24 bg-[#0f172a] hover:bg-[#020617] text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 disabled:opacity-50 transition-all active:scale-95"
                      >
                        <Plus size={24} className="text-[#22c55e]" /> Tambah ke Album
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item._id} className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden group border border-slate-100">
                        <Image src={item.src} alt={item.alt || "Gallery Image"} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#0f172a]/60 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <button 
                            onClick={() => onDeleteGallery(item._id)}
                            className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onDeleteGallery(item._id)}
                          className="absolute top-2 right-2 w-10 h-10 bg-red-500/90 text-white rounded-xl flex items-center justify-center md:hidden backdrop-blur-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-3 py-4 px-3 text-[10px] md:text-xs font-black transition-all rounded-2xl md:rounded-[1.5rem] uppercase tracking-widest relative group overflow-hidden ${active ? 'bg-white text-[#0f172a] shadow-xl shadow-slate-200 z-10' : 'text-slate-400 hover:text-[#0f172a]'}`}
    >
      <div className={`transition-colors ${active ? "text-[#22c55e]" : "text-slate-300 group-hover:text-slate-500"}`}>{icon}</div>
      <span className="hidden sm:inline">{label}</span>
      {active && <motion.div layoutId="activeTabGlow" className="absolute bottom-0 left-0 right-0 h-1 bg-[#22c55e]" />}
    </button>
  );
}

function FormSection({ label, children, error }: { label: string; children: React.ReactNode; error?: { message?: string } }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
         {label}
         <ArrowRight size={10} className="text-[#22c55e]" />
      </label>
      {children}
      {error && <p className="text-[10px] text-red-500 font-bold px-2 leading-tight flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500" /> {error.message}</p>}
    </div>
  );
}



function ImageUpload({ label, previewUrl, selectedFile, onFileChange }: { label: string; previewUrl: string | null; selectedFile: File | null; onFileChange: (f: File) => void }) {
  return (
    <div className="space-y-3 w-full">
      {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{label}</label>}
      <div className="flex flex-row gap-6 items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div className="w-28 h-20 md:w-32 md:h-24 rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden shrink-0 relative shadow-inner group transition-all">
          {previewUrl ? (
            <Image src={previewUrl} alt="Preview" fill sizes="128px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={32} /></div>
          )}
        </div>
        <label className="flex-1 flex flex-col items-center justify-center h-20 md:h-24 border-2 border-dashed border-slate-300 rounded-[1.5rem] cursor-pointer hover:bg-white hover:border-[#22c55e] transition-all group text-center px-4">
          <Upload size={20} className="text-slate-300 group-hover:text-[#22c55e] mb-1" />
          <p className="text-[9px] font-black text-slate-400 group-hover:text-[#0f172a] uppercase tracking-widest truncate max-w-[150px]">
            {selectedFile ? selectedFile.name : "Select Document"}
          </p>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileChange(file);
            }}
          />
        </label>
      </div>
    </div>
  );
}
