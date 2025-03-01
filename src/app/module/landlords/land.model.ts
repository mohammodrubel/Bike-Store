
import { model, Schema } from "mongoose";
import { TLandlords } from "./land.interface";

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
    landlord:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }    
}, {
    timestamps: true
})


export const Landlords = model<TLandlords>('Landlord', LandlordsSchema) 