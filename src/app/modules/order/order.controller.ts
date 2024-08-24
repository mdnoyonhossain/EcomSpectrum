import { Request, Response } from 'express';
import { OrderServices } from './order.service';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const result = await OrderServices.createOrderIntoDB(order);

        res.status(200).json({
            success: true,
            message: 'Order Created Successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getAllOrders();

        res.status(200).json({
            success: true,
            message: 'Order get all retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getOrderById(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Order get by id retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = req.body;
        const result = await OrderServices.updateOrder(id, order)

        res.status(200).json({
            success: true,
            message: 'Order Update Successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.deleteOrder(req.params.id)

        res.status(201).json({
            success: true,
            message: 'Order deleted Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}
