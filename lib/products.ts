"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { Product, Settings, GalleryItem } from "@/types";

// Types matching Supabase snake_case columns
interface DBProduct extends Omit<Product, "isRecommended"> {
  is_recommended: boolean;
  created_at?: string;
}

// ---------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Convert DB columns (snake_case) to Frontend types (camelCase)
  return data.map((p: any) => ({
    _id: p._id,
    name: p.name,
    size: p.size,
    price: Number(p.price),
    description: p.description,
    image: p.image,
    isRecommended: p.is_recommended,
    status: p.status
  }));
}

export async function addProduct(product: Omit<Product, "_id">) {
  const dbProduct = {
    name: product.name,
    size: product.size,
    price: product.price,
    description: product.description,
    image: product.image,
    is_recommended: product.isRecommended,
    status: product.status
  };

  const { data, error } = await supabase
    .from("products")
    .insert([dbProduct])
    .select()
    .single();

  if (error) {
    console.error("Error adding product:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return data;
}

export async function updateProduct(product: Product) {
  const dbProduct = {
    name: product.name,
    size: product.size,
    price: product.price,
    description: product.description,
    image: product.image,
    is_recommended: product.isRecommended,
    status: product.status
  };

  const { error } = await supabase
    .from("products")
    .update(dbProduct)
    .eq("_id", product._id);

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("_id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    // Fallback settings if table is empty
    return {
      hero: { title: "Segar. Sehat. Siap Tebar.", description: "", image: null, cta1Text: "Chat", cta2Text: "Lihat" },
      about: { title: "Hatchery Lokal", description1: "", description2: "", image: null, values: [] },
      contact: { address: "", mapUrl: "", phone: "" }
    };
  }

  return data as Settings;
}

export async function updateSettings(settings: Settings) {
  const { error } = await supabase
    .from("site_settings")
    .update(settings)
    .eq("id", 1);

  if (error) {
    console.error("Error updating settings:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------
// GALLERY
// ---------------------------------------------------------

export async function getGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }

  return data as GalleryItem[];
}

export async function addGalleryItem(src: string) {
  const { data, error } = await supabase
    .from("gallery")
    .insert([{ src, alt: "Gallery Image" }])
    .select()
    .single();

  if (error) {
    console.error("Error adding gallery item:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return data;
}

export async function deleteGalleryItem(id: string) {
  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("_id", id);

  if (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------------------------------------------------------
// IMAGE UPLOAD (Using Supabase Storage)
// ---------------------------------------------------------

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
  
  // We use a public bucket named 'lele-images'
  const { data, error } = await supabase.storage
    .from("lele-images")
    .upload(fileName, file, {
       contentType: file.type,
       upsert: false
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from("lele-images")
    .getPublicUrl(data.path);

  return publicUrl;
}
