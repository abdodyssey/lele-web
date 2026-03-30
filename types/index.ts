import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Product {
  _id: string;
  name: string;
  size: string;
  price: number;
  minOrder: string;
  description: string;
  image: SanityImageSource | string | null;
  isRecommended: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  message: string;
  rating: number;
  avatar?: SanityImageSource | null;
}

export interface GalleryItem {
  _id: string;
  title: string;
  type: "foto" | "video";
  image?: SanityImageSource | null;
  videoUrl?: string;
}
