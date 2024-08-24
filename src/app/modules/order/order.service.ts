import { shopifyCustomer } from "../customer/customer.model";
import { shopifyProduct } from "../product/product.model";
import { TOrder, } from "./order.interface"
import { shopifyOrder } from "./order.model"

const createOrderIntoDB = async (payload: TOrder) => {
    // Validate customer
    const customer = await shopifyCustomer.findById(payload.customer);
    if (!customer) {
        return ('Customer not found');
    }

    // Validate products
    const products = await shopifyProduct.find({ _id: { $in: payload.products } });
    if (products.length !== payload.products.length) {
        return ('One or more products not found');
    }

    // Create and save the order
    const order = new shopifyOrder(payload);
    const savedOrder = await order.save();
    return savedOrder;
}

const getAllOrders = async () => {
    const orders = await shopifyOrder.find().populate('customer').populate('products');
    return orders;
}
const getOrderById = async (id: string) => {
    const order = await shopifyOrder.findById(id).populate('customer').populate('products');
    if (!order) {
        return ('Order not found');
    }
    return order;
}

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
    const updatedOrder = await shopifyOrder.findByIdAndUpdate(id, payload, { new: true }).populate('customer').populate('products');
    if (!updatedOrder) {
        return ('Order not found');
    }
    return updatedOrder;
}

const deleteOrder = async (id: string) => {
    const deletedOrder = await shopifyOrder.findByIdAndDelete(id);
    if (!deletedOrder) {
        return ('Order not found');
    }
    return deletedOrder;
}


export const OrderServices = {
    createOrderIntoDB,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}