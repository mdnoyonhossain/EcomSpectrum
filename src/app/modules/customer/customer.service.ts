import { TCustomer } from "./customer.interface";
import { shopifyCustomer } from "./customer.model";

const createCustomerIntoDB = async (payload: TCustomer) => {
    const result = await shopifyCustomer.create(payload);
    return result;
}

const getAllCustomers = async () => {
    const result = await shopifyCustomer.find();
    return result;
}

const getCustomerById = async (id: string) => {
    const result = await shopifyCustomer.findById(id);
    return result;
}


const updateCustomer = async (id: string, payload: Partial<TCustomer>) => {
    const result = await shopifyCustomer.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteCustomer = async (id: string) => {
    const result = await shopifyCustomer.findByIdAndDelete(id);
    return result;
}

const getNewCustomersOverTime = async (query: any) => {
    const { interval } = query; // interval can be 'daily', 'monthly', 'quarterly', 'yearly'

    const matchStage = { $match: {} };
    const groupStage: any = {
        _id: null,
        new_customers: { $sum: 1 }
    };

    switch (interval) {
        case 'daily':
            matchStage.$match = {
                created_at: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } // Last 30 days
            };
            groupStage._id = {
                year: { $year: '$created_at' },
                month: { $month: '$created_at' },
                day: { $dayOfMonth: '$created_at' }
            };
            break;
        case 'monthly':
            matchStage.$match = {
                created_at: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) } // Last 12 months
            };
            groupStage._id = {
                year: { $year: '$created_at' },
                month: { $month: '$created_at' }
            };
            break;
        case 'quarterly':
            matchStage.$match = {
                created_at: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 24)) } // Last 24 months
            };
            groupStage._id = {
                year: { $year: '$created_at' },
                quarter: { $ceil: { $divide: [{ $month: '$created_at' }, 3] } }
            };
            break;
        case 'yearly':
            matchStage.$match = {
                created_at: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 5)) } // Last 5 years
            };
            groupStage._id = {
                year: { $year: '$created_at' }
            };
            break;
        default:
            return { message: 'Invalid interval' };
    }

    const newCustomersData = await shopifyCustomer.aggregate([
        matchStage,
        {
            $group: groupStage
        },
        {
            $sort: { '_id': 1 } // Sort by time
        }
    ]);

    return newCustomersData;
}

const getCustomerDistributionByCity = async () => {
    const customerDistribution = await shopifyCustomer.aggregate([
        {
            $group: {
                _id: '$default_address.city',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    return customerDistribution;
}

export const CustomerServices = {
    createCustomerIntoDB,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getNewCustomersOverTime,
    getCustomerDistributionByCity
}