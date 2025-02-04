import { model, Schema } from "mongoose";
import { Torders, TshippingInfo } from "./order.interface";
import { productSchema } from "../product/product.model";

const shippingAddressSchema = new Schema<TshippingInfo>({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String,  // Optional address line
    }
});

const orderSchema = new Schema<Torders>({
    customar: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: {
        type: [productSchema],
        required: true,
        ref: 'Bike',
    },
    payment_method: {
        type: String,
        enum: ["CASH_ON_DELIVERY", "SSLCOMMERZ"],
        default: "CASH_ON_DELIVERY",
    },
    transaction_id: {
        type: String,
        required: true,
    },
    shippingAddress: shippingAddressSchema,
    total:{
        type:Number,
        required:true 
    },
    grandTotal:{
        type:Number,
        required:true 
    },
    payment_status: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED'],
        default: 'PENDING',
      },
      status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING',
      },
}, {
    timestamps: true,
});

export const Order = model<Torders>('order', orderSchema);
