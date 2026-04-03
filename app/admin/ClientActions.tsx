"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash, X, Save, Loader2, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Product } from "@/types";
import { addProduct, updateProduct, deleteProduct, uploadImage } from "@/lib/products";
import { useForm, UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const productSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  size: z.string().min(1, "Ukuran wajib diisi"),
  price: z.number().min(1, "Harga harus lebih dari 0"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  image: z.string().nullable().optional(),
  isRecommended: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ClientActionsProps {
  products?: Product[];
  mode?: "add" | "edit" | "delete";
  product?: Product;
}

export default function ClientActions({ mode, product }: ClientActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.image || null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      size: product.size,
      price: product.price,
      description: product.description,
      image: product.image,
      isRecommended: product.isRecommended,
    } : {
      name: "",
      size: "",
      price: 0,
      description: "",
      image: "/images/lele.jpg",
      isRecommended: false,
    },
  });

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

      if (product?._id) {
        await updateProduct({ ...productData, _id: product._id } as Product);
      } else {
        await addProduct(productData as Product);
      }
      setIsOpen(false);
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product?._id) return;
    setIsLoading(true);
    try {
      await deleteProduct(product._id);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === "delete") {
    return (
      <div className="relative inline-block">
        <button 
          onClick={() => setIsDeleting(true)}
          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
        >
          <Trash size={16} />
        </button>

        <AnimatePresence>
          {isDeleting && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isLoading && setIsDeleting(false)}
                className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden p-8"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-dark">Hapus Data?</h3>
                  <p className="text-sm text-dark/50">
                    Apakah Anda yakin ingin menghapus <strong>{product?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
                <div className="flex gap-3 mt-8">
                  <button 
                    disabled={isLoading}
                    onClick={() => setIsDeleting(false)}
                    className="flex-1 py-3 px-4 bg-dark/5 text-dark/70 rounded-xl font-bold hover:bg-dark/10 transition-all text-sm disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button 
                    disabled={isLoading}
                    onClick={handleDelete}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all text-sm shadow-lg shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Hapus Ikan"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (mode === "edit") {
    return (
      <div className="relative inline-block">
        <button 
          onClick={() => {
            setPreviewUrl(product?.image || null);
            setIsOpen(true);
          }}
          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <Edit size={16} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <ProductModal 
              product={product} 
              onClose={() => setIsOpen(false)} 
              onSubmit={onSubmit} 
              isLoading={isLoading}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => {
          reset({
            name: "",
            size: "",
            price: 0,
            description: "",
            image: null,
            isRecommended: false,
          });
          setSelectedFile(null);
          setPreviewUrl(null);
          setIsOpen(true);
        }}
        className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
      >
        <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <Plus size={14} />
        </div>
        Tambah Ikan
      </button>

      <AnimatePresence>
        {isOpen && (
          <ProductModal 
            onClose={() => setIsOpen(false)} 
            onSubmit={onSubmit} 
            isLoading={isLoading}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
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
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  isLoading: boolean;
  register: UseFormRegister<ProductFormData>;
  handleSubmit: UseFormHandleSubmit<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

function ProductModal({ 
  product, 
  onClose, 
  onSubmit,
  isLoading, 
  register, 
  handleSubmit, 
  errors,
  selectedFile,
  setSelectedFile,
  previewUrl,
  setPreviewUrl
}: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isLoading && onClose()}
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden my-auto"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-dark">
                {product ? "Edit Detail Ikan" : "Tambah Jenis Ikan"}
              </h3>
              <p className="text-sm text-dark/40 mt-1">Lengkapi informasi bibit ikan di bawah ini.</p>
            </div>
            <button 
              disabled={isLoading}
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-dark/5 text-dark/40 hover:text-dark hover:bg-dark/10 rounded-2xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Nama Ikan</label>
                <input 
                  {...register("name")}
                  className={`w-full px-5 py-4 bg-dark/5 border ${errors.name ? 'border-red-300' : 'border-dark/5'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                  placeholder="Contoh: Bibit Lele Sangkuriang"
                />
                {errors.name && <p className="text-xs text-red-500 font-medium px-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Ukuran (cm/inch)</label>
                <input 
                  {...register("size")}
                  className={`w-full px-5 py-4 bg-dark/5 border ${errors.size ? 'border-red-300' : 'border-dark/5'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all`}
                  placeholder="Contoh: 4-6 cm atau 1-2 inch"
                />
                {errors.size && <p className="text-xs text-red-500 font-medium px-1">{errors.size.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Harga (Rp)</label>
                <input 
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={`w-full px-5 py-4 bg-dark/5 border ${errors.price ? 'border-red-300' : 'border-dark/5'} rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-primary`}
                  placeholder="0"
                />
                {errors.price && <p className="text-xs text-red-500 font-medium px-1">{errors.price.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Status Ikan</label>
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        {...register("isRecommended")}
                        className="sr-only peer" 
                      />
                      <div className="w-12 h-6 bg-dark/10 peer-checked:bg-primary/20 rounded-full transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm peer-checked:bg-primary"></div>
                    </div>
                    <span className="text-sm font-bold text-dark/70 group-hover:text-dark transition-colors">Ikan Unggulan?</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 col-span-1 sm:col-span-2">
                <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Gambar Ikan</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-dark/5 p-4 rounded-3xl border border-dark/5">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-dark/10 overflow-hidden shrink-0 relative">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-dark/20"><ImageIcon size={32} /></div>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-dark/20 rounded-2xl cursor-pointer hover:bg-dark/5 hover:border-primary/50 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <Upload className="w-6 h-6 text-dark/30 group-hover:text-primary transition-colors mb-2 mx-auto" />
                        <p className="text-[10px] font-bold text-dark/40 group-hover:text-dark uppercase tracking-widest px-4">
                          {selectedFile ? selectedFile.name : "Upload Gambar"}
                        </p>
                      </div>
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
              <label className="text-xs font-bold text-dark/50 uppercase tracking-widest px-1">Deskripsi Produk</label>
              <textarea 
                {...register("description")}
                rows={3}
                className={`w-full px-5 py-4 bg-dark/5 border ${errors.description ? 'border-red-300' : 'border-dark/5'} rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none`}
                placeholder="Jelaskan kondisi bibit, kualitas, dsb..."
              />
              {errors.description && <p className="text-xs text-red-500 font-medium px-1">{errors.description.message}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="flex-1 py-4 px-6 bg-dark/5 text-dark/70 rounded-2xl font-bold hover:bg-dark/10 transition-all text-sm disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isLoading}
                className="flex-2 py-4 px-6 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all text-sm shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Simpan Data</>}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
