export interface Product {
  _id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  image: string | null;
  isRecommended: boolean;
  status: "available" | "out_of_stock";
}

export interface Settings {
  hero: {
    title: string;
    description: string;
    image: string | null;
    cta1Text: string;
    cta2Text: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    image: string | null;
    values: { title: string; desc: string; icon: string }[];
  };
  contact: {
    address: string;
    mapUrl: string;
    phone: string;
  };
}

export interface GalleryItem {
  _id: string;
  src: string;
  alt?: string;
}
