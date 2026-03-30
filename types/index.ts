export interface Product {
  _id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  image: string | null;
  isRecommended: boolean;
}
