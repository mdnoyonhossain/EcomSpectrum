import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const result = await ProductServices.createCustomerIntoDB(product);

        res.status(201).json({
            success: true,
            message: 'Product Create Successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.getAllProducts();

        res.status(200).json({
            success: true,
            message: 'Product Retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await ProductServices.getProductById(id);

        res.status(200).json({
            success: true,
            message: 'Product BY ID Retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const result = await ProductServices.updateProduct(id, product);

        res.status(201).json({
            success: true,
            message: 'Product Update Successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.deleteCustomer(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}