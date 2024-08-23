import { TProduct } from "./product.interface";
import { shopifyProduct } from "./product.model";

const createCustomerIntoDB = async (payload: TProduct) => {
    const result = await shopifyProduct.create(payload);
    return result;
}

const getAllProducts = async () => {
    const result = await shopifyProduct.find();
    return result;
}

const getProductById = async (id: string) => {
    const result = shopifyProduct.findById(id);
    return result;
}


const updateProduct = async (id: string, payload: Partial<TProduct>) => {
    const result = await shopifyProduct.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteCustomer = async (id: string) => {
    const result = await shopifyProduct.findByIdAndDelete(id);
    return result;
}

export const ProductServices = {
    createCustomerIntoDB,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteCustomer
}