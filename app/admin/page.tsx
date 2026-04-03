import { getProducts, getSettings, getGallery } from "@/lib/products";
import SectionActions from "./SectionActions";
import ProductManagement from "./ProductManagement";

export default async function AdminDashboard() {
  const products = await getProducts();
  const settings = await getSettings();
  const gallery = await getGallery();
  
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Configuration Hub (Tabs) */}
      <SectionActions initialSettings={settings} initialGallery={gallery} />

      {/* Product Management Section (Client Side) */}
      <ProductManagement initialProducts={products} />
    </div>
  );
}
