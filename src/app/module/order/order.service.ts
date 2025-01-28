import { Torders } from "./order.interface";
import { Order } from "./order.model";
import App__error from "../../Error/App__Error";
import httpStatus from "http-status";
import { Product } from "../product/product.model";



const createOrderService = async (payload: Torders) => {
    try {
        const { products, customar, payment_method, transaction_id, shippingAddress } = payload;

        // Validate payload
        if (!customar || !products || products.length === 0 || !payment_method || !transaction_id || !shippingAddress) {
            throw new App__error(httpStatus.BAD_REQUEST, "Invalid payload. Missing required fields.");
        }

        if (!["CASH_ON_DELIVERY", "CREDIT_CARD", "BKASH"].includes(payment_method)) {
            throw new App__error(httpStatus.BAD_REQUEST, "Invalid payment method.");
        }

        if (products.some(product => product.orderQuantity <= 0)) {
            throw new App__error(httpStatus.BAD_REQUEST, "Order quantity must be greater than zero.");
        }

        // Check if all products exist
        const productIds = products.map(product => product._id);
        const existingProducts = await Product.find({ _id: { $in: productIds } });

        if (existingProducts.length !== products.length) {
            throw new App__error(httpStatus.NOT_FOUND, "Some products in the order do not exist in the database.");
        }

        // Validate quantities
        const invalidProducts = products.filter(product => {
            const existingProduct = existingProducts.find(item => item._id.toString() === product._id);
            return existingProduct && product.orderQuantity > existingProduct.quantity;
        });

        if (invalidProducts.length > 0) {
            throw new App__error(httpStatus.BAD_REQUEST, "Insufficient stock to fulfill the order.");
        }

        // Start transaction
        const session = await Product.startSession();
        session.startTransaction();

        try {
            // Update product quantities
            const bulkUpdateOps = products.map(product => ({
                updateOne: {
                    filter: { _id: product._id },
                    update: { $inc: { quantity: -product.orderQuantity } },
                },
            }));

            await Product.bulkWrite(bulkUpdateOps, { session });

            // Create the order
            const orderData = {
                customar,
                products: products.map(({ _id, name, orderQuantity,image, brand, price, category,inStock,quantity,description }) => ({
                    _id,
                    orderQuantity,
                    brand,
                    price,
                    image,
                    name,
                    category,
                    inStock,
                    quantity,
                    description
                })),
                payment_method,
                transaction_id,
                shippingAddress,
            };

            const newOrder = await Order.create([orderData], { session });

            // Commit transaction
            await session.commitTransaction();
            return newOrder;
        } catch (error) {
            // Abort transaction on error
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession(); // Ensure session is always ended
        }
    } catch (error) {
        console.error("Error in createOrderService:", error);
        throw error; // Re-throw the error for the caller to handle
    }
};


export default createOrderService;





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
    getOrderRevenueService
}


