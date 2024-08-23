import { model, Schema } from "mongoose";
import { TCustomer } from "./customer.interface";

const customerSchema = new Schema<TCustomer>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    default_address: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String },
        zip: { type: String, required: true },
    },
    created_at: { type: Date, default: Date.now },
});

export const shopifyCustomer = model<TCustomer>('shopifyCustomer', customerSchema);