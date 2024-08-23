import { shopifyCustomer } from "../customer/customer.model";
import { shopifyProduct } from "../product/product.model";
import { TOrder } from "./order.interface"
import { shopifyOrder } from "./order.model"

const createOrderIntoDB = async (payload: TOrder) => {
    const { customer, products, total_price_set, status } = payload;

    // Validate if customer exists
    const existingCustomer = await shopifyCustomer.findById(customer);
    if (!existingCustomer) {
        throw new Error('Invalid customer ID');
    }

    // Create the order
    const order = new shopifyOrder({
        customer,
        products,
        total_price_set,
        status
    });

    await order.save();
    return order;
}

const getAllOrders = async () => {
    const result = await shopifyOrder.find().populate('customer').populate('products');
    return result;
}
const getOrderById = async (id: string) => {
    const result = await shopifyOrder.findById(id).populate('customer').populate('products');
    return result;
}

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
    const result = await shopifyOrder.findByIdAndUpdate(id, payload, { new: true }).populate('customer').populate('products');
    return result;
}

const deleteOrder = async (id: string) => {
    const result = await shopifyOrder.findByIdAndDelete(id);
    return result;
}

const getTotalSalesOverTime = async (query: any) => {
    const { interval } = query; // interval can be 'daily', 'monthly', 'quarterly', 'yearly'

    const matchStage = { $match: {} };
    const groupStage: any = {
        _id: null,
        total_sales: { $sum: '$total_price_set.amount' }
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

    const salesData = await shopifyOrder.aggregate([
        matchStage,
        {
            $group: groupStage
        },
        {
            $sort: { '_id': 1 } // Sort by time
        }
    ]);

    return salesData;
}

const getSalesGrowthRateOverTime = async (query: any) => {
    const { interval } = query; // interval can be 'daily', 'monthly', 'quarterly', 'yearly'

    const matchStage = { $match: {} };
    const groupStage: any = {
        _id: null,
        total_sales: { $sum: '$total_price_set.amount' }
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

    const salesData = await shopifyOrder.aggregate([
        matchStage,
        {
            $group: groupStage
        },
        {
            $sort: { '_id': 1 } // Sort by time
        }
    ]);

    // Calculate growth rate
    const growthRateData = salesData.map((item: any, index: number) => {
        if (index === 0) return { ...item, growth_rate: null }; // No growth rate for the first data point

        const previous = salesData[index - 1].total_sales;
        const current = item.total_sales;
        const growthRate = ((current - previous) / previous) * 100;

        return { ...item, growth_rate: growthRate };
    });

    return growthRateData;
}

const getLTVByCohort = async () => {
    const ltvByCohort = await shopifyOrder.aggregate([
        // Lookup to join orders with customers
        {
            $lookup: {
                from: 'shopifycustomers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customerDetails'
            }
        },
        // Unwind the customerDetails array
        {
            $unwind: '$customerDetails'
        },
        // Group by customer ID to calculate LTV
        {
            $group: {
                _id: '$customerDetails._id',
                firstPurchaseDate: { $min: '$created_at' },
                totalSpent: { $sum: '$total_price_set.amount' }
            }
        },
        // Group by the cohort (first purchase month)
        {
            $group: {
                _id: {
                    year: { $year: '$firstPurchaseDate' },
                    month: { $month: '$firstPurchaseDate' }
                },
                totalLTV: { $sum: '$totalSpent' },
                customerCount: { $sum: 1 }
            }
        },
        // Sort by cohort date
        {
            $sort: { '_id.year': 1, '_id.month': 1 }
        },
        // Project the final output format
        {
            $project: {
                cohort: {
                    $concat: [
                        { $toString: '$_id.year' },
                        '-',
                        { $cond: { if: { $lt: ['$_id.month', 10] }, then: { $concat: ['0', { $toString: '$_id.month' }] }, else: { $toString: '$_id.month' } } }
                    ]
                },
                totalLTV: 1,
                customerCount: 1,
                averageLTV: { $divide: ['$totalLTV', '$customerCount'] }
            }
        }
    ]);

    return ltvByCohort;
}

export const OrderServices = {
    createOrderIntoDB,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getLTVByCohort
}