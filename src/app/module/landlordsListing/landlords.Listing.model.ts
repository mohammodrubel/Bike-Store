

import { model, Schema } from "mongoose";
import { TLandlords } from "./landlords.Listing.interface";

const LandlordsSchema = new Schema<TLandlords>({
    details_description: {
        type: String,
        required: true
    },
    multiple_images: {
        type: [String],
    },
    rent_amount: {
        type: Number,
        required: true
    },
    number_of_bedrooms: {
        type: Number,
        required: true
    },
    landlord: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rental_house_location:{
        type: String,
        required: true
    },
    amenities:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


export const Listing = model<TLandlords>('Listing', LandlordsSchema) 