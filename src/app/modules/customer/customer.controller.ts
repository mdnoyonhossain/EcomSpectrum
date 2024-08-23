import { Request, Response } from "express";
import { CustomerServices } from "./customer.service";

const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = req.body;
        const result = await CustomerServices.createCustomerIntoDB(customer);

        res.status(201).json({
            success: true,
            message: 'Customer Created Successfully!',
            data: result
        })
    } catch (err: any) {
        res.status(500).json({ message: err });
    }
}

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const result = await CustomerServices.getAllCustomers();

        res.status(200).json({
            success: true,
            message: 'Get All Customer Retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Get a customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await CustomerServices.getCustomerById(id);

        res.status(200).json({
            success: true,
            message: 'Customer Get By Id Retrived Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Update a customer
export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const customer = req.body;
        const id = req.params.id;
        const result = await CustomerServices.updateCustomer(id, customer);

        res.status(200).json({
            success: true,
            message: 'Customer Update Successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await CustomerServices.deleteCustomer(id)

        res.status(200).json({
            success: true,
            message: 'Customer Deleted Successfully!',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Get new customers added over time
export const getNewCustomersOverTime = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const result = await CustomerServices.getNewCustomersOverTime(query);

        res.status(200).json({
            success: true,
            message: 'get New Customers Retrived Data',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Get geographical distribution of customers by city
export const getCustomerDistributionByCity = async (req: Request, res: Response) => {
    try {
        const result = CustomerServices.getCustomerDistributionByCity();

        res.status(200).json({
            success: true,
            message: 'get Customer Distribution By City Retrived',
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const CustomerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getNewCustomersOverTime,
    getCustomerDistributionByCity
}