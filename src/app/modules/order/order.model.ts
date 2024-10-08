import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    customer: { type: Schema.Types.ObjectId, ref: 'shopifyCustomer', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'shopifyProduct', required: true }],
    total_price_set: {
        currency: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    status: { type: String, required: true, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
});

export const shopifyOrder = model<TOrder>('shopifyOrder', orderSchema);