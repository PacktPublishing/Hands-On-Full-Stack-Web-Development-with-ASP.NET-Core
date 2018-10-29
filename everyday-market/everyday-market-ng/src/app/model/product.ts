import { ProductMedia } from '.';

export interface Product {
  productId: string;
  title: string;
  description: string;
  media: ProductMedia[];
}
