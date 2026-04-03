"use client";

import React, { useState } from "react";
import { 
  Save, 
  Loader2, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash, 
  LayoutDashboard, 
  Users, 
  Images
} from "lucide-react";
import { updateSettings, uploadImage, addGalleryItem, deleteGalleryItem } from "@/lib/products";
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

export default function SectionActions({ initialSettings, initialGallery }: { initialSettings: any, initialGallery: any[] }) {
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
      let finalPath = data.image;
      if (selectedHeroFile) {
        const fd = new FormData();
        fd.append("file", selectedHeroFile);
        finalPath = await uploadImage(fd);
      }
      await updateSettings({ ...initialSettings, hero: { ...data, image: finalPath } });
      alert("Hero Section diperbarui!");
      setActiveTab(null);
    } catch (err) {
      alert("Gagal memperbarui Hero");
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
      await updateSettings({ ...initialSettings, about: { ...initialSettings.about, ...data, image: finalPath } });
      alert("About Section diperbarui!");
      setActiveTab(null);
    } catch (err) {
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
    } catch (err) {
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
      setGalleryItems(galleryItems.filter(i => i._id !== id));
    } catch (err) {
      alert("Gagal menghapus foto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-dark/5 overflow-hidden border border-dark/5 mb-6 lg:mb-8">
      <div className="flex border-b border-dark/5 bg-dark/2 p-1.5 md:p-2">
        <TabButton active={activeTab === "hero"} onClick={() => setActiveTab(activeTab === "hero" ? null : "hero")} icon={<LayoutDashboard size={16} />} label="Hero" />
        <TabButton active={activeTab === "about"} onClick={() => setActiveTab(activeTab === "about" ? null : "about")} icon={<Users size={16} />} label="Profil" />
        <TabButton active={activeTab === "gallery"} onClick={() => setActiveTab(activeTab === "gallery" ? null : "gallery")} icon={<Images size={16} />} label="Galeri" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 md:p-8 border-t border-dark/5">
              {activeTab === "hero" && (
                <form onSubmit={heroForm.handleSubmit(onHeroSubmit)} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField label="Judul Utama" error={heroForm.formState.errors.title}>
                      <textarea {...heroForm.register("title")} rows={2} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl focus:ring-4 focus:ring-primary/10 transition-all font-display font-bold text-base md:text-lg" />
                    </FormField>
                    <FormField label="Deskripsi" error={heroForm.formState.errors.description}>
                      <textarea {...heroForm.register("description")} rows={3} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl text-xs md:text-sm" />
                    </FormField>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Teks WA">
                        <input {...heroForm.register("cta1Text")} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl text-xs" />
                      </FormField>
                      <FormField label="Teks Produk">
                        <input {...heroForm.register("cta2Text")} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl text-xs" />
                      </FormField>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <ImageUpload 
                        label="Banner Image"
                        previewUrl={heroPreview}
                        selectedFile={selectedHeroFile}
                        onFileChange={(f: File) => {
                          setSelectedHeroFile(f);
                          setHeroPreview(URL.createObjectURL(f));
                        }}
                      />
                    </div>
                  </div>
                  <button disabled={isLoading} type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Simpan Hero</>}
                  </button>
                </form>
              )}

              {activeTab === "about" && (
                <form onSubmit={aboutForm.handleSubmit(onAboutSubmit)} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FormField label="Judul Profil" error={aboutForm.formState.errors.title}>
                      <textarea {...aboutForm.register("title")} rows={2} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl focus:ring-4 focus:ring-primary/10 font-bold text-sm md:text-base" />
                    </FormField>
                    <FormField label="Deskripsi 1" error={aboutForm.formState.errors.description1}>
                      <textarea {...aboutForm.register("description1")} rows={3} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl text-xs md:text-sm" />
                    </FormField>
                    <FormField label="Deskripsi 2" error={aboutForm.formState.errors.description2}>
                      <textarea {...aboutForm.register("description2")} rows={3} className="w-full px-4 py-3 bg-dark/5 border border-dark/5 rounded-xl text-xs md:text-sm" />
                    </FormField>
                    <div className="col-span-1 md:col-span-2">
                      <ImageUpload 
                        label="About Image"
                        previewUrl={aboutPreview}
                        selectedFile={selectedAboutFile}
                        onFileChange={(f: File) => {
                          setSelectedAboutFile(f);
                          setAboutPreview(URL.createObjectURL(f));
                        }}
                      />
                    </div>
                  </div>
                  <button disabled={isLoading} type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Simpan Profil</>}
                  </button>
                </form>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="bg-dark/2 p-4 md:p-6 rounded-2xl border border-dashed border-dark/10">
                    <h4 className="text-[10px] font-black text-dark/30 uppercase tracking-widest mb-3">Tambah Foto Galeri</h4>
                    <div className="flex flex-col gap-3">
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
                        className="w-full py-3.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50"
                      >
                        <Plus size={18} /> Tambah Galeri
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                    {galleryItems.map((item) => (
                      <div key={item._id} className="relative aspect-square rounded-xl overflow-hidden group border border-dark/5">
                        <img src={item.src} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-dark/60 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => onDeleteGallery(item._id)}
                            className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onDeleteGallery(item._id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 text-white rounded-md flex items-center justify-center md:hidden backdrop-blur-sm"
                        >
                          <Trash size={12} />
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

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 text-[10px] md:text-xs font-black transition-all rounded-xl md:rounded-2xl uppercase tracking-tighter sm:tracking-widest ${active ? 'bg-white text-primary shadow-sm' : 'text-dark/30 hover:text-dark'}`}
    >
      <div className={active ? "text-primary" : "text-dark/20"}>{icon}</div>
      <span>{label}</span>
      {active && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full md:hidden" />}
    </button>
  );
}

function FormField({ label, children, error }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-dark/30 uppercase tracking-widest px-1">{label}</label>
      {children}
      {error && <p className="text-[10px] text-red-500 font-bold px-1 leading-tight">{error.message}</p>}
    </div>
  );
}

function ImageUpload({ label, previewUrl, selectedFile, onFileChange }: any) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-[10px] font-black text-dark/30 uppercase tracking-widest px-1">{label}</label>}
      <div className="flex flex-row gap-3 items-center bg-dark/5 p-3 rounded-2xl border border-dark/5">
        <div className="w-20 h-14 md:w-24 md:h-16 rounded-xl bg-white border border-dark/10 overflow-hidden shrink-0 relative shadow-inner">
          {previewUrl ? (
            <img src={previewUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dark/20"><ImageIcon size={20} /></div>
          )}
        </div>
        <label className="flex-1 flex flex-col items-center justify-center h-14 md:h-16 border border-dashed border-dark/20 rounded-xl cursor-pointer hover:bg-dark/5 hover:border-primary/50 transition-all group text-center px-2">
          <Upload size={14} className="text-dark/30 group-hover:text-primary mb-0.5" />
          <p className="text-[9px] font-black text-dark/30 group-hover:text-dark uppercase tracking-tighter truncate max-w-[100px]">
            {selectedFile ? selectedFile.name : "Upload"}
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
