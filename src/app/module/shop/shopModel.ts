import { model, Schema } from "mongoose";
import { TShop } from "./shopInterface";

const shopSchema = new Schema<TShop>({
    logo:{
        type:String,
        default:''
    },
    address:{
        type:String,
        required:true,
    },
    buisnessLicenseNumber:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:String,
        required:true,
    },
    isActive:{
        required:true,
        default:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    serviceOffer:{
        type:[String],
        required:true 
    },
    shopName:{
        type:String,
        required:true,
        unique:true 
    },
    socialMedia:{
        type:String,
        required:true 
    },
    taxNumber:{
        type:String,
        required:true 
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        default:null
    },
    websiteLink:{
        type:String,
        required:true
    },

})

export const Shop = model<TShop>('shop',shopSchema)