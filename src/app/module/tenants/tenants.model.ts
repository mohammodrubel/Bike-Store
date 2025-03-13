import { model, Schema, Types } from "mongoose";

export type TLandlordsRequest = {
    rental_house_listing_ID: Types.ObjectId;
    tenant_ID: Types.ObjectId;
    status: "pending" | "approved" | "rejected";
    landlord_phone_number: string;
    payment_status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
    tenant_message: string;
};

const landlordsRequestSchema = new Schema<TLandlordsRequest>(
    {
        rental_house_listing_ID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Listing", // Ensure correct reference
        },
        tenant_ID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            required: true,
        },
        landlord_phone_number: {
            type: String,
            required: true,
        },
        payment_status: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED", "CANCELLED"],
            default: "PENDING",
        },
        tenant_message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Request = model<TLandlordsRequest>("Request", landlordsRequestSchema);
