"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyCustomer = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    default_address: {
        city: { type: String },
        province: { type: String },
        country: { type: String },
        address1: { type: String },
        address2: { type: String },
        zip: { type: String }
    }
});
exports.ShopifyCustomer = (0, mongoose_1.model)('ShopifyCustomer', customerSchema);
