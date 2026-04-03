// scripts/migrate-data.ts
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabaseUrl = "https://qhhutkyhgkhvpjarsanr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaHV0a3loZ2todnBqYXJzYW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMjYzNTgsImV4cCI6MjA5MDgwMjM1OH0.dzWXfXPIRWFPSF2wKO8pB-JNTtGHr3Scp0I82jvz-ZI";

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  const dataPath = path.join(process.cwd(), "lib", "data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  console.log("--- Memulai Migrasi ke Supabase ---");

  // 1. Migrasi Produk
  if (data.products && data.products.length > 0) {
    const dbProducts = data.products.map((p: any) => ({
      name: p.name,
      size: p.size,
      price: p.price,
      description: p.description,
      image: p.image,
      is_recommended: p.isRecommended,
      status: p.status,
    }));
    const { error: pError } = await supabase
      .from("products")
      .insert(dbProducts);
    if (pError) console.error("Eror migrasi produk:", pError);
    else console.log("✅ Produk berhasil dimigrasi!");
  }

  // 2. Migrasi Galeri
  if (data.gallery && data.gallery.length > 0) {
    const dbGallery = data.gallery.map((g: any) => ({
      src: g.src,
      alt: g.alt || "Gallery Image",
    }));
    const { error: gError } = await supabase.from("gallery").insert(dbGallery);
    if (gError) console.error("Eror migrasi galeri:", gError);
    else console.log("✅ Galeri berhasil dimigrasi!");
  }

  // 3. Migrasi Settings
  if (data.settings) {
    const { error: sError } = await supabase
      .from("site_settings")
      .update(data.settings)
      .eq("id", 1);
    if (sError) console.error("Eror migrasi settings:", sError);
    else console.log("✅ Settings berhasil dimigrasi!");
  }

  console.log("--- Migrasi Selesai! ---");
}

migrate();
