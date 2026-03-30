export interface Product {
  _id: string;
  name: string;
  size: string;
  price: number;
  minOrder: string;
  description: string;
  image: string | null;
  isRecommended: boolean;
}
