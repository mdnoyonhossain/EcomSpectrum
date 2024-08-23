import { TCustomer } from "../customer/customer.interface";
import { TProduct } from "../product/product.interface";

export type TTotalPriceSet = {
  currency: string;
  amount: number;
}

export type TOrder = {
  customer: TCustomer; // Reference to Customer
  products: TProduct[]; // Array of references to Product
  total_price_set: TTotalPriceSet;
  created_at?: Date;
  status: string;
}
