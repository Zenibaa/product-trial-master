import {Product} from "../../products/models/product.model";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  createdAt: number;
}
