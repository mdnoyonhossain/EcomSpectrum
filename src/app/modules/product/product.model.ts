import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const variantSchema = new Schema({
    variant_id: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true },
    inventory_quantity: { type: Number, required: true },
});

const productSchema = new Schema<TProduct>({
    title: { type: String, required: true },
    body_html: { type: String, required: true },
    vendor: { type: String, required: true },
    product_type: { type: String, required: true },
    variants: [variantSchema], // Use the variant schema as an array
    created_at: { type: Date, default: Date.now },
});

export const shopifyProduct = model<TProduct>('shopifyProduct', productSchema);