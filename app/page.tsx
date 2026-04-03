import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";

import { getSettings, getGallery } from "@/lib/products";

export default async function Home() {
  const settings = await getSettings();
  const gallery = await getGallery();

  return (
    <main>
      <Navbar />
      <Hero settings={settings.hero} />
      <About settings={settings.about} />
      <Products />
      <Gallery items={gallery} />
      <HowToOrder />
      <Footer />
    </main>
  );
}
