import mongoose, { model, Schema } from "mongoose";
import { TPayment } from "./paymentInterface";

const paymentSchema = new Schema<TPayment>({
    amount: {
        type: Number,
        required: true,
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING' , 'SUCCESS' , 'FAILED' , 'CANCELLED'],
        default: 'PENDING',
    },
    transaction_id: {
        type: String,
        required: true,
    },
    payment_gateway_data: {
        type: mongoose.Schema.Types.Mixed,
      },
},
    {
        timestamps: true
    })
export const Payment = model<TPayment>('payment', paymentSchema);