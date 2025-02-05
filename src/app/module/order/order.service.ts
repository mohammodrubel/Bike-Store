import httpStatus from "http-status";
import { v4 as uuidv4 } from 'uuid';
import App__error from "../../Error/App__Error";
import { Product } from "../product/product.model";
import { Torders } from "./order.interface";
import { Order } from "./order.model";


import mongoose from "mongoose"; // Ensure mongoose is imported
import { Payment } from "../payment/paymentModel";
import { Tproduct } from "../product/product.interface";



const createOrderService = async (payload: Torders) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { products, customar, payment_method, shippingAddress, total, grandTotal } = payload;

        // Validate required fields
        if (!customar || !products || products.length === 0 || !payment_method || !shippingAddress) {
            throw new App__error(httpStatus.BAD_REQUEST, 'Invalid payload. Missing required fields.');
        }

        // Validate product IDs and map them to ObjectId
        const productIds = products.map((product: Tproduct) => {
            if (!mongoose.Types.ObjectId.isValid(product._id!)) {
                throw new App__error(httpStatus.BAD_REQUEST, `Invalid product ID: ${product._id}`);
            }
            return new mongoose.Types.ObjectId(product._id);
        });

        // Check if all products exist in the database
        const existingProducts = await Product.find({ _id: { $in: productIds } }).session(session);

        if (existingProducts.length !== products.length) {
            throw new App__error(httpStatus.NOT_FOUND, 'Some products do not exist in the database.');
        }

        // Check for insufficient stock
        const invalidProducts = products.filter((product: Tproduct) => {
            const existingProduct = existingProducts.find((item) => item._id.toString() === product._id?.toString());

            // Ensure existingProduct is defined and quantity is a number
            if (!existingProduct || typeof existingProduct.quantity !== 'number') {
                return true; // Treat as invalid if product is not found or quantity is invalid
            }
            // Check if order quantity exceeds available stock
            return Number(product?.orderQuantity) > existingProduct?.quantity;
        });

        if (invalidProducts.length > 0) {
            throw new App__error(httpStatus.BAD_REQUEST, 'Insufficient stock to fulfill the order.');
        }

        // Prepare bulk update operations for product quantities
        const bulkUpdateOps = products.map((product) => ({
            updateOne: {
                filter: { _id: new mongoose.Types.ObjectId(product._id) },
                update: { $inc: { quantity: -product.orderQuantity! } },
            },
        }));

        // Execute bulk update
        await Product.bulkWrite(bulkUpdateOps, { session });
        const transaction_id = `TXN-${uuidv4().slice(0, 8)}`;
        // Prepare order data
        const orderData = {
            customar: new mongoose.Types.ObjectId(customar), // Ensure customar is an ObjectId
            products: products.map(({ _id, ...rest }) => ({
                _id: new mongoose.Types.ObjectId(_id),
                ...rest,
            })),
            payment_method,
            total,
            grandTotal,
            transaction_id,
            shippingAddress,
        };

        // Create the order
        const newOrder = await Order.create([orderData], { session });

        const populatedOrder = await Order.findById(newOrder[0]._id)
            .populate("products._id")
            .populate("customar")
            .session(session);

        await Payment.create(
            [
                {
                    order_id: populatedOrder?._id,
                    transaction_id,
                    amount: populatedOrder?.grandTotal,
                },
            ],
            {
                session
            }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return populatedOrder;
    } catch (error) {
        // Handle errors and abort the transaction
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        session.endSession();
        throw error;
    }
};

const getAllOrderService = async () => {
    const reuslt = await Order.find({}).populate('customar')
    return reuslt
}

const singleOrderService = async (id: string) => {
    const result = await Order.findById(id)
    return result
}

const getOrderRevenueService = async () => {
    const revenue = await Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },

        { $project: { totalRevenue: 1, _id: 0 } }
    ]);

    const result = revenue[0]
    return result


};



export const OrderService = {
    createOrderService,
    getOrderRevenueService,
    getAllOrderService,
    singleOrderService,
}


