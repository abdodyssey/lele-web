import { Play, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import type { GalleryItem } from "@/types";

async function getGallery(): Promise<GalleryItem[]> {
  return client.fetch(`*[_type == "gallery"] | order(_createdAt asc)`);
}

const fallbackGallery: GalleryItem[] = [
  { _id: "1", title: "Kolam utama", type: "foto", image: null },
  { _id: "2", title: "Proses panen bibit", type: "foto", image: null },
  {
    _id: "3",
    title: "Video cara budidaya",
    type: "video",
    videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
  },
  { _id: "4", title: "Pengemasan pengiriman", type: "foto", image: null },
  { _id: "5", title: "Bibit siap kirim", type: "foto", image: null },
  {
    _id: "6",
    title: "Video testimoni pembeli",
    type: "video",
    videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default async function Gallery() {
  let items: GalleryItem[] = [];

  try {
    items = await getGallery();
    if (!items.length) items = fallbackGallery;
  } catch {
    items = fallbackGallery;
  }

  return (
    <section id="galeri" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Galeri
          </span>
          <h2 className="font-display text-4xl font-bold text-[var(--color-dark)] mb-3">
            Foto & Video Kolam Kami
          </h2>
          <p className="text-[var(--color-brown)] max-w-md mx-auto">
            Lihat langsung kondisi kolam, proses budidaya, sampai pengemasan
            bibit sebelum dikirim.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative group rounded-2xl overflow-hidden aspect-square bg-[var(--color-cream-dark)]"
            >
              {item.type === "video" && item.videoUrl ? (
                <iframe
                  src={item.videoUrl}
                  title={item.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : item.image ? (
                <Image
                  src={urlFor(item.image)
                    .width(500)
                    .height(500)
                    .fit("crop")
                    .url()}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                // Placeholder kalau belum ada konten
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[var(--color-brown)]/40">
                  {item.type === "video" ? (
                    <Play size={32} />
                  ) : (
                    <ImageIcon size={32} />
                  )}
                  <span className="text-xs">{item.title}</span>
                </div>
              )}

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{item.title}</p>
              </div>

              {item.type === "video" && (
                <div className="absolute top-2 right-2 bg-[var(--color-primary)] rounded-full p-1">
                  <Play size={12} className="text-white fill-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
