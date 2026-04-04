"use client";

import React, { useEffect, useState } from "react";
import { X, Save, Loader2, AlertCircle, Upload, Image as ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";
import { addProduct, updateProduct, deleteProduct, uploadImage } from "@/lib/products";
import { useForm, UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  size: z.string().min(1, "Ukuran wajib diisi"),
  price: z.number().min(1, "Harga harus lebih dari 0"),
  description: z.string().min(5, "Deskripsi minimal 10 karakter"),
  image: z.string().nullable().optional(),
  isRecommended: z.boolean(),
  status: z.enum(["available", "out_of_stock"]),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ClientActionsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDeleteOpen?: boolean;
  setIsDeleteOpen?: (open: boolean) => void;
  mode: "add" | "edit" | "delete";
  product?: Product;
  onSuccess?: () => void;
}

export default function ClientActions({ 
  isOpen, 
  setIsOpen, 
  isDeleteOpen, 
  setIsDeleteOpen,
  mode, 
  product,
  onSuccess 
}: ClientActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Update form when product or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && product) {
        reset({
          name: product.name,
          size: product.size,
          price: product.price,
          description: product.description,
          image: product.image,
          isRecommended: product.isRecommended,
          status: product.status || "available",
        });
        setPreviewUrl(product.image || null);
      } else {
        reset({
          name: "",
          size: "",
          price: 0,
          description: "",
          image: "/images/lele.jpg",
          isRecommended: false,
          status: "available",
        });
        setPreviewUrl(null);
      }
      setSelectedFile(null);
    }
  }, [isOpen, mode, product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      let finalImagePath = data.image;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        finalImagePath = await uploadImage(formData);
      }

      const productData = { ...data, image: finalImagePath };

      if (mode === "edit" && product?._id) {
        await updateProduct({ ...productData, _id: product._id } as Product);
        toast.success("Data produk berhasil diperbarui!");
      } else {
        await addProduct(productData as Product);
        toast.success("Produk baru berhasil ditambahkan!");
      }
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product?._id) return;
    setIsLoading(true);
    try {
      await deleteProduct(product._id);
      toast.success("Produk telah dihapus.");
      if (setIsDeleteOpen) setIsDeleteOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus produk.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteOpen && mode === "delete" && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLoading && setIsDeleteOpen && setIsDeleteOpen(false)}
              className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden p-12 text-center"
            >
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-red-100">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-display font-black text-[#0f172a] mb-4">Hapus Bibit Ikan?</h3>
              <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed uppercase tracking-widest text-[10px]">
                 Anda akan menghapus <strong className="text-red-500">{product?.name}</strong>. Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-4">
                <button 
                  disabled={isLoading}
                  onClick={() => setIsDeleteOpen && setIsDeleteOpen(false)}
                  className="flex-1 py-5 px-6 bg-slate-50 text-slate-500 rounded-2xl font-black hover:bg-slate-100 transition-all text-[10px] uppercase tracking-widest"
                >
                  Batal
                </button>
                <button 
                  disabled={isLoading}
                  onClick={handleDelete}
                  className="flex-1 py-5 px-6 bg-red-500 text-white rounded-2xl font-black hover:bg-red-600 transition-all text-[10px] uppercase tracking-widest shadow-xl shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Hapus Permanen"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isOpen && (mode === "add" || mode === "edit") && (
          <ProductModal 
            product={product} 
            mode={mode}
            onClose={() => setIsOpen(false)} 
            onSubmit={onSubmit} 
            isLoading={isLoading}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            watch={watch}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface ProductModalProps {
  product?: Product;
  mode: "add" | "edit" | "delete";
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  isLoading: boolean;
  register: UseFormRegister<ProductFormData>;
  handleSubmit: UseFormHandleSubmit<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

function ProductModal({ 
  product, 
  mode,
  onClose, 
  onSubmit,
  isLoading, 
  register, 
  handleSubmit, 
  errors,
  watch,
  selectedFile,
  setSelectedFile,
  previewUrl,
  setPreviewUrl
}: ProductModalProps) {
  const currentStatus = watch("status");

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isLoading && onClose()}
        className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="relative bg-white rounded-[3.5rem] shadow-2xl w-full max-w-2xl overflow-hidden my-auto"
      >
        <div className="p-10 sm:p-14">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-display font-black text-[#0f172a] tracking-tight">
                {mode === "edit" ? "Update Detail Bibit" : "Tambah Jenis Baru"}
              </h3>
              <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-[0.2em]">Product Specification Hub</p>
            </div>
            <button 
              disabled={isLoading}
              onClick={onClose}
              className="w-14 h-14 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[#0f172a] hover:bg-slate-100 rounded-[1.5rem] transition-all border border-slate-100"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nama Bibit Ikan</label>
                <input 
                  {...register("name")}
                  className={`w-full px-6 py-4 bg-slate-50 border ${errors.name ? 'border-red-200' : 'border-slate-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#22c55e]/10 transition-all`}
                  placeholder="Contoh: Lele Sangkuriang"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Varian Ukuran</label>
                <input 
                  {...register("size")}
                  className={`w-full px-6 py-4 bg-slate-50 border ${errors.size ? 'border-red-200' : 'border-slate-100'} rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#22c55e]/10 transition-all`}
                  placeholder="Contoh: 5-7 cm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Harga Satuan (Rp)</label>
                <input 
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={`w-full px-6 py-4 bg-slate-50 border ${errors.price ? 'border-red-200' : 'border-slate-100'} rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[#22c55e]/10 transition-all text-[#22c55e]`}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status Ketersediaan</label>
                <div className="grid grid-cols-2 gap-3">
                   <label className={`flex items-center justify-center gap-2 h-14 rounded-2xl border transition-all cursor-pointer ${currentStatus === 'available' ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <input type="radio" {...register("status")} value="available" className="hidden" />
                      <CheckCircle2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Tersedia</span>
                   </label>
                   <label className={`flex items-center justify-center gap-2 h-14 rounded-2xl border transition-all cursor-pointer ${currentStatus === 'out_of_stock' ? 'bg-red-50 border-red-400 text-red-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <input type="radio" {...register("status")} value="out_of_stock" className="hidden" />
                      <XCircle size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Habis</span>
                   </label>
                </div>
              </div>

              <div className="space-y-2 col-span-1 sm:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex justify-between items-center">
                   <span>Foto Dokumentasi</span>
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" {...register("isRecommended")} className="hidden" />
                      <div className={`w-3 h-3 rounded-full border-2 transition-all ${watch('isRecommended') ? 'bg-[#22c55e] border-[#22c55e]' : 'border-slate-300'}`} />
                      <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-slate-600 transition-colors">Tandai Unggulan</span>
                   </label>
                </label>
                <div className="flex flex-col sm:flex-row gap-6 items-center bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-slate-100">
                  <div className="w-24 h-24 rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden shrink-0 relative shadow-inner group-hover:scale-105 transition-transform duration-500">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={32} /></div>
                    )}
                  </div>
                  <div className="flex-1 w-full relative">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-[1.5rem] cursor-pointer hover:border-[#22c55e] hover:bg-white transition-all text-center">
                        <Upload size={20} className="text-slate-300 mb-1" />
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 truncate max-w-[200px]">
                          {selectedFile ? selectedFile.name : "Pilih File Gambar Baru"}
                        </p>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deskripsi Tambahan</label>
              <textarea 
                {...register("description")}
                rows={3}
                className={`w-full px-6 py-4 bg-slate-50 border ${errors.description ? 'border-red-200' : 'border-slate-100'} rounded-[1.5rem] text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#22c55e]/10 transition-all resize-none`}
                placeholder="Berikan info kualitas atau penanganan bibit..."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="flex-1 py-5 px-6 bg-slate-50 text-slate-500 rounded-2xl font-black transition-all text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100"
              >
                Batalkan
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-5 px-6 bg-[#0f172a] hover:bg-[#020617] text-white rounded-2xl font-black transition-all text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} className="text-[#22c55e]" /> Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
