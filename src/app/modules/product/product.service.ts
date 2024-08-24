import { TProduct } from "./product.interface";
import { shopifyProduct } from "./product.model";

const createCustomerIntoDB = async (payload: TProduct) => {
    const product = new shopifyProduct(payload);
    const savedProduct = await product.save();
    return savedProduct;
}

const getAllProducts = async () => {
    const products = await shopifyProduct.find();
    return products;
}

const getProductById = async (id: string) => {
    const product = await shopifyProduct.findById(id);
    if (!product) {

    }
    return product;
}


const updateProduct = async (id: string, payload: Partial<TProduct>) => {
    const updatedProduct = await shopifyProduct.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedProduct) return 'Product not found';
    return updatedProduct;
}

const deleteCustomer = async (id: string) => {
    const deletedProduct = await shopifyProduct.findByIdAndDelete(id);
    if (!deletedProduct) return 'Product not found';
    return deletedProduct;
}

export const ProductServices = {
    createCustomerIntoDB,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteCustomer
}