import httpStatus from 'http-status';
import mongoose from 'mongoose';
import App__error from '../../Error/App__Error';
import { Order } from '../order/order.model';
import { Payment } from './paymentModel';


// Helper function to handle transaction updates
export const updatePaymentAndOrderStatus = async (
    transactionId: string,
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED',
    orderStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED',
    response?: Record<string, unknown>,
) => {
    const session = await mongoose.startSession(); // Start a transaction session
    session.startTransaction();

    try {
        // Update Payment status
        const paymentUpdate = await Payment.findOneAndUpdate(
            { transaction_id: transactionId },
            {
                status: paymentStatus,
                payment_gateway_data: response || {},
            },
            { new: true, session },
        );

        if (!paymentUpdate) {
            throw new App__error(httpStatus.NOT_FOUND, 'Payment not found');
        }

        // Update Order payment_status
        const orderUpdate = await Order.findOneAndUpdate(
            { transaction_id: transactionId },
            {
                payment_status: orderStatus,
            },
            { new: true, session },
        );

        if (!orderUpdate) {
            throw new App__error(httpStatus.NOT_FOUND, 'Order not found');
        }

        await session.commitTransaction(); // Commit the transaction
        session.endSession();
    } catch (error) {
        await session.abortTransaction(); // Rollback if there's an error
        session.endSession();
        throw error;
    }
};
