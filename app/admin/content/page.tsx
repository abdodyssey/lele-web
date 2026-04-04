import { getSettings, getGallery } from "@/lib/products";
import SectionActions from "../SectionActions";

export const metadata = {
  title: "Manajemen Isi Website - Admin Panel",
};

export default async function ContentPage() {
  const settings = await getSettings();
  const gallery = await getGallery();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-4xl font-display font-black text-[#0f172a] tracking-tight">Kustomisasi Konten</h1>
          <p className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mt-2">Web Content Configuration Hub</p>
        </div>
      </div>

      <SectionActions initialSettings={settings} initialGallery={gallery} />
    </div>
  );
}
