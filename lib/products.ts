"use server";

import fs from "fs/promises";
import path from "path";
import { Product } from "@/types";
import { revalidatePath } from "next/cache";

const DATA_PATH = path.join(process.cwd(), "lib", "data.json");

export interface GalleryItem {
  _id: string;
  src: string;
  alt: string;
}

interface SiteData {
  products: Product[];
  gallery: GalleryItem[];
  settings: {
    hero: {
      title: string;
      description: string;
      image: string | null;
      cta1Text: string;
      cta2Text: string;
    },
    about: {
      title: string;
      description1: string;
      description2: string;
      image: string | null;
      values: { title: string; desc: string; icon: string }[];
    },
    contact: {
      address: string;
      mapUrl: string;
      phone: string;
    }
  }
}

async function getRawData(): Promise<SiteData> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return { 
      products: [], 
      gallery: [],
      settings: { 
        hero: { title: "Segar. Sehat. Siap Tebar.", description: "", image: null, cta1Text: "Chat", cta2Text: "Lihat" },
        about: { title: "Hatchery Lokal, Kualitas Juara", description1: "", description2: "", image: null, values: [] },
        contact: { address: "", mapUrl: "", phone: "" }
      } 
    };
  }
}

async function saveRawData(data: SiteData) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
    revalidatePath("/");
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error saving data:", error);
    throw new Error("Failed to save data");
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await getRawData();
  return data.products;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await getRawData();
  return data.gallery;
}

export async function getSettings() {
  const data = await getRawData();
  return data.settings;
}

export async function addProduct(product: Omit<Product, "_id">) {
  const data = await getRawData();
  const newProduct: Product = {
    ...product,
    _id: Math.random().toString(36).substring(2, 9),
  };
  data.products.push(newProduct);
  await saveRawData(data);
  return newProduct;
}

export async function addGalleryItem(item: Omit<GalleryItem, "_id">) {
  const data = await getRawData();
  const newItem: GalleryItem = {
    ...item,
    _id: Math.random().toString(36).substring(2, 9),
  };
  data.gallery.push(newItem);
  await saveRawData(data);
  return newItem;
}

export async function deleteGalleryItem(id: string) {
  const data = await getRawData();
  data.gallery = data.gallery.filter((g) => g._id !== id);
  await saveRawData(data);
}

export async function updateProduct(product: Product) {
  const data = await getRawData();
  const index = data.products.findIndex((p) => p._id === product._id);
  if (index !== -1) {
    data.products[index] = product;
    await saveRawData(data);
    return product;
  }
  throw new Error("Product not found");
}

export async function deleteProduct(id: string) {
  const data = await getRawData();
  data.products = data.products.filter((p) => p._id !== id);
  await saveRawData(data);
}

export async function updateSettings(settings: SiteData["settings"]) {
  const data = await getRawData();
  data.settings = settings;
  await saveRawData(data);
}

export async function uploadImage(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const publicPath = path.join(process.cwd(), "public", "images", filename);

  await fs.mkdir(path.join(process.cwd(), "public", "images"), { recursive: true });
  await fs.writeFile(publicPath, buffer);
  return `/images/${filename}`;
}
