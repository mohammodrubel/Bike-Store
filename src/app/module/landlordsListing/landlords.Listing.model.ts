import { model, Schema } from "mongoose";
import { TLandlordsRequest } from "./landlords.Listing.interface";

const landloardsRequestSchema = new Schema<TLandlordsRequest>({
    landlord_phone_number: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED', 'CANCELLED'],
        default: 'PENDING'
    },
    rental_house_listing_ID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Landlord'
    },
    tenant_ID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        enum: ["pending", "approved", "rejected"],
        default: 'pending',
        required: true
    },
    tenant_message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const landloardsRequest = model<TLandlordsRequest>('landloardsRequest', landloardsRequestSchema)