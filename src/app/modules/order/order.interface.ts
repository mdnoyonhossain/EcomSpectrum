import { Schema } from "mongoose";

export interface TOrder extends Document {
  customer: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  total_price_set: {
    currency: string;
    amount: number;
  };
  status: 'pending' | 'completed' | 'canceled';
  created_at: Date;
}